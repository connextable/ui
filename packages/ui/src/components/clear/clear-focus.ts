const targets = [
  'input:not([type="hidden"], [type="file"], [aria-hidden="true"], [hidden], :disabled)', 'textarea:enabled',
  'button[data-part="trigger"]:enabled', 'button[data-part="edit-trigger"]:enabled',
  '[role="listbox"][tabindex]',
  ':is(button[role="checkbox"], [tabindex="0"]:is([role="radio"], [role="checkbox"], [role="tree"], [role="grid"], [role="gridcell"], [data-part="item"])):not(:disabled, [aria-disabled="true"])',
].join(", ");

export function clearFocusTarget(event: MouseEvent) {
  if (!(event.currentTarget instanceof HTMLElement)) return;
  const parent = event.currentTarget.parentElement;
  const root = parent?.closest('[data-part="root"]');
  return parent?.querySelector<HTMLElement>(targets) ?? root?.querySelector<HTMLElement>(targets);
}
