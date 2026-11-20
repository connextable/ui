// Sectile distinguishes absent attributes from explicit values when inheriting field metadata.
export function definedControlAttrs<Attrs extends object>(attrs: Attrs): Partial<Attrs> {
  return Object.fromEntries(Object.entries(attrs).filter(([, value]) => value !== undefined)) as Partial<Attrs>;
}
