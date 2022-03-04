import Head from 'next/head'
import type { NextPage } from 'next'
import { Layout } from 'antd'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { ODHeader } from '../components/ODHeader/ODHeader'
import { ODFooter } from '../components/ODFooter/ODFooter'
import { ODContent } from '../components/ODContent/ODContent'
import { getCurrentOwner } from '../services/owner-api'
import { ownerState } from '../atoms/ownerState'

const Home: NextPage = () => {
  const router = useRouter()
  const [owner, setOwner] = useRecoilState(ownerState)

  const fetchCurrentOwner = async () => {
    const currentOwner = await getCurrentOwner()

    if (!currentOwner) {
      router.push('/login')
      return
    }
    console.log(currentOwner)
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
        <ODContent />
        <ODFooter />
      </Layout>
    </>
  )
}

export default Home
