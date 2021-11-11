import * as express from 'express';
import { StripeController } from '../controller/StripeController';
import { StripeBLL } from '../BLL/StripeBLL';

const salesController = new StripeController(
   new StripeBLL()
);
const stripe = express.Router();



export { stripe };