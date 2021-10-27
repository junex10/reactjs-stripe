import { api } from "../../commons/config";

export const authUser = (email, password) => api.post('/users/auth', {
    email: email,
    password: password
});
export const newUser = (
    email,
    password,
    repeat_password
) => 
    api.post('/users/newUser', {
        email: email,
        password: password,
        repeat_password: repeat_password
    })