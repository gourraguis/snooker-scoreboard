import { UserOutlined } from '@ant-design/icons'
import { motion, AnimatePresence } from 'framer-motion'
import { useRecoilValue } from 'recoil'
import { Card } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import classNames from 'classnames'
import { historyState } from '../../../atoms/history'
import SCBall from '../SCGameDetails/SCBall/SCBall'

import styles from './SCHistory.module.css'
import { gameState } from '../../../atoms/game.atom'

const SCHistory = () => {
  const playingHistory = useRecoilValue(historyState)
  const game = useRecoilValue(gameState)!

  const historyLength = playingHistory.length
  const shownHistory = playingHistory.slice(historyLength > 4 ? historyLength - 5 : 0, historyLength)

  return (
    <Content className={styles.all}>
      <Card bodyStyle={{ padding: 12 }} title={<h3 className={styles.title}>Historique</h3>} className={styles.card}>
        <Content className={styles.content}>
          {shownHistory.map((item, index) => {
            const player = game.players[item.value]
            const score = item.scoredBalls.reduce((a, b) => a + b, 0)
            return (
              <AnimatePresence exitBeforeEnter key={index}>
                <motion.div
                  key={item.value}
                  animate={{ y: 0 }}
                  initial={{ y: 20 }}
                  exit={{ y: -20 }}
                  transition={{ duration: 0.15 }}
                >
                  <div className={styles.wrapper}>
                    <UserOutlined className={styles[`icon${item.value}`]} />
                    {score !== 0 ? (
                      <div>
                        <p className={classNames(styles.text)}>
                          {player.name} dekhel {score}
                        </p>
                        <div className={styles.ballBox}>
                          {item.scoredBalls.map((ball, index2) => (
                            <SCBall key={index2} value={ball} size="sm" />
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p className={classNames(styles.text)}>{player.name} howa la3eb</p>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            )
          })}
        </Content>
      </Card>
    </Content>
  )
}

export default SCHistory
