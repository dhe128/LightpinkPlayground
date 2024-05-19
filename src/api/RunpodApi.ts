import axios from 'axios'

export const runpodApi = axios.create({
  baseURL: 'https://api.runpod.ai/v2',
  timeout: 100000,
  headers: {
    'ngrok-skip-browser-warning': true,
    Authorization: `Bearer ${process.env.RUNPOD_API_KEY}`,
  },
})

export const runpodApi2 = axios.create({
  baseURL: 'https://api.runpod.ai/v2',
  timeout: 100000,
  headers: {
    'ngrok-skip-browser-warning': true,
    Authorization: `Bearer ${process.env.RUNPOD_API_KEY2}`,
  },
})

export type RunpodRunResponse = {
  id: string
  status: 'IN_QUEUE'
}

export type RunpodRunsyncResponse<Result = unknown> = {
  delayTime: number
  executionTime: number
  id: string
  output: Result
  status: 'COMPLETED'
}
