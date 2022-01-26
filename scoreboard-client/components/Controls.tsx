import { RefreshIcon } from '@heroicons/react/outline'
import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { currentTurnSelector, playersScoreSelector, historyState } from '../atoms/history'
import Ball from './Ball'
import { EBall } from '../types/ball'
import { balls } from '../utils/balls'
import { gameState } from '../atoms/game.atom'
import { emitUpdateGame } from '../services/sockets'

const Controls = () => {
  const game = useRecoilValue(gameState)!
  const playersScore = useRecoilValue(playersScoreSelector)
  const [history, setHistory] = useRecoilState(historyState)
  const currentTurn = useRecoilValue(currentTurnSelector)
  const [send, setSend] = useState(false)

  const scoreBall = (ball: EBall) => () => {
    setHistory([
      ...history.slice(0, history.length - 1),
      {
        value: currentTurn.value,
        scoredBalls: [...currentTurn.scoredBalls, ball],
      },
    ])
  }

  useEffect(() => {
    setSend(false)
    if (!send) {
      emitUpdateGame({
        ...game,
        players: [
          {
            ...game.players[0],
            score: playersScore[0],
          },
          {
            ...game.players[1],
            score: playersScore[1],
          },
        ],
        history,
      })
    }
  }, [send])

  const switchPlayer = async () => {
    setHistory([
      ...history,
      {
        value: ((currentTurn.value + 1) % 2) as 0 | 1,
        scoredBalls: [],
      },
    ])
    setSend(true)
  }

  return (
    <div className="flex justify-between items-center px-8 py-3 mx-20">
      {balls.map((value) => (
        <Ball key={value} value={value} onClick={scoreBall(value)} />
      ))}
      <RefreshIcon onClick={switchPlayer} className="w-14 h-14 text-white cursor-pointer" />
    </div>
  )
}

export default Controls
