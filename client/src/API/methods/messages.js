import axios from 'axios';
const cookie = require('cookie')

const axios_proxy = axios.create({
  baseURL: `http://localhost:5000/api/messages`,
  headers: {Authorization: `Bearer ${cookie.parse(document.cookie).access_token}`}
});

export const send = async (mes_obj) => {
  try {
    return await axios_proxy.post(`/send`, mes_obj)
  } catch (e) {
    console.log(e)
  }
}

export const createConversation = async (second_id) => {
  try {
    return await axios_proxy.post(`/createConversation`, second_id)
  } catch (e) {
    console.log(e)
  }
}

export const getConversations = async () => {
  try {
    return await axios_proxy.get(`/getConversations`)
  } catch (e) {
    console.log(e)
  }
}

export const getConversationById = async (id) => {
  try {
    return await axios_proxy.get(`/getConversationById?companion_id=${id}`)
  } catch (e) {
    console.log(e)
  }
}