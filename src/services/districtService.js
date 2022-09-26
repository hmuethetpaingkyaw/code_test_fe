import { sendData, getData } from './apiService'
import { NotificationManager } from 'react-notifications'


export async function getAll() {
  try {
    let response = await getData(`district`)
    return response.data
  } catch (e) {
    NotificationManager.error('Opps. Something wrong')
    return false
  }
}
export async function store(data) {
  try {
    let response = await sendData('district', data)
    return response.data
  } catch (e) {
    NotificationManager.error('Opps. Something wrong')
    return false
  }
}
export async function update(id,data) {
  try {
    let response = await sendData(`district/${id}`, data, 'PUT')
    return response.data
  } catch (e) {
    NotificationManager.error('Opps. Something wrong')
    return false
  }
}

export async function deleteData(_id) {
  try {
    await sendData(`district/${_id}`, null, 'DELETE')
    return true
  } catch (e) {
    NotificationManager.error('Opps. Something wrong')
    return false
  }
}

