import { Space, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { FunctionComponent } from 'react'
import { IPlayer } from '../../../../types/player'

import styles from './MDPlayer.module.css'

const { Paragraph } = Typography

interface MDPlayerProps {
  player: IPlayer
}

export const MDPlayer: FunctionComponent<MDPlayerProps> = ({ player }) => {
  return (
    <Space direction="vertical">
      <Paragraph className={styles.name}>{player.name}</Paragraph>
      <UserOutlined className={styles[`icon${player.turn}`]} />
      <Paragraph keyboard className={styles.score}>
        {player.score}
      </Paragraph>
    </Space>
  )
}
