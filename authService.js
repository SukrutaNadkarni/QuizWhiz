import { User } from '..';
import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const findUserByEmail = async (email) => {
  const response = await axios.get(`${API_URL}/users?email=${email}`);
  if (response.data) {
    return response.data;
  } else {
    return null;
  }
};

export const validateCredentials = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

export const createUser = async (email, password, displayName) => {
  const response = await axios.post(`${API_URL}/register`, { email, password, displayName });
  return response.data;
};
