/* eslint-disable no-plusplus */
import axios from 'axios'
import { SetterOrUpdater } from 'recoil'
import { ICardElements } from '../types/cardElement'
import { ILogin } from '../types/login'
import { IManager } from '../types/manager'
import { ITable } from '../types/table'
import { openNotification } from './notification'

const url = 'http://localhost:5000'

export const createManager = async (manager: IManager) => {
  try {
    const res = await axios.post(`${url}/manager`, manager)
    console.log(res.data)
    openNotification({ title: 'Manager a été ajouté' })
  } catch (err) {
    console.log(err)
    openNotification({ title: 'Manager na pas pu etre ajouté', type: 'error' })
  }
}

export const getManagers = async (setManagersElements: SetterOrUpdater<ICardElements[]>) => {
  const token = localStorage.getItem('token')
  let elements: ICardElements[] = []
  await axios
    .get(`${url}/manager/byOwner/${token}`)
    .then((res) => {
      for (let index = 0; index < res.data.length; index++) {
        const newElem = {
          name: res.data[index].name,
          dailyScore: 10,
          weeklyScore: 70,
        }
        elements = [...elements, newElem]
      }
      setManagersElements(elements)
    })
    .catch((err) => {
      console.log(err)
    })
}

export const createTable = async (table: ITable) => {
  await axios
    .post(`${url}/board`, table)
    .then((res) => {
      console.log(res)
      openNotification({ title: 'Nouvelle table a été créé' })
    })
    .catch((err) => {
      console.log(err)
    })
}

export const getTables = async (setTablesElements: SetterOrUpdater<ICardElements[]>) => {
  const token = localStorage.getItem('token')
  let elements: ICardElements[] = []
  await axios
    .get(`${url}/board/byOwner/${token}`)
    .then((res) => {
      for (let index = 0; index < res.data.length; index++) {
        const newElem = {
          name: res.data[index].name,
          dailyScore: 10,
          weeklyScore: 70,
        }
        elements = [...elements, newElem]
      }
      setTablesElements(elements)
    })
    .catch((err) => {
      console.log(err)
    })
}

export const loginOwner = async (loginData: ILogin, setAuth: SetterOrUpdater<boolean>) => {
  await axios
    .get(`${url}/owner/${loginData.phoneNumber}`)
    .then((res) => {
      localStorage.setItem('token', res.data.phoneNumber)
      openNotification({ title: `Hello ${res.data.name}` })
      setAuth(true)
    })
    .catch((err) => {
      console.log(err)
    })
}

export const checkOwnerAuth = async (setIsAuth: SetterOrUpdater<boolean>) => {
  const token = localStorage.getItem('token')
  await axios
    .get(`${url}/owner/${token}`)
    .then(() => {
      setIsAuth(true)
    })
    .catch(() => {
      setIsAuth(false)
    })
}
