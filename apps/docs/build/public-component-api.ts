import { fileURLToPath } from "node:url";
import ts from "typescript";
import type { DeclaredApiMember } from "../app/data/catalog-reference";

const declaration = fileURLToPath(new URL("../../../packages/ui/dist/index.d.ts", import.meta.url));
const declarationDirectory = fileURLToPath(new URL("../../../packages/ui/dist/", import.meta.url));
const virtualId = "virtual:public-component-api";
const factories = {
  DataTable: "createUIDataTableComponents",
  DataGrid: "createUIDataGridComponents",
  DataTreeGrid: "createUIDataTreeGridComponents",
} as const;

function kebab(name: string) {
  return name.replace(/\B[A-Z]/g, letter => `-${letter.toLowerCase()}`);
}

function isVueIntrinsic(symbol: ts.Symbol) {
  const declarations = symbol.getDeclarations();
  return !!declarations?.length && declarations.every(node =>
    /\/node_modules\/(?:@vue\/|vue\/)/.test(node.getSourceFile().fileName));
}

function componentInterface(checker: ts.TypeChecker, type: ts.Type) {
  for (const signature of type.getConstructSignatures()) {
    const instance = signature.getReturnType();
    const props = instance.getProperty("$props");
    if (props) return { props: checker.getTypeOfSymbol(props), slots: instance.getProperty("$slots") };
  }
  for (const signature of type.getCallSignatures()) {
    const [props, context] = signature.getParameters();
    if (props?.name !== "__VLS_props") continue;
    const slots = context && checker.getNonNullableType(checker.getTypeOfSymbol(context)).getProperty("slots");
    return { props: checker.getTypeOfSymbol(props), slots };
  }
}

function declaredProps(type: ts.Type) {
  const variants = type.isUnion() ? type.types : [type];
  const members = new Map<string, ts.Symbol[]>();
  for (const variant of variants) {
    for (const prop of variant.getProperties()) {
      if (isVueIntrinsic(prop)) continue;
      const existing = members.get(prop.name);
      if (existing) existing.push(prop);
      else members.set(prop.name, [prop]);
    }
  }
  return { variants, members };
}

export function readPublicComponentApi(watchFile?: (path: string) => void) {
  const program = ts.createProgram([declaration], {
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    target: ts.ScriptTarget.ESNext,
    skipLibCheck: true,
    strict: true,
  });
  const checker = program.getTypeChecker();
  const source = program.getSourceFile(declaration);
  const module = source && checker.getSymbolAtLocation(source);
  if (!module) throw new Error("Build @connextable/ui before generating its Playground API reference.");
  for (const file of program.getSourceFiles()) {
    if (file.fileName.startsWith(declarationDirectory)) watchFile?.(file.fileName);
  }
  const exports = new Map(checker.getExportsOfModule(module).map(symbol => [symbol.name, symbol]));
  const components: Record<string, DeclaredApiMember[]> = {};

  function record(name: string, symbol: ts.Symbol) {
    const component = componentInterface(checker, checker.getTypeOfSymbol(symbol));
    if (!component) return;
    const members: DeclaredApiMember[] = [];
    const props = declaredProps(component.props);
    for (const [propName, definitions] of props.members) {
      const event = /^on[A-Z]/.test(propName);
      const key = event ? `@${kebab(propName[2]!.toLowerCase() + propName.slice(3))}` : kebab(propName);
      const types = new Set(definitions.map(definition => {
        const type = checker.getTypeOfSymbol(definition);
        return checker.typeToString(event ? checker.getNonNullableType(type) : type, undefined, ts.TypeFormatFlags.NoTruncation);
      }));
      const type = event && types.size > 1 ? [...types].map(signature => `(${signature})`).join(" | ") : [...types].join(" | ");
      members.push({
        name: key,
        type,
        required: definitions.length === props.variants.length && definitions.every(definition => !(definition.flags & ts.SymbolFlags.Optional)) || undefined,
      });
    }
    if (component.slots) {
      for (const slot of checker.getNonNullableType(checker.getTypeOfSymbol(component.slots)).getProperties()) {
        if (isVueIntrinsic(slot) || slot.name.startsWith("$")) continue;
        members.push({
          name: `#${slot.name}`,
          type: checker.typeToString(checker.getNonNullableType(checker.getTypeOfSymbol(slot)), undefined, ts.TypeFormatFlags.NoTruncation),
        });
      }
    }
    components[name] = members;
  }

  for (const [name, symbol] of exports) if (/^UI[A-Z]/.test(name)) record(name, symbol);
  for (const [namespace, factory] of Object.entries(factories)) {
    const symbol = exports.get(factory);
    const signature = symbol && checker.getTypeOfSymbol(symbol).getCallSignatures()[0];
    for (const part of signature?.getReturnType().getProperties() ?? []) record(`${namespace}.${part.name}`, part);
  }
  return components;
}

export function publicComponentApi() {
  return {
    name: "playground:public-component-api",
    resolveId(id: string) { return id === virtualId ? `\0${virtualId}` : undefined; },
    load(this: { addWatchFile(path: string): void }, id: string) {
      if (id !== `\0${virtualId}`) return;
      return `export default ${JSON.stringify(readPublicComponentApi(file => this.addWatchFile(file)))};`;
    },
  };
}
