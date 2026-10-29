import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import router from './router/index.js';
import errorMiddleware from './middlewares/error-middleware.js';
import logMiddleware from './middlewares/log-middleware.js';
import paymentController from './controllers/payment-controller.js';
import { runAgenda } from './jobs/agenda.js';

const PORT = process.env.PORT || 5000;
const app = express();

// Stripe webhook needs the raw body for signature verification,
// so it must be registered before express.json()
app.post(
  '/api/webhook',
  express.raw({ type: 'application/json' }),
  paymentController.handleWebhook
);

app.use(express.json());
app.use(logMiddleware);
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL,
}));
app.use('/api', router);
app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    await runAgenda();
    const server = app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));

    process.on('SIGTERM', () => {
      console.log('SIGTERM received, shutting down gracefully');
      server.close(async () => {
        await mongoose.connection.close();
        process.exit(0);
      });
    });
  } catch (e) {
    console.error('Failed to start server:', e);
    process.exit(1);
  }
};

start();
