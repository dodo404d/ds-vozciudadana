import { Schema, model, Types } from 'mongoose';

export interface ILegislativeFile {
  _id: Types.ObjectId;
  proposalId: Types.ObjectId;
  proposalTitle: string;
  author: string;
  signatureCount: number;
  commentCount: number;
  resourceCount: number;
  hashExpediente: string;
  frozenAt: Date;
  commissionAssigned?: string;
  status: 'PENDIENTE_DERIVACION' | 'DERIVADA_COMISION';
  createdAt: Date;
  updatedAt: Date;
}

const legislativeFileSchema = new Schema<ILegislativeFile>(
  {
    proposalId: { type: Schema.Types.ObjectId, ref: 'Proposal', required: true, unique: true },
    proposalTitle: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    signatureCount: { type: Number, required: true },
    commentCount: { type: Number, required: true },
    resourceCount: { type: Number, required: true },
    hashExpediente: { type: String, required: true },
    frozenAt: { type: Date, required: true },
    commissionAssigned: { type: String },
    status: { type: String, enum: ['PENDIENTE_DERIVACION', 'DERIVADA_COMISION'], default: 'PENDIENTE_DERIVACION' }
  },
  { timestamps: true }
);

export const LegislativeFile = model<ILegislativeFile>('LegislativeFile', legislativeFileSchema);
