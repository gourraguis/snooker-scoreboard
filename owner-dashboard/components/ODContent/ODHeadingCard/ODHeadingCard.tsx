import { Row, Col, Divider, Card } from 'antd'
import { useRecoilValue } from 'recoil'
import { dailyStats, weeklyStats } from '../../../atoms/globaleStats'

import styles from './ODHeadingCard.module.css'
import { ODHeadingStats } from './ODHeadingStats/ODHeadingStats'

export const ODHeadingCard = () => {
  const dailyScore = useRecoilValue(dailyStats)
  const weeklyScore = useRecoilValue(weeklyStats)
  return (
    <Card className={styles.card}>
      <Row>
        <Col span={11} className={styles.column}>
          <ODHeadingStats title="Ce jour" score={dailyScore} color="Blue" />
        </Col>

        <Col span={2}>
          <Divider type="vertical" className={styles.divider} />
        </Col>

        <Col span={11} className={styles.column}>
          <ODHeadingStats title="Cette Semaine" score={weeklyScore} color="Green" />
        </Col>
      </Row>
    </Card>
  )
}
