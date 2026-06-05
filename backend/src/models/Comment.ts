import { Schema, model, Types } from 'mongoose';

export interface IComment {
  _id: Types.ObjectId;
  proposalId: Types.ObjectId;
  citizenName: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new Schema<IComment>(
  {
    proposalId: { type: Schema.Types.ObjectId, ref: 'Proposal', required: true },
    citizenName: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

export const Comment = model<IComment>('Comment', commentSchema);
