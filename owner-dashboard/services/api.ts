import axios from 'axios'
import { IManager } from '../types/manager'
import { IOwner } from '../types/owner'
import { IBoard } from '../types/board'
import { openNotification } from './notification'
import { getApiEndpoint } from './config'
import { ICardElements } from '../types/cardElement'
import { IStats } from '../types/statistics'

const api = axios.create({
  baseURL: getApiEndpoint(),
})

// API Helper Functions
const get = (path: string) => {
  const jwtToken = localStorage?.getItem('jwtToken')
  if (jwtToken) {
    return api.get(path, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
      },
    })
  }
  return api.get(path)
}

const post = (path: string, body: any = {}) => {
  const jwtToken = localStorage?.getItem('jwtToken')
  if (jwtToken) {
    return api.post(path, body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
      },
    })
  }
  return api.post(path, body)
}

const put = (path: string, body: any = {}) => {
  const jwtToken = localStorage?.getItem('jwtToken')
  if (jwtToken) {
    return api.put(path, body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
      },
    })
  }
  return api.put(path, body)
}

const remove = (path: string) => {
  const jwtToken = localStorage?.getItem('jwtToken')
  if (jwtToken) {
    return api.delete(path, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
      },
    })
  }
  return api.delete(path)
}

// API Endpoints
export const getOwner = async (): Promise<IOwner | null> => {
  try {
    const { data: owner } = await get('owner')
    return owner
  } catch (error) {
    return null
  }
}

export const getWeeklyGames = async (): Promise<number> => {
  try {
    const { data: weeklyGames } = await get('game/weeklyGames')
    return weeklyGames
  } catch (error) {
    openNotification({ title: 'Failed to fetch weekly games', type: 'error' })
    throw error
  }
}

export const getDailyGames = async (): Promise<number> => {
  try {
    const { data: dailyGames } = await get('game/dailyGames')
    return dailyGames
  } catch (error) {
    openNotification({ title: 'Failed to fetch weekly games', type: 'error' })
    throw error
  }
}

export const getManagers = async (): Promise<ICardElements[]> => {
  try {
    const { data } = await get('owner/managers')
    return data
  } catch (error) {
    openNotification({ title: 'Failed to fetch managers', type: 'error' })
    throw error
  }
}

export const getBoards = async (): Promise<ICardElements[]> => {
  try {
    const { data } = await get('owner/boards')
    return data
  } catch (err) {
    openNotification({ title: 'Failed to fetch boards', type: 'error' })
    throw err
  }
}

export const getStatsByFilter = async (filter: any): Promise<IStats[]> => {
  try {
    const { data } = await post('owner/statistics', filter)
    return data
  } catch (error) {
    openNotification({ title: 'Failed to fetch stats', type: 'error' })
    throw error
  }
}

export const generateOwnerOtp = async (id: string): Promise<boolean> => {
  try {
    await put(`owner/otp?id=${id}`)

    openNotification({
      title: `Veuillez entrer votre code d'authentification`,
      description: `Vous devez recevoir un code d'authentification par sms sur votre téléphone pour vous connecter`,
    })
    return true
  } catch (error) {
    console.error(error)
    openNotification({
      title: 'Erreur du système, veuillez ressayer plus tard.',
      type: 'error',
    })
    return false
  }
}

export const loginOwner = async (id: string, otp: string): Promise<string | null> => {
  try {
    const { data: jwtToken } = await get(`auth/owner?id=${id}&otp=${otp}`)
    openNotification({
      title: `Bienvenue sur Jawad Club`,
    })
    return jwtToken
  } catch (error) {
    console.error(error)
    openNotification({ title: `Votre code OTP est invalide`, type: 'error' })
    return null
  }
}

export const createManager = async (manager: IManager): Promise<void> => {
  try {
    await post('manager', manager)
    openNotification({ title: 'Le manager a été ajouté' })
  } catch (error) {
    openNotification({ title: 'Le manager na pas pu etre ajouté', type: 'error' })
    throw error
  }
}

export const createBoard = async (board: IBoard): Promise<void> => {
  try {
    await post('board', board)
    openNotification({ title: 'La nouvelle table a été créé' })
  } catch (error) {
    openNotification({ title: `La table n'a pas pu etre ajouté`, type: 'error' })
    throw error
  }
}

export const deleteManager = async (id: string): Promise<void> => {
  try {
    await remove(`manager/${id}`)
  } catch (error) {
    openNotification({ title: `Le manager n'a pas pu etre supprimé`, type: 'error' })
    throw error
  }
}

export const deleteBoard = async (id: string): Promise<void> => {
  try {
    await remove(`board/${id}`)
  } catch (error) {
    openNotification({ title: 'La table na pas pu etre supprimé', type: 'error' })
    throw error
  }
}
