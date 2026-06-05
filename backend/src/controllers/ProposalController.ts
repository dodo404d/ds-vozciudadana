import { Request, Response } from 'express';
import { ProposalService } from '../services/ProposalService';
import { getErrorResponse } from '../utils/httpError';

export class ProposalController {
  private proposalService = new ProposalService();

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const proposal = await this.proposalService.create(req.body);
      res.status(201).json({
        message: 'Propuesta registrada correctamente',
        data: proposal
      });
    } catch (error) {
      const { statusCode, message } = getErrorResponse(error);
      res.status(statusCode).json({ message });
    }
  };

  list = async (_req: Request, res: Response): Promise<void> => {
    try {
      const proposals = await this.proposalService.list();
      res.json({ data: proposals });
    } catch (error) {
      const { statusCode, message } = getErrorResponse(error);
      res.status(statusCode).json({ message });
    }
  };

  detail = async (req: Request, res: Response): Promise<void> => {
    try {
      const proposalDetail = await this.proposalService.detail(String(req.params.id));
      res.json({ data: proposalDetail });
    } catch (error) {
      const { statusCode, message } = getErrorResponse(error);
      res.status(statusCode).json({ message });
    }
  };
}
