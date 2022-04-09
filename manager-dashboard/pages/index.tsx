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
import { gamesState, updateGameAction } from '../atoms/games.atom'
import { getCurrentManager } from '../services/manager'
import { authState } from '../atoms/authState'
import { MDMenu } from '../components/MDMenu/MDMenu'

const Home: NextPage = () => {
  const setBoards = useSetRecoilState(boardsState)
  const setGames = useSetRecoilState(gamesState)
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
    const id = localStorage.getItem('token')
    initSocket(addBoardAction(setBoards), removeBoardAction(setBoards), updateGameAction(setGames), setBoards, id)
  }, [])

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
      </Head>

      <Layout style={{ minHeight: '100vh' }}>
        <MDHeader />
        <MDContent />
        <div style={{ marginTop: '10vh' }} />
        <MDMenu />
      </Layout>
    </>
  )
}

export default Home
