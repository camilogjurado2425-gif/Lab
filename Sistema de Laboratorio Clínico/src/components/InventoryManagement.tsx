import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Package, Search, Plus, AlertTriangle, TrendingDown, Box } from 'lucide-react';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

type Screen = 'dashboard' | 'patients' | 'appointments' | 'samples' | 'results' | 'history' | 'inventory';

interface InventoryManagementProps {
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
}

export function InventoryManagement({ onNavigate, onLogout }: InventoryManagementProps) {
  const [view, setView] = useState<'list' | 'add'>('list');

  const inventory = [
    { id: 'INV001', name: 'Tubos de Ensayo (5ml)', category: 'Material', stock: 150, min: 100, max: 500, unit: 'unidades', status: 'Óptimo', expiry: '2026-12-31' },
    { id: 'INV002', name: 'Agujas 21G', category: 'Material', stock: 45, min: 50, max: 200, unit: 'unidades', status: 'Bajo', expiry: '2026-06-30' },
    { id: 'INV003', name: 'Reactivo Hemoglobina', category: 'Reactivo', stock: 25, min: 30, max: 100, unit: 'frascos', status: 'Crítico', expiry: '2025-03-15' },
    { id: 'INV004', name: 'Guantes Látex (M)', category: 'Material', stock: 1200, min: 500, max: 2000, unit: 'pares', status: 'Óptimo', expiry: '2027-01-31' },
    { id: 'INV005', name: 'Solución Salina', category: 'Reactivo', stock: 80, min: 50, max: 150, unit: 'litros', status: 'Óptimo', expiry: '2026-09-30' },
    { id: 'INV006', name: 'Portaobjetos', category: 'Material', stock: 320, min: 200, max: 800, unit: 'unidades', status: 'Óptimo', expiry: 'N/A' },
    { id: 'INV007', name: 'Kit Glucosa', category: 'Reactivo', stock: 18, min: 20, max: 80, unit: 'kits', status: 'Crítico', expiry: '2025-05-20' },
  ];

  const getLowStockItems = () => inventory.filter(item => item.status === 'Crítico' || item.status === 'Bajo');

  const getStockPercentage = (current: number, max: number) => (current / max) * 100;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Óptimo': return 'default';
      case 'Bajo': return 'secondary';
      case 'Crítico': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <div className="flex">
      <Sidebar currentScreen="inventory" onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="flex-1 p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-2">Gestión de Inventario</h1>
            <p className="text-gray-600">Control de materiales y reactivos del laboratorio</p>
          </div>
          <Button onClick={() => setView(view === 'list' ? 'add' : 'list')}>
            <Plus className="w-4 h-4 mr-2" />
            {view === 'list' ? 'Agregar Item' : 'Ver Inventario'}
          </Button>
        </div>

        {view === 'list' ? (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Total Items</p>
                      <p className="text-4xl mb-1">{inventory.length}</p>
                    </div>
                    <div className="bg-blue-50 text-blue-600 p-3 rounded-lg">
                      <Package className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Stock Bajo</p>
                      <p className="text-4xl mb-1">{inventory.filter(i => i.status === 'Bajo').length}</p>
                    </div>
                    <div className="bg-orange-50 text-orange-600 p-3 rounded-lg">
                      <TrendingDown className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Stock Crítico</p>
                      <p className="text-4xl mb-1">{inventory.filter(i => i.status === 'Crítico').length}</p>
                    </div>
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg">
                      <AlertTriangle className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Stock Óptimo</p>
                      <p className="text-4xl mb-1">{inventory.filter(i => i.status === 'Óptimo').length}</p>
                    </div>
                    <div className="bg-green-50 text-green-600 p-3 rounded-lg">
                      <Box className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Low Stock Alert */}
            {getLowStockItems().length > 0 && (
              <Card className="border-orange-200 bg-orange-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-800">
                    <AlertTriangle className="w-5 h-5" />
                    Alerta de Stock Bajo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {getLowStockItems().map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                        <div>
                          <p className="text-sm">{item.name}</p>
                          <p className="text-xs text-gray-600">Stock actual: {item.stock} {item.unit} | Mínimo: {item.min} {item.unit}</p>
                        </div>
                        <Badge variant={getStatusColor(item.status)}>{item.status}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Inventory Table */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Inventario Completo</CardTitle>
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
                        <SelectItem value="material">Material</SelectItem>
                        <SelectItem value="reactivo">Reactivo</SelectItem>
                        <SelectItem value="low">Stock Bajo</SelectItem>
                        <SelectItem value="critical">Stock Crítico</SelectItem>
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
                        <th className="text-left py-3 px-4">Nombre</th>
                        <th className="text-left py-3 px-4">Categoría</th>
                        <th className="text-left py-3 px-4">Stock Actual</th>
                        <th className="text-left py-3 px-4">Nivel de Stock</th>
                        <th className="text-left py-3 px-4">Estado</th>
                        <th className="text-left py-3 px-4">Vencimiento</th>
                        <th className="text-left py-3 px-4">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inventory.map((item) => (
                        <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4">{item.id}</td>
                          <td className="py-3 px-4">{item.name}</td>
                          <td className="py-3 px-4">
                            <Badge variant="outline">{item.category}</Badge>
                          </td>
                          <td className="py-3 px-4">{item.stock} {item.unit}</td>
                          <td className="py-3 px-4">
                            <div className="space-y-1">
                              <Progress value={getStockPercentage(item.stock, item.max)} className="h-2" />
                              <p className="text-xs text-gray-600">
                                Min: {item.min} | Max: {item.max}
                              </p>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant={getStatusColor(item.status)}>{item.status}</Badge>
                          </td>
                          <td className="py-3 px-4">
                            <span className={item.expiry !== 'N/A' && new Date(item.expiry) < new Date(Date.now() + 90*24*60*60*1000) ? 'text-orange-600' : ''}>
                              {item.expiry}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">Editar</Button>
                              <Button variant="outline" size="sm">Ajustar</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Agregar Nuevo Item al Inventario</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="itemName">Nombre del Item</Label>
                    <Input id="itemName" placeholder="Ej: Tubos de Ensayo (5ml)" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Categoría</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="material">Material de Laboratorio</SelectItem>
                        <SelectItem value="reactivo">Reactivo</SelectItem>
                        <SelectItem value="equipo">Equipo</SelectItem>
                        <SelectItem value="consumible">Consumible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stockActual">Stock Actual</Label>
                    <Input id="stockActual" type="number" placeholder="0" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="unit">Unidad de Medida</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione unidad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unidades">Unidades</SelectItem>
                        <SelectItem value="cajas">Cajas</SelectItem>
                        <SelectItem value="frascos">Frascos</SelectItem>
                        <SelectItem value="litros">Litros</SelectItem>
                        <SelectItem value="ml">Mililitros</SelectItem>
                        <SelectItem value="kg">Kilogramos</SelectItem>
                        <SelectItem value="g">Gramos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="minStock">Stock Mínimo</Label>
                    <Input id="minStock" type="number" placeholder="0" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxStock">Stock Máximo</Label>
                    <Input id="maxStock" type="number" placeholder="0" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Fecha de Vencimiento</Label>
                    <Input id="expiryDate" type="date" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="supplier">Proveedor</Label>
                    <Input id="supplier" placeholder="Nombre del proveedor" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Ubicación</Label>
                    <Input id="location" placeholder="Ej: Estante A, Nivel 2" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lotNumber">Número de Lote</Label>
                    <Input id="lotNumber" placeholder="Número de lote" />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="notes">Notas Adicionales</Label>
                    <Input id="notes" placeholder="Información adicional sobre el item" />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="submit">Agregar Item</Button>
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
