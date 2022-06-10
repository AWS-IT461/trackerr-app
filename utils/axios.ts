import axiosInstance from 'axios'
import { useAuth } from './auth'

const axios = axiosInstance.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_HOST}`,
})

axios.interceptors.request.use((config) => {
  try {
    // const token = localStorage.getItem('token')

    const token = useAuth.getState().token
    if (config && config.headers && token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  } catch (error) {
    return config
  }
})

export default axios
