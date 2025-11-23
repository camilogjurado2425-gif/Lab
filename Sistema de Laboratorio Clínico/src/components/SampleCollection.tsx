import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { TestTube, Barcode, Search, CheckCircle2 } from 'lucide-react';
import { Badge } from './ui/badge';

type Screen = 'dashboard' | 'patients' | 'appointments' | 'samples' | 'results' | 'history' | 'inventory';

interface SampleCollectionProps {
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
}

export function SampleCollection({ onNavigate, onLogout }: SampleCollectionProps) {
  const [view, setView] = useState<'list' | 'collect'>('list');

  const samples = [
    { id: 'M001', barcode: '7891234567890', patient: 'María García', dni: '12345678A', test: 'Hemograma Completo', date: '2025-11-20 09:15', status: 'Recolectada', technician: 'Dr. López' },
    { id: 'M002', barcode: '7891234567891', patient: 'Juan Pérez', dni: '87654321B', test: 'Glucosa en Sangre', date: '2025-11-20 10:30', status: 'En Proceso', technician: 'Dra. Martínez' },
    { id: 'M003', barcode: '7891234567892', patient: 'Ana López', dni: '11223344C', test: 'Perfil Lipídico', date: '2025-11-20 11:45', status: 'Pendiente', technician: '-' },
    { id: 'M004', barcode: '7891234567893', patient: 'Carlos Ruiz', dni: '55667788D', test: 'Examen de Orina', date: '2025-11-20 08:30', status: 'Recolectada', technician: 'Dr. López' },
  ];

  return (
    <div className="flex">
      <Sidebar currentScreen="samples" onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="flex-1 p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-2">Toma de Muestras</h1>
            <p className="text-gray-600">Registro y seguimiento de muestras de laboratorio</p>
          </div>
          <Button onClick={() => setView(view === 'list' ? 'collect' : 'list')}>
            <TestTube className="w-4 h-4 mr-2" />
            {view === 'list' ? 'Registrar Muestra' : 'Ver Muestras'}
          </Button>
        </div>

        {view === 'list' ? (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Muestras Registradas</CardTitle>
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
                        <SelectItem value="pending">Pendientes</SelectItem>
                        <SelectItem value="collected">Recolectadas</SelectItem>
                        <SelectItem value="processing">En Proceso</SelectItem>
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
                        <th className="text-left py-3 px-4">ID Muestra</th>
                        <th className="text-left py-3 px-4">Código de Barras</th>
                        <th className="text-left py-3 px-4">Paciente</th>
                        <th className="text-left py-3 px-4">DNI</th>
                        <th className="text-left py-3 px-4">Tipo de Examen</th>
                        <th className="text-left py-3 px-4">Fecha/Hora</th>
                        <th className="text-left py-3 px-4">Estado</th>
                        <th className="text-left py-3 px-4">Técnico</th>
                        <th className="text-left py-3 px-4">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {samples.map((sample) => (
                        <tr key={sample.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4">{sample.id}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Barcode className="w-4 h-4 text-gray-400" />
                              {sample.barcode}
                            </div>
                          </td>
                          <td className="py-3 px-4">{sample.patient}</td>
                          <td className="py-3 px-4">{sample.dni}</td>
                          <td className="py-3 px-4">{sample.test}</td>
                          <td className="py-3 px-4">{sample.date}</td>
                          <td className="py-3 px-4">
                            <Badge 
                              variant={
                                sample.status === 'Recolectada' ? 'default' : 
                                sample.status === 'En Proceso' ? 'secondary' : 
                                'outline'
                              }
                            >
                              {sample.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">{sample.technician}</td>
                          <td className="py-3 px-4">
                            <Button variant="outline" size="sm">Ver Detalles</Button>
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
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Muestras Hoy</p>
                      <p className="text-4xl mb-1">24</p>
                    </div>
                    <div className="bg-blue-50 text-blue-600 p-3 rounded-lg">
                      <TestTube className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Pendientes</p>
                      <p className="text-4xl mb-1">5</p>
                    </div>
                    <div className="bg-orange-50 text-orange-600 p-3 rounded-lg">
                      <TestTube className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Completadas</p>
                      <p className="text-4xl mb-1">19</p>
                    </div>
                    <div className="bg-green-50 text-green-600 p-3 rounded-lg">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Registrar Nueva Muestra</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Barcode className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm mb-2">Código de Barras Generado</p>
                      <p className="text-2xl tracking-wider">7891234567894</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="patientSearch">Buscar Paciente</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input id="patientSearch" placeholder="Buscar por nombre, DNI o ID de cita..." className="pl-10" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Información del Paciente</Label>
                    <Input value="María García Rodríguez" disabled />
                  </div>

                  <div className="space-y-2">
                    <Label>DNI</Label>
                    <Input value="12345678A" disabled />
                  </div>

                  <div className="space-y-2">
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
                        <SelectItem value="cultivo">Cultivo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sampleType">Tipo de Muestra</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione tipo de muestra" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sangre">Sangre</SelectItem>
                        <SelectItem value="orina">Orina</SelectItem>
                        <SelectItem value="heces">Heces</SelectItem>
                        <SelectItem value="saliva">Saliva</SelectItem>
                        <SelectItem value="tejido">Tejido</SelectItem>
                        <SelectItem value="otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="collectionDate">Fecha de Recolección</Label>
                    <Input id="collectionDate" type="date" defaultValue="2025-11-20" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="collectionTime">Hora de Recolección</Label>
                    <Input id="collectionTime" type="time" defaultValue="09:30" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="technician">Técnico Responsable</Label>
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
                    <Label htmlFor="storage">Condiciones de Almacenamiento</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione condiciones" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ambiente">Temperatura Ambiente</SelectItem>
                        <SelectItem value="refrigerado">Refrigerado (2-8°C)</SelectItem>
                        <SelectItem value="congelado">Congelado (-20°C)</SelectItem>
                        <SelectItem value="ultracongelado">Ultra Congelado (-80°C)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="observations">Observaciones</Label>
                    <Textarea 
                      id="observations" 
                      placeholder="Observaciones sobre la muestra, condiciones del paciente, etc."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="specialInstructions">Instrucciones Especiales</Label>
                    <Textarea 
                      id="specialInstructions" 
                      placeholder="Instrucciones especiales para el procesamiento de la muestra"
                      rows={2}
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="submit">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Registrar Muestra
                  </Button>
                  <Button type="button" variant="outline">
                    Imprimir Etiqueta
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
