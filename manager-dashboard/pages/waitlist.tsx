import Head from 'next/head'
import type { NextPage } from 'next'
import { Layout } from 'antd'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { MDMenu } from '../components/MDMenu/MDMenu'
import { managerState } from '../atoms/managerState'
import { getManager } from '../services/api'
import { MDHeader } from '../components/MDHeader/MDHeader'
import { MDList } from '../components/MDList/MDList'

const List: NextPage = () => {
  const router = useRouter()
  const [manager, setManager] = useRecoilState(managerState)

  const fetchCurrentManager = async () => {
    const currentManager = await getManager()

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
        <MDList />
        <MDMenu />
      </Layout>
    </>
  )
}

export default List
