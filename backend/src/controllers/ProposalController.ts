import { Request, Response } from 'express';
import { CitizenProposalFacade } from '../patterns/structural/facade/CitizenProposalFacade';
import { getErrorResponse } from '../utils/httpError';

export class ProposalController {
  private citizenProposalFacade = new CitizenProposalFacade();

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const proposal = await this.citizenProposalFacade.createProposal(req.body);
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
      const proposals = await this.citizenProposalFacade.listProposals();
      res.json({ data: proposals });
    } catch (error) {
      const { statusCode, message } = getErrorResponse(error);
      res.status(statusCode).json({ message });
    }
  };

  detail = async (req: Request, res: Response): Promise<void> => {
    try {
      const proposalDetail = await this.citizenProposalFacade.getProposalDetail(String(req.params.id));
      res.json({ data: proposalDetail });
    } catch (error) {
      const { statusCode, message } = getErrorResponse(error);
      res.status(statusCode).json({ message });
    }
  };
}
