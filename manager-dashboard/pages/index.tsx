import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { emitMessage } from '../services/socket'

const Home: NextPage = () => {
  useEffect(() => {
    setInterval(() => {
      const randomNumber = Math.floor(Math.random() * 1000)
      console.log(`sending random number ${randomNumber}`)

      emitMessage(randomNumber.toFixed())
    }, 2000)
  }, [])

  return (
    <div>
      <Head>
        <title>Manager</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-3xl font-bold text-primary-w">Hello world!</h1>
    </div>
  )
}

export default Home
