import axios from 'axios'
import { NextRouter } from 'next/router'
import { SetterOrUpdater } from 'recoil'
import { ILogin } from '../types/login'
import { openNotification } from './notification'

const url = 'http://localhost:5000'

export const loginScoreBoard = async (loginData: ILogin, setAuth: SetterOrUpdater<boolean>, router: NextRouter) => {
  await axios
    .get(`${url}/board/${loginData.id}`)
    .then((res) => {
      localStorage.setItem('token', res.data.id)
      openNotification({ title: `${res.data.name} connected successfully` })
      setAuth(true)
      router.push('/')
    })
    .catch((err) => {
      console.log(err)
    })
}

export const checkScoreBoardAuth = async (setIsAuth: SetterOrUpdater<boolean>, router: NextRouter) => {
  const token = localStorage.getItem('token')

  try {
    const res = await axios.get(`${url}/board/${token}`)
    if (res) setIsAuth(true)
  } catch (err) {
    console.log(err)
    setIsAuth(false)
    router.push('/login')
  }
}
