import Head from 'next/head'
import type { NextPage } from 'next'
import { Layout } from 'antd'
import { useEffect } from 'react'
import { openNotification } from '../services/notification'

const Home: NextPage = () => {
  useEffect(() => {
    openNotification({ title: 'Welcome to Jawad Club' })
  }, [])

  return (
    <>
      <Head>
        <title>Jawad Club</title>
        <link rel="icon" href="/favicon/favicon.ico" />
      </Head>
      <Layout style={{ minHeight: '100vh' }}>Hello from jawad club!</Layout>
    </>
  )
}

export default Home
