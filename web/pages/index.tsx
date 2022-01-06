import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Snooker Scoreboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex items-center justify-center mx-auto h-screen">
        <p className="text-blue-500 text-3xl font-bold">Snooker Scoreboard</p>
      </main>
    </div>
  );
};

export default Home;
