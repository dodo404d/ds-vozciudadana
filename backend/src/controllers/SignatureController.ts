import { Request, Response } from 'express';
import { SignatureService } from '../services/SignatureService';
import { getErrorResponse } from '../utils/httpError';

export class SignatureController {
  private signatureService = new SignatureService();

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.signatureService.create(String(req.params.proposalId), req.body);
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
