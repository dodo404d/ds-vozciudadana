import { Request, Response } from 'express';
import { CommentService } from '../services/CommentService';
import { getErrorResponse } from '../utils/httpError';

export class CommentController {
  private commentService = new CommentService();

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const comment = await this.commentService.create(String(req.params.proposalId), req.body);
      res.status(201).json({
        message: 'Comentario registrado correctamente',
        data: comment
      });
    } catch (error) {
      const { statusCode, message } = getErrorResponse(error);
      res.status(statusCode).json({ message });
    }
  };

  listByProposal = async (req: Request, res: Response): Promise<void> => {
    try {
      const comments = await this.commentService.listByProposal(String(req.params.proposalId));
      res.json({ data: comments });
    } catch (error) {
      const { statusCode, message } = getErrorResponse(error);
      res.status(statusCode).json({ message });
    }
  };
}
