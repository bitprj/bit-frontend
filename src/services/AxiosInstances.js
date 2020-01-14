import axios from 'axios';

import AuthService from './AuthService';

const auth = new AuthService();

export const backend = axios.create({
    baseURL: 'https://b2757d6e-6fd4-4877-887f-7cc9531408a8.mock.pstmn.io'
});

backend.defaults.headers.post['Authorization'] = `Bearer ${auth.getToken()}`;
backend.interceptors.response.use(response => response.data);

export const grader = axios.create({
    baseURL: 'https://darlene-okpy.herokuapp.com'
});
