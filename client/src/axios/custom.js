import axios from 'axios'

const authFetch = axios.create({
  // baseURL: 'https://justfidel-ecomm-api.vercel.app',
  baseURL: 'https://gloss-api.vercel.app',
  headers: {
    Accept: 'application/json',
  },
})

export default authFetch
