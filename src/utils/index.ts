import { customAlphabet } from 'nanoid';

import Logger from './logger';
import { asyncHandler } from './async-handler';
import { bindControllerMethods } from './controller-utils';
import * as errorTypes from './errors/error-types';

const generateUniqueId = (length: number = 10) => {
  const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const nanoid = customAlphabet(alphabet, length);

  return nanoid(length);
};

const logger = Logger.getInstance();

export { logger, asyncHandler, bindControllerMethods, errorTypes, generateUniqueId };
