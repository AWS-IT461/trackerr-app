import axiosInstance from 'axios'

const axios = axiosInstance.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_HOST}`,
})

export default axios
