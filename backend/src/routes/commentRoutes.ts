import { Router } from 'express';
import { CommentController } from '../controllers/CommentController';

const router = Router({ mergeParams: true });
const commentController = new CommentController();

router.post('/', commentController.create);
router.get('/', commentController.listByProposal);

export default router;
