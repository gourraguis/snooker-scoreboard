import { atom } from 'recoil'

export const pauseUpdatesState = atom<boolean>({
  key: 'pauseUpdatesState',
  default: false,
})
