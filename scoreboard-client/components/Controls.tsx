import { RefreshIcon } from '@heroicons/react/outline'
import { useRecoilState, useRecoilValue } from 'recoil'
import { currentTurnSelector, playersScoreSelector, historyState, startedAtState } from '../atoms/history'
import Ball from './Ball'
import { emitUpdateBoard } from '../services/sockets'
import { playersState } from '../atoms/players'
import { EBall } from '../types/ball'
import { balls } from '../utils/balls'

const Controls = () => {
  const startedAt = useRecoilValue(startedAtState)
  const players = useRecoilValue(playersState)
  const playersScore = useRecoilValue(playersScoreSelector)
  const [history, setHistory] = useRecoilState(historyState)
  const currentTurn = useRecoilValue(currentTurnSelector)

  const scoreBall = (ball: EBall) => () => {
    setHistory([
      ...history.slice(0, history.length - 1),
      {
        value: currentTurn.value,
        scoredBalls: [...currentTurn.scoredBalls, ball],
      },
    ])
  }

  const switchPlayer = async () => {
    setHistory([
      ...history,
      {
        value: ((currentTurn.value + 1) % 2) as 0 | 1,
        scoredBalls: [],
      },
    ])

    emitUpdateBoard({
      id: '1',
      name: 'Table 1',
      startedAt,
      players,
      playersScore,
      history,
    })
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
