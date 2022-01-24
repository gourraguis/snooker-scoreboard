import { Card } from 'antd'
import { FunctionComponent } from 'react'
import { ICardElements } from '../../../types/cardElement'

import styles from './ODMainCard.module.css'
import { ODMainCardContent } from './ODMainCardContent/ODMainCardContent'

interface ODMainCardProps {
  title: string
  elements: ICardElements[]
}
const ODMainCard: FunctionComponent<ODMainCardProps> = ({ title, elements }) => {
  return (
    <Card title={title} extra={<div>ADD</div>} className={styles.card}>
      {elements.map((elem) => (
        <ODMainCardContent
          key={elem.name}
          name={elem.name}
          dailyScore={elem.dailyScore}
          weeklyScore={elem.weeklyScore}
        />
      ))}
    </Card>
  )
}

export default ODMainCard
