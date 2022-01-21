import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { openNotification } from '../services/notification'

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
      <div>9wdoha kmlin</div>
    </div>
  )
}

export default Home
