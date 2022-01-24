import { Row, Col, Divider, Card } from 'antd'
import { FunctionComponent } from 'react'
import { ICardElements } from '../../../../types/cardElement'

import styles from './ODMainCardContent.module.css'

export const ODMainCardContent: FunctionComponent<ICardElements> = ({ name, dailyScore, weeklyScore }) => {
  return (
    <Card className={styles.card}>
      <Row>
        <Col span={6} className={styles.column}>
          <h3 className={styles.name}>{name}</h3>
        </Col>

        <Col span={2}>
          <Divider type="vertical" className={styles.divider} />
        </Col>

        <Col span={7} className={styles.column}>
          <span className={styles.dailyScore}>{dailyScore} </span>
          <span className={styles.text}>Matches Ce Jour</span>
        </Col>

        <Col span={2}>
          <Divider type="vertical" className={styles.divider} />
        </Col>

        <Col span={7} className={styles.column}>
          <span className={styles.weeklyScore}>{weeklyScore} </span>
          <span className={styles.text}>Matches Cette Semaine</span>
        </Col>
      </Row>
    </Card>
  )
}
