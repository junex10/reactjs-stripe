import { api, HTTP_OPTIONS } from "../../commons/config";

export const spent = (email, date) => api.get(`/sales/spent/${date}/${email}`, HTTP_OPTIONS) 