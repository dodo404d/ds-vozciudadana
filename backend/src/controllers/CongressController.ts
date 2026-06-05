import { Request, Response } from 'express';
import { CongressService } from '../services/CongressService';
import { getErrorResponse } from '../utils/httpError';

export class CongressController {
  private congressService = new CongressService();

  listFrozenFiles = async (_req: Request, res: Response): Promise<void> => {
    try {
      const files = await this.congressService.listFrozenFiles();
      res.json({ data: files });
    } catch (error) {
      const { statusCode, message } = getErrorResponse(error);
      res.status(statusCode).json({ message });
    }
  };

  assignCommission = async (req: Request, res: Response): Promise<void> => {
    try {
      const file = await this.congressService.assignCommission(String(req.params.proposalId), req.body.commission);
      res.json({
        message: 'Comisión asignada correctamente',
        data: file
      });
    } catch (error) {
      const { statusCode, message } = getErrorResponse(error);
      res.status(statusCode).json({ message });
    }
  };
}
