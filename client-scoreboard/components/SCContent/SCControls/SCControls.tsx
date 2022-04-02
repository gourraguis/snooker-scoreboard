import { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { RollbackOutlined, SyncOutlined } from '@ant-design/icons'
import {
  currentTurnSelector,
  playersScoreSelector,
  historyState,
  previousTurnsSelector,
  currentScoreSelector,
} from '../../../atoms/history'
import SCBall from '../SCGameDetails/SCBall/SCBall'
import { EBall } from '../../../types/ball'
import { balls } from '../../../utils/balls'
import { gameState } from '../../../atoms/game.atom'
import { emitUpdateGame } from '../../../services/sockets'
import styles from './SCControls.module.css'

interface SCControlsProps {
  showControls: boolean
}

export const SCControls: FunctionComponent<SCControlsProps> = ({ showControls }) => {
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
        undoed: false,
      },
    ])
  }

  const undoBall = () => {
    if (currentScore > 0) {
      const elem = {
        value: currentTurn.value as 0 | 1,
        scoredBalls: history[history.length - 1].scoredBalls.slice(0, -1),
        undoed: false,
      }
      setHistory([...history.slice(0, -1), elem])
    } else {
      const index = historyWithoutCurrentTurn
        .slice()
        .reverse()
        .findIndex(({ undoed }) => undoed === false)

      const count = historyWithoutCurrentTurn.length - 1
      const finalIndex = index >= 0 ? count - index : index
      const newHistory = [...history]
      newHistory[finalIndex] = {
        value: newHistory[finalIndex]?.value,
        scoredBalls: newHistory[finalIndex]?.scoredBalls,
        undoed: true,
      }
      setHistory(newHistory)
      setSend(true)
    }
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
    setHistory([
      ...history,
      {
        value: ((currentTurn.value + 1) % 2) as 0 | 1,
        scoredBalls: [],
        undoed: false,
      },
    ])
    setSend(true)
  }

  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === 's') {
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

  if (!showControls) {
    return null
  }

  return (
    <div className={styles.content}>
      <RollbackOutlined onClick={undoBall} className={styles.icon} />
      {balls.map((value) => (
        <SCBall key={value} value={value} onClick={scoreBall(value)} />
      ))}
      <SyncOutlined onClick={switchPlayer} className={styles.icon} />
    </div>
  )
}
