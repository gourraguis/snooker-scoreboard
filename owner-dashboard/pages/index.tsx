import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { Typography } from 'antd'
import { openNotification } from '../services/notification'
import HeadingCard from '../components/HeadingCard'
import MainCard from '../components/mainCard/MainCard'

const { Title } = Typography

const indexStyle = {
  width: '100%',
  background: '#202020',
}

const Home: NextPage = () => {
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
        <div>
          <HeadingCard />
          <HeadingCard />
        </div>
        <div>
          <MainCard />
          <MainCard />
        </div>
      </center>
    </div>
  )
}

export default Home
