import { api, HTTP_OPTIONS } from "../../commons/config";

export const addNumber = (email, areaCode, numberPhone) => api.put('/users/update/phone', {
    email: email,
    phone: numberPhone,
    areaCode: areaCode
}, HTTP_OPTIONS);