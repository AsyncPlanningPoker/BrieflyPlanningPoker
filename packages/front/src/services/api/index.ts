import axios from 'axios';
import { Zodios } from '@zodios/core';
import { apiDef } from '@briefly/apidef'

const envVars = import.meta.env;

const api = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use((val) => {
  console.log(val);
  return val;
})

api.interceptors.request.use((config) => {
  const userToken = localStorage.getItem('userToken');
  if(userToken) config.headers.Authorization = `Bearer ${JSON.parse(userToken)}`;

  if (config.data) {
    const data = { ...config.data };
    Object.entries(data).forEach((d) => {
      return (data[d[0]] = typeof d[1] === 'string' ? d[1].trim() : d[1]);
    });
    config.data = data;
  }
  return config;
});

const apiClient = new Zodios(apiDef, { axiosInstance: api });

export default apiClient;
