import { FunctionComponent } from 'react'
import { Card } from 'antd'
import { ICardElements } from '../../types/cardElement'

const gridStyle = {
  width: '33%',
}

const CardElement: FunctionComponent<ICardElements> = ({ name, dailyScore, weeklyScore }) => (
  <div>
    <Card style={{ marginTop: '5%' }}>
      <Card.Grid hoverable={false} style={gridStyle}>
        {name}
      </Card.Grid>
      <Card.Grid hoverable={false} style={gridStyle}>
        {dailyScore}
      </Card.Grid>
      <Card.Grid hoverable={false} style={gridStyle}>
        {weeklyScore}
      </Card.Grid>
    </Card>
  </div>
)

export default CardElement
