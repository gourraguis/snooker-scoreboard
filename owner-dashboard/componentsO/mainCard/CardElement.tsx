import { FunctionComponent } from 'react'
import { Typography, Card } from 'antd'

import { ICardElements } from '../../types/cardElement'

const gridStyle = {
  width: '33%',
}
const { Text } = Typography

const CardElement: FunctionComponent<ICardElements> = ({ name, dailyScore, weeklyScore }) => (
  <div>
    <Card style={{ marginTop: '1%', marginBottom: '2%' }}>
      <Card.Grid hoverable={false} style={gridStyle}>
        {name}
      </Card.Grid>
      <Card.Grid hoverable={false} style={gridStyle}>
        <Text type="success">{dailyScore}</Text>
      </Card.Grid>
      <Card.Grid hoverable={false} style={gridStyle}>
        <Text type="danger">{weeklyScore}</Text>
      </Card.Grid>
    </Card>
  </div>
)

export default CardElement
