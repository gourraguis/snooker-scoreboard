import { Layout } from 'antd'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { addBoardAction, boardsState, removeBoardAction } from '../atoms/boards.atom'
import { initSocket } from '../services/socket'
import { MDHeader } from '../components/MDHeader/MDHeader'
import { MDContent } from '../components/MDContent/MDContent'
import { MDLogin } from '../components/MDLogin/MDLogin'
import { MDFooter } from '../components/MDFooter/MDFooter'
import { gamesState, updateGameAction } from '../atoms/games.atom'
import { checkManagerAuth } from '../services/manager'
import { authState } from '../atoms/authState'

const Home: NextPage = () => {
  const setBoards = useSetRecoilState(boardsState)
  const setGames = useSetRecoilState(gamesState)
  const [isAuth, setIsAuth] = useRecoilState(authState)

  useEffect(() => {
    initSocket(addBoardAction(setBoards), removeBoardAction(setBoards), updateGameAction(setGames))
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return
    checkManagerAuth(setIsAuth)
  }, [])

  if (!isAuth)
    return (
      <>
        <Head>
          <title>Manager Dashboard</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Layout style={{ minHeight: '100vh' }}>
          <MDHeader />
          <MDLogin />
          <MDFooter />
        </Layout>
      </>
    )
  return (
    <div>
      <Head>
        <title>Manager Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout style={{ minHeight: '100vh' }}>
        <MDHeader />
        <MDContent />
        <MDFooter />
      </Layout>
    </div>
  )
}

export default Home
