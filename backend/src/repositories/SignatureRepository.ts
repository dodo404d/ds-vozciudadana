import { Types } from 'mongoose';
import { ISignature, Signature } from '../models/Signature';

export interface CreateSignatureData {
  proposalId: Types.ObjectId;
  citizenName: string;
  dniHash: string;
  email: string;
  isValid: boolean;
}

export class SignatureRepository {
  create(data: CreateSignatureData): Promise<ISignature> {
    return Signature.create(data);
  }

  findByProposalAndDniHash(proposalId: Types.ObjectId, dniHash: string): Promise<ISignature | null> {
    return Signature.findOne({ proposalId, dniHash });
  }

  countValidByProposal(proposalId: Types.ObjectId): Promise<number> {
    return Signature.countDocuments({ proposalId, isValid: true });
  }

  findByProposal(proposalId: Types.ObjectId): Promise<ISignature[]> {
    return Signature.find({ proposalId }).sort({ createdAt: -1 });
  }
}
