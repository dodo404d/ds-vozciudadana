import { Schema, model, Types } from 'mongoose';

export interface IResource {
  _id: Types.ObjectId;
  proposalId: Types.ObjectId;
  title: string;
  url: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const resourceSchema = new Schema<IResource>(
  {
    proposalId: { type: Schema.Types.ObjectId, ref: 'Proposal', required: true },
    title: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

export const Resource = model<IResource>('Resource', resourceSchema);
