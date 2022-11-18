import styles from "../styles/Home.module.css";
import { Footer } from "components/Footer";
import { Head } from "components/Head";
import { useWordBank, useTimer, useTypeStorm } from "lib/hooks";
import type { GetServerSideProps, NextPage } from "next";
import { getResults, sortRandom } from "lib/utils";
import { wordList } from "lib/constants";
import { useMemo } from "react";

interface Props {
  randomWords: string[];
}

const Home: NextPage<Props> = ({ randomWords }) => {
  const { wordBank, reset: resetWordbank } = useWordBank(randomWords);
  const {
    index,
    inputValue,
    userWords,
    handleInput,
    reset: resetTypeStorm,
  } = useTypeStorm();
  const { currentTime, isFinished, init, reset: resetTimer } = useTimer(60);

  const handleUserInput = (event: React.FormEvent<HTMLInputElement>) => {
    if (!userWords[0]) {
      init();
    }
    handleInput(event);
  };

  const tryAgain = () => {
    resetWordbank();
    resetTypeStorm();
    resetTimer();
  };

  const results = useMemo(() => {
    if (isFinished) {
      return getResults(userWords, wordBank);
    }
  }, [isFinished]);
  const {
    correctWordCount = 0,
    rawCPM,
    rawWPM,
    trueCPM,
    trueWPM,
    wordCount = 0,
  } = results ?? {};
  return (
    <div className={styles.container}>
      <Head />
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to TypeStorm</h1>

        {isFinished ? (
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
                return <span key={word}>{word + " ✅ "}</span>;
              } else {
                return (
                  <span key={word}>
                    {word + " ❌ " + "you typed: " + userWords[i]}
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
              <span>{currentTime + " / 60"}</span>
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
                    i === index ? { color: "blue", fontWeight: "500" } : {}
                  }
                >
                  {word}{" "}
                </span>
              ))}
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      randomWords: sortRandom(wordList),
    },
  };
};

export default Home;
