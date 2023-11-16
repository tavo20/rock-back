import { Router } from 'express';

const router: Router = Router();

import { create } from '../controllers/recordSensor.controller';


router.post('/create', create);

export default router;
