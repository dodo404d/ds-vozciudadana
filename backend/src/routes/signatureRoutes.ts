import { Router } from 'express';
import { SignatureController } from '../controllers/SignatureController';

const router = Router({ mergeParams: true });
const signatureController = new SignatureController();

router.post('/', signatureController.create);

export default router;
