import Layout from 'antd/lib/layout/layout'
import Head from 'next/head'
import { NextPage } from 'next'
import { ODFooter } from '../components/ODFooter/ODFooter'
import { ODHeader } from '../components/ODHeader/ODHeader'
import { ODLogin } from '../components/ODLogin/ODLogin'

const login: NextPage = () => {
  // todo: check if user is logged in, and redirect him
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
}

export default login
