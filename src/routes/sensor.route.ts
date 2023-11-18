import { Router } from 'express';
const router: Router = Router();

import { TokenValidation } from '../libs/verifyToken';
import { getAllSensors, getOne } from '../controllers/sensor.controller';

router.get('/all',TokenValidation, getAllSensors);
router.get('/get/:id', TokenValidation, getOne);

export default router;
