import type { NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/Header';
import History from '../components/History';
import Middel from '../components/Middel';
import Player from '../components/Player';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Snooker Scoreboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col mx-auto h-screen bg-background-color">
        <div className="flex items-center justify-center">
          <Header name={'Table 1'} />
        </div>
        <main className="flex flex-col justify-center">
          <div className="grid grid-cols-3 gap-28">
            <div className="ml-10">
              <Player player="1" />
              <Player player="2" />
            </div>
            <Middel />
            <History />
          </div>
          {/* Balls */}
        </main>
      </div>
    </div>
  );
};

export default Home;
