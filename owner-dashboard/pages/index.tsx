import Head from 'next/head'
import type { NextPage } from 'next'
import { Layout } from 'antd'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { ODHeader } from '../components/ODHeader/ODHeader'
import { ODFooter } from '../components/ODFooter/ODFooter'
import { ODContent } from '../components/ODContent/ODContent'
import { authState } from '../atoms/authState'
import { checkOwnerAuth } from '../services/owner'

const Home: NextPage = () => {
  const router = useRouter()
  const [isAuth, setIsAuth] = useRecoilState(authState)

  const checker = async () => {
    await checkOwnerAuth(setIsAuth, router)
  }

  useEffect(() => {
    const accToken = localStorage.getItem('accToken')
    if (!accToken) {
      router.push('/login')
      return
    }
    checker()
  }, [])

  return (
    <div>
      {isAuth && (
        <>
          <Head>
            <title>Owner Dashboard</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Layout style={{ minHeight: '100vh' }}>
            <ODHeader />
            <ODContent />
            <ODFooter />
          </Layout>
        </>
      )}
    </div>
  )
}

export default Home
