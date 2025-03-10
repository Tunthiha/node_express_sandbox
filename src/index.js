import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/db.js';
import createPurchasePricesTable from './data/createPurchasePricesTable.js';
import csvRoutes from './routes/csvRoutes.js';
import errorHandling from './middlewares/errorHandler.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', csvRoutes);

// Error handling
app.use(errorHandling);

// Create table before starting the server
createPurchasePricesTable();

// Test PostgreSQL connection
app.get('/', async (req, res) => {
  const result = await pool.query("SELECT current_database()");
  res.send(`The database connected - ${result.rows[0].current_database}`);
});

// Export `app` for testing
export default app;

// // Only start the server if not in test mode
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
  });
}
