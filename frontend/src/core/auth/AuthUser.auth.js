import { authorization, JWTKEY } from "../../commons/config";
import * as jwt from 'jsonwebtoken';

export const auth = jwt.verify(authorization, JWTKEY);

export const authSection = section => {
    const access = auth.profile.access.find(val => val.view === section);
    return (access !== undefined);
}