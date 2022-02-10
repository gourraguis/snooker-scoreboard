import Layout from 'antd/lib/layout/layout'
import Head from 'next/head'
import { NextPage } from 'next'
import { MDFooter } from '../components/MDFooter/MDFooter'
import { MDHeader } from '../components/MDHeader/MDHeader'
import { MDLogin } from '../components/MDLogin/MDLogin'

const login: NextPage = () => {
  return (
    <>
      <Head>
        <title>Manager Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout style={{ minHeight: '100vh' }}>
        <MDHeader />
        <MDLogin />
        <MDFooter />
      </Layout>
    </>
  )
}

export default login
