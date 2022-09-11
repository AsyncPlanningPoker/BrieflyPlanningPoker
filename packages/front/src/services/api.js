import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/',
  headers: {
    ...({ Authorization: `Bearer ${JSON.parse(localStorage.getItem('userToken'))}` }),
  },
});

export { api };