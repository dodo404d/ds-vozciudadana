import { Types } from 'mongoose';
import { ProposalRepository } from '../repositories/ProposalRepository';
import { CommentRepository } from '../repositories/CommentRepository';
import { ResourceRepository } from '../repositories/ResourceRepository';
import { SignatureRepository } from '../repositories/SignatureRepository';
import { getSignatureLimit } from '../utils/config';
import { ProposalFactory } from '../patterns/creational/factory/ProposalFactory';
import { HttpError } from '../utils/httpError';

export interface CreateProposalRequest {
  title?: string;
  author?: string;
  summary?: string;
  legalText?: string;
  category?: string;
  proposalType?: string;
}

export class ProposalService {
  private proposalRepository = new ProposalRepository();
  private commentRepository = new CommentRepository();
  private resourceRepository = new ResourceRepository();
  private signatureRepository = new SignatureRepository();
  private proposalFactory = new ProposalFactory();

  async create(data: CreateProposalRequest) {
    this.validateCreateData(data);

    const proposalData = this.proposalFactory.create({
      title: data.title!,
      author: data.author!,
      summary: data.summary!,
      legalText: data.legalText!,
      category: data.category!,
      proposalType: data.proposalType!
    });

    return this.proposalRepository.create(proposalData);
  }

  async list() {
    const proposals = await this.proposalRepository.findAll();
    const demoLimit = getSignatureLimit();

    return proposals.map((proposal) => {
      const plainProposal = (proposal as unknown as { toObject: () => Record<string, unknown> }).toObject();
      return {
        ...plainProposal,
        signatureLimit: proposal.status === 'ACTIVA' ? demoLimit : proposal.signatureLimit
      };
    });
  }

  async detail(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new HttpError(400, 'Identificador de propuesta no válido');
    }

    const proposal = await this.proposalRepository.findById(id);
    if (!proposal) {
      throw new HttpError(404, 'Propuesta no encontrada');
    }

    const proposalId = proposal._id;
    const [comments, resources, signatures] = await Promise.all([
      this.commentRepository.findByProposal(proposalId),
      this.resourceRepository.findByProposal(proposalId),
      this.signatureRepository.findByProposal(proposalId)
    ]);

    return {
      proposal,
      comments,
      resources,
      signaturesCount: signatures.length
    };
  }

  private validateCreateData(data: CreateProposalRequest): void {
    const requiredFields: Array<keyof CreateProposalRequest> = [
      'title',
      'author',
      'summary',
      'legalText',
      'category',
      'proposalType'
    ];

    const hasMissingFields = requiredFields.some((field) => !data[field] || !data[field]!.trim());
    if (hasMissingFields) {
      throw new HttpError(400, 'Todos los campos de la propuesta son obligatorios');
    }
  }
}
