import axios from 'axios'
import moment from 'moment'
import { NextRouter } from 'next/router'
import { SetterOrUpdater } from 'recoil'
import { IBoard } from '../types/board'
import { IGame } from '../types/game'
import { ILogin } from '../types/login'
import { getApiEndpoint } from './config'
import { openNotification } from './notification'

export const loginManager = async (loginData: ILogin, setAuth: SetterOrUpdater<boolean>, router: NextRouter) => {
  await axios
    .get(`${getApiEndpoint()}manager/${loginData.phoneNumber}`)
    .then((res) => {
      localStorage.setItem('token', res.data.id)
      openNotification({ title: `Hello ${res.data.name}` })
      setAuth(true)
      router.push('/')
    })
    .catch((err) => {
      console.log(err.response)
    })
}

export const checkManagerAuth = async (setIsAuth: SetterOrUpdater<boolean>, router: NextRouter) => {
  const token = localStorage.getItem('token')
  try {
    const res = await axios.get(`${getApiEndpoint()}manager/${token}`)
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
    .get(`${getApiEndpoint()}manager/${token}`)
    .then((res) => {
      ownerId = res.data.owner
    })
    .catch((err) => {
      console.log(err)
    })
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
  const token = localStorage.getItem('token')

  let ownerId = ''
  await axios
    .get(`${getApiEndpoint()}manager/${token}`)
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
    managerId: token,
    ownerId,
    winner: winner!.name,
    loser: loser!.name,
    startedAt: game.startedAt,
    finishedAt: moment(),
  }
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
