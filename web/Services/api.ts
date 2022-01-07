import Axios from 'axios';

export const url = 'http://localhost:5000';

const token = localStorage.getItem('token');

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
