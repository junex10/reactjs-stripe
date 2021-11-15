import { api } from "../../commons/config";

export const getUsers = (limit = 500) => api.get('/users/getUsers', {
    headers: {
        limit: limit
    }
})
export const getUserById = id => api.get(`/users/getUsers/${id}`)