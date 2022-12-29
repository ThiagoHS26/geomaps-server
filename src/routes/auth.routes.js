import { Router } from 'express';
import  AuthController  from '../controllers/AuthController';
import { checkJWT } from '../middlewares/jwt.middleware';

const router = Router();

//Login
router.post('/login',AuthController.login);

export default router;

