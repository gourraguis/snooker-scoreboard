import { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  currentTurnSelector,
  playersScoreSelector,
  historyState,
  previousTurnsSelector,
  currentScoreSelector,
} from '../../../atoms/history'
import { EBall } from '../../../types/ball'
import { gameState } from '../../../atoms/game.atom'
import { emitUpdateGame } from '../../../services/sockets'

export const SCControls: FunctionComponent = () => {
  const game = useRecoilValue(gameState)!
  const playersScore = useRecoilValue(playersScoreSelector)
  const [history, setHistory] = useRecoilState(historyState)
  const currentTurn = useRecoilValue(currentTurnSelector)
  const historyWithoutCurrentTurn = useRecoilValue(previousTurnsSelector)
  const currentScore = useRecoilValue(currentScoreSelector)
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

  const undoBall = () => {
    if (currentScore > 0) {
      const elem = {
        value: history[history.length - 1].value,
        scoredBalls: history[history.length - 1].scoredBalls.slice(0, -1),
      }
      setHistory([...history.slice(0, -1), elem])
      return
    }

    if (history.length < 2) {
      return
    }

    const elem = {
      value: history[history.length - 2].value,
      scoredBalls: history[history.length - 2].scoredBalls.slice(0, -1),
    }
    setHistory([...history.slice(0, -2), elem])
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
        history: historyWithoutCurrentTurn,
      })
    }
  }, [send])

  const switchPlayer = () => {
    if (currentTurn.scoredBalls.length === 0) {
      const newHistory = [...history]
      newHistory.pop()
      setHistory([
        ...newHistory,
        {
          value: ((currentTurn.value + 1) % 2) as 0 | 1,
          scoredBalls: [],
        },
      ])
    } else {
      setHistory([
        ...history,
        {
          value: ((currentTurn.value + 1) % 2) as 0 | 1,
          scoredBalls: [],
        },
      ])
    }
    setSend(true)
  }

  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === 'a') {
        switchPlayer()
      } else if (event.key === 'v') {
        undoBall()
      } else if (event.key === 'r') {
        scoreBall(1)()
      } else if (event.key === 'y') {
        scoreBall(2)()
      } else if (event.key === 'g') {
        scoreBall(3)()
      } else if (event.key === 'b') {
        scoreBall(4)()
      } else if (event.key === 'l') {
        scoreBall(5)()
      } else if (event.key === 'p') {
        scoreBall(6)()
      } else if (event.key === 'k') {
        scoreBall(7)()
      }
    },
    [switchPlayer, undoBall, scoreBall]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress])

  return null
}
