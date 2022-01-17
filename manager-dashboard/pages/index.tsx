import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { boardState } from '../atoms/boardState'
import Heading from '../components/Heading'
import TableCard from '../components/TableCard'
import { initSocket } from '../services/socket'

const Home: NextPage = () => {
  const [boardData, setBoardData] = useRecoilState(boardState)

  useEffect(() => {
    initSocket(setBoardData)
  }, [setBoardData])

  return (
    <div>
      <Head>
        <title>Manager</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col mx-auto h-screen bg-background-color overflow-y-scroll">
        <div className="flex items-center justify-center">
          <Heading title="Manager Space" />
        </div>
        <main className="flex justify-center">
          <TableCard />
        </main>
      </div>
    </div>
  )
}

export default Home
