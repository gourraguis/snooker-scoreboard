import { atom } from 'recoil'

export const playersNamesState = atom<string[]>({
  key: 'playersNamesState',
  default: ['Joueur 1', 'Joueur 2'],
})
