import Layout from 'antd/lib/layout/layout'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { authState } from '../atoms/authState'
import SCContent from '../components/SCContent/SCContent'
import { SCLogin } from '../components/SCLogin/SCLogin'
import { checkScoreBoardAuth } from '../services/scoreBoard'

const Home: NextPage = () => {
  const [isAuth, setIsAuth] = useRecoilState(authState)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return
    checkScoreBoardAuth(setIsAuth)
  }, [])

  if (!isAuth)
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

  return (
    <div style={{ height: '100vh' }}>
      <Head>
        <title>Snooker Scoreboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SCContent />
    </div>
  )
}

export default Home
