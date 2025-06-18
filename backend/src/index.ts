import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { authRoutes } from './routes/auth';
import { courseRoutes } from './routes/courses';
import { careerRoutes } from './routes/careers';

dotenv.config();



const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/careers', careerRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  
  console.log(`Server is running on port ${port}`);
  console.log(`API endpoints available at http://localhost:${port}`);
}); 