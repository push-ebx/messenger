import axios from 'axios';

const cookie = require('cookie')

const axios_proxy = axios.create({
  baseURL: `http://localhost:5000/api/users`,
  headers: {Authorization: `Bearer ${cookie.parse(document.cookie).access_token}`}
});

export const getById = async (id) => {
  try {
    if (id) return await axios_proxy.get(`/getById?id=${id}`)
    else return await axios_proxy.get(`/getById`)
  } catch (e) {
    console.log(e)
  }
}

export const getByUsername = async (username) => {
  try {
    return await axios_proxy.get(`/getByUsername?username=${username}`)
  } catch (e) {
    console.log(e)
  }
}

export const getIdByToken = async () => {
  try {
    return await axios_proxy.get(`/getIdByToken`)
  } catch (e) {
    console.log(e)
  }
}