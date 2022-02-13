import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { authState } from '../atoms/authState'
import SCContent from '../components/SCContent/SCContent'
import { checkScoreBoardAuth } from '../services/scoreBoard'

const Home: NextPage = () => {
  const [isAuth, setIsAuth] = useRecoilState(authState)
  const router = useRouter()

  const checker = async () => {
    await checkScoreBoardAuth(setIsAuth, router)
  }
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }
    checker()
  }, [])

  return (
    <div>
      {isAuth && (
        <div style={{ height: '100vh' }}>
          <Head>
            <title>Snooker Scoreboard</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <SCContent />
        </div>
      )}
    </div>
  )
}

export default Home
