import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar as CalendarIcon, Clock, Plus, Search } from 'lucide-react';
import { Badge } from './ui/badge';
import { Calendar } from './ui/calendar';

type Screen = 'dashboard' | 'patients' | 'appointments' | 'samples' | 'results' | 'history' | 'inventory';

interface AppointmentManagementProps {
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
}

export function AppointmentManagement({ onNavigate, onLogout }: AppointmentManagementProps) {
  const [view, setView] = useState<'list' | 'schedule'>('list');
  const [date, setDate] = useState<Date | undefined>(new Date());

  const appointments = [
    { id: 'C001', patient: 'María García', dni: '12345678A', date: '2025-11-20', time: '09:00', test: 'Hemograma Completo', status: 'Confirmada' },
    { id: 'C002', patient: 'Juan Pérez', dni: '87654321B', date: '2025-11-20', time: '10:00', test: 'Glucosa en Sangre', status: 'Confirmada' },
    { id: 'C003', patient: 'Ana López', dni: '11223344C', date: '2025-11-20', time: '11:30', test: 'Perfil Lipídico', status: 'Pendiente' },
    { id: 'C004', patient: 'Carlos Ruiz', dni: '55667788D', date: '2025-11-21', time: '08:30', test: 'Examen de Orina', status: 'Confirmada' },
    { id: 'C005', patient: 'Laura Martínez', dni: '99887766E', date: '2025-11-21', time: '14:00', test: 'TSH', status: 'Pendiente' },
  ];

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', 
    '11:00', '11:30', '12:00', '14:00', '14:30', '15:00', 
    '15:30', '16:00', '16:30', '17:00', '17:30', '18:00'
  ];

  return (
    <div className="flex">
      <Sidebar currentScreen="appointments" onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="flex-1 p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-2">Gestión de Citas</h1>
            <p className="text-gray-600">Programación y seguimiento de citas</p>
          </div>
          <Button onClick={() => setView(view === 'list' ? 'schedule' : 'list')}>
            <Plus className="w-4 h-4 mr-2" />
            {view === 'list' ? 'Nueva Cita' : 'Ver Calendario'}
          </Button>
        </div>

        {view === 'list' ? (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Citas Programadas</CardTitle>
                  <div className="flex gap-4">
                    <div className="relative w-60">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input placeholder="Buscar..." className="pl-10" />
                    </div>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas</SelectItem>
                        <SelectItem value="today">Hoy</SelectItem>
                        <SelectItem value="week">Esta semana</SelectItem>
                        <SelectItem value="confirmed">Confirmadas</SelectItem>
                        <SelectItem value="pending">Pendientes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4">ID</th>
                        <th className="text-left py-3 px-4">Paciente</th>
                        <th className="text-left py-3 px-4">DNI</th>
                        <th className="text-left py-3 px-4">Fecha</th>
                        <th className="text-left py-3 px-4">Hora</th>
                        <th className="text-left py-3 px-4">Examen</th>
                        <th className="text-left py-3 px-4">Estado</th>
                        <th className="text-left py-3 px-4">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.map((appointment) => (
                        <tr key={appointment.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4">{appointment.id}</td>
                          <td className="py-3 px-4">{appointment.patient}</td>
                          <td className="py-3 px-4">{appointment.dni}</td>
                          <td className="py-3 px-4">{appointment.date}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-gray-400" />
                              {appointment.time}
                            </div>
                          </td>
                          <td className="py-3 px-4">{appointment.test}</td>
                          <td className="py-3 px-4">
                            <Badge variant={appointment.status === 'Confirmada' ? 'default' : 'secondary'}>
                              {appointment.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">Ver</Button>
                              <Button variant="outline" size="sm">Cancelar</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Citas Hoy</p>
                    <p className="text-4xl mb-1">8</p>
                    <p className="text-sm text-gray-500">2 pendientes de confirmar</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Citas Esta Semana</p>
                    <p className="text-4xl mb-1">35</p>
                    <p className="text-sm text-gray-500">5 pendientes de confirmar</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Tasa de Asistencia</p>
                    <p className="text-4xl mb-1">94%</p>
                    <p className="text-sm text-gray-500">Últimos 30 días</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Seleccionar Fecha</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Agendar Nueva Cita</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="patientSearch">Buscar Paciente</Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input id="patientSearch" placeholder="Buscar por nombre o DNI..." className="pl-10" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="appointmentDate">Fecha de la Cita</Label>
                      <Input id="appointmentDate" type="date" defaultValue="2025-11-20" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="appointmentTime">Hora</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione hora" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="testType">Tipo de Examen</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione tipo de examen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hemograma">Hemograma Completo</SelectItem>
                          <SelectItem value="glucosa">Glucosa en Sangre</SelectItem>
                          <SelectItem value="lipidos">Perfil Lipídico</SelectItem>
                          <SelectItem value="orina">Examen de Orina</SelectItem>
                          <SelectItem value="tiroides">Pruebas de Tiroides</SelectItem>
                          <SelectItem value="hepatico">Perfil Hepático</SelectItem>
                          <SelectItem value="renal">Perfil Renal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="priority">Prioridad</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione prioridad" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="urgente">Urgente</SelectItem>
                          <SelectItem value="muy-urgente">Muy Urgente</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="status">Estado</Label>
                      <Select defaultValue="pendiente">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pendiente">Pendiente</SelectItem>
                          <SelectItem value="confirmada">Confirmada</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="notes">Notas Adicionales</Label>
                      <Input id="notes" placeholder="Instrucciones especiales o preparación requerida" />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit">Agendar Cita</Button>
                    <Button type="button" variant="outline" onClick={() => setView('list')}>
                      Cancelar
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
