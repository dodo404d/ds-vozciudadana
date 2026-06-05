import { CreateProposalData } from '../../../repositories/ProposalRepository';
import { SystemConfigSingleton } from '../singleton/SystemConfigSingleton';

export type ProposalType = 'Nueva ley' | 'Modificación de ley' | 'Derogatoria';

export interface ProposalFactoryInput {
  title: string;
  author: string;
  summary: string;
  legalText: string;
  category: string;
  proposalType: string;
}

export class ProposalFactory {
  private config = SystemConfigSingleton.getInstance();

  create(data: ProposalFactoryInput): CreateProposalData {
    return {
      title: data.title.trim(),
      author: data.author.trim(),
      summary: data.summary.trim(),
      legalText: data.legalText.trim(),
      category: data.category.trim(),
      proposalType: this.normalizeProposalType(data.proposalType),
      signatureLimit: this.config.getSignatureLimit()
    };
  }

  private normalizeProposalType(type: string): ProposalType {
    const normalizedType = type.trim().toLowerCase();

    if (normalizedType.includes('modificación') || normalizedType.includes('modificacion')) {
      return 'Modificación de ley';
    }

    if (normalizedType.includes('derogatoria')) {
      return 'Derogatoria';
    }

    return 'Nueva ley';
  }
}
