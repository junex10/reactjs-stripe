import * as express from 'express';
/**
** @modules
**/

import { user } from './user.route';

const router = express.Router();

router.use('/users', user);

export { router };