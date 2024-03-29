import { motion, AnimatePresence } from 'framer-motion'
import { UserOutlined } from '@ant-design/icons'
import classNames from 'classnames'
import { FunctionComponent } from 'react'
import { Card, Divider } from 'antd'
import styles from './SCPlayerCard.module.css'

interface SCPlayerCardProps {
  isCurrent: boolean
  color: string
  points: number
  playerName: string
  globalScore: number
  showGlobalScore: boolean
}

export const SCPlayerCard: FunctionComponent<SCPlayerCardProps> = ({
  isCurrent,
  color,
  points,
  playerName,
  globalScore,
  showGlobalScore,
}) => {
  return (
    <Card bodyStyle={{ padding: '6px' }} className={classNames(styles.card, { [styles.active]: isCurrent })}>
      <div className={styles.center}>
        <UserOutlined className={styles.icon} style={{ color }} />
        <p className={styles.text}>{playerName}</p>
      </div>
      <Divider type="horizontal" className={styles.divider} />
      <div className={styles.center}>
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={points}
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.15 }}
          >
            <p className={styles.points}>{points || '00'}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      {showGlobalScore && <p className={styles.globalScore}>{globalScore}</p>}
    </Card>
  )
}
