const targets = [
  'input:not([type="hidden"], [type="file"], [aria-hidden="true"], [hidden], :disabled)', 'textarea:enabled',
  'button:is([data-part="trigger"], [data-part="edit-trigger"], [data-part="preview"]):enabled:not([hidden])',
  '[role="listbox"][tabindex]',
  ':is(button[role="checkbox"], [tabindex="0"]:is([role="radio"], [role="checkbox"], [role="tree"], [role="grid"], [role="gridcell"], [data-part="item"])):not(:disabled, [hidden], [aria-disabled="true"])',
].join(", ");

export function resolveClearFocus(event: MouseEvent) {
  const parent = event.currentTarget instanceof HTMLElement ? event.currentTarget.parentElement : null;
  const root = parent?.closest<HTMLElement>('[data-part="root"]');
  return () => {
    for (const scope of [parent, root]) {
      const candidates = scope?.querySelectorAll<HTMLElement>(targets) ?? [];
      const target = Array.from(candidates).find(element => element.getClientRects().length && !element.closest('[inert]'));
      if (target) {
        target.focus({ preventScroll: true });
        return;
      }
    }
    if (root?.matches('[tabindex]:not([aria-disabled="true"])')) root.focus({ preventScroll: true });
  };
}
