import { Card } from 'antd'
import CardElement from './CardElement'

const MainCard = () => {
  return (
    <>
      <Card title="Tables" extra={<a href="#">Add</a>} style={{ width: '90%' }}>
        <div>
          <CardElement />
          <CardElement />
        </div>
      </Card>
    </>
  )
}

export default MainCard
