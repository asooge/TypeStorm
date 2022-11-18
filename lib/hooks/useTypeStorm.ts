import { useState } from 'react';

export const useTypeStorm = (initialIndex: number = 0) => {
  const [index, setIndex] = useState<number>(initialIndex);
  const [userWords, setUserWords] = useState<string[]>([]);
  const [userInput, setUserInput] = useState<string>('');

  const increment = () => setIndex((prevState) => prevState + 1);

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    const input = event.currentTarget.value;
    const keystroke = input[input.length - 1];
    if (keystroke === ' ') {
      const submittedWord = input.replace(' ', '');
      increment();
      setUserWords([...userWords, submittedWord]);
    }
    setUserInput(input);
  };

  const reset = () => {
    setIndex(initialIndex);
    setUserWords([]);
    setUserInput('');
  };

  const inputWords = userInput.split(' ');
  const inputValue = inputWords[inputWords.length - 1];
  return {
    inputValue,
    index,
    userWords,
    handleInput,
    reset,
  };
};
