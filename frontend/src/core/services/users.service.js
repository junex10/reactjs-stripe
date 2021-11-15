import { api, HTTP_OPTIONS } from "../../commons/config";

export const getUsers = (limit = 500) => api.get('/users/getUsers', {
    headers: {
        limit: limit
    }
})
export const getUserById = id => api.get(`/users/getUsers/${id}`)
export const registerUser = (
    email,
    password,
    repeat_password,
    person,
    userType = 'Usuario'
) => api.post('/users/registerUser', {
    email: email,
    password: password,
    repeat_password: repeat_password,
    userType: userType,
    person: person
}, HTTP_OPTIONS)