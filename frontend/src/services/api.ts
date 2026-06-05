import type { ApiResponse, LegislativeFile, Proposal, ProposalDetail } from '../types';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000/api';
const CONGRESS_ACCESS_TOKEN = import.meta.env.VITE_CONGRESS_ACCESS_TOKEN ?? 'demo-congreso';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers ?? {})
    },
    ...options
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.message ?? 'Ocurrió un error al comunicarse con el servidor');
  }

  return payload as T;
}

function congressHeaders(): HeadersInit {
  return {
    'x-congress-access': CONGRESS_ACCESS_TOKEN
  };
}

export interface CreateProposalPayload {
  title: string;
  author: string;
  summary: string;
  legalText: string;
  category: string;
  proposalType: string;
}

export interface CreateSignaturePayload {
  citizenName: string;
  dni: string;
  email: string;
}

export interface CreateCommentPayload {
  citizenName: string;
  content: string;
}

export interface CreateResourcePayload {
  title: string;
  url: string;
  description: string;
}

export const api = {
  async createProposal(payload: CreateProposalPayload) {
    return request<ApiResponse<Proposal>>('/proposals', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },

  async listProposals() {
    return request<ApiResponse<Proposal[]>>('/proposals');
  },

  async getProposalDetail(id: string) {
    return request<ApiResponse<ProposalDetail>>(`/proposals/${id}`);
  },

  async createSignature(proposalId: string, payload: CreateSignaturePayload) {
    return request<ApiResponse<{ proposal: Proposal }>>(`/proposals/${proposalId}/signatures`, {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },

  async createComment(proposalId: string, payload: CreateCommentPayload) {
    return request<ApiResponse<unknown>>(`/proposals/${proposalId}/comments`, {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },

  async createResource(proposalId: string, payload: CreateResourcePayload) {
    return request<ApiResponse<unknown>>(`/proposals/${proposalId}/resources`, {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },

  async listLegislativeFiles() {
    return request<ApiResponse<LegislativeFile[]>>('/congress/legislative-files', {
      headers: congressHeaders()
    });
  },

  async listCommissions() {
    return request<ApiResponse<string[]>>('/congress/commissions', {
      headers: congressHeaders()
    });
  },

  async assignCommission(proposalId: string, commission: string) {
    return request<ApiResponse<LegislativeFile>>(`/congress/proposals/${proposalId}/commission`, {
      method: 'PATCH',
      headers: congressHeaders(),
      body: JSON.stringify({ commission })
    });
  }
};
