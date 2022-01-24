import { Card } from 'antd'
import { FunctionComponent } from 'react'
import { ICardElements } from '../../../types/cardElement'

import styles from './ODMainCard.module.css'

interface ODMainCardProps {
  title: string
  elements: ICardElements[]
}
const ODMainCard: FunctionComponent<ODMainCardProps> = ({ title, elements }) => {
  return (
    <Card title={title} extra={<div>ADD</div>} className={styles.card}>
      hello
    </Card>
  )
}

export default ODMainCard
