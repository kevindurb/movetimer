export const getElementById = <T extends HTMLElement>(id: string) => {
  const el = document.getElementById(id);
  if (!el) throw new Error('Element not found');
  return el as T;
};
