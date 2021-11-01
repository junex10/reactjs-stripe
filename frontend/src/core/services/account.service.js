import { api, HTTP_OPTIONS } from "../../commons/config";

export const addNumber = (email, areaCode, numberPhone) => api.put('/users/update/phone', {
    email: email,
    phone: numberPhone,
    areaCode: areaCode
}, HTTP_OPTIONS);
export const addNames = (email, name, lastname) => api.put('/users/update/names', {
    email: email,
    name: name,
    lastname: lastname
}, HTTP_OPTIONS);