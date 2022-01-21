import { Card } from 'antd'

const gridStyle = {
  width: '33%',
  textAlign: 'center',
}

const CardElement = () => {
  return (
    <div>
      <Card>
        <Card.Grid hoverable={false} style={gridStyle}>
          Table 1
        </Card.Grid>
        <Card.Grid hoverable={false} style={gridStyle}>
          86 Matches Cette Semaine
        </Card.Grid>
        <Card.Grid hoverable={false} style={gridStyle}>
          17 Matches Ce Jour
        </Card.Grid>
      </Card>
    </div>
  )
}

export default CardElement
