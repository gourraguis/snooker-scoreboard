import type { NextPage } from 'next'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import { useEffect } from 'react'
import Head from 'next/head'
import Controls from '../components/Controls'
import Heading from '../components/Header'
import History from '../components/History'
import GameDetails from '../components/GameDetails'
import PlayerCard from '../components/PlayerCard'
import { currentTurnSelector, playersScoreSelector, historyState } from '../atoms/history'
import { initSocket } from '../services/sockets'
import { boardState } from '../atoms/board.atom'
import { gameState } from '../atoms/game.atom'
import { IGame } from '../types/game'

const Home: NextPage = () => {
  const [board, setBoard] = useRecoilState(boardState)
  const [game, setGame] = useRecoilState(gameState)
  const currentTurn = useRecoilValue(currentTurnSelector)
  const playersScore = useRecoilValue(playersScoreSelector)
  const initHistory = useResetRecoilState(historyState)

  const startNewGame = (newGame: IGame) => {
    initHistory()
    setGame(newGame)
  }

  useEffect(() => {
    initSocket(startNewGame, setBoard)
  }, [])

  return (
    <div>
      <Head>
        <title>Snooker Scoreboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!board && <p>BOARD IS NOT CONNECTED TO API</p>}
      {!game && <p>GAME IS NOT STARTED</p>}
      {!!board && !!game && (
        <div className="flex flex-col mx-auto h-screen bg-background-color overflow-y-scroll">
          <div className="flex items-center justify-center">
            <Heading title={board.name} />
          </div>
          <main className="flex flex-col justify-center">
            <div className="grid grid-cols-3 gap-28">
              <div className="ml-10">
                {game.players.map((player) => (
                  <PlayerCard
                    isCurrent={currentTurn.value === player.turn}
                    color={player.turn ? 'rgb(153 27 27)' : 'rgb(250 204 21)'}
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
      )}
    </div>
  )
}

export default Home
