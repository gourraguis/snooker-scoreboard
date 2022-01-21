import type { NextPage } from 'next'
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'
import { useEffect } from 'react'
import moment from 'moment'
import Head from 'next/head'
import Controls from '../components/Controls'
import Heading from '../components/Header'
import History from '../components/History'
import GameDetails from '../components/GameDetails'
import PlayerCard from '../components/PlayerCard'
import { playersState } from '../atoms/players'
import { currentTurnSelector, playersScoreSelector, historyState, startedAtState } from '../atoms/history'
import { initSocket } from '../services/sockets'

const Home: NextPage = () => {
  const playerState = useRecoilValue(playersState)
  const currentTurn = useRecoilValue(currentTurnSelector)
  const playersScore = useRecoilValue(playersScoreSelector)
  const setTimer = useSetRecoilState(startedAtState)
  const initPlayers = useResetRecoilState(playersState)
  const initHistory = useResetRecoilState(historyState)

  const startNewGame = () => {
    initHistory()
    initPlayers()
    setTimer(moment().toDate())
  }

  useEffect(() => {
    initSocket(startNewGame)
  }, [])

  return (
    <div>
      <Head>
        <title>Snooker Scoreboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col mx-auto h-screen bg-background-color overflow-y-scroll">
        <div className="flex items-center justify-center">
          <Heading title="Table 1" />
        </div>
        <main className="flex flex-col justify-center">
          <div className="grid grid-cols-3 gap-28">
            <div className="ml-10">
              {playerState.map((player) => (
                <PlayerCard
                  isCurrent={currentTurn.value === player.turn}
                  color={player.color}
                  playerName={player.name}
                  points={playersScore[player.turn]}
                  key={player.turn}
                />
              ))}
            </div>
            <GameDetails />
            <History />
          </div>
          <Controls />
        </main>
      </div>
    </div>
  )
}

export default Home
