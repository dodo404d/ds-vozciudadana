import { useEffect, useState } from 'react';
import { MessageBox } from '../components/MessageBox';
import { LoadingState } from '../components/LoadingState';
import { StatusBadge } from '../components/StatusBadge';
import { api } from '../services/api';
import type { Proposal } from '../types';

interface ProposalListPageProps {
  onSelectProposal: (proposalId: string) => void;
}

export function ProposalListPage({ onSelectProposal }: ProposalListPageProps) {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadProposals = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await api.listProposals();
      setProposals(response.data);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'No se pudieron cargar las propuestas');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadProposals();
  }, []);

  if (isLoading) {
    return <LoadingState text="Cargando propuestas registradas..." />;
  }

  return (
    <section className="panel page-section">
      <div className="section-heading">
        <div>
          <h2>Propuestas registradas</h2>
          <p>Lista pública de iniciativas legislativas ciudadanas.</p>
        </div>
      </div>

      <MessageBox>
        Al ingresar al detalle de una ley propuesta, el ciudadano podrá dar su apoyo firmando la iniciativa,
        comentando o agregando algún recurso que ayude a sustentar la propuesta.
      </MessageBox>

      {error && <MessageBox type="error">{error}</MessageBox>}

      {proposals.length === 0 ? (
        <div className="empty-state">
          <h3>Aún no hay propuestas registradas</h3>
          <p>Registre una nueva propuesta desde la opción del menú superior.</p>
        </div>
      ) : (
        <div className="proposal-grid">
          {proposals.map((proposal) => (
            <article className="proposal-card" key={proposal._id}>
              <div className="card-topline">
                <StatusBadge status={proposal.status} />
                <span className="signature-counter">
                  {proposal.validSignatureCount}/{proposal.signatureLimit} firmas
                </span>
              </div>
              <h3>{proposal.title}</h3>
              <p>{proposal.summary}</p>
              <p className="muted-text">Autor: {proposal.author}</p>
              <button className="soft-button" type="button" onClick={() => onSelectProposal(proposal._id)}>
                Ver detalle
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
