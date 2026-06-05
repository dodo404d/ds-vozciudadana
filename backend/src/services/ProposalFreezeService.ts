import { IProposal } from '../models/Proposal';
import { LegislativeFileBuilder } from '../patterns/creational/builder/LegislativeFileBuilder';
import { CommentRepository } from '../repositories/CommentRepository';
import { LegislativeFileRepository } from '../repositories/LegislativeFileRepository';
import { ProposalRepository } from '../repositories/ProposalRepository';
import { ResourceRepository } from '../repositories/ResourceRepository';
import { SignatureRepository } from '../repositories/SignatureRepository';

export class ProposalFreezeService {
  private proposalRepository = new ProposalRepository();
  private signatureRepository = new SignatureRepository();
  private commentRepository = new CommentRepository();
  private resourceRepository = new ResourceRepository();
  private legislativeFileRepository = new LegislativeFileRepository();
  private legislativeFileBuilder = new LegislativeFileBuilder();

  async freezeIfLimitReached(proposal: IProposal): Promise<IProposal> {
    if (proposal.status !== 'ACTIVA') {
      return proposal;
    }

    if (proposal.validSignatureCount < proposal.signatureLimit) {
      return proposal;
    }

    const proposalId = proposal._id;
    const [signatureCount, commentCount, resourceCount] = await Promise.all([
      this.signatureRepository.countValidByProposal(proposalId),
      this.commentRepository.countByProposal(proposalId),
      this.resourceRepository.countByProposal(proposalId)
    ]);
    const frozenAt = new Date();

    const legislativeFile = this.legislativeFileBuilder.build({
      proposalId,
      title: proposal.title,
      author: proposal.author,
      summary: proposal.summary,
      legalText: proposal.legalText,
      signatureCount,
      commentCount,
      resourceCount,
      frozenAt
    });

    const frozenProposal = await this.proposalRepository.freeze(
      proposalId,
      legislativeFile.hashExpediente,
      frozenAt
    );

    await this.legislativeFileRepository.createIfNotExists({
      proposalId,
      proposalTitle: legislativeFile.proposalTitle,
      author: legislativeFile.author,
      signatureCount: legislativeFile.signatureCount,
      commentCount: legislativeFile.commentCount,
      resourceCount: legislativeFile.resourceCount,
      hashExpediente: legislativeFile.hashExpediente,
      frozenAt: legislativeFile.frozenAt
    });

    return frozenProposal ?? proposal;
  }
}
