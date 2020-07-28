import { Router } from 'express';

export default (app) => {
  const router = Router();
  router.get('/', function(req, res, next) {
    res.json({ message: 'Hello World' });
  });
  return {
    prefix: '/',
    router,
  };
};
