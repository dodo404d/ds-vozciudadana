import { IProposal } from '../models/Proposal';
import { CommentRepository } from '../repositories/CommentRepository';
import { LegislativeFileRepository } from '../repositories/LegislativeFileRepository';
import { ProposalRepository } from '../repositories/ProposalRepository';
import { ResourceRepository } from '../repositories/ResourceRepository';
import { SignatureRepository } from '../repositories/SignatureRepository';
import { buildLegislativeFileHash } from '../utils/hash';

export class ProposalFreezeService {
  private proposalRepository = new ProposalRepository();
  private signatureRepository = new SignatureRepository();
  private commentRepository = new CommentRepository();
  private resourceRepository = new ResourceRepository();
  private legislativeFileRepository = new LegislativeFileRepository();

  async freezeIfLimitReached(proposal: IProposal): Promise<IProposal> {
    if (proposal.status !== 'ACTIVA') {
      return proposal;
    }

    if (proposal.validSignatureCount < proposal.signatureLimit) {
      return proposal;
    }

    const proposalId = proposal._id;
    const signatureCount = await this.signatureRepository.countValidByProposal(proposalId);
    const commentCount = await this.commentRepository.countByProposal(proposalId);
    const resourceCount = await this.resourceRepository.countByProposal(proposalId);
    const frozenAt = new Date();

    const hashExpediente = buildLegislativeFileHash({
      proposalId: proposalId.toString(),
      title: proposal.title,
      author: proposal.author,
      summary: proposal.summary,
      legalText: proposal.legalText,
      signatureCount,
      commentCount,
      resourceCount,
      frozenAt: frozenAt.toISOString()
    });

    const frozenProposal = await this.proposalRepository.freeze(proposalId, hashExpediente, frozenAt);

    await this.legislativeFileRepository.createIfNotExists({
      proposalId,
      proposalTitle: proposal.title,
      author: proposal.author,
      signatureCount,
      commentCount,
      resourceCount,
      hashExpediente,
      frozenAt
    });

    return frozenProposal ?? proposal;
  }
}
