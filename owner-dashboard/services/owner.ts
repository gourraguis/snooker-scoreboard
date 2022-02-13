/* eslint-disable no-plusplus */
import axios from 'axios'
import { NextRouter } from 'next/router'
import { SetterOrUpdater } from 'recoil'
import { ICardElements } from '../types/cardElement'
import { ILogin } from '../types/login'
import { IManager } from '../types/manager'
import { ITable } from '../types/table'
import { openNotification } from './notification'

const url = 'http://localhost:5000'

export const createManager = async (
  manager: IManager,
  managersElements: ICardElements[],
  setManagersElements: SetterOrUpdater<ICardElements[]>
) => {
  try {
    const res = await axios.post(`${url}/manager`, manager)
    const newElem: ICardElements = {
      id: res.data.id,
      name: res.data.name,
      dailyScore: 10,
      weeklyScore: 70,
    }
    setManagersElements([...managersElements, newElem])
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
          id: res.data[index].id,
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

export const createTable = async (
  table: ITable,
  tablesElements: ICardElements[],
  setTablesElements: SetterOrUpdater<ICardElements[]>
) => {
  try {
    const res = await axios.post(`${url}/board`, table)
    const newElem: ICardElements = {
      id: res.data.id,
      name: res.data.name,
      dailyScore: 10,
      weeklyScore: 70,
    }
    setTablesElements([...tablesElements, newElem])
    openNotification({ title: 'Nouvelle table a été créé' })
  } catch (err) {
    console.log(err)
    openNotification({ title: 'Table na pas pu etre ajouté', type: 'error' })
  }
}

export const getTables = async (setTablesElements: SetterOrUpdater<ICardElements[]>) => {
  const token = localStorage.getItem('token')
  let elements: ICardElements[] = []
  await axios
    .get(`${url}/board/byOwner/${token}`)
    .then((res) => {
      for (let index = 0; index < res.data.length; index++) {
        const newElem = {
          id: res.data[index].id,
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

export const loginOwner = async (loginData: ILogin, setOtpVerif: SetterOrUpdater<boolean>) => {
  await axios
    .get(`${url}/owner/login/${loginData.phoneNumber}`)
    .then(() => {
      setOtpVerif(true)
    })
    .catch((err) => {
      console.log(err)
    })
}

export const checkOtp = async (
  otp: string,
  setAuth: SetterOrUpdater<boolean>,
  setOtpVerif: SetterOrUpdater<boolean>,
  router: NextRouter
) => {
  await axios
    .get(`${url}/owner/loginOtp/${otp}`)
    .then((res) => {
      localStorage.setItem('token', res.data.phoneNumber)
      localStorage.setItem('accToken', res.data.accToken)
      setAuth(true)
      router.push('/')
      setOtpVerif(false)
      openNotification({ title: `Hello ${res.data.name}` })
    })
    .catch((err) => {
      console.log(err)
    })
}

export const checkOwnerAuth = async (setIsAuth: SetterOrUpdater<boolean>, router: NextRouter) => {
  const token = localStorage.getItem('accToken')
  try {
    const res = await axios.get(`${url}/owner/auth/checkAuth`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (res) setIsAuth(true)
  } catch (err) {
    console.log(err)
    setIsAuth(false)
    router.push('/login')
  }
}

export const deleteManager = async (
  managersElements: ICardElements[],
  id: string,
  setManagersElements: SetterOrUpdater<ICardElements[]>
) => {
  try {
    const res = await axios.delete(`${url}/manager/${id}`)
    if (res) {
      const newManagersElements = managersElements.filter((element) => element.id !== id)
      setManagersElements(newManagersElements)
    }
  } catch (err) {
    console.log(err)
  }
}

export const deleteTable = async (
  tablesElements: ICardElements[],
  id: string,
  setTablesElements: SetterOrUpdater<ICardElements[]>
) => {
  try {
    const res = await axios.get(`${url}/board/${id}`)
    if (res) {
      const board = {
        id: res.data.id,
        name: res.data.name,
        owner: '',
      }
      try {
        const put = await axios.put(`${url}/board`, board)
        if (put) {
          const newTablesElements = tablesElements.filter((element) => element.id !== id)
          setTablesElements(newTablesElements)
        }
      } catch (err) {
        console.log(err)
      }
    }
  } catch (err) {
    console.log(err)
  }
}
