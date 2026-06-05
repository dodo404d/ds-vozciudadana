import { Types } from 'mongoose';
import { IProposal, Proposal } from '../models/Proposal';

export interface CreateProposalData {
  title: string;
  author: string;
  summary: string;
  legalText: string;
  category: string;
  proposalType: string;
  signatureLimit: number;
}

export class ProposalRepository {
  create(data: CreateProposalData): Promise<IProposal> {
    return Proposal.create(data);
  }

  findAll(): Promise<IProposal[]> {
    return Proposal.find().sort({ createdAt: -1 });
  }

  findById(id: string): Promise<IProposal | null> {
    return Proposal.findById(id);
  }

  incrementValidSignatures(id: Types.ObjectId): Promise<IProposal | null> {
    return Proposal.findByIdAndUpdate(
      id,
      { $inc: { validSignatureCount: 1 } },
      { new: true }
    );
  }

  freeze(id: Types.ObjectId, hashExpediente: string, frozenAt: Date): Promise<IProposal | null> {
    return Proposal.findByIdAndUpdate(
      id,
      { status: 'CONGELADA', hashExpediente, frozenAt },
      { new: true }
    );
  }

  assignCommission(id: string, commissionAssigned: string): Promise<IProposal | null> {
    return Proposal.findByIdAndUpdate(
      id,
      { status: 'DERIVADA_COMISION', commissionAssigned },
      { new: true }
    );
  }
}
