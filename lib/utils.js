export function isValidPhone(value) {
  return /^(\+?\d{6,15})$/.test(String(value || '').replace(/\s|-/g, ''));
}

export function onlyIfSingleVendor(items) {
  const set = new Set(items.map((i) => i.vendedor_id).filter(Boolean));
  return set.size === 1 ? [...set][0] : undefined;
}
