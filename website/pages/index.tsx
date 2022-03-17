import Head from 'next/head'
import type { NextPage } from 'next'
import { Layout } from 'antd'
import { WSFooter } from '../components/WSFooter/WSFooter'
import { WSMainSection } from '../components/WSMainSection/WSMainSection'
import { WSScoreBoard } from '../components/WSScoreBoard/WSScoreBoard'
import { WSManager } from '../components/WSManager/WSManager'
import { WSOwner } from '../components/WSOwner/WSOwner'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Club</title>
        <link rel="icon" href="/favicon/favicon.ico" />
      </Head>
      <Layout style={{ minHeight: '100vh' }}>
        <WSMainSection />
        <WSScoreBoard />
        <WSManager />
        <WSOwner />
        <WSFooter />
      </Layout>
    </>
  )
}

export default Home
