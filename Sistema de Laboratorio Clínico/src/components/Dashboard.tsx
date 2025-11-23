import { Sidebar } from './Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Users, Calendar, TestTube, TrendingUp, Clock, AlertCircle } from 'lucide-react';
import { Badge } from './ui/badge';

type Screen = 'dashboard' | 'patients' | 'appointments' | 'samples' | 'results' | 'history' | 'inventory';

interface DashboardProps {
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
}

export function Dashboard({ onNavigate, onLogout }: DashboardProps) {
  const stats = [
    { title: 'Pacientes Hoy', value: '24', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Citas Programadas', value: '18', icon: Calendar, color: 'text-green-600', bg: 'bg-green-50' },
    { title: 'Muestras Pendientes', value: '12', icon: TestTube, color: 'text-orange-600', bg: 'bg-orange-50' },
    { title: 'Resultados Listos', value: '32', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const recentActivities = [
    { time: '10:30 AM', type: 'Muestra', patient: 'María García', test: 'Hemograma Completo' },
    { time: '10:15 AM', type: 'Resultado', patient: 'Juan Pérez', test: 'Glucosa en Sangre' },
    { time: '09:45 AM', type: 'Cita', patient: 'Ana López', test: 'Perfil Lipídico' },
    { time: '09:30 AM', type: 'Muestra', patient: 'Carlos Ruiz', test: 'Examen de Orina' },
    { time: '09:00 AM', type: 'Resultado', patient: 'Laura Martínez', test: 'TSH' },
  ];

  const pendingTests = [
    { id: '001', patient: 'Roberto Sánchez', test: 'Hemograma', status: 'En proceso', priority: 'Alta' },
    { id: '002', patient: 'Patricia Díaz', test: 'Química Sanguínea', status: 'Pendiente', priority: 'Media' },
    { id: '003', patient: 'Miguel Torres', test: 'Cultivo', status: 'En proceso', priority: 'Alta' },
  ];

  return (
    <div className="flex">
      <Sidebar currentScreen="dashboard" onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Dashboard Principal</h1>
          <p className="text-gray-600">Resumen de actividades del laboratorio</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                      <p className="text-3xl">{stat.value}</p>
                    </div>
                    <div className={`${stat.bg} ${stat.color} p-3 rounded-lg`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Actividad Reciente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0">
                    <div className="text-sm text-gray-500 min-w-[70px]">{activity.time}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={activity.type === 'Resultado' ? 'default' : 'secondary'}>
                          {activity.type}
                        </Badge>
                        <span className="text-sm">{activity.patient}</span>
                      </div>
                      <p className="text-sm text-gray-600">{activity.test}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending Tests */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Exámenes Pendientes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingTests.map((test) => (
                  <div key={test.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-sm mb-1">ID: {test.id}</p>
                        <p className="mb-1">{test.patient}</p>
                        <p className="text-sm text-gray-600">{test.test}</p>
                      </div>
                      <Badge variant={test.priority === 'Alta' ? 'destructive' : 'secondary'}>
                        {test.priority}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <Badge variant="outline">{test.status}</Badge>
                      <button className="text-sm text-blue-600 hover:underline">
                        Ver detalles
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
