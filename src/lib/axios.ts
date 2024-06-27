import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_MARVEL_API_URL,
  params: {
    apikey: import.meta.env.VITE_MARVEL_API_KEY,
  },
})

api.interceptors.request.use((config) => {
  if (import.meta.env.DEV) {
    config.params = {
      ...config.params,
      ts: '1',
      hash: import.meta.env.VITE_MARVEL_HASH,
    }
  }

  return config
})

export default api
