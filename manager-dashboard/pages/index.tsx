import { useRouter } from 'next/router'
import { Layout } from 'antd'
import type { NextPage } from 'next'
import { useEffect } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { useInterval } from 'usehooks-ts'
import { MDHeader } from '../components/MDHeader/MDHeader'
import { MDContent } from '../components/MDContent/MDContent'
import { gameSelector } from '../atoms/games.atom'
import { getBoards, getGamesState, getManager } from '../services/manager-api'
import { managerState } from '../atoms/managerState'
import { MDMenu } from '../components/MDMenu/MDMenu'
import { managerBoardsState } from '../atoms/boards.atom'
import { pauseUpdatesState } from '../atoms/pauseUpdates.atom'

const Home: NextPage = () => {
  const router = useRouter()
  const [manager, setManager] = useRecoilState(managerState)
  const pauseUpdates = useRecoilValue(pauseUpdatesState)
  const setGame = useSetRecoilState(gameSelector)
  const setManagerBoards = useSetRecoilState(managerBoardsState)

  const setBoards = async () => {
    const boards = await getBoards()
    setManagerBoards(boards)
  }

  const fetchCurrentManager = async () => {
    const currentManager = await getManager()

    if (!currentManager) {
      router.push('/login')
      return
    }
    setManager(currentManager)
  }

  useEffect(() => {
    fetchCurrentManager()
  }, [])

  useEffect(() => {
    if (manager) {
      setBoards()
    }
  }, [manager])

  useInterval(async () => {
    if (!manager || pauseUpdates) {
      return
    }
    const gamesState = await getGamesState()
    gamesState.forEach((game) => {
      setGame(game)
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
