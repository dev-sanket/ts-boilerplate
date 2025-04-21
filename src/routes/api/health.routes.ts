import express from 'express';
import { asyncHandler, bindControllerMethods } from '../../utils/index';
import { HealthController } from '../../controllers';

const router = express.Router();
const healthController = new HealthController();
const healthBindController = bindControllerMethods(healthController);

router.get('/', asyncHandler(healthBindController.getHealth));

export default router;
