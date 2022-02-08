import axios from 'axios'
import { SetterOrUpdater } from 'recoil'
import { ILogin } from '../types/login'
import { openNotification } from './notification'

const url = 'http://localhost:5000'

export const loginManager = async (loginData: ILogin, setAuth: SetterOrUpdater<boolean>) => {
  await axios
    .get(`${url}/manager/${loginData.phoneNumber}`)
    .then((res) => {
      localStorage.setItem('token', res.data.id)
      openNotification({ title: `Hello ${res.data.name}` })
      setAuth(true)
    })
    .catch((err) => {
      console.log(err)
    })
}

export const checkManagerAuth = async (setIsAuth: SetterOrUpdater<boolean>) => {
  const token = localStorage.getItem('token')
  await axios
    .get(`${url}/manager/${token}`)
    .then(() => {
      setIsAuth(true)
    })
    .catch(() => {
      setIsAuth(false)
    })
}
