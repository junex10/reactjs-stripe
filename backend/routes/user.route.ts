import * as express from 'express';
import { UserController } from '../controller/UserController';
import { UserBLL } from '../BLL/UserBLL';

const userController = new UserController(
   new UserBLL()
);

const user = express.Router();

user.get('/getUsers', (req: Object, res: Object) => userController.GetUsers(req, res));
user.get('/getUsers/:id', (req: Object, res: Object) => userController.GetUserById(req, res));
user.post('/auth', (req: Object, res: Object) => userController.AuthUser(req, res));

export { user };