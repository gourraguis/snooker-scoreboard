import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { boardsState } from '../atoms/board'
import TableCard from '../components/TableCard'
import { initSocket } from '../services/socket'

const Home: NextPage = () => {
  const setBoardData = useSetRecoilState(boardsState)

  useEffect(() => {
    initSocket(setBoardData)
  }, [])

  return (
    <div>
      <Head>
        <title>Manager</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col mx-auto h-screen bg-background-color overflow-y-scroll">
        <div className="flex items-center justify-center">
          <div className="flex justify-center items-center border-primary-w my-8">
            <h3 className="text-3xl font-bold text-primary-w">Manager Space</h3>
          </div>
        </div>
        <main className="flex justify-center">
          <TableCard />
        </main>
      </div>
    </div>
  )
}

export default Home
