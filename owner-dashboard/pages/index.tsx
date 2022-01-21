import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { Typography } from 'antd'
import { useRecoilValue } from 'recoil'
import { openNotification } from '../services/notification'
import HeadingCard from '../components/HeadingCard'
import MainCard from '../components/mainCard/MainCard'
import { dailyStats, weeklyStats } from '../atoms/globaleStats'
import { managersStats, tablesStats } from '../atoms/mainStats'

const { Title } = Typography

const indexStyle = {
  width: '100%',
  background: '#202020',
}

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
      <center style={indexStyle}>
        <div>
          <Title>Admin Space</Title>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <HeadingCard title="Ce jour" score={dailyScore} />
          <HeadingCard title="Cette Semaine" score={weeklyScore} />
        </div>
        <div>
          <MainCard title="Tables" elements={tablesElements} />
          <MainCard title="Managers" elements={managersElements} />
        </div>
      </center>
    </div>
  )
}

export default Home
