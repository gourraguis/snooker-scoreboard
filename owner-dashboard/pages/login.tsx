import { useRecoilState } from 'recoil'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Layout from 'antd/lib/layout/layout'
import Head from 'next/head'
import { NextPage } from 'next'
import { ODHeader } from '../components/ODHeader/ODHeader'
import { ODLogin } from '../components/ODLogin/ODLogin'
import { ownerState } from '../atoms/ownerState'
import { getOwner } from '../services/owner-api'

const Login: NextPage = () => {
  const router = useRouter()
  const [owner, setOwner] = useRecoilState(ownerState)

  const fetchCurrentOwner = async () => {
    const currentOwner = await getOwner()

    if (currentOwner) {
      router.push('/')
      return
    }
    setOwner(currentOwner)
  }

  useEffect(() => {
    fetchCurrentOwner()
  }, [])

  if (owner) {
    return null
  }
  return (
    <>
      <Head>
        <title>Connexion d&apos;admin</title>
      </Head>
      <Layout style={{ minHeight: '100vh' }}>
        <ODHeader />
        <ODLogin />
      </Layout>
    </>
  )
}

export default Login
