import Layout from 'antd/lib/layout/layout'
import Head from 'next/head'
import { NextPage } from 'next'
import { SCLogin } from '../components/SCLogin/SCLogin'

const login: NextPage = () => {
  return (
    <>
      <Head>
        <title>Manager Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout style={{ minHeight: '100vh' }}>
        <SCLogin />
      </Layout>
    </>
  )
}

export default login
