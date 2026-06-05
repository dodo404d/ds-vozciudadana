import { Types } from 'mongoose';
import { Comment, IComment } from '../models/Comment';

export interface CreateCommentData {
  proposalId: Types.ObjectId;
  citizenName: string;
  content: string;
}

export class CommentRepository {
  create(data: CreateCommentData): Promise<IComment> {
    return Comment.create(data);
  }

  findByProposal(proposalId: Types.ObjectId): Promise<IComment[]> {
    return Comment.find({ proposalId }).sort({ createdAt: -1 });
  }

  countByProposal(proposalId: Types.ObjectId): Promise<number> {
    return Comment.countDocuments({ proposalId });
  }
}
