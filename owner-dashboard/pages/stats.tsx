import Head from 'next/head'
import type { NextPage } from 'next'
import { Layout } from 'antd'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { ODHeader } from '../components/ODHeader/ODHeader'
import { ODMenu } from '../components/ODMenu/ODMenu'
import { getOwner } from '../services/api'
import { ownerState } from '../atoms/ownerState'
import { ODSelector } from '../components/ODStatistics/ODSelector/ODSelector'
import { ODTable } from '../components/ODStatistics/ODTable/ODTable'

const Statistics: NextPage = () => {
  const router = useRouter()
  const [owner, setOwner] = useRecoilState(ownerState)

  const fetchCurrentOwner = async () => {
    const currentOwner = await getOwner()

    if (!currentOwner) {
      router.push('/login')
      return
    }
    setOwner(currentOwner)
  }

  useEffect(() => {
    fetchCurrentOwner()
  }, [])

  if (!owner) {
    return null
  }

  return (
    <>
      <Head>
        <title>Owner Dashboard</title>
        <link rel="icon" href="/favicon/favicon.ico" />
      </Head>
      <Layout style={{ minHeight: '100vh' }}>
        <ODHeader />
        <ODSelector />
        <ODTable />
        <div style={{ marginTop: '10vh' }} />
        <ODMenu />
      </Layout>
    </>
  )
}

export default Statistics
