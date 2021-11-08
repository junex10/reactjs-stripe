import { api } from '../../commons/config';

export const getStore = category => api.get(`store/getStock/category/${category}`)
export const getCategory = () => api.get('store/getCategory')