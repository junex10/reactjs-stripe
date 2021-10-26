import axios from 'axios';

export const DOMAIN = 'http://localhost:4000';
export const HTTP_OPTIONS = {
    headers: {
        'Accept': 'application/json',
        'authorization': window.sessionStorage.getItem('user')
    }
};
export const HTTP_CONFIG = {
    baseURL: DOMAIN,
    timeout: 5000,
    headers: HTTP_OPTIONS
};
export const api = 
    axios.create(HTTP_CONFIG)
