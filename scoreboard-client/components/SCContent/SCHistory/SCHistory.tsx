import { UserOutlined } from '@ant-design/icons'
import { useRecoilValue } from 'recoil'
import { Card } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import { previousTurnsSelector } from '../../../atoms/history'
import SCBall from '../SCGameDetails/SCBall/SCBall'

import styles from './SCHistory.module.css'

const SCHistory = () => {
  const playingHistoryWithoutCurrentTurn = useRecoilValue(previousTurnsSelector)

  const historyLength = playingHistoryWithoutCurrentTurn.length
  const shownHistory = playingHistoryWithoutCurrentTurn.slice(historyLength > 4 ? historyLength - 5 : 0, historyLength)

  return (
    <Card title={<h3 className={styles.title}>Historique</h3>} className={styles.card}>
      <Content className={styles.content}>
        {shownHistory.map((item, index) => (
          <div key={index} className={styles.wrapper}>
            <UserOutlined className={styles[`icon${item.value}`]} />
            <div>
              <h3 className={styles.text}>Marque {item.scoredBalls.reduce((a, b) => a + b, 0)} points</h3>
              <div className={styles.ballBox}>
                {item.scoredBalls.map((ball, index2) => (
                  <SCBall key={index2} value={ball} size="sm" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </Content>
    </Card>
  )
}

export default SCHistory
