import cors from 'cors';
import express from 'express';
import healthRoutes from './routes/healthRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({
    project: 'VozCiudadana',
    description: 'API base para iniciativas legislativas ciudadanas',
    api: '/api/health'
  });
});

app.use('/api', healthRoutes);

export default app;
