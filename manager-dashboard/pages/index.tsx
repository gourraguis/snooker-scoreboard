import { Layout } from 'antd'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { addBoardAction, boardsState } from '../atoms/boards.atom'
import { initSocket } from '../services/socket'
import { MDHeader } from '../components/MDHeader/MDHeader'
import { MDContent } from '../components/MDContent/MDContent'
import { MDFooter } from '../components/MDFooter/MDFooter'
import { addGameAction, gamesState, updateGameAction } from '../atoms/games.atom'

const Home: NextPage = () => {
  const setBoards = useSetRecoilState(boardsState)
  const setGames = useSetRecoilState(gamesState)

  useEffect(() => {
    initSocket(addBoardAction(setBoards), updateGameAction(setGames))
  }, [])

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
