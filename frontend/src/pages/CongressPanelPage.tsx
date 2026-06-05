import { useEffect, useMemo, useState } from 'react';
import { LoadingState } from '../components/LoadingState';
import { MessageBox } from '../components/MessageBox';
import { api } from '../services/api';
import type { LegislativeFile, LegislativeFileStatus, ProposalDetail } from '../types';

type CongressViewMode = 'cards' | 'list';

type Notice = { type: 'success' | 'error' | 'info'; text: string } | null;

const statusLabels: Record<LegislativeFileStatus, string> = {
  PENDIENTE_DERIVACION: 'Para derivar',
  DERIVADA_COMISION: 'Derivada a comisión'
};

function CongressStatusBadge({ status }: { status: LegislativeFileStatus }) {
  const className = status === 'DERIVADA_COMISION' ? 'status-derivada_comision' : 'status-congelada';
  return <span className={`status-badge ${className}`}>{statusLabels[status]}</span>;
}

export function CongressPanelPage() {
  const [files, setFiles] = useState<LegislativeFile[]>([]);
  const [commissions, setCommissions] = useState<string[]>([]);
  const [selectedCommissions, setSelectedCommissions] = useState<Record<string, string>>({});
  const [selectedDetail, setSelectedDetail] = useState<ProposalDetail | null>(null);
  const [viewMode, setViewMode] = useState<CongressViewMode>('cards');
  const [isLoading, setIsLoading] = useState(true);
  const [notice, setNotice] = useState<Notice>(null);

  const pendingFiles = useMemo(
    () => files.filter((file) => file.status === 'PENDIENTE_DERIVACION').length,
    [files]
  );

  const loadCongressData = async () => {
    setIsLoading(true);
    try {
      const [filesResponse, commissionsResponse] = await Promise.all([
        api.listLegislativeFiles(),
        api.listCommissions()
      ]);
      setFiles(filesResponse.data);
      setCommissions(commissionsResponse.data);
    } catch (error) {
      setNotice({ type: 'error', text: error instanceof Error ? error.message : 'No se pudo cargar el Panel Congreso' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadCongressData();
  }, []);

  const handleCommissionChange = (proposalId: string, commission: string) => {
    setSelectedCommissions((current) => ({ ...current, [proposalId]: commission }));
  };

  const handleAssignCommission = async (file: LegislativeFile) => {
    const commission = (selectedCommissions[file.proposalId] ?? file.commissionAssigned ?? '').trim();

    if (!commission) {
      setNotice({ type: 'error', text: 'Debe seleccionar una comisión antes de asignar.' });
      return;
    }

    try {
      await api.assignCommission(file.proposalId, commission);
      setNotice({ type: 'success', text: '✅ Comisión asignada correctamente.' });
      await loadCongressData();
    } catch (error) {
      setNotice({ type: 'error', text: error instanceof Error ? error.message : 'No se pudo asignar la comisión' });
    }
  };

  const handleShowDetail = async (file: LegislativeFile) => {
    setNotice(null);
    try {
      const response = await api.getProposalDetail(file.proposalId);
      setSelectedDetail(response.data);
    } catch (error) {
      setNotice({ type: 'error', text: error instanceof Error ? error.message : 'No se pudo obtener el detalle' });
    }
  };

  if (isLoading && files.length === 0) {
    return <LoadingState text="Cargando Panel Congreso..." />;
  }

  return (
    <div className="detail-layout">
      <section className="panel page-section">
        <div className="section-heading congress-heading">
          <div>
            <h2>Panel Congreso</h2>
            <p>
              Revisión de expedientes congelados. Hay {pendingFiles} propuesta(s) pendiente(s) de derivación.
            </p>
          </div>
          <div className="view-switcher">
            <button
              className={viewMode === 'cards' ? 'primary-button small-button' : 'secondary-button small-button'}
              type="button"
              onClick={() => setViewMode('cards')}
            >
              Vista tarjetas
            </button>
            <button
              className={viewMode === 'list' ? 'primary-button small-button' : 'secondary-button small-button'}
              type="button"
              onClick={() => setViewMode('list')}
            >
              Vista lista
            </button>
          </div>
        </div>

        {notice && <MessageBox type={notice.type}>{notice.text}</MessageBox>}

        {files.length === 0 ? (
          <div className="empty-state">
            <h3>No hay expedientes congelados</h3>
            <p>Cuando una propuesta llegue a 3 firmas, aparecerá en este panel.</p>
          </div>
        ) : viewMode === 'cards' ? (
          <div className="congress-card-grid">
            {files.map((file) => (
              <article className="congress-card" key={file._id}>
                <div className="card-topline">
                  <CongressStatusBadge status={file.status} />
                  <span className="signature-counter">{file.signatureCount} firmas</span>
                </div>

                <h3>{file.proposalTitle}</h3>
                <p className="muted-text">Autor: {file.author}</p>

                <div className="hash-box">
                  <strong>Hash del expediente</strong>
                  <span>{file.hashExpediente}</span>
                </div>

                <p>
                  <strong>Comentarios:</strong> {file.commentCount} · <strong>Recursos:</strong> {file.resourceCount}
                </p>

                {file.commissionAssigned && (
                  <p>
                    <strong>Comisión asignada:</strong> {file.commissionAssigned}
                  </p>
                )}

                <div className="congress-actions">
                  <button className="secondary-button small-button" type="button" onClick={() => handleShowDetail(file)}>
                    Ver detalle
                  </button>

                  <select
                    value={selectedCommissions[file.proposalId] ?? ''}
                    onChange={(event) => handleCommissionChange(file.proposalId, event.target.value)}
                    disabled={file.status === 'DERIVADA_COMISION'}
                  >
                    <option value="">Seleccionar comisión</option>
                    {commissions.map((commission) => (
                      <option key={commission} value={commission}>
                        {commission}
                      </option>
                    ))}
                  </select>

                  <button
                    className="primary-button small-button"
                    type="button"
                    onClick={() => handleAssignCommission(file)}
                    disabled={file.status === 'DERIVADA_COMISION'}
                  >
                    Asignar comisión
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="congress-table-wrap">
            <table className="congress-table">
              <thead>
                <tr>
                  <th>Propuesta</th>
                  <th>Firmas</th>
                  <th>Estado</th>
                  <th>Comisión</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file) => (
                  <tr key={file._id}>
                    <td>{file.proposalTitle}</td>
                    <td>{file.signatureCount}</td>
                    <td>{statusLabels[file.status]}</td>
                    <td>{file.commissionAssigned ?? 'Sin asignar'}</td>
                    <td>
                      <button className="secondary-button small-button" type="button" onClick={() => handleShowDetail(file)}>
                        Ver detalle
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {selectedDetail && (
        <section className="panel page-section congress-detail-panel">
          <div className="section-heading">
            <div>
              <h2>Detalle de ley propuesta</h2>
              <p className="muted-text">Información completa para revisión congresal.</p>
            </div>
            <button className="secondary-button small-button" type="button" onClick={() => setSelectedDetail(null)}>
              Cerrar detalle
            </button>
          </div>

          <h3>{selectedDetail.proposal.title}</h3>
          <p className="muted-text">
            Autor: {selectedDetail.proposal.author} · Categoría: {selectedDetail.proposal.category} · Tipo:{' '}
            {selectedDetail.proposal.proposalType}
          </p>
          <p>{selectedDetail.proposal.summary}</p>

          <h3>Texto normativo</h3>
          <div className="legal-text-box">{selectedDetail.proposal.legalText}</div>

          {selectedDetail.proposal.hashExpediente && (
            <div className="hash-box">
              <strong>Hash criptográfico</strong>
              <span>{selectedDetail.proposal.hashExpediente}</span>
            </div>
          )}

          <div className="congress-detail-stats">
            <strong>Firmas:</strong> {selectedDetail.proposal.validSignatureCount} · <strong>Comentarios:</strong>{' '}
            {selectedDetail.comments.length} · <strong>Recursos:</strong> {selectedDetail.resources.length}
          </div>
        </section>
      )}
    </div>
  );
}
