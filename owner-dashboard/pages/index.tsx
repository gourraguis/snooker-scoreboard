import { Layout } from 'antd'
import type { NextPage } from 'next'
import Head from 'next/head'
import { ODHeader } from '../components/ODHeader/ODHeader'
import { ODFooter } from '../components/ODFooter/ODFooter'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Owner Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout style={{ minHeight: '100vh' }}>
        <ODHeader />
        <ODFooter />
      </Layout>
    </div>
  )
}

export default Home
