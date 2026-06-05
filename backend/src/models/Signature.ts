import { Schema, model, Types } from 'mongoose';

export interface ISignature {
  _id: Types.ObjectId;
  proposalId: Types.ObjectId;
  citizenName: string;
  dniHash: string;
  email: string;
  isValid: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const signatureSchema = new Schema<ISignature>(
  {
    proposalId: { type: Schema.Types.ObjectId, ref: 'Proposal', required: true },
    citizenName: { type: String, required: true, trim: true },
    dniHash: { type: String, required: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    isValid: { type: Boolean, required: true, default: true }
  },
  { timestamps: true }
);

signatureSchema.index({ proposalId: 1, dniHash: 1 }, { unique: true });

export const Signature = model<ISignature>('Signature', signatureSchema);
