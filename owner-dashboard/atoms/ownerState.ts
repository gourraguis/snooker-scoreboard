import { atom } from 'recoil'
import { IOwner } from '../types/owner'

export const ownerState = atom<IOwner | null>({
  key: 'ownerState',
  default: null,
})
