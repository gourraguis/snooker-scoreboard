import axios from 'axios'
import { ILogin } from '../types/login'
import { IManager } from '../types/manager'
import { ITable } from '../types/table'
import { openNotification } from './notification'

const url = 'http://localhost:5000'

export const createManager = async (manager: IManager) => {
  await axios
    .post(`${url}/manager`, manager)
    .then((res) => {
      console.log(res)
      openNotification({ title: 'Manager a été ajouté' })
    })
    .catch((err) => {
      console.log(err)
      return err
    })
}

export const createTable = async (table: ITable) => {
  await axios
    .post(`${url}/board`, table)
    .then((res) => {
      console.log(res)
      openNotification({ title: 'Nouvelle table a été créé' })
    })
    .catch((err) => {
      console.log(err)
    })
}

export const loginOwner = async (loginData: ILogin) => {
  await axios
    .get(`${url}/owner/${loginData.phoneNumber}`)
    .then((res) => {
      console.log(res)
      openNotification({ title: `Hello ${res.data.name}` })
    })
    .catch((err) => {
      console.log(err)
    })
}
