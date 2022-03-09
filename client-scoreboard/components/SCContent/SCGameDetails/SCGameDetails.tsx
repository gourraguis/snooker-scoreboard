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
              <p className={styles.text}>LAST</p>
            </Row>
            <Row>{lastBall ? <SCBall value={lastBall} showValue /> : <SCBall value={0} />}</Row>
          </Col>
        </Row>
        <Divider type="horizontal" className={styles.divider} />
        <Row>
          <Col className={styles.center}>
            <Row>
              <p className={styles.text}>SCORE</p>
            </Row>
            <Row>
              <p className={styles.text}>{currentScore}</p>
            </Row>
          </Col>
        </Row>
      </Col>
    </Card>
  )
}

export default SCGameDetails
