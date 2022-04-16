import axios from 'axios';
const cookie = require('cookie')

const axios_proxy = axios.create({
  baseURL: `http://localhost:5000/api/users/`
});

export const getById = async (id) => {
  axios_proxy.defaults.headers["Authorization"] = `Bearer ${cookie.parse(document.cookie).access_token}`
  try {
    if (id) return await axios_proxy.get(`/getById?id=${id}`)
    else return await axios_proxy.get(`/getById`)
  } catch (e) {
    console.log(e)
  }
}

export const getByUsername = async (username) => {
  axios_proxy.defaults.headers["Authorization"] = `Bearer ${cookie.parse(document.cookie).access_token}`
  try {
    return await axios_proxy.get(`/getByUsername?username=${username}`)
  } catch (e) {
    console.log(e)
  }
}

export const getIdByToken = async () => {
  axios_proxy.defaults.headers["Authorization"] = `Bearer ${cookie.parse(document.cookie).access_token}`
  try {
    return await axios_proxy.get(`/getIdByToken`)
  } catch (e) {
    console.log(e)
  }
}