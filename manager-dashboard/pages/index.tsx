import { Layout } from 'antd'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { addBoardAction, boardsState, updateBoardAction } from '../atoms/board'
import { initSocket } from '../services/socket'
import { MDHeader } from '../components/MDHeader/MDHeader'
import { MDContent } from '../components/MDContent/MDContent'
import { MDFooter } from '../components/MDFooter/MDFooter'

const Home: NextPage = () => {
  const setBoards = useSetRecoilState(boardsState)

  useEffect(() => {
    initSocket(addBoardAction(setBoards), updateBoardAction(setBoards))
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
