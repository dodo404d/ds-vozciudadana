import { Types } from 'mongoose';
import { buildLegislativeFileHash } from '../../../utils/hash';
import { LegislativeFileComposite, LegislativeFileLeaf } from '../../structural/composite/LegislativeFileComposite';

export interface LegislativeFileBuildInput {
  proposalId: Types.ObjectId;
  title: string;
  author: string;
  summary: string;
  legalText: string;
  signatureCount: number;
  commentCount: number;
  resourceCount: number;
  frozenAt: Date;
}

export interface LegislativeFileBuildResult {
  proposalId: Types.ObjectId;
  proposalTitle: string;
  author: string;
  signatureCount: number;
  commentCount: number;
  resourceCount: number;
  hashExpediente: string;
  frozenAt: Date;
  compositePayload: Record<string, unknown>;
}

export class LegislativeFileBuilder {
  build(data: LegislativeFileBuildInput): LegislativeFileBuildResult {
    const expediente = new LegislativeFileComposite('expedienteLegislativo');

    expediente.add(
      new LegislativeFileLeaf('propuesta', {
        proposalId: data.proposalId.toString(),
        title: data.title,
        author: data.author,
        summary: data.summary,
        legalText: data.legalText
      })
    );

    expediente.add(
      new LegislativeFileLeaf('aportesCiudadanos', {
        signatureCount: data.signatureCount,
        commentCount: data.commentCount,
        resourceCount: data.resourceCount
      })
    );

    expediente.add(
      new LegislativeFileLeaf('congelamiento', {
        frozenAt: data.frozenAt.toISOString()
      })
    );

    const compositePayload = expediente.getHashPayload();
    const hashExpediente = buildLegislativeFileHash({
      proposalId: data.proposalId.toString(),
      title: data.title,
      author: data.author,
      summary: data.summary,
      legalText: data.legalText,
      signatureCount: data.signatureCount,
      commentCount: data.commentCount,
      resourceCount: data.resourceCount,
      frozenAt: data.frozenAt.toISOString(),
      compositePayload
    });

    return {
      proposalId: data.proposalId,
      proposalTitle: data.title,
      author: data.author,
      signatureCount: data.signatureCount,
      commentCount: data.commentCount,
      resourceCount: data.resourceCount,
      hashExpediente,
      frozenAt: data.frozenAt,
      compositePayload
    };
  }
}
