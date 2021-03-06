import express, { Application } from 'express';
import cors from 'cors';

import { MetricsRouter } from './web/routers/MetricsRouter';
import { SwaggerRouter } from './web/routers/SwaggerRouter';

export class ExpressApp {
  private app: Application;

  constructor(
    private swaggerRouter: SwaggerRouter,
    private metricsRouter: MetricsRouter
  ) {
    this.app = express();
  }

  private configApp() {
    this.app.use(cors());
    this.app.use(express.json());

    this.app.use(express.urlencoded({ extended: true }));
    
    //Routers
    this.app.use(this.swaggerRouter.getRouter());
    this.app.use(this.metricsRouter.getRouter());
  }

  public boot(): Application {
    if(!this.app) {
      this.app = express();
    }

    this.configApp();

    this.app.listen((process.env.PORT || 3001), () => {
      console.log(`Server up and running on port ${process.env.PORT || 3001}...`);
    });

    return this.app;
  }
}