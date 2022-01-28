import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { RedoOutlined } from '@ant-design/icons'
import { currentTurnSelector, playersScoreSelector, historyState } from '../../../atoms/history'
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
    <div className={styles.content}>
      {balls.map((value) => (
        <SCBall key={value} value={value} onClick={scoreBall(value)} />
      ))}
      <RedoOutlined onClick={switchPlayer} className={styles.icon} />
    </div>
  )
}

export default SCControls
