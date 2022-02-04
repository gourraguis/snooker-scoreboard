import { Layout } from 'antd'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { ODHeader } from '../components/ODHeader/ODHeader'
import { ODFooter } from '../components/ODFooter/ODFooter'
import { ODContent } from '../components/ODContent/ODContent'
import { ODLogin } from '../components/MDLogin/ODLogin'
import { authState } from '../atoms/authState'
import { checkOwnerAuth } from '../services/owner'

const Home: NextPage = () => {
  const [isAuth, setIsAuth] = useRecoilState(authState)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return
    checkOwnerAuth(setIsAuth)
  }, [])

  if (!isAuth)
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
      {isAuth && (
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
      )}
    </div>
  )
}

export default Home
