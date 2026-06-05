import { Request, Response } from 'express';
import { CongressAccessProxy } from '../patterns/structural/proxy/CongressAccessProxy';
import { getErrorResponse } from '../utils/httpError';

export class CongressController {
  private congressAccessProxy = new CongressAccessProxy();

  listFrozenFiles = async (req: Request, res: Response): Promise<void> => {
    try {
      const files = await this.congressAccessProxy.listFrozenFiles(req);
      res.json({ data: files });
    } catch (error) {
      const { statusCode, message } = getErrorResponse(error);
      res.status(statusCode).json({ message });
    }
  };

  listCommissions = async (req: Request, res: Response): Promise<void> => {
    try {
      const commissions = await this.congressAccessProxy.listCommissions(req);
      res.json({ data: commissions });
    } catch (error) {
      const { statusCode, message } = getErrorResponse(error);
      res.status(statusCode).json({ message });
    }
  };

  assignCommission = async (req: Request, res: Response): Promise<void> => {
    try {
      const file = await this.congressAccessProxy.assignCommission(
        req,
        String(req.params.proposalId),
        req.body.commission
      );
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
