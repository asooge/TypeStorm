export const sortRandom = (items: string[]) => {
  // implementing Fisher-Yates algorithm: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = items[i];
    items[i] = items[j];
    items[j] = temp;
  }
  return items;
};
