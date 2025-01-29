export const htmlDecode = (input: string | null) => {
  if (!input) return '';

  const document = new DOMParser().parseFromString(input, 'text/html');
  return document.documentElement.textContent ?? '';
};
