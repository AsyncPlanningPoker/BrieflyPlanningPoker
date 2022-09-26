import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('userToken'))}`;

  if(!!config.data){
    const data = {...config.data};
    Object.entries(data).forEach((d) => data[d[0]] = typeof d[1] === 'string' ? d[1].trim() : d[1]);
    config.data = data;
  }
  return config;
});

export { api };