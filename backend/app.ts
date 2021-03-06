import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

import { Services } from './services/Services';

Services;

// Swagger API DOCS

import * as swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json';

import * as envJson from './enviroments/enviroment.json';

import { router } from './routes/module.route';

const app = express();

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = '1';

app.use(logger('dev'));
app.use(express.json({ limit: '50mb'}));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());

app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
}))

app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument));

app.use(router);

const port = envJson.actualEnviroment == 'development' ? envJson.enviroments.development.port : process.env.PORT;

app.use((req, res, next) => {
  res.status(404);
  res.send({
    message: 'La dirección url no fue encontrado',
    status: 404
  });
  next();
});
app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  return console.log(`Server actived on ${envJson.actualEnviroment} in ${port}`);
});

export { app }
