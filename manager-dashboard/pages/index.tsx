import { useRouter } from 'next/router'
import { Layout } from 'antd'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { addBoardAction, boardsState, removeBoardAction } from '../atoms/boards.atom'
import { initSocket } from '../services/socket'
import { MDHeader } from '../components/MDHeader/MDHeader'
import { MDContent } from '../components/MDContent/MDContent'
import { MDFooter } from '../components/MDFooter/MDFooter'
import { gamesState, updateGameAction } from '../atoms/games.atom'
import { checkManagerAuth } from '../services/manager'
import { authState } from '../atoms/authState'

const Home: NextPage = () => {
  const setBoards = useSetRecoilState(boardsState)
  const setGames = useSetRecoilState(gamesState)
  const [isAuth, setIsAuth] = useRecoilState(authState)
  const router = useRouter()

  useEffect(() => {
    const id = localStorage.getItem('token')
    initSocket(addBoardAction(setBoards), removeBoardAction(setBoards), updateGameAction(setGames), setBoards, id)
  }, [])

  const checker = async () => {
    await checkManagerAuth(setIsAuth, router)
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
        <>
          <Head>
            <title>Manager Dashboard</title>
            <link rel="icon" href="/favicon/favicon.ico" />
          </Head>

          <Layout style={{ minHeight: '100vh' }}>
            <MDHeader />
            <MDContent />
            <MDFooter />
          </Layout>
        </>
      )}
    </div>
  )
}

export default Home
