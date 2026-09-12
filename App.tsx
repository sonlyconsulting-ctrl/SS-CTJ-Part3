import React from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import { Layout } from './components/Layout';
import { WelcomeView } from './components/WelcomeView';
import { DayView } from './components/DayView';
import { CheckpointView } from './components/CheckpointView';
import { FinalView } from './components/FinalView';
import { ExportView } from './components/ExportView';
import { UserGuideView } from './components/UserGuideView';
import { PrivacyPolicyView } from './components/PrivacyPolicyView';

const AppContent: React.FC = () => {
  const { state } = useAppContext();
  switch (state.currentView) {
    case 'welcome': return <WelcomeView />;
    case 'day': return <DayView />;
    case 'checkpoint': return <CheckpointView />;
    case 'final': return <FinalView />;
    case 'export': return <ExportView />;
    case 'guide': return <UserGuideView />;
    case 'privacy': return <PrivacyPolicyView />;
    default: return <WelcomeView />;
  }
};

export default function App() {
  return (
    <AppProvider>
      <Layout>
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AppContent />
        </div>
      </Layout>
    </AppProvider>
  );
}
