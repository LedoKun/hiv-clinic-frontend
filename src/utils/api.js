import axios from 'axios'

let timeout = 8000
let baseURL = '/api'

export default axios.create({
  baseURL: baseURL,
  timeout: timeout,
  headers: {
    Authorization: 'Bearer ' + sessionStorage.getItem('jwt-token')
  }
})

export { baseURL, timeout }
