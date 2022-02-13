import axios from 'axios'
import { NextRouter } from 'next/router'
import { SetterOrUpdater } from 'recoil'
import { IBoard } from '../types/board'
import { ILogin } from '../types/login'
import { openNotification } from './notification'

const url = 'http://localhost:5000'

export const loginManager = async (loginData: ILogin, setAuth: SetterOrUpdater<boolean>, router: NextRouter) => {
  await axios
    .get(`${url}/manager/${loginData.phoneNumber}`)
    .then((res) => {
      localStorage.setItem('token', res.data.id)
      openNotification({ title: `Hello ${res.data.name}` })
      setAuth(true)
      router.push('/')
    })
    .catch((err) => {
      console.log(err)
    })
}

export const checkManagerAuth = async (setIsAuth: SetterOrUpdater<boolean>, router: NextRouter) => {
  const token = localStorage.getItem('token')
  try {
    const res = await axios.get(`${url}/manager/${token}`)
    if (res) setIsAuth(true)
  } catch (err) {
    console.log(err)
    setIsAuth(false)
    router.push('/login')
  }
}

export const getBoards = async (setBoards: SetterOrUpdater<IBoard[]>) => {
  const token = localStorage.getItem('token')
  let ownerId = ''
  await axios
    .get(`${url}/manager/${token}`)
    .then((res) => {
      ownerId = res.data.owner
    })
    .catch((err) => {
      console.log(err)
    })
  await axios
    .get(`${url}/board/byOwner/${ownerId}`)
    .then((res) => {
      setBoards(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
}
