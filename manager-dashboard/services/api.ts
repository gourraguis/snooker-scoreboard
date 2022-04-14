import axios from 'axios'
import moment from 'moment'
import { SetterOrUpdater } from 'recoil'
import { IGame } from '../types/game'
import { IManager } from '../types/manager'
import { IStats } from '../types/stats'
import { getApiEndpoint } from './config'
import { openNotification } from './notification'

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

// API Endpoints
export const getManager = async (): Promise<IManager | null> => {
  try {
    const { data: manager } = await get(`${getApiEndpoint()}manager`)
    return manager
  } catch {
    return null
  }
}

export const getBoards = async () => {
  try {
    const { data } = await get('owner/boards')
    return data
  } catch (err) {
    openNotification({ title: 'Failed to fetch boards', type: 'error' })
    throw err
  }
}

export const getManagerStats = async (): Promise<IStats[]> => {
  try {
    const { data } = await post('game/stats')
    return data
  } catch (err) {
    openNotification({ title: 'Failed to fetch stats', type: 'error' })
    throw err
  }
}

export const generateOtpManager = async (id: string): Promise<boolean> => {
  try {
    await put(`manager/otp?id=${id}`)

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

export const loginManager = async (id: string, otp: string): Promise<string | null> => {
  try {
    const { data: jwtToken } = await get(`${getApiEndpoint()}auth/manager?id=${id}&otp=${otp}`)
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

export const saveGame = async (game: IGame): Promise<void> => {
  const { players: p } = game
  if (p[0].score === 0 && p[1].score === 0) {
    return
  }

  const winner = p[0].score! >= p[1].score! ? p[0].name : p[1].name
  const loser = p[0].score! < p[1].score! ? p[0].name : p[1].name
  try {
    await post('game', {
      boardId: game.boardId,
      winner,
      loser,
      startedAt: game.startedAt,
      finishedAt: moment(),
    })
    openNotification({
      title: `${winner} a gagné contre ${loser}`,
    })
  } catch (err) {
    openNotification({ title: 'Failed to save game', type: 'error' })
    throw err
  }
}
