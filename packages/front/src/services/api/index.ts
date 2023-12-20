import axios from 'axios';
import { Zodios } from '@zodios/core';
import { apiDef } from '@briefly/apidef'

const envVars = import.meta.env;
const API_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const userToken = localStorage.getItem('userToken');
  if(userToken) config.headers.Authorization = `Bearer ${JSON.parse(userToken)}`;

  return config;
});

const apiClient = new Zodios(apiDef, { axiosInstance: api });
export default apiClient;
