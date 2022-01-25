import axios from 'axios'
import { IManager } from '../types/manager'
import { ITable } from '../types/table'

const url = 'http://localhost:5000'

export const createManager = async (manager: IManager) => {
  await axios
    .post(`${url}/manager/addManager`, manager)
    .then((res) => {
      console.log(res)
      return res
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
      return res
    })
    .catch((err) => {
      console.log(err)
      return err
    })
}
