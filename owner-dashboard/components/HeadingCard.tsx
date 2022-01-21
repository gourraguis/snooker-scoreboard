import { FunctionComponent } from 'react'
import { Typography, Card } from 'antd'

const { Title, Text } = Typography
interface HeadingCardProps {
  score: number
  title: string
}
const HeadingCard: FunctionComponent<HeadingCardProps> = ({ score, title }) => (
  <Card>
    <Text>{title}</Text>
    <Title type="success" level={3}>
      {score}
    </Title>
    <Text>Matches</Text>
  </Card>
)

export default HeadingCard
