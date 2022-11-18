import type { TypeStormResults } from 'lib/utils';
import styles from 'styles/Home.module.css';

interface ContentProps {
  currentIndex: number;
  currentTime: number;
  isFinished: boolean;
  inputValue: string;
  results: TypeStormResults;
  userWords: string[];
  wordBank: string[];
  handleUserInput: (e: React.FormEvent<HTMLInputElement>) => void;
  tryAgain: () => void;
}
export const Content: React.FC<ContentProps> = ({
  currentIndex,
  currentTime,
  isFinished,
  inputValue,
  results,
  userWords,
  wordBank,
  handleUserInput,
  tryAgain,
}) => {
  const {
    correctWordCount = 0,
    rawCPM,
    rawWPM,
    trueCPM,
    trueWPM,
    wordCount = 0,
  } = results ?? {};
  return isFinished ? (
    <>
      <p className={styles.description}>
        Here are your results: {trueCPM} CPM = {trueWPM} WPM
      </p>
      <p>Number of correct words: {correctWordCount}</p>
      <p>Number of incorrect words: {wordCount - correctWordCount}</p>
      <p>Raw CPM including incorrect words: {rawCPM}</p>
      <p>Raw WPM including incorrect words: {rawWPM}</p>

      <h2>Here are the words you typed correctly and incorrectly: </h2>
      {wordBank.slice(0, userWords.length).map((word, i) => {
        if (word === userWords[i]) {
          return <span key={word}>{word + ' ✅ '}</span>;
        } else {
          return (
            <span key={word}>
              {word + ' ❌ ' + 'you typed: ' + userWords[i]}
            </span>
          );
        }
      })}
      <button onClick={tryAgain}>Try Again!</button>
    </>
  ) : (
    <>
      <p className={styles.description}>
        60 second timer will start on your first keystroke
      </p>

      <div>
        <span>Timer: </span>
        <span>{currentTime + ' / 60'}</span>
      </div>
      <input
        disabled={isFinished}
        value={inputValue}
        onChange={handleUserInput}
      ></input>
      <div>
        {wordBank.map((word, i) => (
          <span
            key={word}
            style={
              i === currentIndex ? { color: 'blue', fontWeight: '500' } : {}
            }
          >
            {word}{' '}
          </span>
        ))}
      </div>
    </>
  );
};
