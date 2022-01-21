import { Typography, Card } from 'antd'

const { Title } = Typography

const HeadingCard = () => {
  return (
    <div>
      <Card style={{ width: '37%' }}>
        <Title level={4}>Cette Semaine</Title>
        <Title level={3}>340</Title>
        <Title level={4}>Matches</Title>
      </Card>
    </div>
  )
}

export default HeadingCard
