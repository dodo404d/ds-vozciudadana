import { FormEvent, useEffect, useState } from 'react';
import { LoadingState } from '../components/LoadingState';
import { MessageBox } from '../components/MessageBox';
import { StatusBadge } from '../components/StatusBadge';
import { api, type CreateCommentPayload, type CreateResourcePayload, type CreateSignaturePayload } from '../services/api';
import type { ProposalDetail } from '../types';

const initialSignature: CreateSignaturePayload = { citizenName: '', dni: '', email: '' };
const initialComment: CreateCommentPayload = { citizenName: '', content: '' };
const initialResource: CreateResourcePayload = { title: '', url: '', description: '' };

interface ProposalDetailPageProps {
  proposalId: string;
  onBack: () => void;
}

export function ProposalDetailPage({ proposalId, onBack }: ProposalDetailPageProps) {
  const [detail, setDetail] = useState<ProposalDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notice, setNotice] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [signature, setSignature] = useState(initialSignature);
  const [comment, setComment] = useState(initialComment);
  const [resource, setResource] = useState(initialResource);

  const loadDetail = async () => {
    setIsLoading(true);
    try {
      const response = await api.getProposalDetail(proposalId);
      setDetail(response.data);
    } catch (error) {
      setNotice({ type: 'error', text: error instanceof Error ? error.message : 'No se pudo cargar el detalle' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadDetail();
  }, [proposalId]);

  const isActive = detail?.proposal.status === 'ACTIVA';

  const handleSignature = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNotice(null);
    try {
      await api.createSignature(proposalId, signature);
      setSignature(initialSignature);
      setNotice({ type: 'success', text: '✅ Firma registrada correctamente.' });
      await loadDetail();
    } catch (error) {
      setNotice({ type: 'error', text: error instanceof Error ? error.message : 'No se pudo registrar la firma' });
    }
  };

  const handleComment = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNotice(null);
    try {
      await api.createComment(proposalId, comment);
      setComment(initialComment);
      setNotice({ type: 'success', text: '✅ Comentario agregado correctamente.' });
      await loadDetail();
    } catch (error) {
      setNotice({ type: 'error', text: error instanceof Error ? error.message : 'No se pudo agregar el comentario' });
    }
  };

  const handleResource = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNotice(null);
    try {
      await api.createResource(proposalId, resource);
      setResource(initialResource);
      setNotice({ type: 'success', text: '✅ Recurso agregado correctamente.' });
      await loadDetail();
    } catch (error) {
      setNotice({ type: 'error', text: error instanceof Error ? error.message : 'No se pudo agregar el recurso' });
    }
  };

  if (isLoading && !detail) {
    return <LoadingState text="Cargando detalle de la propuesta..." />;
  }

  if (!detail) {
    return (
      <section className="panel page-section">
        <button className="secondary-button small-button" type="button" onClick={onBack}>
          ← Volver
        </button>
        {notice && <MessageBox type={notice.type}>{notice.text}</MessageBox>}
      </section>
    );
  }

  const { proposal, comments, resources } = detail;

  return (
    <div className="detail-layout">
      <section className="panel page-section detail-card">
        <button className="secondary-button small-button" type="button" onClick={onBack}>
          ← Volver
        </button>

        <div className="card-topline detail-topline">
          <StatusBadge status={proposal.status} />
          <span className="signature-counter">
            {proposal.validSignatureCount}/{proposal.signatureLimit} firmas
          </span>
        </div>

        <h2>{proposal.title}</h2>
        <p className="muted-text">
          Autor: {proposal.author} · Categoría: {proposal.category} · Tipo: {proposal.proposalType}
        </p>

        <h3>Resumen</h3>
        <p>{proposal.summary}</p>

        <h3>Texto normativo</h3>
        <div className="legal-text-box">{proposal.legalText}</div>

        {proposal.hashExpediente && (
          <div className="hash-box">
            <strong>Hash criptográfico del expediente:</strong>
            <span>{proposal.hashExpediente}</span>
          </div>
        )}

        {proposal.status !== 'ACTIVA' && (
          <div className="hash-box">
            <strong>Expediente congelado:</strong>
            <span>
              Firmas: {proposal.validSignatureCount} · Comentarios: {comments.length} · Recursos: {resources.length}
            </span>
          </div>
        )}
      </section>

      {notice && <MessageBox type={notice.type}>{notice.text}</MessageBox>}

      <section className="action-grid">
        <form className="panel action-card" onSubmit={handleSignature}>
          <h3>Firmar propuesta</h3>
          {!isActive && <p className="muted-text">Esta propuesta ya no acepta firmas.</p>}
          <input
            value={signature.citizenName}
            onChange={(event) => setSignature((current) => ({ ...current, citizenName: event.target.value }))}
            placeholder="Nombre y apellidos: María Pérez Doy"
            disabled={!isActive}
            required
          />
          <input
            value={signature.dni}
            onChange={(event) => setSignature((current) => ({ ...current, dni: event.target.value }))}
            placeholder="DNI: 12345678"
            disabled={!isActive}
            required
          />
          <input
            value={signature.email}
            onChange={(event) => setSignature((current) => ({ ...current, email: event.target.value }))}
            placeholder="Correo: mili@gmail.com"
            disabled={!isActive}
            required
          />
          <button className="primary-button full-button" type="submit" disabled={!isActive}>
            Registrar firma
          </button>
        </form>

        <form className="panel action-card" onSubmit={handleComment}>
          <h3>Comentar</h3>
          {!isActive && <p className="muted-text">Esta propuesta ya no acepta comentarios.</p>}
          <input
            value={comment.citizenName}
            onChange={(event) => setComment((current) => ({ ...current, citizenName: event.target.value }))}
            placeholder="Nombre y apellidos: Carlos Rivera Torres"
            disabled={!isActive}
            required
          />
          <textarea
            value={comment.content}
            onChange={(event) => setComment((current) => ({ ...current, content: event.target.value }))}
            placeholder="Comentario: La propuesta debería incluir mecanismos de seguimiento ciudadano."
            disabled={!isActive}
            required
          />
          <button className="soft-button full-button" type="submit" disabled={!isActive}>
            Agregar comentario
          </button>
        </form>

        <form className="panel action-card" onSubmit={handleResource}>
          <h3>Agregar recurso</h3>
          {!isActive && <p className="muted-text">Esta propuesta ya no acepta recursos.</p>}
          <input
            value={resource.title}
            onChange={(event) => setResource((current) => ({ ...current, title: event.target.value }))}
            placeholder="Título del recurso: Informe de participación ciudadana"
            disabled={!isActive}
            required
          />
          <input
            value={resource.url}
            onChange={(event) => setResource((current) => ({ ...current, url: event.target.value }))}
            placeholder="URL o enlace: https://ejemplo.pe/informe-participacion.pdf"
            disabled={!isActive}
            required
          />
          <textarea
            value={resource.description}
            onChange={(event) => setResource((current) => ({ ...current, description: event.target.value }))}
            placeholder="Descripción: Documento de apoyo para sustentar la propuesta legislativa."
            disabled={!isActive}
            required
          />
          <button className="soft-button full-button" type="submit" disabled={!isActive}>
            Agregar recurso
          </button>
        </form>
      </section>

      <section className="panel compact-section">
        <h3>Comentarios</h3>
        {comments.length === 0 ? (
          <p className="muted-text">Aún no hay comentarios registrados para esta propuesta.</p>
        ) : (
          comments.map((item) => (
            <article className="list-item" key={item._id}>
              <strong>{item.citizenName}</strong>
              <p>{item.content}</p>
            </article>
          ))
        )}
      </section>

      <section className="panel compact-section">
        <h3>Recursos de apoyo</h3>
        {resources.length === 0 ? (
          <p className="muted-text">Aún no hay recursos de apoyo registrados para esta propuesta.</p>
        ) : (
          resources.map((item) => (
            <article className="list-item" key={item._id}>
              <strong>{item.title}</strong>
              <a href={item.url} target="_blank" rel="noreferrer">
                {item.url}
              </a>
              <p>{item.description}</p>
            </article>
          ))
        )}
      </section>
    </div>
  );
}
