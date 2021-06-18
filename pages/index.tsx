import Head from "next/head";
import Image from "next/image";
import Form from "../components/Form";
export default function Home() {
  return (
    <div className="flex flex-col">
      <Head>
        <title>GraphTBL</title>
        <meta name="description" content="Made with ♥" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col justify-center items-center">
        <h1 className="text-5xl py-4">Welcome to GraphTBL!</h1>

        <p>
          Get started by inputing the <code>GraphQL API Endpoint</code>
        </p>

        <div className="flex-grow w-full">
          <Form />
        </div>
      </main>

      <footer className="flex-1 flex justify-center items-center px-5 ">
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
