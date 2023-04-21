import dotenv from 'dotenv';
import serverless from 'serverless-http';
import 'reflect-metadata';

import { registerContainer } from '@infrastructure/dependency-injection/register-container';

dotenv.config();
registerContainer();

import app from './app';

module.exports.handler = serverless(app);
