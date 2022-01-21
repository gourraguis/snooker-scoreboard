import { FunctionComponent } from 'react'
import { Card } from 'antd'
import CardElement from './CardElement'

interface MainCardProps {
  title: string
}

const MainCard: FunctionComponent<MainCardProps> = ({ title }) => (
  <div>
    <Card title={title} extra={<a href="#">Add</a>} style={{ width: '90%' }}>
      <div>
        <CardElement />
        <CardElement />
      </div>
    </Card>
  </div>
)

export default MainCard
