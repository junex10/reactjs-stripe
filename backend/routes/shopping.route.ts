import * as express from 'express';
import { ShoppingController } from '../controller/ShoppingController';
import { ShoppingBLL } from '../BLL/ShoppingBLL';

const shoppingController = new ShoppingController(
   new ShoppingBLL()
);

const shopping = express.Router();

shopping.get('/getStock/:product?', (req: Object, res: Object) => shoppingController.GetStock(req, res));
shopping.post('/registerStock', (req: Object, res: Object) => shoppingController.RegisterStock(req, res));

export { shopping };