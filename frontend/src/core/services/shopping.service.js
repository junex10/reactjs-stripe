import { api, HTTP_OPTIONS } from '../../commons/config';

export const getStore = () => api.get('/store/getStock')