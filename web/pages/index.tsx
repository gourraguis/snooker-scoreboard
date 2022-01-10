import type { NextPage } from 'next';
import Head from 'next/head';
import Controls from '../components/Controls';
import Header from '../components/Header';
import History from '../components/History';
import Feed from '../components/Feed';
import PlayerCard from '../components/PlayerCard';
import { initialUsers } from '../utils/user';
import { useRecoilState } from 'recoil';
import { currentPlayerIdState, playersState } from '../atoms/userState';
import { useEffect } from 'react';

const Home: NextPage = () => {
  const [playerState, setPlayerState] = useRecoilState(playersState);
  const [currentPlayerId, setCurrentPlayerId] =
    useRecoilState(currentPlayerIdState);
  useEffect(() => {
    setPlayerState(initialUsers);
    setCurrentPlayerId(initialUsers[0].id);
  }, []);
  return (
    <div>
      <Head>
        <title>Snooker Scoreboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col mx-auto h-screen bg-background-color overflow-y-scroll">
        <div className="flex items-center justify-center">
          <Header name={'Table 1'} />
        </div>
        <main className="flex flex-col justify-center">
          <div className="grid grid-cols-3 gap-28">
            <div className="ml-10">
              {playerState?.map((player) => (
                <PlayerCard id={player.id} key={player.id} />
              ))}
            </div>
            <Feed />
            <History />
          </div>
          <Controls />
        </main>
      </div>
    </div>
  );
};

export default Home;
