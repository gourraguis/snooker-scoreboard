/* eslint-disable no-plusplus */
import axios from 'axios'
import { SetterOrUpdater } from 'recoil'
import { ICardElements } from '../types/cardElement'
import { IManager } from '../types/manager'
import { IOwner } from '../types/owner'
import { IBoard } from '../types/table'
import { openNotification } from './notification'

const url = 'http://localhost:5000'

const API_ENDPOINT = 'http://localhost:5000/'

export const generateOtpOwner = async (phoneNumber: string): Promise<boolean> => {
  try {
    await axios.put<void>(`${API_ENDPOINT}owner/otp?phoneNumber=${phoneNumber}`)

    openNotification({
      title: `Veuillez entrer votre code d'authentification`,
      description: `Vous devez recevoir un code d'authentification par sms sur votre téléphone pour vous connecter`,
    })
    return true
  } catch (e: any) {
    openNotification({
      title: e.response.data.message,
      type: 'error',
    })
    return false
  }
}

export const loginOwner = async (phoneNumber: string, otp: string): Promise<string | null> => {
  try {
    const { data: jwtToken } = await axios.get<string>(`${API_ENDPOINT}auth/owner`, {
      params: {
        phoneNumber,
        otp,
      },
    })

    openNotification({
      title: `Bienvenue, on va vous rediriger vers votre dashboard`,
    })
    return jwtToken
  } catch (e: any) {
    openNotification({
      title: e.response.data.message,
      type: 'error',
    })
    return null
  }
}

export const getCurrentOwner = async (): Promise<IOwner | null> => {
  try {
    const token = localStorage.getItem('jwtToken')
    const { data: owner } = await axios.get<IOwner>(`${API_ENDPOINT}owner`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return owner
  } catch {
    return null
  }
}

// export const checkOwnerAuth = async (setIsAuth: SetterOrUpdater<boolean>, router: NextRouter) => {
//   const token = localStorage.getItem('jwtToken')
//   const phoneNumber = localStorage.getItem('phoneNumber')
//   try {
//     const res = await axios.get(`${url}/owner/${phoneNumber}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//     if (res) setIsAuth(true)
//   } catch (err) {
//     console.log(err)
//     setIsAuth(false)
//     router.push('/login')
//   }
// }

export const createManager = async (
  manager: IManager,
  managersElements: ICardElements[],
  setManagersElements: SetterOrUpdater<ICardElements[]>
) => {
  const token = localStorage.getItem('jwtToken')
  try {
    const res = await axios.post(`${url}/manager`, manager, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const newElem: ICardElements = {
      id: res.data.id,
      name: res.data.name,
      dailyScore: 10,
      weeklyScore: 70,
    }
    setManagersElements([...managersElements, newElem])
    openNotification({ title: 'Manager a été ajouté' })
  } catch (err) {
    openNotification({ title: 'Manager na pas pu etre ajouté', type: 'error' })
  }
}

export const createBoard = async (
  table: IBoard,
  tablesElements: ICardElements[],
  setTablesElements: SetterOrUpdater<ICardElements[]>
) => {
  const token = localStorage.getItem('jwtToken')
  try {
    const res = await axios.post(`${url}/board`, table, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const newElem: ICardElements = {
      id: res.data.id,
      name: res.data.name,
      dailyScore: 10,
      weeklyScore: 70,
    }
    setTablesElements([...tablesElements, newElem])
    openNotification({ title: 'Nouvelle table a été créé' })
  } catch (err) {
    openNotification({ title: 'Table na pas pu etre ajouté', type: 'error' })
  }
}

export const getManagers = async (setManagersElements: SetterOrUpdater<ICardElements[]>) => {
  let elements: ICardElements[] = []
  const token = localStorage.getItem('jwtToken')
  await axios
    .get(`${url}/manager/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
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
      openNotification({ title: `${err.response.data.message}`, type: 'error' })
    })
}

export const getBoards = async (setTablesElements: SetterOrUpdater<ICardElements[]>) => {
  let elements: ICardElements[] = []
  const token = localStorage.getItem('jwtToken')
  await axios
    .get(`${url}/board/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
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
      openNotification({ title: `${err.response.data.message}`, type: 'error' })
    })
}

export const deleteManager = async (
  managersElements: ICardElements[],
  id: string,
  setManagersElements: SetterOrUpdater<ICardElements[]>
) => {
  const token = localStorage.getItem('jwtToken')
  try {
    const res = await axios.delete(`${url}/manager/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
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
  const token = localStorage.getItem('jwtToken')
  try {
    const res = await axios.get(`${url}/board/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (res) {
      const board = {
        id: res.data.id,
        name: res.data.name,
        owner: '',
      }
      try {
        const put = await axios.put(`${url}/board`, board, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
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
