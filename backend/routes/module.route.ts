import * as express from 'express';
/**
** @modules
**/

import { user } from './user.route';
import { shopping } from './shopping.route';
import { sales } from './sales.route';

const router = express.Router();

router.use('/users', user);
router.use('/store', shopping);
router.use('/sales', sales);

export { router };