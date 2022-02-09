import axios from 'axios'
import { SetterOrUpdater } from 'recoil'
import { ILogin } from '../types/login'
import { openNotification } from './notification'

const url = 'http://localhost:5000'

export const loginScoreBoard = async (loginData: ILogin, setAuth: SetterOrUpdater<boolean>) => {
  await axios
    .get(`${url}/board/${loginData.id}`)
    .then((res) => {
      localStorage.setItem('token', res.data.id)
      openNotification({ title: `${res.data.name} connected successfully` })
      setAuth(true)
    })
    .catch((err) => {
      console.log(err)
    })
}

export const checkScoreBoardAuth = async (setIsAuth: SetterOrUpdater<boolean>) => {
  const token = localStorage.getItem('token')
  await axios
    .get(`${url}/board/${token}`)
    .then(() => {
      setIsAuth(true)
    })
    .catch(() => {
      setIsAuth(false)
    })
}
