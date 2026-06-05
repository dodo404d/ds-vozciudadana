import type { ProposalStatus } from '../types';

const labels: Record<ProposalStatus, string> = {
  ACTIVA: 'Activa',
  CONGELADA: 'Congelada',
  DERIVADA_COMISION: 'Derivada a comisión'
};

export function StatusBadge({ status }: { status: ProposalStatus }) {
  return <span className={`status-badge status-${status.toLowerCase()}`}>{labels[status]}</span>;
}
