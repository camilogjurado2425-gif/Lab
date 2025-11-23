import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { FileText, Search, Download, Send, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Badge } from './ui/badge';

type Screen = 'dashboard' | 'patients' | 'appointments' | 'samples' | 'results' | 'history' | 'inventory';

interface ResultsRegistrationProps {
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
}

export function ResultsRegistration({ onNavigate, onLogout }: ResultsRegistrationProps) {
  const [view, setView] = useState<'list' | 'register'>('list');

  const results = [
    { id: 'R001', sampleId: 'M001', patient: 'María García', test: 'Hemograma Completo', date: '2025-11-20', status: 'Completado', reviewed: true, abnormal: false },
    { id: 'R002', sampleId: 'M002', patient: 'Juan Pérez', test: 'Glucosa en Sangre', date: '2025-11-20', status: 'En Revisión', reviewed: false, abnormal: true },
    { id: 'R003', sampleId: 'M004', patient: 'Carlos Ruiz', test: 'Examen de Orina', date: '2025-11-20', status: 'Pendiente', reviewed: false, abnormal: false },
    { id: 'R004', sampleId: 'M005', patient: 'Laura Martínez', test: 'TSH', date: '2025-11-19', status: 'Completado', reviewed: true, abnormal: false },
  ];

  return (
    <div className="flex">
      <Sidebar currentScreen="results" onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="flex-1 p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-2">Registro de Resultados</h1>
            <p className="text-gray-600">Ingreso y validación de resultados de laboratorio</p>
          </div>
          <Button onClick={() => setView(view === 'list' ? 'register' : 'list')}>
            <FileText className="w-4 h-4 mr-2" />
            {view === 'list' ? 'Ingresar Resultado' : 'Ver Resultados'}
          </Button>
        </div>

        {view === 'list' ? (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Resultados de Laboratorio</CardTitle>
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
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="pending">Pendientes</SelectItem>
                        <SelectItem value="review">En Revisión</SelectItem>
                        <SelectItem value="completed">Completados</SelectItem>
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
                        <th className="text-left py-3 px-4">ID Resultado</th>
                        <th className="text-left py-3 px-4">ID Muestra</th>
                        <th className="text-left py-3 px-4">Paciente</th>
                        <th className="text-left py-3 px-4">Tipo de Examen</th>
                        <th className="text-left py-3 px-4">Fecha</th>
                        <th className="text-left py-3 px-4">Estado</th>
                        <th className="text-left py-3 px-4">Revisión</th>
                        <th className="text-left py-3 px-4">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((result) => (
                        <tr key={result.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4">{result.id}</td>
                          <td className="py-3 px-4">{result.sampleId}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              {result.abnormal && (
                                <AlertTriangle className="w-4 h-4 text-orange-500" />
                              )}
                              {result.patient}
                            </div>
                          </td>
                          <td className="py-3 px-4">{result.test}</td>
                          <td className="py-3 px-4">{result.date}</td>
                          <td className="py-3 px-4">
                            <Badge 
                              variant={
                                result.status === 'Completado' ? 'default' : 
                                result.status === 'En Revisión' ? 'secondary' : 
                                'outline'
                              }
                            >
                              {result.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            {result.reviewed ? (
                              <CheckCircle2 className="w-5 h-5 text-green-600" />
                            ) : (
                              <span className="text-sm text-gray-400">Pendiente</span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <FileText className="w-4 h-4 mr-1" />
                                Ver
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Send className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Resultados Hoy</p>
                    <p className="text-4xl mb-1">18</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Pendientes</p>
                    <p className="text-4xl mb-1">6</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">En Revisión</p>
                    <p className="text-4xl mb-1">3</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Valores Anormales</p>
                    <p className="text-4xl mb-1">2</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Ingresar Nuevo Resultado</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="sampleSearch">Buscar Muestra</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input id="sampleSearch" placeholder="Buscar por ID de muestra o paciente..." className="pl-10" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>ID Muestra</Label>
                    <Input value="M001" disabled />
                  </div>

                  <div className="space-y-2">
                    <Label>Paciente</Label>
                    <Input value="María García Rodríguez" disabled />
                  </div>

                  <div className="space-y-2">
                    <Label>Tipo de Examen</Label>
                    <Input value="Hemograma Completo" disabled />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="resultDate">Fecha de Resultado</Label>
                    <Input id="resultDate" type="date" defaultValue="2025-11-20" />
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg mb-4">Parámetros del Examen</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-4 gap-4 bg-gray-50 p-3 rounded-lg">
                      <div>
                        <Label className="text-xs">Parámetro</Label>
                      </div>
                      <div>
                        <Label className="text-xs">Valor</Label>
                      </div>
                      <div>
                        <Label className="text-xs">Unidad</Label>
                      </div>
                      <div>
                        <Label className="text-xs">Rango Normal</Label>
                      </div>
                    </div>

                    {[
                      { param: 'Glóbulos Rojos', unit: 'mill/mm³', range: '4.5-5.5' },
                      { param: 'Glóbulos Blancos', unit: 'mil/mm³', range: '4.0-11.0' },
                      { param: 'Hemoglobina', unit: 'g/dL', range: '12.0-16.0' },
                      { param: 'Hematocrito', unit: '%', range: '36-46' },
                      { param: 'Plaquetas', unit: 'mil/mm³', range: '150-400' },
                    ].map((item, index) => (
                      <div key={index} className="grid grid-cols-4 gap-4 items-center">
                        <div>
                          <p className="text-sm">{item.param}</p>
                        </div>
                        <div>
                          <Input type="number" step="0.01" placeholder="0.00" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">{item.unit}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">{item.range}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="technician">Técnico Analista</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione técnico" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lopez">Dr. López</SelectItem>
                        <SelectItem value="martinez">Dra. Martínez</SelectItem>
                        <SelectItem value="garcia">Dr. García</SelectItem>
                        <SelectItem value="rodriguez">Dra. Rodríguez</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="equipment">Equipo Utilizado</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione equipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="eq1">Analizador Hematológico A1</SelectItem>
                        <SelectItem value="eq2">Analizador Bioquímico B2</SelectItem>
                        <SelectItem value="eq3">Microscopio M3</SelectItem>
                        <SelectItem value="eq4">Espectrofotómetro E4</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="observations">Observaciones</Label>
                    <Textarea 
                      id="observations" 
                      placeholder="Observaciones sobre los resultados, valores anormales, etc."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="interpretation">Interpretación</Label>
                    <Textarea 
                      id="interpretation" 
                      placeholder="Interpretación clínica de los resultados"
                      rows={3}
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="submit">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Guardar Resultado
                  </Button>
                  <Button type="button" variant="outline">
                    Enviar para Revisión
                  </Button>
                  <Button type="button" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Generar PDF
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setView('list')}>
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
