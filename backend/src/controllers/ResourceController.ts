import { Request, Response } from 'express';
import { ResourceService } from '../services/ResourceService';
import { getErrorResponse } from '../utils/httpError';

export class ResourceController {
  private resourceService = new ResourceService();

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const resource = await this.resourceService.create(String(req.params.proposalId), req.body);
      res.status(201).json({
        message: 'Recurso registrado correctamente',
        data: resource
      });
    } catch (error) {
      const { statusCode, message } = getErrorResponse(error);
      res.status(statusCode).json({ message });
    }
  };

  listByProposal = async (req: Request, res: Response): Promise<void> => {
    try {
      const resources = await this.resourceService.listByProposal(String(req.params.proposalId));
      res.json({ data: resources });
    } catch (error) {
      const { statusCode, message } = getErrorResponse(error);
      res.status(statusCode).json({ message });
    }
  };
}
