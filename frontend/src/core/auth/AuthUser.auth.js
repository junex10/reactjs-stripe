import { authorization, JWTKEY } from "../../commons/config";
import * as jwt from 'jsonwebtoken';

export const auth = (authorization !== '') ? jwt.verify(authorization, JWTKEY) : null;
export const logout = (url = '/login') => {
    window.sessionStorage.removeItem('userSession');
    window.location.href = url;
}
export const authSection = (section = null) => {
    const access = auth.profile.access.find(val => val.view === section || val.view === 'all');
    return (access !== undefined);
}
export const authLogin = () => {
    if (window.sessionStorage.getItem('userSession') === null) return logout();
}