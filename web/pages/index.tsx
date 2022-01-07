import type { NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/Header';

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
        <main>
          <div>
            <div>
              {/* Player 1 */}
              {/* Player 2 */}
            </div>
            {/* Middel Section */}
            {/* History */}
          </div>
          {/* Balls */}
        </main>
      </div>
    </div>
  );
};

export default Home;
