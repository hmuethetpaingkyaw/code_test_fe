import { sendData, getData } from './apiService'
import { NotificationManager } from 'react-notifications'


export async function getAll() {
  try {
    let response = await getData(`township`)
    return response.data
  } catch (e) {
    NotificationManager.error('Opps. Something wrong')
    return false
  }
}
export async function store(data) {
  try {
    let response = await sendData('township', data)
    return response.data
  } catch (e) {
    NotificationManager.error('Opps. Something wrong')
    return false
  }
}
export async function update(id,data) {
  try {
    let response = await sendData(`township/${id}`, data, 'PUT')
    return response.data
  } catch (e) {
    NotificationManager.error('Opps. Something wrong')
    return false
  }
}

export async function deleteData(_id) {
  try {
    await sendData(`township/${_id}`, null, 'DELETE')
    return true
  } catch (e) {
    NotificationManager.error('Opps. Something wrong')
    return false
  }
}

