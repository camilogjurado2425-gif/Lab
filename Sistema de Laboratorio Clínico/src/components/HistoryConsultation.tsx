import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { History, Search, Download, FileText, Calendar, TrendingUp, AlertCircle } from 'lucide-react';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

type Screen = 'dashboard' | 'patients' | 'appointments' | 'samples' | 'results' | 'history' | 'inventory';

interface HistoryConsultationProps {
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
}

export function HistoryConsultation({ onNavigate, onLogout }: HistoryConsultationProps) {
  const [selectedPatient, setSelectedPatient] = useState(true);

  const patientInfo = {
    name: 'María García Rodríguez',
    dni: '12345678A',
    age: 45,
    bloodType: 'A+',
    phone: '600123456',
    email: 'maria.garcia@email.com'
  };

  const historyTests = [
    { date: '2025-11-20', test: 'Hemograma Completo', status: 'Completado', abnormal: false },
    { date: '2025-10-15', test: 'Glucosa en Sangre', status: 'Completado', abnormal: true },
    { date: '2025-09-10', test: 'Perfil Lipídico', status: 'Completado', abnormal: false },
    { date: '2025-08-05', test: 'Hemograma Completo', status: 'Completado', abnormal: false },
    { date: '2025-07-01', test: 'TSH', status: 'Completado', abnormal: true },
  ];

  const appointments = [
    { date: '2025-11-20', time: '09:00', test: 'Hemograma Completo', status: 'Completada' },
    { date: '2025-10-15', time: '10:30', test: 'Glucosa en Sangre', status: 'Completada' },
    { date: '2025-12-01', time: '11:00', test: 'Control Anual', status: 'Programada' },
  ];

  const abnormalResults = [
    { date: '2025-10-15', test: 'Glucosa en Sangre', parameter: 'Glucosa', value: '128', normal: '70-100', unit: 'mg/dL' },
    { date: '2025-07-01', test: 'TSH', parameter: 'TSH', value: '5.8', normal: '0.5-5.0', unit: 'mIU/L' },
  ];

  return (
    <div className="flex">
      <Sidebar currentScreen="history" onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Consulta de Historiales</h1>
          <p className="text-gray-600">Historial médico completo de pacientes</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Search Panel */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Buscar Paciente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="searchPatient">Buscar por Nombre o DNI</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input id="searchPatient" placeholder="Buscar paciente..." className="pl-10" />
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm text-gray-600 mb-3">Búsquedas recientes</p>
                <div className="space-y-2">
                  {[
                    { name: 'María García', dni: '12345678A' },
                    { name: 'Juan Pérez', dni: '87654321B' },
                    { name: 'Ana López', dni: '11223344C' },
                  ].map((patient, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedPatient(true)}
                      className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <p className="text-sm">{patient.name}</p>
                      <p className="text-xs text-gray-500">{patient.dni}</p>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Patient History */}
          <div className="lg:col-span-2 space-y-6">
            {selectedPatient ? (
              <>
                {/* Patient Info Card */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Información del Paciente</CardTitle>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Exportar Historial
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Nombre Completo</p>
                        <p>{patientInfo.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">DNI</p>
                        <p>{patientInfo.dni}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Edad</p>
                        <p>{patientInfo.age} años</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Tipo de Sangre</p>
                        <p>{patientInfo.bloodType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Teléfono</p>
                        <p>{patientInfo.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Email</p>
                        <p className="text-sm">{patientInfo.email}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Tabs */}
                <Tabs defaultValue="tests" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="tests">Exámenes</TabsTrigger>
                    <TabsTrigger value="appointments">Citas</TabsTrigger>
                    <TabsTrigger value="abnormal">Valores Anormales</TabsTrigger>
                  </TabsList>

                  <TabsContent value="tests">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">Historial de Exámenes</CardTitle>
                          <Select defaultValue="all">
                            <SelectTrigger className="w-40">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Todos</SelectItem>
                              <SelectItem value="6months">Últimos 6 meses</SelectItem>
                              <SelectItem value="year">Último año</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {historyTests.map((test, index) => (
                            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                              <div className="flex items-start gap-4">
                                <div className="bg-blue-50 text-blue-600 p-3 rounded-lg">
                                  <FileText className="w-5 h-5" />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <p>{test.test}</p>
                                    {test.abnormal && (
                                      <AlertCircle className="w-4 h-4 text-orange-500" />
                                    )}
                                  </div>
                                  <div className="flex items-center gap-4 text-sm text-gray-600">
                                    <span className="flex items-center gap-1">
                                      <Calendar className="w-4 h-4" />
                                      {test.date}
                                    </span>
                                    <Badge variant="secondary">{test.status}</Badge>
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  <FileText className="w-4 h-4 mr-1" />
                                  Ver
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Download className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="appointments">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Historial de Citas</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {appointments.map((appointment, index) => (
                            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                              <div className="flex items-start gap-4">
                                <div className="bg-green-50 text-green-600 p-3 rounded-lg">
                                  <Calendar className="w-5 h-5" />
                                </div>
                                <div>
                                  <p className="mb-1">{appointment.test}</p>
                                  <div className="flex items-center gap-4 text-sm text-gray-600">
                                    <span>{appointment.date}</span>
                                    <span>{appointment.time}</span>
                                    <Badge 
                                      variant={appointment.status === 'Completada' ? 'default' : 'secondary'}
                                    >
                                      {appointment.status}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="abnormal">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <AlertCircle className="w-5 h-5 text-orange-500" />
                          Valores Anormales Detectados
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {abnormalResults.map((result, index) => (
                            <div key={index} className="p-4 border border-orange-200 bg-orange-50 rounded-lg">
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <p className="mb-1">{result.test}</p>
                                  <p className="text-sm text-gray-600">{result.date}</p>
                                </div>
                                <Badge variant="destructive">Anormal</Badge>
                              </div>
                              <div className="grid grid-cols-4 gap-4 text-sm">
                                <div>
                                  <p className="text-gray-600 mb-1">Parámetro</p>
                                  <p>{result.parameter}</p>
                                </div>
                                <div>
                                  <p className="text-gray-600 mb-1">Valor</p>
                                  <p>{result.value} {result.unit}</p>
                                </div>
                                <div>
                                  <p className="text-gray-600 mb-1">Rango Normal</p>
                                  <p>{result.normal} {result.unit}</p>
                                </div>
                                <div className="flex items-end">
                                  <Button variant="outline" size="sm">
                                    <TrendingUp className="w-4 h-4 mr-1" />
                                    Ver Tendencia
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <History className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">Busque un paciente para ver su historial médico</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
