import axios from 'axios'
import { IGame } from '../types/game'
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
export const saveGameState = async (game: IGame): Promise<void> => {
  try {
    await post('game/state', game)
  } catch (error) {
    console.error(error)
  }
}
