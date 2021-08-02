import axios from 'axios'
import { rememberToken, getValidToken } from './token'
import host from './host'


// Create an axios instance
const useAxios = axios.create({
    baseURL:host
  })


  export function setToken(token) {
    // saves token to local storage
    rememberToken(token)
    if (token) {
      // console.log('setting token', token)
      // Setting the Authorisation header for all future GET requests
      useAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      useAxios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
      useAxios.defaults.xsrfCookieName = "csrftoken";
    } else {
      delete useAxios.defaults.headers.common['Authorization']
    }
  }
  
  // Validates token, and removes it if it's invalid
  setToken(getValidToken())


  export default useAxios