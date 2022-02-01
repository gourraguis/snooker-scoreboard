import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { RollbackOutlined, SyncOutlined } from '@ant-design/icons'
import { currentTurnSelector, playersScoreSelector, historyState, previousTurnsSelector } from '../../../atoms/history'
import SCBall from '../SCGameDetails/SCBall/SCBall'
import { EBall } from '../../../types/ball'
import { balls } from '../../../utils/balls'
import { gameState } from '../../../atoms/game.atom'
import { emitUpdateGame } from '../../../services/sockets'
import styles from './SCControls.module.css'

const SCControls = () => {
  const game = useRecoilValue(gameState)!
  const playersScore = useRecoilValue(playersScoreSelector)
  const [history, setHistory] = useRecoilState(historyState)
  const currentTurn = useRecoilValue(currentTurnSelector)
  const historyWithoutCurrentTurn = useRecoilValue(previousTurnsSelector)
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

export default SCControls
