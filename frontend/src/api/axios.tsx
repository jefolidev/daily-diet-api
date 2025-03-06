import axios from 'axios'

const url = 'http://localhost:3333/'

export const api = axios.create({
  baseURL: url
})