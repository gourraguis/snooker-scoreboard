import { FunctionComponent } from 'react'
import { Typography, Card } from 'antd'

const { Title } = Typography
interface HeadingCardProps {
  score: number
}
const HeadingCard: FunctionComponent<HeadingCardProps> = ({ score }) => (
  <div>
    <Card style={{ width: '37%' }}>
      <Title level={4}>Cette Semaine</Title>
      <Title level={3}>{score}</Title>
      <Title level={4}>Matches</Title>
    </Card>
  </div>
)

export default HeadingCard
