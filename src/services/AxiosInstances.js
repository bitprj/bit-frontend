import axios from 'axios';

export const backend = axios.create({
  baseURL: 'https://darlene-backend.herokuapp.com/'
});
backend.interceptors.response.use(response => response.data);


// const auth = new AuthService();

export const grader = axios.create({
    baseURL: 'https://darlene-okpy.herokuapp.com'
});
