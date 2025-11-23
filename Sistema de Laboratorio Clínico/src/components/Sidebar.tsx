import { 
  LayoutDashboard, 
  UserPlus, 
  Calendar, 
  TestTube, 
  FileText, 
  History, 
  Package,
  LogOut,
  FlaskConical
} from 'lucide-react';
import { Button } from './ui/button';

type Screen = 'dashboard' | 'patients' | 'appointments' | 'samples' | 'results' | 'history' | 'inventory';

interface SidebarProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
}

export function Sidebar({ currentScreen, onNavigate, onLogout }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard' as Screen, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'patients' as Screen, label: 'Registro de Pacientes', icon: UserPlus },
    { id: 'appointments' as Screen, label: 'Gestión de Citas', icon: Calendar },
    { id: 'samples' as Screen, label: 'Toma de Muestras', icon: TestTube },
    { id: 'results' as Screen, label: 'Registro de Resultados', icon: FileText },
    { id: 'history' as Screen, label: 'Consulta de Historiales', icon: History },
    { id: 'inventory' as Screen, label: 'Gestión de Inventario', icon: Package },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <FlaskConical className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-sm">Lab Clínico</h1>
            <p className="text-xs text-gray-500">Sistema de Gestión</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3"
          onClick={onLogout}
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm">Cerrar Sesión</span>
        </Button>
      </div>
    </div>
  );
}
