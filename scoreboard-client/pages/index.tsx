import type { NextPage } from 'next'
import Head from 'next/head'
import SCContent from '../components/SCContent/SCContent'

const Home: NextPage = () => {
  return (
    <div style={{ height: '100vh' }}>
      <Head>
        <title>Snooker Scoreboard</title>
        <link rel="icon" href="/favicon/favicon.ico" />
      </Head>
      <SCContent />
    </div>
  )
}

export default Home
