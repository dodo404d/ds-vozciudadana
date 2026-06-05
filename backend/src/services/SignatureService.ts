import { Types } from 'mongoose';
import { ProposalRepository } from '../repositories/ProposalRepository';
import { SignatureRepository } from '../repositories/SignatureRepository';
import { hashDni } from '../utils/hash';
import { HttpError } from '../utils/httpError';
import { ProposalFreezeService } from './ProposalFreezeService';

export interface CreateSignatureRequest {
  citizenName?: string;
  dni?: string;
  email?: string;
}

export class SignatureService {
  private proposalRepository = new ProposalRepository();
  private signatureRepository = new SignatureRepository();
  private proposalFreezeService = new ProposalFreezeService();

  async create(proposalIdText: string, data: CreateSignatureRequest) {
    if (!Types.ObjectId.isValid(proposalIdText)) {
      throw new HttpError(400, 'Identificador de propuesta no válido');
    }

    this.validateSignatureData(data);

    const proposal = await this.proposalRepository.findById(proposalIdText);
    if (!proposal) {
      throw new HttpError(404, 'Propuesta no encontrada');
    }

    if (proposal.status !== 'ACTIVA') {
      throw new HttpError(400, 'Esta propuesta ya no acepta firmas');
    }

    const dniHash = hashDni(data.dni!);
    const existingSignature = await this.signatureRepository.findByProposalAndDniHash(proposal._id, dniHash);
    if (existingSignature) {
      throw new HttpError(409, 'El ciudadano ya registró una firma para esta propuesta');
    }

    const signature = await this.signatureRepository.create({
      proposalId: proposal._id,
      citizenName: data.citizenName!.trim(),
      dniHash,
      email: data.email!.trim(),
      isValid: true
    });

    const updatedProposal = await this.proposalRepository.incrementValidSignatures(proposal._id);
    const proposalAfterFreeze = updatedProposal
      ? await this.proposalFreezeService.freezeIfLimitReached(updatedProposal)
      : updatedProposal;

    return {
      signature,
      proposal: proposalAfterFreeze
    };
  }

  private validateSignatureData(data: CreateSignatureRequest): void {
    if (!data.citizenName || !data.citizenName.trim()) {
      throw new HttpError(400, 'El nombre del ciudadano es obligatorio');
    }

    if (!data.dni || !/^\d{8}$/.test(data.dni.trim())) {
      throw new HttpError(400, 'El DNI debe tener 8 dígitos');
    }

    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      throw new HttpError(400, 'El correo electrónico no es válido');
    }
  }
}
