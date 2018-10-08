import axios from 'axios'

let jwtToken = sessionStorage.getItem('jwt-token')
let timeout = 5000
let baseURL = '/api'
let headers = 'Bearer ' + jwtToken

export default axios.create({
  baseURL: baseURL,
  timeout: timeout,
  headers: {
    Authorization: 'Bearer ' + jwtToken
  }
})

export { baseURL, headers, timeout, jwtToken }
