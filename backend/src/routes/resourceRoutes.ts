import { Router } from 'express';
import { ResourceController } from '../controllers/ResourceController';

const router = Router({ mergeParams: true });
const resourceController = new ResourceController();

router.post('/', resourceController.create);
router.get('/', resourceController.listByProposal);

export default router;
