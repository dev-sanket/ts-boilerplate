/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
import APIRoutes from './routes/api';
import WebhookRoutes from './routes/webhook';
import { responseHandler, finalResponseHandler, errorHandler } from './middlewares';
const app = express();

app.use(express.json()); // Parse JSON bodies

app.use(responseHandler); // Attach response helper

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      userId?: string;
      session?: any;
      user?: any;
    }
  }
}

app.use('/api', APIRoutes); // API Routes
app.use('/webhook', WebhookRoutes); // Webhook Routes

// Or send JSON for API requests
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

// Error handling middleware
app.use(errorHandler);

// Final response handler middleware
app.use(finalResponseHandler);
export default app;
