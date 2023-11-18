import { Router } from 'express';
const router: Router = Router();

import { TokenValidation } from '../libs/verifyToken';
import { create, getDataBySensor } from '../controllers/recordSensor.controller';

router.post('/create', TokenValidation, create);
router.get('/data/:id', TokenValidation, getDataBySensor);

export default router;
