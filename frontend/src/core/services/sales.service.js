import { api, HTTP_OPTIONS } from "../../commons/config";

export const spent = (email, date) => api.get(`/sales/spent/${date}/${email}`, HTTP_OPTIONS)
export const newSale = products => api.post(`/sales/newSale`, {
    products: products
})