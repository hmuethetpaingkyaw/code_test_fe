import { sendData ,getData} from './apiService'
import { NotificationManager } from 'react-notifications'
import { storeCache } from 'utli/cache'
import { removeCache } from 'utli/cache'

export async function login(values) {
  try {
    let response = await sendData('users/login', values)
    storeCache('user', JSON.stringify(response.user))
    storeCache('access_token', response.access_token)
    return response
  } catch (e) {
    
    NotificationManager.error('Login Failed')
    return false
  }
}

export function logout() {
  removeCache('user')
  removeCache('access_token')
}

export async function getPermssion() {
  try {
    let response = await getData('user-roles/get-role')
    return response;
  } catch (e) {
    NotificationManager.error('Opps. Something wrong')
    return false
  }
}
