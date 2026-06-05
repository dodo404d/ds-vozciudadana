import cors from 'cors';
import express from 'express';
import healthRoutes from './routes/healthRoutes';
import proposalRoutes from './routes/proposalRoutes';
import signatureRoutes from './routes/signatureRoutes';
import commentRoutes from './routes/commentRoutes';
import resourceRoutes from './routes/resourceRoutes';
import congressRoutes from './routes/congressRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({
    project: 'VozCiudadana',
    description: 'API para iniciativas legislativas ciudadanas',
    api: '/api/health',
    signatureLimitDemo: Number(process.env.SIGNATURE_LIMIT ?? 3)
  });
});

app.use('/api', healthRoutes);
app.use('/api/proposals', proposalRoutes);
app.use('/api/proposals/:proposalId/signatures', signatureRoutes);
app.use('/api/proposals/:proposalId/comments', commentRoutes);
app.use('/api/proposals/:proposalId/resources', resourceRoutes);
app.use('/api/congress', congressRoutes);

export default app;
