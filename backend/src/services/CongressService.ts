import { LegislativeFileRepository } from '../repositories/LegislativeFileRepository';
import { ProposalRepository } from '../repositories/ProposalRepository';
import { HttpError } from '../utils/httpError';

export class CongressService {
  private legislativeFileRepository = new LegislativeFileRepository();
  private proposalRepository = new ProposalRepository();

  async listFrozenFiles() {
    return this.legislativeFileRepository.findAll();
  }

  async assignCommission(proposalId: string, commission: string) {
    if (!commission || !commission.trim()) {
      throw new HttpError(400, 'Debe seleccionar una comisión');
    }

    const legislativeFile = await this.legislativeFileRepository.assignCommission(proposalId, commission.trim());
    if (!legislativeFile) {
      throw new HttpError(404, 'Expediente congelado no encontrado');
    }

    await this.proposalRepository.assignCommission(proposalId, commission.trim());

    return legislativeFile;
  }
}
