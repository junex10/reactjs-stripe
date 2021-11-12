import * as express from 'express';
import { StripeController } from '../controller/StripeController';
import { StripeBLL } from '../BLL/StripeBLL';

const stripeController = new StripeController(
   new StripeBLL()
);
const stripe = express.Router();

stripe.get('/getPayments', (req: Object, res: Object) => stripeController.GetPayments(req, res));

export { stripe };