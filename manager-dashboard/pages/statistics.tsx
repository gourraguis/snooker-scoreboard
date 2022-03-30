import Head from 'next/head'
import type { NextPage } from 'next'
import { Layout } from 'antd'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { MDMenu } from '../components/MDMenu/MDMenu'
import { authState } from '../atoms/authState'
import { getCurrentManager } from '../services/manager'
import { MDHeader } from '../components/MDHeader/MDHeader'
import { MDTable } from '../components/MDStatistics/MDTable/MDTable'

const Statistics: NextPage = () => {
  const router = useRouter()
  const [manager, setManager] = useRecoilState(authState)

  const fetchCurrentManager = async () => {
    const currentManager = await getCurrentManager()

    if (!currentManager) {
      router.push('/login')
      return
    }
    setManager(currentManager)
  }

  useEffect(() => {
    fetchCurrentManager()
  }, [])

  if (!manager) {
    return null
  }

  return (
    <>
      <Head>
        <title>Manager Dashboard</title>
        <link rel="icon" href="/favicon/favicon.ico" />
      </Head>
      <Layout style={{ minHeight: '100vh' }}>
        <MDHeader />
        <MDTable />
        <MDMenu />
      </Layout>
    </>
  )
}

export default Statistics
