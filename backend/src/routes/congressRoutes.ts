import { Router } from 'express';
import { CongressController } from '../controllers/CongressController';

const router = Router();
const congressController = new CongressController();

router.get('/commissions', congressController.listCommissions);
router.get('/legislative-files', congressController.listFrozenFiles);
router.patch('/proposals/:proposalId/commission', congressController.assignCommission);

export default router;
