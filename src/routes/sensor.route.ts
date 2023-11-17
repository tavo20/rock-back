import { Router } from 'express';

const router: Router = Router();

import { getAllSensors, getOne } from '../controllers/sensor.controller';


router.get('/all', getAllSensors);
router.get('/get/:id', getOne);

export default router;
