declare module "virtual:public-component-api" {
  type Declarations = Readonly<Record<string, readonly import("~/data/catalog-reference").DeclaredApiMember[]>>;
  const loaders: Readonly<Partial<Record<string, () => Promise<Declarations>>>>;
  export default loaders;
}
