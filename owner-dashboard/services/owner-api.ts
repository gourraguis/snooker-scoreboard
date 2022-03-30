import axios from 'axios'
import { SetterOrUpdater } from 'recoil'
import { ICardElements } from '../types/cardElement'
import { IManager } from '../types/manager'
import { IOwner } from '../types/owner'
import { IBoard } from '../types/board'
import { openNotification } from './notification'
import { getApiEndpoint } from './config'

export const generateOtpOwner = async (phoneNumber: string): Promise<boolean> => {
  try {
    await axios.put<void>(`${getApiEndpoint()}owner/otp?phoneNumber=${phoneNumber}`)

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
    const { data: jwtToken } = await axios.get<string>(`${getApiEndpoint()}auth/owner`, {
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
    const { data: owner } = await axios.get<IOwner>(`${getApiEndpoint()}owner`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return owner
  } catch {
    return null
  }
}

export const createManager = async (
  manager: IManager,
  managersElements: ICardElements[],
  setManagersElements: SetterOrUpdater<ICardElements[]>
) => {
  const token = localStorage.getItem('jwtToken')
  try {
    const res = await axios.post(`${getApiEndpoint()}manager`, manager, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const newElem: ICardElements = {
      id: res.data.id,
      name: res.data.name,
      dailyScore: 0,
      weeklyScore: 0,
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
    const res = await axios.post(`${getApiEndpoint()}board`, table, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const newElem: ICardElements = {
      id: res.data.id,
      name: res.data.name,
      dailyScore: 0,
      weeklyScore: 0,
    }
    setTablesElements([...tablesElements, newElem])
    openNotification({ title: 'Nouvelle table a été créé' })
  } catch (err) {
    openNotification({ title: 'Table na pas pu etre ajouté', type: 'error' })
  }
}

export const deleteManager = async (
  managersElements: ICardElements[],
  id: string,
  setManagersElements: SetterOrUpdater<ICardElements[]>
) => {
  const token = localStorage.getItem('jwtToken')
  try {
    const res = await axios.delete(`${getApiEndpoint()}manager/${id}`, {
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

export const deleteBoard = async (
  tablesElements: ICardElements[],
  id: string,
  setTablesElements: SetterOrUpdater<ICardElements[]>
) => {
  const token = localStorage.getItem('jwtToken')
  try {
    const res = await axios.get(`${getApiEndpoint()}board/${id}`, {
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
        const put = await axios.put(`${getApiEndpoint()}board`, board, {
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

export const getWeeklyGames = async (): Promise<number> => {
  try {
    const token = localStorage.getItem('jwtToken')
    const { data: weeklyGames } = await axios.get<number>(`${getApiEndpoint()}game/weeklyGames`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return weeklyGames
  } catch (err) {
    return 0
  }
}

export const getDailyGames = async (): Promise<number> => {
  try {
    const token = localStorage.getItem('jwtToken')
    const { data: dailyGames } = await axios.get<number>(`${getApiEndpoint()}game/dailyGames`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return dailyGames
  } catch (err) {
    return 0
  }
}

export const getManagers = async (setManagersElements: SetterOrUpdater<ICardElements[]>) => {
  const token = localStorage.getItem('jwtToken')
  try {
    const res = await axios.get(`${getApiEndpoint()}game/managersGames`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setManagersElements(res.data)
  } catch (err) {
    console.log(err)
  }
}

export const getBoards = async (setBoardsElements: SetterOrUpdater<ICardElements[]>) => {
  const token = localStorage.getItem('jwtToken')
  try {
    const res = await axios.get(`${getApiEndpoint()}game/boardsGames`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setBoardsElements(res.data)
  } catch (err) {
    console.log(err)
  }
}

export const getStatisticsByFilter = async (filter: any, setStatistics: SetterOrUpdater<any>) => {
  const token = localStorage.getItem('jwtToken')
  try {
    const res = await axios.post(`${getApiEndpoint()}owner/statistics`, filter, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (res.data) setStatistics(res.data)
    console.log(res.data)
  } catch (err) {
    console.log(err)
  }
}
