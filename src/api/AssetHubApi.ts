import axios from 'axios'

export const assetHubApi = axios.create({
  timeout: 100000,
  headers: {
    'ngrok-skip-browser-warning': true,
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_ASSETHUB_ACCESS_TOKEN}`,
  },
})
