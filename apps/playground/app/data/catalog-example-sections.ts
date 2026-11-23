import type { CatalogExample, CatalogExampleSection } from "./catalog-guides";

const phases = [
  { phase: "configuration", id: "settings-and-behavior", title: "설정과 동작" },
  { phase: "examples", id: "practical-examples", title: "실전 예제" },
  { phase: "composition", id: "composition-and-extension", title: "조합과 확장" },
] as const;

const defaultSections: readonly CatalogExampleSection[] = [
  { id: "examples", phase: "examples" },
  { id: "appearance", section: "appearance" },
  { id: "form", section: "form", phase: "examples" },
];

export function arrangeCatalogExamples(
  examples: readonly CatalogExample[],
  sections: readonly CatalogExampleSection[] = defaultSections,
) {
  const grouped = new Map<string | undefined, CatalogExample[]>();
  for (const section of sections) {
    if (grouped.has(section.section)) throw new Error(`Duplicate example group ${section.id}`);
    grouped.set(section.section, []);
  }
  for (const example of examples) {
    const group = grouped.get(example.section);
    if (!group) throw new Error(`Missing example group for ${example.id}`);
    group.push(example);
  }

  return phases.flatMap(phase => {
    const groups = sections.flatMap(section => {
      const entries = grouped.get(section.section)!;
      return (section.phase ?? "configuration") === phase.phase && entries.length
        ? [{ id: section.id, examples: entries }] : [];
    });
    return groups.length ? [{ ...phase, groups }] : [];
  });
}
