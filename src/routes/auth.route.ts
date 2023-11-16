import { Router } from 'express';

const router: Router = Router();

import { TokenValidation } from '../libs/verifyToken';
import { login } from '../controllers/auth.controller';



router.post('/login', login);
