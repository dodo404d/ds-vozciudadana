import { Request } from 'express';
import { CongressService } from '../../../services/CongressService';
import { SystemConfigSingleton } from '../../creational/singleton/SystemConfigSingleton';
import { HttpError } from '../../../utils/httpError';

export class CongressAccessProxy {
  private readonly congressService = new CongressService();
  private readonly config = SystemConfigSingleton.getInstance();

  async listFrozenFiles(req: Request) {
    this.ensureAuthorized(req);
    return this.congressService.listFrozenFiles();
  }

  async listCommissions(req: Request) {
    this.ensureAuthorized(req);
    return this.congressService.listCommissions();
  }

  async assignCommission(req: Request, proposalId: string, commission: string) {
    this.ensureAuthorized(req);
    return this.congressService.assignCommission(proposalId, commission);
  }

  private ensureAuthorized(req: Request): void {
    const expectedToken = this.config.getCongressAccessToken();
    const receivedToken = req.header('x-congress-access');

    if (receivedToken !== expectedToken) {
      throw new HttpError(401, 'Acceso no autorizado al Panel Congreso');
    }
  }
}
