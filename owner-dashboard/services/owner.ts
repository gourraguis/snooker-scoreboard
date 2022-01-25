import axios from 'axios'

interface data {
  name: string
}

const url = 'http://localhost:5000'

export const sendReq = async (data: data) => {
  await axios
    .post(`${url}/owner`, data)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
}
