"use client"

import { useState, useEffect, FormEvent } from "react";
import { StockVidrio } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";

interface StockVidrioFormProps {
  initialData?: StockVidrio | null;
  tiposVidrioMap: Map<number, string>; // Mapa de ID -> Nombre para el dropdown
  isSubmitting: boolean;
  onSubmit: (formData: Omit<StockVidrio, 'idStockVidrio' | 'fechaIngreso' | 'activo'>) => void;
  onCancel: () => void;
}

// Omitimos los campos que no se editan en el formulario
type FormData = Omit<StockVidrio, 'idStockVidrio' | 'fechaIngreso' | 'activo'>;

export function StockVidrioForm({ 
  initialData, 
  tiposVidrioMap, 
  isSubmitting, 
  onSubmit, 
  onCancel 
}: StockVidrioFormProps) {
  
  const [formData, setFormData] = useState<FormData>({
    idVidrio: initialData?.idVidrio || 0,
    espesor: initialData?.espesor || 0,
    ancho: initialData?.ancho || 0,
    alto: initialData?.alto || 0,
    cantidad: initialData?.cantidad || 1,
    esRetazo: initialData?.esRetazo || false,
    precioM2: initialData?.precioM2 || 0,
    ubicacion: initialData?.ubicacion || "",
  });

  useEffect(() => {
    // Si los datos iniciales cambian (para Editar), actualizamos el formulario
    if (initialData) {
      setFormData({
        idVidrio: initialData.idVidrio,
        espesor: initialData.espesor,
        ancho: initialData.ancho,
        alto: initialData.alto,
        cantidad: initialData.cantidad,
        esRetazo: initialData.esRetazo,
        precioM2: initialData.precioM2,
        ubicacion: initialData.ubicacion,
      });
    } else {
      // Resetea para "Añadir"
      setFormData({
        idVidrio: 0, espesor: 0, ancho: 0, alto: 0, 
        cantidad: 1, esRetazo: false, precioM2: 0, ubicacion: ""
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: name === 'idVidrio' ? parseInt(value) : value
    }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const dataToSubmit = {
      ...formData,
      espesor: parseFloat(String(formData.espesor)),
      ancho: parseFloat(String(formData.ancho)),
      alto: parseFloat(String(formData.alto)),
      cantidad: parseInt(String(formData.cantidad)),
      precioM2: parseFloat(String(formData.precioM2)),
    };
    onSubmit(dataToSubmit);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Tipo de Vidrio (Select) */}
        <div>
          <Label htmlFor="idVidrio">Tipo de Vidrio</Label>
          <Select
            name="idVidrio"
            value={String(formData.idVidrio)}
            onValueChange={(value) => handleSelectChange('idVidrio', value)}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccione un tipo de vidrio" />
            </SelectTrigger>
            <SelectContent>
              {[...tiposVidrioMap.entries()].map(([id, nombre]) => (
                <SelectItem key={id} value={String(id)}>
                  {nombre} (ID: {id})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Espesor */}
        <div>
          <Label htmlFor="espesor">Espesor (mm)</Label>
          <Input id="espesor" name="espesor" type="number" step="0.01" value={formData.espesor} onChange={handleChange} required />
        </div>

        {/* Ancho */}
        <div>
          <Label htmlFor="ancho">Ancho (m)</Label>
          <Input id="ancho" name="ancho" type="number" step="0.01" value={formData.ancho} onChange={handleChange} required />
        </div>

        {/* Alto */}
        <div>
          <Label htmlFor="alto">Alto (m)</Label>
          <Input id="alto" name="alto" type="number" step="0.01" value={formData.alto} onChange={handleChange} required />
        </div>

        {/* Cantidad */}
        <div>
          <Label htmlFor="cantidad">Cantidad</Label>
          <Input id="cantidad" name="cantidad" type="number" step="1" value={formData.cantidad} onChange={handleChange} required />
        </div>

        {/* Precio m² */}
        <div>
          <Label htmlFor="precioM2">Precio por m² (S/)</Label>
          <Input id="precioM2" name="precioM2" type="number" step="0.01" value={formData.precioM2} onChange={handleChange} required />
        </div>
      </div>

      {/* Ubicación */}
      <div>
        <Label htmlFor="ubicacion">Ubicación</Label>
        <Input id="ubicacion" name="ubicacion" type="text" value={formData.ubicacion} onChange={handleChange} placeholder="Ej: Estante A-1" />
      </div>

      {/* Es Retazo */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="esRetazo"
          name="esRetazo"
          checked={formData.esRetazo}
          onCheckedChange={(checked) => handleCheckboxChange('esRetazo', checked as boolean)}
        />
        <Label htmlFor="esRetazo" className="font-medium">
          Marcar si es un retazo
        </Label>
      </div>

      {/* Botones */}
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="ghost" onClick={onCancel} disabled={isSubmitting}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : (initialData ? "Actualizar" : "Guardar")}
        </Button>
      </div>
    </form>
  );
}