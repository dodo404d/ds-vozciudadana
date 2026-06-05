import { Router } from 'express';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    project: 'VozCiudadana',
    database: 'vozciudadana',
    signatureLimitDemo: Number(process.env.SIGNATURE_LIMIT ?? 3)
  });
});

export default router;
