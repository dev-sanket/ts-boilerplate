import express from 'express';
import { UserController } from '../../controllers';
import { asyncHandler, bindControllerMethods } from '../../utils/index';
import { verifyClerkJWTToken } from '../../middlewares';

const router = express.Router();
const userController = new UserController();
const userBindController = bindControllerMethods(userController);

router.get('/', verifyClerkJWTToken, asyncHandler(userBindController.getAllUsers));
// router.get('/:id', verifyClerkJWTToken, asyncHandler(userBindController.getUserById));

export default router;
