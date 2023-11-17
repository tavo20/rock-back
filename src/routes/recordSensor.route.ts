import { Router } from 'express';

const router: Router = Router();

import { create, getDataBySensor } from '../controllers/recordSensor.controller';


router.post('/create', create);
router.get('/data/:id', getDataBySensor);


export default router;
