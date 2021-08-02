// For storing the logged in user's credentails across page refreshes
import AsyncStorage from '@react-native-async-storage/async-storage';
import decodeJWT from 'jwt-decode'
const key = 'user'

const storeData = async (value) => {
  try {
    await AsyncStorage.setItem(key, `${value}`)
  } catch (e) {
    // saving error
  }
}
const removeToken = async ()=>{
  try {
    await AsyncStorage.removeItem(key)
  } catch (error) {
    
  }
}


const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem(key)
    if(value !== null) {
      // value previously stored
      return value;
    }
  } catch(e) {
    // error reading value
  }
}


export async function rememberToken(token) {
  if (token ) {
   await storeData(token)
  }
  else {
    // Clear token from local storage
    await removeToken()
  }
}

export async function getValidToken() {
  const token =await getToken() 
  try {
    const decodedToken = decodeJWT(token)
    // console.log(decodedToken)
    // valid token
    const now = Date.now() / 1000
    // check if token has expired
    if (now > decodedToken.exp) {
      return null
    }
    return token
  }
  catch (error) {
    // invalid token
    return null
  }
}

export function getDecodedToken() {
  const validToken = getValidToken()
  if (validToken) {
    return decodeJWT(validToken)
  }
  else {
    return null
  }
}