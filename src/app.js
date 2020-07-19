import express, { json } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import methodOverride from 'method-override';

// Core
import Paths from './core/Paths';
import Loader from './core/Loader';

// Config
import env from './config/env';
import database from './config/database';
import web from './config/web';
import logger from './config/logger';

// Exception
import Exception from './core/Exception';

class Application {
  constructor() {
    this.app = express();
    this.middlewares();
    this.settings();
    this.loadModels();
    this.loadServices();
    this.loadControllers();
    this.loadRoutes();
    this.errorHandler();
  }

  settings() {
    this.logger = logger;
    this.env = env;
    this.app.set('port', web(this).port);
    this.Exception = Exception;
  }

  middlewares() {
    this.app.use(
      cors({
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTION'],
        exposedHeaders: ['X-Pagination-Total-Count', 'X-Pagination-Limit'],
      }),
    );
    this.app.use(morgan('dev'));
    this.app.use(methodOverride());
    this.app.use(json());
  }

  loadModels() {
    this.loadModels = Loader.upModels(
      this,
      Paths.MODELS,
      { exclude: [] }
    );
  }

  loadServices() {
    this.loadServices = Loader.up(
      this,
      Paths.SERVICES,
      { exclude: [] }
    );
  }

  loadControllers() {
    this.loadControllers = Loader.up(
      this,
      Paths.CONTROLLERS,
      { exclude: [] }
    );
  }

  loadRoutes() {
    Loader.upRoutes(
      this,
      Paths.ROUTES,
      { exclude: [] }
    );
  }

  errorHandler() {
    this.app.use((err, req, res, next) => {
      const {
        code,
        message,
        statusCode,
        metatadaa,
      } = Exception.handler(err);
      this.logger.error(`[${code}] ${message}`);
      res.status(statusCode || 500).json({
        code,
        message,
        metatadaa,
      });
    });
  }

  async start() {
    const port = this.app.get('port');
    await database(this);
    await this.app.listen(port);
    this.logger.info(`Server in port ${port}`);
  }
}

export default Application;
