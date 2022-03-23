import axios from 'axios'
import moment from 'moment'
import { SetterOrUpdater } from 'recoil'
import { IBoard } from '../types/board'
import { ICardElements } from '../types/cardElement'
import { IGame } from '../types/game'
import { IManager } from '../types/manager'
import { getApiEndpoint } from './config'
import { openNotification } from './notification'

export const generateOtpManager = async (phoneNumber: string): Promise<boolean> => {
  try {
    await axios.put<void>(`${getApiEndpoint()}manager/otp?phoneNumber=${phoneNumber}`)

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

export const loginManager = async (phoneNumber: string, otp: string): Promise<string | null> => {
  try {
    const { data: jwtToken } = await axios.get<string>(`${getApiEndpoint()}auth/manager`, {
      params: {
        phoneNumber,
        otp,
      },
    })
    localStorage.setItem('token', phoneNumber)

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

export const getCurrentManager = async (): Promise<IManager | null> => {
  try {
    const token = localStorage.getItem('jwtToken')
    const { data: manager } = await axios.get<IManager>(`${getApiEndpoint()}manager`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return manager
  } catch {
    return null
  }
}

export const getBoards = async (setBoards: SetterOrUpdater<IBoard[]>) => {
  let ownerId = ''
  const token = localStorage.getItem('jwtToken')
  const { data: manager } = await axios.get<IManager>(`${getApiEndpoint()}manager`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  ownerId = manager.owner || ''
  await axios
    .get(`${getApiEndpoint()}board/all/${ownerId}`)
    .then((res) => {
      setBoards(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
}

export const saveGame = async (game: IGame) => {
  const token = localStorage.getItem('jwtToken')
  const managerId = localStorage.getItem('token')

  let ownerId = ''
  await axios
    .get(`${getApiEndpoint()}manager`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      ownerId = res.data.owner
    })
    .catch((err) => {
      console.log(err)
    })
  const winnerScore = Math.max(game.players[0].score!, game.players[1].score!)
  const winner = game.players.find((elem) => elem.score === winnerScore)
  const loser = game.players.find((elem) => elem.name !== winner!.name)

  const dbGame = {
    boardId: game.boardId,
    managerId,
    ownerId,
    winner: winner!.name,
    loser: loser!.name,
    startedAt: game.startedAt,
    finishedAt: moment(),
  }

  if (winnerScore !== 0) {
    console.log(dbGame)

    await axios
      .post(`${getApiEndpoint()}game`, dbGame)
      .then((res) => {
        openNotification({
          title: 'Fin de la partie',
        })
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export const getGamesStats = async (setStats: SetterOrUpdater<ICardElements[]>) => {
  const token = localStorage.getItem('jwtToken')
  try {
    const res = await axios.get(`${getApiEndpoint()}game/managerDailyGames`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setStats(res.data)
  } catch (err) {
    console.log(err)
  }
}
