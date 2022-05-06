import { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { gameState } from '../../../atoms/game.atom'
import { currentTurnSelector, historyState, currentScoreSelector } from '../../../atoms/history'
import { getMaxUndoCount } from '../../../services/config'
import { openNotification } from '../../../services/notification'
import { EBall } from '../../../types/ball'

export const SCControls: FunctionComponent = () => {
  const game = useRecoilValue(gameState)
  const [history, setHistory] = useRecoilState(historyState)
  const currentTurn = useRecoilValue(currentTurnSelector)
  const currentScore = useRecoilValue(currentScoreSelector)
  const [undoCount, setUndoCount] = useState(0)

  const scoreBall = (ball: EBall) => () => {
    setHistory([
      ...history.slice(0, history.length - 1),
      {
        value: currentTurn.value,
        scoredBalls: [...currentTurn.scoredBalls, ball],
      },
    ])
    setUndoCount((prevUndoCount) => Math.max(0, prevUndoCount - 1))
  }

  const undoBall = () => {
    console.log(undoCount)
    console.log(getMaxUndoCount())
    if (undoCount >= getMaxUndoCount()) {
      openNotification({
        type: 'warning',
        title: 'Maximum de retour en arrière',
        description: `t9ed terje3 blour ${getMaxUndoCount()} balles max`,
      })
      return
    }

    setUndoCount((prevUndoCount) => prevUndoCount + 1)

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

  const switchPlayer = () => {
    const newTurn = ((currentTurn.value + 1) % 2) as 0 | 1
    if (currentTurn.scoredBalls.length === 0) {
      const newHistory = [...history]
      newHistory.pop()
      setHistory([
        ...newHistory,
        {
          value: newTurn,
          scoredBalls: [],
        },
      ])
    } else {
      setHistory([
        ...history,
        {
          value: newTurn,
          scoredBalls: [],
        },
      ])
    }
    openNotification({
      type: 'success',
      title: `La canne est chez ${game?.players[newTurn].name}`,
    })
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
