import Axios from 'axios';
import Cookies from 'js-cookie';

export const url = 'http://localhost:5000';

const token = Cookies.get('token');

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  authorization: '',
};

if (token) {
  headers['authorization'] = `Bearer ${token}`;
}

const api = Axios.create({
  baseURL: url,
  headers: headers,
});

export default api;
