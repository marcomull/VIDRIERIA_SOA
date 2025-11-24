"use client"

import { useState, useEffect, FormEvent } from "react";
import { StockMaterial } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";

interface StockMaterialFormProps {
  initialData?: StockMaterial | null;
  tiposMaterialMap: Map<number, string>; // Mapa de ID -> Nombre para el dropdown
  isSubmitting: boolean;
  onSubmit: (formData: Omit<StockMaterial, 'idStockMaterial' | 'fechaIngreso' | 'activo'>) => void;
  onCancel: () => void;
}

type FormData = Omit<StockMaterial, 'idStockMaterial' | 'fechaIngreso' | 'activo'>;

export function StockMaterialForm({ 
  initialData, 
  tiposMaterialMap, 
  isSubmitting, 
  onSubmit, 
  onCancel 
}: StockMaterialFormProps) {
  
  const [formData, setFormData] = useState<FormData>({
    idMaterial: initialData?.idMaterial || 0,
    largo: initialData?.largo || 0,
    cantidad: initialData?.cantidad || 1,
    esRetazo: initialData?.esRetazo || false,
    precioMetro: initialData?.precioMetro || 0,
    ubicacion: initialData?.ubicacion || "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        idMaterial: initialData.idMaterial,
        largo: initialData.largo,
        cantidad: initialData.cantidad,
        esRetazo: initialData.esRetazo,
        precioMetro: initialData.precioMetro,
        ubicacion: initialData.ubicacion,
      });
    } else {
      setFormData({
        idMaterial: 0, largo: 0, cantidad: 1, esRetazo: false, precioMetro: 0, ubicacion: ""
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
      [name]: name === 'idMaterial' ? parseInt(value) : value
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
      largo: parseFloat(String(formData.largo)),
      cantidad: parseInt(String(formData.cantidad)),
      precioMetro: parseFloat(String(formData.precioMetro)),
    };
    onSubmit(dataToSubmit);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Tipo de Material (Select) */}
        <div>
          <Label htmlFor="idMaterial">Tipo de Material</Label>
          <Select
            name="idMaterial"
            value={String(formData.idMaterial)}
            onValueChange={(value) => handleSelectChange('idMaterial', value)}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccione un tipo de material" />
            </SelectTrigger>
            <SelectContent>
              {[...tiposMaterialMap.entries()].map(([id, nombre]) => (
                <SelectItem key={id} value={String(id)}>
                  {nombre} (ID: {id})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Largo */}
        <div>
          <Label htmlFor="largo">Largo (m)</Label>
          <Input id="largo" name="largo" type="number" step="0.01" value={formData.largo} onChange={handleChange} required />
        </div>

        {/* Cantidad */}
        <div>
          <Label htmlFor="cantidad">Cantidad</Label>
          <Input id="cantidad" name="cantidad" type="number" step="1" value={formData.cantidad} onChange={handleChange} required />
        </div>

        {/* Precio por Metro */}
        <div>
          <Label htmlFor="precioMetro">Precio por Metro (S/)</Label>
          <Input id="precioMetro" name="precioMetro" type="number" step="0.01" value={formData.precioMetro} onChange={handleChange} required />
        </div>
      </div>

      {/* Ubicación */}
      <div>
        <Label htmlFor="ubicacion">Ubicación</Label>
        <Input id="ubicacion" name="ubicacion" type="text" value={formData.ubicacion} onChange={handleChange} placeholder="Ej: Pasillo B-1" />
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