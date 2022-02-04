import { Layout } from 'antd'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { ODHeader } from '../components/ODHeader/ODHeader'
import { ODFooter } from '../components/ODFooter/ODFooter'
import { ODContent } from '../components/ODContent/ODContent'
import { ODLogin } from '../components/MDLogin/ODLogin'

const Home: NextPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  if (!isAuthenticated)
    return (
      <>
        <Head>
          <title>Manager Dashboard</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Layout style={{ minHeight: '100vh' }}>
          <ODHeader />
          <ODLogin />
          <ODFooter />
        </Layout>
      </>
    )
  return (
    <div>
      <Head>
        <title>Owner Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout style={{ minHeight: '100vh' }}>
        <ODHeader />
        <ODContent />
        <ODFooter />
      </Layout>
    </div>
  )
}

export default Home
