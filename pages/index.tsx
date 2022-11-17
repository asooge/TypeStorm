import styles from "../styles/Home.module.css";
import { Footer } from "components/Footer";
import { Head } from "components/Head";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head />
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to TypeStorm</h1>

        <p className={styles.description}>
          60 second timer will start on your first keystroke
        </p>

        <input></input>
      </main>

      <Footer />
    </div>
  );
}
