import axios from 'axios'
import { IManager } from '../types/manager'

const url = 'http://localhost:5000'

export const createManager = async (manager: IManager) => {
  await axios
    .post(`${url}/owner/addManager`, manager)
    .then((res) => {
      console.log(res)
      return res
    })
    .catch((err) => {
      console.log(err)
      return err
    })
}
