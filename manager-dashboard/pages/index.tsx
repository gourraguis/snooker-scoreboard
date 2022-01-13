import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import Heading from '../components/Heading'
import TableCard from '../components/TableCard'
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
      </div>
    </div>
  )
}

export default Home
