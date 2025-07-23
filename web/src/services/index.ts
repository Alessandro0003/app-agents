import { config } from '@/config'
import axios from 'axios'

export const api = axios.create({
  baseURL: config.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
})