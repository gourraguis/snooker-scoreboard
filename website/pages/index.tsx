import Head from 'next/head'
import type { NextPage } from 'next'
import { Layout } from 'antd'
import { useEffect } from 'react'
import { openNotification } from '../services/notification'
import { WSFooter } from '../components/WSFooter/WSFooter'
import { WSMainSection } from '../components/WSMainSection/WSMainSection'
import { WSScoreBoard } from '../components/WSScoreBoard/WSScoreBoard'

const Home: NextPage = () => {
  useEffect(() => {
    openNotification({ title: 'Welcome to Club' })
  }, [])

  return (
    <>
      <Head>
        <title>Club</title>
        <link rel="icon" href="/favicon/favicon.ico" />
      </Head>
      <Layout style={{ minHeight: '100vh' }}>
        <WSMainSection />
        <WSScoreBoard />
        <WSFooter />
      </Layout>
    </>
  )
}

export default Home
