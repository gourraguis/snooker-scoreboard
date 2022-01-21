import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { Row, Col, Typography } from 'antd'
import { useRecoilValue } from 'recoil'
import { openNotification } from '../services/notification'
import HeadingCard from '../components/HeadingCard'
import MainCard from '../components/mainCard/MainCard'
import { dailyStats, weeklyStats } from '../atoms/globaleStats'
import { managersStats, tablesStats } from '../atoms/mainStats'

const { Title } = Typography

const Home: NextPage = () => {
  const dailyScore = useRecoilValue(dailyStats)
  const weeklyScore = useRecoilValue(weeklyStats)
  const tablesElements = useRecoilValue(tablesStats)
  const managersElements = useRecoilValue(managersStats)
  useEffect(() => {
    openNotification({ title: 'l9wada' })
  }, [])

  return (
    <div>
      <Head>
        <title>Owner</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ backgroundColor: '#f4f4f5' }}>
        <Row>
          <Col span={12} offset={7}>
            <Title>Admin Space</Title>
          </Col>
        </Row>
        <Row style={{ marginTop: '5%' }}>
          <Col span={8} offset={2}>
            <HeadingCard title="Ce jour" score={dailyScore} />
          </Col>
          <Col span={8} offset={4}>
            <HeadingCard title="Cette Semaine" score={weeklyScore} />
          </Col>
        </Row>
        <Row style={{ marginTop: '5%' }}>
          <Col span={22} offset={1}>
            <MainCard title="Tables" elements={tablesElements} />
          </Col>
          <Col span={22} offset={1}>
            <MainCard title="Managers" elements={managersElements} />
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Home
