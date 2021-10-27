import axios from 'axios';

export const DOMAIN = 'http://localhost:4000';
const userSession = JSON.parse(window.sessionStorage.getItem('userSession'));
const authorization = userSession === null ? '' : userSession.token;
export const HTTP_OPTIONS = {
    headers: {
        'Accept': 'application/json',
        'authorization': authorization
    }
};
export const HTTP_CONFIG = {
    baseURL: DOMAIN,
    timeout: 5000,
    headers: HTTP_OPTIONS
};
export const api = 
    axios.create(HTTP_CONFIG)
