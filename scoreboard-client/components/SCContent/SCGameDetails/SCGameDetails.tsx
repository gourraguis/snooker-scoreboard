import { Card, Col, Divider, Row } from 'antd'
import { useRecoilValue } from 'recoil'
import { currentScoreSelector, lastBallSelector } from '../../../atoms/history'
import SCBall from './SCBall/SCBall'
import styles from './SCGameDetails.module.css'
import SCTimer from './SCTimer/SCTimer'

const SCGameDetails = () => {
  const lastBall = useRecoilValue(lastBallSelector)
  const currentScore = useRecoilValue(currentScoreSelector)

  return (
    <Card className={styles.card}>
      <Col className={styles.center}>
        <Row>
          <SCTimer />
        </Row>
        <Divider type="horizontal" className={styles.divider} />
        <Row>
          <Col className={styles.center}>
            <Row>
              <h3 className={styles.text}>LAST</h3>
            </Row>
            <Row>{lastBall ? <SCBall value={lastBall} showValue /> : <SCBall value={0} />}</Row>
          </Col>
        </Row>
        <Divider type="horizontal" className={styles.divider} />
        <Row>
          <Col className={styles.center}>
            <Row>
              <h3 className={styles.text}>SCORE</h3>
            </Row>
            <Row>
              <h3 className={styles.text}>{currentScore}</h3>
            </Row>
          </Col>
        </Row>
      </Col>
    </Card>
  )
}

export default SCGameDetails
