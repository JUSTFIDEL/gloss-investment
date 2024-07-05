import axios from 'axios'

const authFetch = axios.create({
  // baseURL: 'https://justfidel-ecomm-api.vercel.app',
  baseURL: 'http://localhost:8000',
  headers: {
    Accept: 'application/json',
  },
})

export default authFetch
