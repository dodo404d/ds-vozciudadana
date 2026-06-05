import { Router } from 'express';
import { ProposalController } from '../controllers/ProposalController';

const router = Router();
const proposalController = new ProposalController();

router.post('/', proposalController.create);
router.get('/', proposalController.list);
router.get('/:id', proposalController.detail);

export default router;
