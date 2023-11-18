import { Router } from 'express';
const router: Router = Router();

import { TokenValidation } from '../libs/verifyToken';
import { getAllSensors, getOne } from '../controllers/sensor.controller';

router.get('/all', getAllSensors);
router.get('/get/:id', getOne);

export default router;
