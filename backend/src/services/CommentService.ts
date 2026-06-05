import { Types } from 'mongoose';
import { CommentRepository } from '../repositories/CommentRepository';
import { ProposalRepository } from '../repositories/ProposalRepository';
import { HttpError } from '../utils/httpError';

export interface CreateCommentRequest {
  citizenName?: string;
  content?: string;
}

export class CommentService {
  private proposalRepository = new ProposalRepository();
  private commentRepository = new CommentRepository();

  async create(proposalIdText: string, data: CreateCommentRequest) {
    if (!Types.ObjectId.isValid(proposalIdText)) {
      throw new HttpError(400, 'Identificador de propuesta no válido');
    }

    if (!data.citizenName || !data.citizenName.trim() || !data.content || !data.content.trim()) {
      throw new HttpError(400, 'El nombre y el comentario son obligatorios');
    }

    const proposal = await this.proposalRepository.findById(proposalIdText);
    if (!proposal) {
      throw new HttpError(404, 'Propuesta no encontrada');
    }

    if (proposal.status !== 'ACTIVA') {
      throw new HttpError(400, 'Esta propuesta ya no acepta comentarios');
    }

    return this.commentRepository.create({
      proposalId: proposal._id,
      citizenName: data.citizenName.trim(),
      content: data.content.trim()
    });
  }

  async listByProposal(proposalIdText: string) {
    if (!Types.ObjectId.isValid(proposalIdText)) {
      throw new HttpError(400, 'Identificador de propuesta no válido');
    }

    return this.commentRepository.findByProposal(new Types.ObjectId(proposalIdText));
  }
}
