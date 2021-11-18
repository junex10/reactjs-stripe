import { api, HTTP_OPTIONS } from "../../commons/config";

export const spent = (email, date) => api.get(`/sales/spent/${date}/${email}`, HTTP_OPTIONS)
export const newSale = (products, email) => api.post(`/sales/newSale`, {
    email: email,
    products: products
})
export const getSaleByEmail = (email, image = 'false') => api.get(`/sales/getSales/${email}/${image}`, HTTP_OPTIONS)
export const getSales = () => api.get(`sales/getSales`, HTTP_OPTIONS)