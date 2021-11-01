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
export const modifyEmail = (email, newEmail) => api.put('/users/update/email', {
    email: email,
    newEmail: newEmail
}, HTTP_OPTIONS);
export const addCreditCard = (
    email, 
    creditCardNumber,
    newCreditCard,
    cvc,
    expirationDate
) => api.put('/users/update/creditcard', {
    email: email,
    creditCardNumber: creditCardNumber,
    newCreditCard: newCreditCard,
    cvc: cvc,
    expirationDate: expirationDate  
}, HTTP_OPTIONS)
export const modifyPassword = (email, newPassword) => api.put('/users/update/password', {
    email: email,
    newPassword: newPassword
}, HTTP_OPTIONS)
export const getUser = email => api.get(`/users/getUserByEmail/${email}/auth`)
export const setUser = data => window.sessionStorage.setItem('userSession', JSON.stringify(data))