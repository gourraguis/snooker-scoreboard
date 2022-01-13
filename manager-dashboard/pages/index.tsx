import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { emitMessage } from '../services/socket'
import board from '../services/socket/board'

const Home: NextPage = () => {
  // useEffect(() => {
  //   setInterval(() => {
  //     const randomNumber = Math.floor(Math.random() * 1000)
  //     console.log(`sending random number ${randomNumber}`)

  //     emitMessage(randomNumber.toFixed())
  //   }, 2000)
  // }, [])

  useEffect(() => {
    board.getBoard()
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
      <button
        onClick={handleStart}
        className="px-4 py-2 rounded-lg bg-primary-b text-primary-w hover:bg-gray-500 mx-4 my-8"
      >
        Start Game
      </button>
      <h1 className="text-3xl font-bold text-primary-w">Hello world!</h1>
    </div>
  )
}

export default Home
