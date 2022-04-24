import { useRouter } from 'next/router'
import { Layout } from 'antd'
import type { NextPage } from 'next'
import { useEffect } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { useInterval } from 'usehooks-ts'
import { addBoardAction, managerBoardsState, removeBoardAction } from '../atoms/boards.atom'
import { initSocket } from '../services/socket'
import { MDHeader } from '../components/MDHeader/MDHeader'
import { MDContent } from '../components/MDContent/MDContent'
import { gameSelector } from '../atoms/games.atom'
import { getGamesState, getManager } from '../services/manager-api'
import { managerState } from '../atoms/managerState'
import { MDMenu } from '../components/MDMenu/MDMenu'

const Home: NextPage = () => {
  const setBoards = useSetRecoilState(managerBoardsState)
  const updateGame = useSetRecoilState(gameSelector)
  const router = useRouter()
  const [manager, setManager] = useRecoilState(managerState)

  const fetchCurrentManager = async () => {
    const currentManager = await getManager()

    if (!currentManager) {
      router.push('/login')
      return
    }
    setManager(currentManager)

    initSocket(addBoardAction(setBoards), removeBoardAction(setBoards), currentManager.id)
  }

  useEffect(() => {
    fetchCurrentManager()
  }, [])

  useInterval(async () => {
    if (!manager) {
      return
    }
    const gamesState = await getGamesState()
    gamesState.forEach((game) => {
      updateGame(game)
    })
  }, 1000)

  if (!manager) {
    return null
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <MDHeader />
      <MDContent />
      <MDMenu />
    </Layout>
  )
}

export default Home
