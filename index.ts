import app from './src/app';
import { logger } from './src/utils';
import { connectDatabase } from './src/config/database';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

connectDatabase().then(() => {
  app.listen(PORT, () => {
    logger.info(`🚀 Server is running on http://localhost:${PORT}`);
  });
});
