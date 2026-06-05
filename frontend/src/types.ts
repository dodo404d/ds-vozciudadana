export type ProposalStatus = 'ACTIVA' | 'CONGELADA' | 'DERIVADA_COMISION';

export interface Proposal {
  _id: string;
  title: string;
  author: string;
  summary: string;
  legalText: string;
  category: string;
  proposalType: string;
  status: ProposalStatus;
  signatureLimit: number;
  validSignatureCount: number;
  hashExpediente?: string;
  frozenAt?: string;
  commissionAssigned?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommentItem {
  _id: string;
  proposalId: string;
  citizenName: string;
  content: string;
  createdAt: string;
}

export interface ResourceItem {
  _id: string;
  proposalId: string;
  title: string;
  url: string;
  description: string;
  createdAt: string;
}

export interface ProposalDetail {
  proposal: Proposal;
  comments: CommentItem[];
  resources: ResourceItem[];
  signaturesCount: number;
}

export interface ApiResponse<T> {
  message?: string;
  data: T;
}
