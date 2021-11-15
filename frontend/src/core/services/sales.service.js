import { api, HTTP_OPTIONS } from "../../commons/config";

export const spent = (email, date) => api.get(`/sales/spent/${date}/${email}`, HTTP_OPTIONS)
export const newSale = (products, email) => api.post(`/sales/newSale`, {
    email: email,
    products: products
})
export const getSaleByEmail = email => api.get(`/sales/getSales/${email}`, HTTP_OPTIONS)
export const getSales = () => api.get(`sales/getSales`, HTTP_OPTIONS)