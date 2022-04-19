import axios from 'axios';

const axios_proxy = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/api/auth/`
});

export const login = async (username, password) => {
  try {
    return await axios_proxy.post('/login', {username, password})
  } catch (_) {
    console.log(_)
  }
}

export const registration = async (user) => {
  try {
    return await axios_proxy.post('/registration', user)
  } catch (e) {
    console.log(e)
  }
}