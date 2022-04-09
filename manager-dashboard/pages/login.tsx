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
        <title>Connexion du gérant</title>
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
