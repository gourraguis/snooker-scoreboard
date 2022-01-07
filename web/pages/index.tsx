import type { NextPage } from 'next';
import Head from 'next/head';
import Balls from '../components/Balls';
import Header from '../components/Header';
import History from '../components/History';
import Middel from '../components/Middel';
import Player from '../components/Player';

interface player {
  id: String;
  color: String;
  score: number;
}

const player1: player = {
  id: '1',
  color: 'text-red-800',
  score: 36,
};

const player2: player = {
  id: '2',
  color: 'text-blue-800',
  score: 54,
};

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
              <Player
                id={player1.id}
                score={player1.score}
                color={player1.color}
              />
              <Player
                id={player2.id}
                score={player2.score}
                color={player2.color}
              />
            </div>
            <Middel />
            <History />
          </div>
          <Balls />
        </main>
      </div>
    </div>
  );
};

export default Home;
