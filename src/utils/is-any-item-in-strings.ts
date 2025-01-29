const isAnyItemInString = (items: string[], string: string) => {
  for (const item of items) {
    if (string.includes(item)) return true;
  }
  return false;
};

export const isAnyItemInStrings = (items: string[], strings: string[]) => {
  const lowerCaseItems = items.map((item) => item.toLowerCase());

  for (const string of strings) {
    if (isAnyItemInString(lowerCaseItems, string.toLowerCase())) return true;
  }
  return false;
};
