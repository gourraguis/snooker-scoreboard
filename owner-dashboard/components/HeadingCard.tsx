import { FunctionComponent } from 'react'
import { Typography, Card } from 'antd'

const { Title } = Typography
interface HeadingCardProps {
  score: number
  title: string
}
const HeadingCard: FunctionComponent<HeadingCardProps> = ({ score, title }) => (
  <Card>
    <Title level={4}>{title}</Title>
    <Title level={3}>{score}</Title>
    <Title level={4}>Matches</Title>
  </Card>
)

export default HeadingCard
