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
user.post('/registerUser', (req: Object, res: Object) => userController.RegisterUser(req, res));
user.put('/update/phone', (req: Object, res: Object) => userController.UpdatePhone(req, res));
user.put('/update/names', (req: Object, res: Object) => userController.UpdateNames(req, res));
user.put('/update/email', (req: Object, res: Object) => userController.UpdateEmail(req, res));
user.put('/update/password', (req: Object, res: Object) => userController.UpdatePassword(req, res));
user.put('/update/creditcard', (req: Object, res: Object) => userController.UpdateCreditCard(req, res));

export { user };