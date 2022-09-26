import { sendData, getData } from './apiService'
import { NotificationManager } from 'react-notifications'
import { storeCache } from 'utli/cache'
import { removeCache } from 'utli/cache'

export async function login(values) {
  try {
    let response = await sendData('admin/login', values)
    storeCache('admin', JSON.stringify(response.data.admin))
    storeCache('token', response.data.token)
    return response
  } catch (e) {
    NotificationManager.error('Login Failed')
    return false
  }
}

export async function getAll(query) {
  try {
    let response = await getData(`admin?&${new URLSearchParams(query)}`)
    return response.data
  } catch (e) {
    NotificationManager.error('Opps. Something wrong')
    return false
  }
}
export async function store(data) {
  try {
    let response = await sendData('admin/store', data)
    return response.data
  } catch (e) {
    NotificationManager.error('Opps. Something wrong')
    return false
  }
}
export async function update(id,data) {
  try {
    let response = await sendData(`admin/${id}`, data, 'PUT')
    return response.data
  } catch (e) {
    NotificationManager.error('Opps. Something wrong')
    return false
  }
}

export async function deleteData(_id) {
  try {
    await sendData(`admin/${_id}`, null, 'DELETE')
    return true
  } catch (e) {
    NotificationManager.error('Opps. Something wrong')
    return false
  }
}

export function logout() {
  removeCache('admin')
  removeCache('admin_access_token')
}
