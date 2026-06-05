import { CommentService, CreateCommentRequest } from '../../../services/CommentService';
import { CreateProposalRequest, ProposalService } from '../../../services/ProposalService';
import { CreateResourceRequest, ResourceService } from '../../../services/ResourceService';
import { CreateSignatureRequest, SignatureService } from '../../../services/SignatureService';

export class CitizenProposalFacade {
  private proposalService = new ProposalService();
  private signatureService = new SignatureService();
  private commentService = new CommentService();
  private resourceService = new ResourceService();

  createProposal(data: CreateProposalRequest) {
    return this.proposalService.create(data);
  }

  listProposals() {
    return this.proposalService.list();
  }

  getProposalDetail(id: string) {
    return this.proposalService.detail(id);
  }

  signProposal(proposalId: string, data: CreateSignatureRequest) {
    return this.signatureService.create(proposalId, data);
  }

  addComment(proposalId: string, data: CreateCommentRequest) {
    return this.commentService.create(proposalId, data);
  }

  addResource(proposalId: string, data: CreateResourceRequest) {
    return this.resourceService.create(proposalId, data);
  }
}
