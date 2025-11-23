import { useState } from 'react';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { PatientRegistration } from './components/PatientRegistration';
import { AppointmentManagement } from './components/AppointmentManagement';
import { SampleCollection } from './components/SampleCollection';
import { ResultsRegistration } from './components/ResultsRegistration';
import { HistoryConsultation } from './components/HistoryConsultation';
import { InventoryManagement } from './components/InventoryManagement';

type Screen = 'login' | 'dashboard' | 'patients' | 'appointments' | 'samples' | 'results' | 'history' | 'inventory';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentScreen('login');
  };

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {currentScreen === 'dashboard' && <Dashboard onNavigate={navigateTo} onLogout={handleLogout} />}
      {currentScreen === 'patients' && <PatientRegistration onNavigate={navigateTo} onLogout={handleLogout} />}
      {currentScreen === 'appointments' && <AppointmentManagement onNavigate={navigateTo} onLogout={handleLogout} />}
      {currentScreen === 'samples' && <SampleCollection onNavigate={navigateTo} onLogout={handleLogout} />}
      {currentScreen === 'results' && <ResultsRegistration onNavigate={navigateTo} onLogout={handleLogout} />}
      {currentScreen === 'history' && <HistoryConsultation onNavigate={navigateTo} onLogout={handleLogout} />}
      {currentScreen === 'inventory' && <InventoryManagement onNavigate={navigateTo} onLogout={handleLogout} />}
    </div>
  );
}
