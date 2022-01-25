import axios from 'axios'

const url = 'http://localhost:5000'

export const sendReq = async (data: string) => {
  console.log('xx')

  await axios
    .post(`${url}/owner`, data)
    .then((res) => {
      console.log(res)
      return res
    })
    .catch((err) => {
      console.log(err)
      return err
    })
}
