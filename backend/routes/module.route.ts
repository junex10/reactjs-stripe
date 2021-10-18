import * as express from 'express';
/**
** @modules
**/

import { user } from './user.route';
import { shopping } from './shopping.route';

const router = express.Router();

router.use('/users', user);
router.use('/store', shopping);

export { router };