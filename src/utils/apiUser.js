import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

export async function postUser(credentials) {
  const { data } = await axios.post(`/users/signup`, credentials);
  token.set(data.token);
  return data;
}

export async function logIn(credentials) {
  const { data } = await axios.post(`/users/login`, credentials);
  token.set(data.token);
  return data;
}

export async function logOut() {
  await axios.post(`/users/logout`);
  token.unset();
}

export async function fetchCurrentUser(persisterToken) {
  token.set(persisterToken);
  const { data } = await axios.get(`/users/current`);
  return data;
}
