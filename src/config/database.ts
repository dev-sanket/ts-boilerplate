import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { logger } from '../utils';

// Load environment variables
dotenv.config();
logger.info('📚 Environment variables loaded!');

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: 5432,
  username: process.env.POSTGRES_USER, // Change to your DB username
  password: process.env.POSTGRES_PASSWORD, // Change to your DB password
  database: process.env.POSTGRES_DB, // Change to your database name
  synchronize: false, // Auto-syncs DB schema (Disable in production)
  logging: false,
  entities: ['src/entities/**/*.ts'], // Path to entity files
  migrations: ['src/migrations/**/*.ts'],
  subscribers: ['src/subscribers/**/*.ts'],
  ssl: process.env.POSTGRES_SSL_MODE === 'true' ? { rejectUnauthorized: false } : false, // Enable SSL,
});

// Initialize DB connection
export const connectDatabase = async () => {
  try {
    await AppDataSource.initialize();
    logger.info('✅ Database connected successfully!');

    // Call the seeding functions only if data is not present
    //  await seedSubscriptions();
    // await seedPayAsYouGoPackages();
    // await seedFeaturePricing();
    // logger.info('🚀 All data seeded!');
  } catch (error) {
    logger.error('❌ Database connection failed:', error);
    process.exit(1);
  }
};
