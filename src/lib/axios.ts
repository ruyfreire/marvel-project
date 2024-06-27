import axios from 'axios'

const api = axios.create({
  baseURL: 'http://gateway.marvel.com',
})

api.interceptors.request.use((config) => {
  if (import.meta.env.DEV) {
    config.params = {
      ...config.params,
      ts: '1',
      apikey: import.meta.env.VITE_MARVEL_API_KEY,
      hash: import.meta.env.VITE_MARVEL_HASH,
    }
  }

  return config
})

export default api
