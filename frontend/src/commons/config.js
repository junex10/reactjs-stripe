import axios from 'axios';

export const DOMAIN = 'http://localhost:4000';
export const userSession = JSON.parse(window.sessionStorage.getItem('userSession'));
export const authorization = userSession === null ? '' : userSession.token;
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

export const JWTKEY = "7b0705aab296e5f24dc802d440121077";