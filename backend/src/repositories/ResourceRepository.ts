import { Types } from 'mongoose';
import { IResource, Resource } from '../models/Resource';

export interface CreateResourceData {
  proposalId: Types.ObjectId;
  title: string;
  url: string;
  description: string;
}

export class ResourceRepository {
  create(data: CreateResourceData): Promise<IResource> {
    return Resource.create(data);
  }

  findByProposal(proposalId: Types.ObjectId): Promise<IResource[]> {
    return Resource.find({ proposalId }).sort({ createdAt: -1 });
  }

  countByProposal(proposalId: Types.ObjectId): Promise<number> {
    return Resource.countDocuments({ proposalId });
  }
}
