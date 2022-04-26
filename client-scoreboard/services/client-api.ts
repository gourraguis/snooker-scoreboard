import axios from 'axios'
import { IBoard } from '../types/board'
import { IGame } from '../types/game'
import { IGameEvent } from '../types/game-event'
import { getApiEndpoint } from './config'

const api = axios.create({
  baseURL: getApiEndpoint(),
})

// API Helper Functions
const get = (path: string) => {
  return api.get(path)
}

const post = (path: string, body: any = {}) => {
  return api.post(path, body)
}

// API Endpoints
export const getBoard = async (boardId: string): Promise<IBoard | null> => {
  try {
    const { data } = await get(`board/${boardId}`)
    return data
  } catch (error) {
    console.error(error)
    return null
  }
}
export const getGameEvents = async (boardId: string): Promise<IGameEvent[]> => {
  try {
    const { data } = await get(`game/events?boardId=${boardId}`)
    return data
  } catch (error) {
    console.error(error)
    return []
  }
}

export const saveGameState = async (game: IGame): Promise<void> => {
  try {
    await post('game/state', game)
  } catch (error) {
    console.error(error)
  }
}
