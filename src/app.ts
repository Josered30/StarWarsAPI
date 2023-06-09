import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import swaggerUiExpress from 'swagger-ui-express';

import peopleRoutes from '@api/routes/people.routes';

import openapi from '@docs/openapi.json';

const app = express();

// midlewares
app.use(morgan('dev'));
app.use(
  cors({
    origin: '*',
  }),
);

app.use(express.json());
app.use('/api/people', peopleRoutes);
// app.use('/static', express.static(swaggerUi.absolutePath()));

const openapiJson: any = Object.assign({}, openapi);
openapiJson.servers = [{ url: 'http://localhost:3000/dev' }];

app.use('/docs', swaggerUiExpress.serveWithOptions({ redirect: false }), swaggerUiExpress.setup(openapiJson));

export default app;
