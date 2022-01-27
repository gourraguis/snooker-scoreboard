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
}

const SCPlayerCard: FunctionComponent<SCPlayerCardProps> = ({ isCurrent, color, points, playerName }) => (
  <Card bodyStyle={{ padding: '12px' }} className={classNames(styles.card, { [styles.active]: isCurrent })}>
    <div className={styles.center}>
      <UserOutlined className={styles.icon} style={{ color }} />
      <h3 className={styles.text}>{playerName}</h3>
    </div>
    <Divider type="horizontal" className={styles.divider} />
    <div className={styles.center}>
      <h1 className={styles.points}>{points}</h1>
    </div>
  </Card>
)

export default SCPlayerCard
