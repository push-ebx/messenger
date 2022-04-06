import axios from 'axios';

const axios_proxy = axios.create({
  baseURL: `http://localhost:5000/api`
});

export const login = async (username, password) => {
  try {
    return await axios_proxy.post('/auth/login', {username, password})
  } catch (e) {
    console.log(e)
  }
}

export {axios_proxy}