import * as express from 'express';
import { SalesController } from '../controller/SalesController';
import { SalesBLL } from '../BLL/SalesBLL';

const salesController = new SalesController(
   new SalesBLL()
);
const sales = express.Router();

sales.get('/spent/:date', (req: Object, res: Object) => salesController.GetSpent(req, res));

export { sales };