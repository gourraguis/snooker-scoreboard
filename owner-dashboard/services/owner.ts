import axios from 'axios'
import { IManager } from '../types/manager'
import { ITable } from '../types/table'
import { openNotification } from './notification'

const url = 'http://localhost:5000'

export const createManager = async (manager: IManager) => {
  await axios
    .post(`${url}/manager/addManager`, manager)
    .then((res) => {
      console.log(res)
      openNotification({ title: 'Manager a bien été ajouté' })
    })
    .catch((err) => {
      console.log(err)
      return err
    })
}

export const createTable = async (table: ITable) => {
  await axios
    .post(`${url}/table/addTable`, table)
    .then((res) => {
      console.log(res)
      openNotification({ title: 'Nouvelle table a été créé' })
    })
    .catch((err) => {
      console.log(err)
    })
}
