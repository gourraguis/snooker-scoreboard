import { RefreshIcon } from '@heroicons/react/outline'
import { useRecoilState, useRecoilValue } from 'recoil'
import moment from 'moment'
import { balls } from '../utils/balls'
import { IBall } from '../types/ball'
import {
  currentTurnSelector,
  playerPointsSelector,
  playingHistoryState,
  playingHistoryWithoutCurrentTurnSelector,
} from '../atoms/historyState'
import Ball from './Ball'
import { emitUpdateBoard } from '../services/sockets'
import { playersState } from '../atoms/userState'
import { IBoard } from '../types/board'

const Controls = () => {
  const [playingHistory, setPlayingHistory] = useRecoilState(playingHistoryState)
  const currentTurn = useRecoilValue(currentTurnSelector)
  const playerState = useRecoilValue(playersState)
  const playerPoints = useRecoilValue(playerPointsSelector)
  const playingHistoryWithoutCurrentTurn = useRecoilValue(playingHistoryWithoutCurrentTurnSelector)

  const scoreBall = (ball: IBall) => {
    setPlayingHistory([
      ...playingHistory.slice(0, playingHistory.length - 1),
      {
        value: currentTurn.value,
        scoredBalls: [...currentTurn.scoredBalls, ball.value],
      },
    ])
  }

  const switchPlayer = () => {
    const nextTurn = ((currentTurn.value + 1) % 2) as 0 | 1
    setPlayingHistory([
      ...playingHistory,
      {
        value: nextTurn,
        scoredBalls: [],
      },
    ])
    const board: IBoard = {
      id: '1',
      name: 'Table 1',
      startedAt: moment().toDate(),
      playersPoints: playerPoints,
      history: playingHistoryWithoutCurrentTurn,
      players: [
        {
          color: playerState[0].color,
          turn: playerState[0].turn,
          name: playerState[0].name,
        },
        {
          color: playerState[1].color,
          turn: playerState[1].turn,
          name: playerState[1].name,
        },
      ],
    }
    emitUpdateBoard(board)
  }

  return (
    <div className="flex justify-between items-center px-8 py-3 mx-20">
      {balls.map((ball) => (
        <Ball key={ball.value} value={ball.value} onClick={() => scoreBall(ball)} />
      ))}
      <RefreshIcon onClick={switchPlayer} className="w-14 h-14 text-white cursor-pointer" />
    </div>
  )
}

export default Controls
