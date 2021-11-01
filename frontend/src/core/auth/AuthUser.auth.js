import { authorization, JWTKEY } from "../../commons/config";
import * as jwt from 'jsonwebtoken';

export const auth = (authorization !== '') ? jwt.verify(authorization, JWTKEY) : null;

export const authSection = section => {
    const access = auth.profile.access.find(val => val.view === section);
    return (access !== undefined);
}