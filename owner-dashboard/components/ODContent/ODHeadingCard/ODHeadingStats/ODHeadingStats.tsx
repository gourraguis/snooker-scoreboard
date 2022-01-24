import { Space, Typography } from 'antd'
import { FunctionComponent } from 'react'

import styles from './ODHeadingStats.module.css'

const { Paragraph } = Typography

interface ODHeadingStatsProps {
  score: number
  title: string
  color: string
}

export const ODHeadingStats: FunctionComponent<ODHeadingStatsProps> = ({ score, title, color }) => {
  return (
    <Space direction="vertical">
      <Paragraph className={styles.title}>{title}</Paragraph>
      <Paragraph className={styles[`score${color}`]}>{score}</Paragraph>
      <Paragraph className={styles.title}>Matches</Paragraph>
    </Space>
  )
}
