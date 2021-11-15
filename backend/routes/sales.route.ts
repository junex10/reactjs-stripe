import * as express from 'express';
import { SalesController } from '../controller/SalesController';
import { SalesBLL } from '../BLL/SalesBLL';

const salesController = new SalesController(
   new SalesBLL()
);
const sales = express.Router();

sales.get('/spent/:date/:email', (req: Object, res: Object) => salesController.GetSpent(req, res));
sales.get('/getCart/:email', (req: Object, res: Object) => salesController.GetCart(req, res));
sales.get('/getCart/no-image/:email', (req: Object, res: Object) => salesController.GetCartNotImage(req, res));
sales.post('/newSale', (req: Object, res: Object) => salesController.NewSale(req, res));
sales.get('/getSales/:email?', (req: Object, res: Object) => salesController.GetSale(req, res));

export { sales };