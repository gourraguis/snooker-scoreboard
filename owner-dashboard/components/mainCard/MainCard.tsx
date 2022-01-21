import { FunctionComponent } from 'react'
import { Card } from 'antd'
import CardElement from './CardElement'
import { ICardElements } from '../../types/cardElement'

interface MainCardProps {
  title: string
  elements: ICardElements[]
}

const MainCard: FunctionComponent<MainCardProps> = ({ title, elements }) => (
  <div>
    <Card title={title} extra={<a href="#">Add</a>} style={{ width: '90%' }}>
      <div>
        {elements.map((elem) => (
          <CardElement name={elem.name} dailyScore={elem.dailyScore} weeklyScore={elem.weeklyScore} />
        ))}
      </div>
    </Card>
  </div>
)

export default MainCard
