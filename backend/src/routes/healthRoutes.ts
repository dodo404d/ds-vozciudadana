import { Router } from 'express';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    project: 'VozCiudadana',
    database: 'vozciudadana',
    signatureLimit: Number(process.env.SIGNATURE_LIMIT || 3),
    message: 'Backend base funcionando correctamente'
  });
});

export default router;
