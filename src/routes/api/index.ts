import express from 'express';
import UserRoute from './user.routes';
import HealthRoute from './health.routes';
const router = express.Router();

router.use('/user', UserRoute);
router.use('/health', HealthRoute);

export default router;
