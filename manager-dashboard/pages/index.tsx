import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { boardState } from '../atoms/boardState'
import CardHeader from '../components/CardHeader'
import Heading from '../components/Heading'
import TableCard from '../components/TableCard'
import { emitMessage } from '../services/socket'
import board from '../services/socket/board'

const Home: NextPage = () => {
  const initialBoard = useRecoilValue(boardState)
  // useEffect(() => {
  //   setInterval(() => {
  //     const randomNumber = Math.floor(Math.random() * 1000)
  //     console.log(`sending random number ${randomNumber}`)

  //     emitMessage(randomNumber.toFixed())
  //   }, 2000)
  // }, [])

  useEffect(() => {
    const data = board.getBoard()
    console.log(initialBoard)
  }, [])

  const handleStart = () => {
    board.startGame()
  }
  return (
    <div>
      <Head>
        <title>Manager</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col mx-auto h-screen bg-background-color overflow-y-scroll">
        <div className="flex items-center justify-center">
          <Heading title={'Manager Space'} />
        </div>
        <main className="flex justify-center">
          <TableCard />
        </main>
        {/*  */}
        {/*  */}
      </div>
      {/* <button
        onClick={handleStart}
        className="px-4 py-2 rounded-lg bg-primary-b text-primary-w hover:bg-gray-500 mx-4 my-8"
      >
        Start Game
      </button>
      <h1 className="text-3xl font-bold text-primary-w">Hello world!</h1> */}
    </div>
  )
}

export default Home
