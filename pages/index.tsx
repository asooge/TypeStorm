import styles from 'styles/Home.module.css';
import { Content, Footer, Head } from 'components/';
import { useWordBank, useTimer, useTypeStorm } from 'lib/hooks';
import type { GetServerSideProps, NextPage } from 'next';
import { getResults, sortRandom } from 'lib/utils';
import { wordList } from 'lib/constants';
import type { TypeStormResults } from 'lib/utils';

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

  const results = isFinished
    ? getResults(userWords, wordBank)
    : ({} as TypeStormResults);

  return (
    <div className={styles.container}>
      <Head />
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to TypeStorm</h1>

        <Content
          currentIndex={index}
          currentTime={currentTime}
          isFinished={isFinished}
          inputValue={inputValue}
          results={results}
          userWords={userWords}
          wordBank={wordBank}
          handleUserInput={handleUserInput}
          tryAgain={tryAgain}
        />
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
