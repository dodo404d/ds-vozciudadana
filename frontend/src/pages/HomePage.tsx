import type { ViewName } from '../App';

interface HomePageProps {
  onNavigate: (view: ViewName) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <section className="hero panel">
      <p className="eyebrow">PLATAFORMA DIGITAL MINI</p>
      <h1>VozCiudadana</h1>
      <p className="hero-text">
        Sistema sencillo para registrar propuestas legislativas ciudadanas, recolectar firmas,
        agregar comentarios y preparar un expediente congelado para revisión del Congreso.
      </p>
      <div className="hero-actions">
        <button className="primary-button" type="button" onClick={() => onNavigate('create')}>
          Registrar propuesta
        </button>
        <button className="secondary-button" type="button" onClick={() => onNavigate('proposals')}>
          Ver propuestas
        </button>
        <button className="secondary-button" type="button" onClick={() => onNavigate('congress')}>
          Panel Congreso
        </button>
      </div>
    </section>
  );
}
