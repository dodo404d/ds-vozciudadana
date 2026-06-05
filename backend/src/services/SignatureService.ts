import { Types } from 'mongoose';
import { ProposalRepository } from '../repositories/ProposalRepository';
import { SignatureRepository } from '../repositories/SignatureRepository';
import { hashDni } from '../utils/hash';
import { HttpError } from '../utils/httpError';
import { ProposalFreezeService } from './ProposalFreezeService';
import { SignatureValidatorAdapter } from '../patterns/structural/adapter/SignatureValidatorAdapter';

export interface CreateSignatureRequest {
  citizenName?: string;
  dni?: string;
  email?: string;
}

export class SignatureService {
  private proposalRepository = new ProposalRepository();
  private signatureRepository = new SignatureRepository();
  private proposalFreezeService = new ProposalFreezeService();
  private signatureValidatorAdapter = new SignatureValidatorAdapter();

  async create(proposalIdText: string, data: CreateSignatureRequest) {
    if (!Types.ObjectId.isValid(proposalIdText)) {
      throw new HttpError(400, 'Identificador de propuesta no válido');
    }

    const validatedSignature = this.signatureValidatorAdapter.validate(data);

    const proposal = await this.proposalRepository.findById(proposalIdText);
    if (!proposal) {
      throw new HttpError(404, 'Propuesta no encontrada');
    }

    if (proposal.status !== 'ACTIVA') {
      throw new HttpError(400, 'Esta propuesta ya no acepta firmas');
    }

    const dniHash = hashDni(validatedSignature.dni);
    const existingSignature = await this.signatureRepository.findByProposalAndDniHash(proposal._id, dniHash);
    if (existingSignature) {
      throw new HttpError(409, 'El ciudadano ya registró una firma para esta propuesta');
    }

    const signature = await this.signatureRepository.create({
      proposalId: proposal._id,
      citizenName: validatedSignature.citizenName,
      dniHash,
      email: validatedSignature.email,
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
}