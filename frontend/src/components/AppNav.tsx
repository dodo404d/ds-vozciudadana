import type { ViewName } from '../App';

interface AppNavProps {
  currentView: ViewName;
  onNavigate: (view: ViewName) => void;
}

export function AppNav({ currentView, onNavigate }: AppNavProps) {
  const linkClass = (view: ViewName) => (currentView === view ? 'nav-link active' : 'nav-link');

  return (
    <header className="topbar">
      <button className="brand" type="button" onClick={() => onNavigate('home')}>
        VozCiudadana
      </button>
      <nav className="nav-menu" aria-label="Navegación principal">
        <button className={linkClass('home')} type="button" onClick={() => onNavigate('home')}>
          Inicio
        </button>
        <button className={linkClass('create')} type="button" onClick={() => onNavigate('create')}>
          Registrar propuesta
        </button>
        <button className={linkClass('proposals')} type="button" onClick={() => onNavigate('proposals')}>
          Propuestas
        </button>
        <button className={linkClass('congress')} type="button" onClick={() => onNavigate('congress')}>
          Panel Congreso
        </button>
      </nav>
      <span className="mini-label">Mini · Lite</span>
    </header>
  );
}
