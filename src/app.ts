import path from 'path';
import favicon from 'serve-favicon';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import logger from 'logger';

import feathers from '@feathersjs/feathers';
import express from '@feathersjs/express';
import configuration from '@feathersjs/configuration';
import socketio from '@feathersjs/socketio';

import { Application } from './declarations';
import middleware from './middleware';
import { services } from './services';
import appHooks from './app.hooks';
import channels from './channels';
import authentication from './authentication';
import knex from './knex';

const app: Application = express(feathers());

// Load app configuration
app.configure(configuration());

// Enable CORS, security, compression, and body parsing
app.use(cors());
app.use(helmet());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Host the public folder
app.use('/', express.static(app.get('public')));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));

// Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio());

app.configure(knex);

// Configure other middleware (see `middleware/index.ts`)
app.configure(middleware);
// Configure authentication
app.configure(authentication);
// Set up our services (see `services/index.ts`)
app.configure(services);
// Set up event channels (see `channels.ts`)
app.configure(channels);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);

export default app;
