import { IOwner } from './owner'

export interface IManager {
  id: string
  name: string
  clubName?: string
  address?: string
  balance?: number
  ownerId?: string
  owner?: IOwner
}
