import { api } from "../../commons/config";

export const authUser = (email, password) => api.post('/users/auth', {
    email: email,
    password: password
});