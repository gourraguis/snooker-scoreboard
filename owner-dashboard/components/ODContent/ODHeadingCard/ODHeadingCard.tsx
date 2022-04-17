import { Row, Col, Divider, Card } from 'antd'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { dailyGamesState, weeklyGamesState } from '../../../atoms/statsState'
import { getDailyGames, getWeeklyGames } from '../../../services/api'

import styles from './ODHeadingCard.module.css'
import { ODHeadingStats } from './ODHeadingStats/ODHeadingStats'

export const ODHeadingCard = () => {
  const [dailyGames, setdailyGames] = useRecoilState(dailyGamesState)
  const [weeklyGames, setweeklyGames] = useRecoilState(weeklyGamesState)

  const fetchStats = async () => {
    const week = await getWeeklyGames()
    const day = await getDailyGames()
    setweeklyGames(week)
    setdailyGames(day)
  }

  useEffect(() => {
    fetchStats()
  }, [])

  return (
    <Card className={styles.card}>
      <Row>
        <Col span={11} className={styles.column}>
          <ODHeadingStats title="Jour" score={dailyGames} color="Blue" />
        </Col>

        <Col span={2}>
          <Divider type="vertical" className={styles.divider} />
        </Col>

        <Col span={11} className={styles.column}>
          <ODHeadingStats title="Semaine" score={weeklyGames} color="Green" />
        </Col>
      </Row>
    </Card>
  )
}
