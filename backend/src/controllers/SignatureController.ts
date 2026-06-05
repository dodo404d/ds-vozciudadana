import { Request, Response } from 'express';
import { CitizenProposalFacade } from '../patterns/structural/facade/CitizenProposalFacade';
import { getErrorResponse } from '../utils/httpError';

export class SignatureController {
  private citizenProposalFacade = new CitizenProposalFacade();

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.citizenProposalFacade.signProposal(String(req.params.proposalId), req.body);
      res.status(201).json({
        message: 'Firma registrada correctamente',
        data: result
      });
    } catch (error) {
      const { statusCode, message } = getErrorResponse(error);
      res.status(statusCode).json({ message });
    }
  };
}
