import Head from 'next/head'
import type { NextPage } from 'next'
import { Layout } from 'antd'
import { useEffect } from 'react'
import { openNotification } from '../services/notification'

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
      <Layout style={{ minHeight: '100vh' }}>Hello from club!</Layout>
    </>
  )
}

export default Home
