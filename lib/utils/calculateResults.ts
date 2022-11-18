const getCPM = (words: string[]): number => {
  return words.join(" ").length; // CPM counts space as character
};

export const getResults = (userWords: string[], wordBank: string[]) => {
  const correctWords = userWords.filter(
    (userWord, i) => userWord === wordBank[i]
  );
  const rawCPM = getCPM(userWords);
  const trueCPM = getCPM(correctWords);

  return {
    wordCount: userWords.length,
    correctWordCount: correctWords.length,
    rawCPM,
    rawWPM: Math.floor(rawCPM / 5),
    trueCPM,
    trueWPM: Math.floor(trueCPM / 5),
  };
};
