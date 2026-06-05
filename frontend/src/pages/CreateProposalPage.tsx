import { FormEvent, useState } from 'react';
import type { ViewName } from '../App';
import { MessageBox } from '../components/MessageBox';
import { api, type CreateProposalPayload } from '../services/api';

const initialForm: CreateProposalPayload = {
  title: '',
  author: '',
  summary: '',
  legalText: '',
  category: 'Participación ciudadana',
  proposalType: 'Nueva ley'
};

const categories = [
  'Participación ciudadana',
  'Educación',
  'Salud',
  'Transporte',
  'Seguridad ciudadana',
  'Medio ambiente',
  'Trabajo',
  'Economía'
];

const proposalTypes = ['Nueva ley', 'Modificación de ley', 'Derogatoria'];

interface CreateProposalPageProps {
  onNavigate: (view: ViewName) => void;
}

export function CreateProposalPage({ onNavigate }: CreateProposalPageProps) {
  const [form, setForm] = useState<CreateProposalPayload>(initialForm);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const updateField = (field: keyof CreateProposalPayload, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      await api.createProposal(form);
      setForm(initialForm);
      setMessage({ type: 'success', text: '✅ Propuesta registrada correctamente. Redirigiendo a la lista de propuestas...' });
      window.setTimeout(() => onNavigate('proposals'), 900);
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'No se pudo registrar la propuesta' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="panel page-section">
      <div className="section-heading">
        <div>
          <h2>Registrar propuesta legislativa</h2>
          <p>Complete los datos principales de la iniciativa ciudadana.</p>
        </div>
      </div>

      {message && <MessageBox type={message.type}>{message.text}</MessageBox>}

      <form className="form-grid" onSubmit={handleSubmit}>
        <label>
          Título de la propuesta
          <input
            value={form.title}
            onChange={(event) => updateField('title', event.target.value)}
            placeholder="Título: Ley para fortalecer la participación vecinal digital"
            required
          />
        </label>

        <label>
          Autor o colectivo
          <input
            value={form.author}
            onChange={(event) => updateField('author', event.target.value)}
            placeholder="Autor o colectivo: Colectivo Ciudadanos Activos"
            required
          />
        </label>

        <label>
          Categoría
          <select value={form.category} onChange={(event) => updateField('category', event.target.value)} required>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label>
          Tipo de propuesta
          <select value={form.proposalType} onChange={(event) => updateField('proposalType', event.target.value)} required>
            {proposalTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        <label className="span-2">
          Resumen
          <textarea
            value={form.summary}
            onChange={(event) => updateField('summary', event.target.value)}
            placeholder="Resumen: Propuesta para facilitar canales digitales de participación ciudadana."
            required
          />
        </label>

        <label className="span-2">
          Texto normativo
          <textarea
            className="large-textarea"
            value={form.legalText}
            onChange={(event) => updateField('legalText', event.target.value)}
            placeholder="Texto normativo: Artículo 1. Créase un canal digital para la recepción y seguimiento de propuestas ciudadanas."
            required
          />
        </label>

        <div className="form-actions span-2">
          <button className="primary-button" type="submit" disabled={isSaving}>
            {isSaving ? 'Registrando...' : 'Registrar propuesta'}
          </button>
        </div>
      </form>
    </section>
  );
}
