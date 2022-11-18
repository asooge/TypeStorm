import { useState } from 'react';
import { wordList } from 'lib/constants';
import { sortRandom } from 'lib/utils';

export const useWordBank = (initialWords?: string[]) => {
  const [words, setWords] = useState<string[]>(
    initialWords ?? sortRandom(wordList),
  );

  const reset = () => setWords(sortRandom(wordList));
  return {
    wordBank: words,
    reset,
  };
};
