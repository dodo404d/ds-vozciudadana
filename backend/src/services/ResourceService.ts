import { Types } from 'mongoose';
import { ProposalRepository } from '../repositories/ProposalRepository';
import { ResourceRepository } from '../repositories/ResourceRepository';
import { HttpError } from '../utils/httpError';

export interface CreateResourceRequest {
  title?: string;
  url?: string;
  description?: string;
}

export class ResourceService {
  private proposalRepository = new ProposalRepository();
  private resourceRepository = new ResourceRepository();

  async create(proposalIdText: string, data: CreateResourceRequest) {
    if (!Types.ObjectId.isValid(proposalIdText)) {
      throw new HttpError(400, 'Identificador de propuesta no válido');
    }

    this.validateResourceData(data);

    const proposal = await this.proposalRepository.findById(proposalIdText);
    if (!proposal) {
      throw new HttpError(404, 'Propuesta no encontrada');
    }

    if (proposal.status !== 'ACTIVA') {
      throw new HttpError(400, 'Esta propuesta ya no acepta recursos');
    }

    return this.resourceRepository.create({
      proposalId: proposal._id,
      title: data.title!.trim(),
      url: data.url!.trim(),
      description: data.description!.trim()
    });
  }

  async listByProposal(proposalIdText: string) {
    if (!Types.ObjectId.isValid(proposalIdText)) {
      throw new HttpError(400, 'Identificador de propuesta no válido');
    }

    return this.resourceRepository.findByProposal(new Types.ObjectId(proposalIdText));
  }

  private validateResourceData(data: CreateResourceRequest): void {
    if (!data.title || !data.title.trim()) {
      throw new HttpError(400, 'El título del recurso es obligatorio');
    }

    if (!data.url || !/^https?:\/\/.+/i.test(data.url.trim())) {
      throw new HttpError(400, 'La URL del recurso debe iniciar con http:// o https://');
    }

    if (!data.description || !data.description.trim()) {
      throw new HttpError(400, 'La descripción del recurso es obligatoria');
    }
  }
}
