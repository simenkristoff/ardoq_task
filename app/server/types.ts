import { Router } from 'express';

export interface ControllerInterface {
  endpoint: string;
  router: Router;
}
