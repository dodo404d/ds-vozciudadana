import { Types } from 'mongoose';
import { ILegislativeFile, LegislativeFile } from '../models/LegislativeFile';

export interface CreateLegislativeFileData {
  proposalId: Types.ObjectId;
  proposalTitle: string;
  author: string;
  signatureCount: number;
  commentCount: number;
  resourceCount: number;
  hashExpediente: string;
  frozenAt: Date;
}

export class LegislativeFileRepository {
  createIfNotExists(data: CreateLegislativeFileData): Promise<ILegislativeFile | null> {
    return LegislativeFile.findOneAndUpdate(
      { proposalId: data.proposalId },
      { $setOnInsert: data },
      { new: true, upsert: true }
    );
  }

  findAll(): Promise<ILegislativeFile[]> {
    return LegislativeFile.find().sort({ createdAt: -1 });
  }

  findByProposal(proposalId: Types.ObjectId): Promise<ILegislativeFile | null> {
    return LegislativeFile.findOne({ proposalId });
  }

  assignCommission(proposalId: string, commissionAssigned: string): Promise<ILegislativeFile | null> {
    return LegislativeFile.findOneAndUpdate(
      { proposalId },
      { commissionAssigned, status: 'DERIVADA_COMISION' },
      { new: true }
    );
  }
}
