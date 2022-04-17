import { IOwner } from '../owner/types/IOwner'

export interface IManager {
  id: phoneNumber
  name: string
  clubName?: string
  address?: string
  balance?: number
  owner?: IOwner
}
