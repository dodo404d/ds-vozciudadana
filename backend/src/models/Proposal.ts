import { Schema, model, Types } from 'mongoose';

export type ProposalStatus = 'ACTIVA' | 'CONGELADA' | 'DERIVADA_COMISION';

export interface IProposal {
  _id: Types.ObjectId;
  title: string;
  author: string;
  summary: string;
  legalText: string;
  category: string;
  proposalType: string;
  status: ProposalStatus;
  signatureLimit: number;
  validSignatureCount: number;
  hashExpediente?: string;
  frozenAt?: Date;
  commissionAssigned?: string;
  createdAt: Date;
  updatedAt: Date;
}

const proposalSchema = new Schema<IProposal>(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    summary: { type: String, required: true, trim: true },
    legalText: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    proposalType: { type: String, required: true, trim: true },
    status: { type: String, enum: ['ACTIVA', 'CONGELADA', 'DERIVADA_COMISION'], default: 'ACTIVA' },
    signatureLimit: { type: Number, required: true, default: 3 },
    validSignatureCount: { type: Number, required: true, default: 0 },
    hashExpediente: { type: String },
    frozenAt: { type: Date },
    commissionAssigned: { type: String }
  },
  { timestamps: true }
);

export const Proposal = model<IProposal>('Proposal', proposalSchema);
