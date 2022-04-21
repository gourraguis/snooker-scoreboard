import { Card, Col, Divider, Row } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import { useRecoilValue } from 'recoil'
import { currentScoreSelector, lastBallSelector } from '../../../atoms/history'
import SCBall from './SCBall/SCBall'
import styles from './SCGameDetails.module.css'
import SCTimer from './SCTimer/SCTimer'

const SCGameDetails = () => {
  const lastBall = useRecoilValue(lastBallSelector)
  const currentScore = useRecoilValue(currentScoreSelector)

  return (
    <Content className={styles.all}>
      <Card className={styles.card}>
        <Col className={styles.center}>
          <SCTimer />
          <Divider type="horizontal" className={styles.divider} />
          <Row>{lastBall ? <SCBall value={lastBall} /> : <SCBall value={0} />}</Row>
          <Divider type="horizontal" className={styles.divider} />
          <p className={styles.text}>SCORE</p>
          <p className={styles.score}>{currentScore || '00'}</p>
        </Col>
      </Card>
    </Content>
  )
}

export default SCGameDetails
