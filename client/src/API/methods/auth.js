import axios from 'axios';

const axios_proxy = axios.create({
  baseURL: `http://localhost:5000/api/auth/`
});

export const login = async (username, password) => {
  try {
    return await axios_proxy.post('/login', {username, password})
  } catch (e) {
    console.log(e)
  }
}

export const registration = async (user) => {
  try {
    return await axios_proxy.post('/registration', user)
  } catch (e) {
    console.log(e)
  }
}