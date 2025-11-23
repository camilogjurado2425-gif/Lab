import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { UserPlus, Search, Edit, Eye } from 'lucide-react';
import { Badge } from './ui/badge';

type Screen = 'dashboard' | 'patients' | 'appointments' | 'samples' | 'results' | 'history' | 'inventory';

interface PatientRegistrationProps {
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
}

export function PatientRegistration({ onNavigate, onLogout }: PatientRegistrationProps) {
  const [view, setView] = useState<'list' | 'register'>('list');

  const patients = [
    { id: 'P001', name: 'María García Rodríguez', dni: '12345678A', age: 45, phone: '600123456', email: 'maria.garcia@email.com', status: 'Activo' },
    { id: 'P002', name: 'Juan Pérez López', dni: '87654321B', age: 32, phone: '600234567', email: 'juan.perez@email.com', status: 'Activo' },
    { id: 'P003', name: 'Ana López Martín', dni: '11223344C', age: 28, phone: '600345678', email: 'ana.lopez@email.com', status: 'Activo' },
    { id: 'P004', name: 'Carlos Ruiz Sánchez', dni: '55667788D', age: 56, phone: '600456789', email: 'carlos.ruiz@email.com', status: 'Activo' },
  ];

  return (
    <div className="flex">
      <Sidebar currentScreen="patients" onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="flex-1 p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-2">Registro de Pacientes</h1>
            <p className="text-gray-600">Gestión de información de pacientes</p>
          </div>
          <Button onClick={() => setView(view === 'list' ? 'register' : 'list')}>
            <UserPlus className="w-4 h-4 mr-2" />
            {view === 'list' ? 'Nuevo Paciente' : 'Ver Lista'}
          </Button>
        </div>

        {view === 'list' ? (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Lista de Pacientes</CardTitle>
                <div className="relative w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input placeholder="Buscar por nombre o DNI..." className="pl-10" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4">ID</th>
                      <th className="text-left py-3 px-4">Nombre Completo</th>
                      <th className="text-left py-3 px-4">DNI</th>
                      <th className="text-left py-3 px-4">Edad</th>
                      <th className="text-left py-3 px-4">Teléfono</th>
                      <th className="text-left py-3 px-4">Email</th>
                      <th className="text-left py-3 px-4">Estado</th>
                      <th className="text-left py-3 px-4">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.map((patient) => (
                      <tr key={patient.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">{patient.id}</td>
                        <td className="py-3 px-4">{patient.name}</td>
                        <td className="py-3 px-4">{patient.dni}</td>
                        <td className="py-3 px-4">{patient.age}</td>
                        <td className="py-3 px-4">{patient.phone}</td>
                        <td className="py-3 px-4">{patient.email}</td>
                        <td className="py-3 px-4">
                          <Badge variant="secondary">{patient.status}</Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
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
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Registrar Nuevo Paciente</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Nombre</Label>
                    <Input id="firstName" placeholder="Nombre del paciente" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Apellidos</Label>
                    <Input id="lastName" placeholder="Apellidos del paciente" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dni">DNI/Identificación</Label>
                    <Input id="dni" placeholder="Número de identificación" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
                    <Input id="birthDate" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Género</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione género" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="m">Masculino</SelectItem>
                        <SelectItem value="f">Femenino</SelectItem>
                        <SelectItem value="o">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bloodType">Tipo de Sangre</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione tipo de sangre" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="a+">A+</SelectItem>
                        <SelectItem value="a-">A-</SelectItem>
                        <SelectItem value="b+">B+</SelectItem>
                        <SelectItem value="b-">B-</SelectItem>
                        <SelectItem value="ab+">AB+</SelectItem>
                        <SelectItem value="ab-">AB-</SelectItem>
                        <SelectItem value="o+">O+</SelectItem>
                        <SelectItem value="o-">O-</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input id="phone" type="tel" placeholder="Número de teléfono" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="correo@ejemplo.com" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Dirección</Label>
                    <Input id="address" placeholder="Dirección completa" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="allergies">Alergias</Label>
                    <Textarea id="allergies" placeholder="Indique si el paciente tiene alguna alergia conocida" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="medicalHistory">Historial Médico Relevante</Label>
                    <Textarea id="medicalHistory" placeholder="Condiciones médicas preexistentes, cirugías, etc." />
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button type="submit">Registrar Paciente</Button>
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
