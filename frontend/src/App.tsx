import { useState } from 'react';
import { AppNav } from './components/AppNav';
import { CongressPanelPage } from './pages/CongressPanelPage';
import { CreateProposalPage } from './pages/CreateProposalPage';
import { HomePage } from './pages/HomePage';
import { ProposalDetailPage } from './pages/ProposalDetailPage';
import { ProposalListPage } from './pages/ProposalListPage';

export type ViewName = 'home' | 'create' | 'proposals' | 'detail' | 'congress';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewName>('home');
  const [selectedProposalId, setSelectedProposalId] = useState<string | null>(null);

  const navigate = (view: ViewName) => {
    if (view !== 'detail') {
      setSelectedProposalId(null);
    }
    setCurrentView(view);
  };

  const openProposalDetail = (proposalId: string) => {
    setSelectedProposalId(proposalId);
    setCurrentView('detail');
  };

  return (
    <div className="app-shell">
      <AppNav currentView={currentView} onNavigate={navigate} />
      <main className="main-content">
        {currentView === 'home' && <HomePage onNavigate={navigate} />}
        {currentView === 'create' && <CreateProposalPage onNavigate={navigate} />}
        {currentView === 'proposals' && <ProposalListPage onSelectProposal={openProposalDetail} />}
        {currentView === 'detail' && selectedProposalId && (
          <ProposalDetailPage proposalId={selectedProposalId} onBack={() => navigate('proposals')} />
        )}
        {currentView === 'congress' && <CongressPanelPage />}
      </main>
    </div>
  );
}
