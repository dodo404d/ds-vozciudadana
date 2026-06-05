import { getAvailableCommissions } from '../utils/config';
import { LegislativeFileRepository } from '../repositories/LegislativeFileRepository';
import { ProposalRepository } from '../repositories/ProposalRepository';
import { HttpError } from '../utils/httpError';

export class CongressService {
  private legislativeFileRepository = new LegislativeFileRepository();
  private proposalRepository = new ProposalRepository();

  async listFrozenFiles() {
    return this.legislativeFileRepository.findAll();
  }

  listCommissions() {
    return getAvailableCommissions();
  }

  async assignCommission(proposalId: string, commission: string) {
    if (!commission || !commission.trim()) {
      throw new HttpError(400, 'Debe seleccionar una comisión');
    }

    const selectedCommission = commission.trim();
    const availableCommissions = getAvailableCommissions();
    if (!availableCommissions.includes(selectedCommission)) {
      throw new HttpError(400, 'La comisión seleccionada no está permitida');
    }

    const legislativeFile = await this.legislativeFileRepository.assignCommission(proposalId, selectedCommission);
    if (!legislativeFile) {
      throw new HttpError(404, 'Expediente congelado no encontrado');
    }

    await this.proposalRepository.assignCommission(proposalId, selectedCommission);

    return legislativeFile;
  }
}
