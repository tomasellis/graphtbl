import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Form from "../components/Form";
import GraphTBL from "../components/GraphTBL";
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>GraphTBL</title>
        <meta name="description" content="Made with ♥" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to GraphTBL!</h1>

        <p className={styles.description}>
          Get started by inputing the{" "}
          <code className={styles.code}>GraphQL API Endpoint</code>
        </p>

        <div className={styles.grid}>
          <Form />
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
