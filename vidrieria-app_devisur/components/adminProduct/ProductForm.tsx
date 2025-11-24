import React, { useState, useEffect, useCallback, useImperativeHandle, forwardRef } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImageUploadInput } from '../imgInput/ImageUploadInput';
import type { ProductFormData } from '@/lib/types';

interface ProductFormProps {
  initialData?: Partial<ProductFormData>;
  isSubmitting: boolean;
  formId: string;
  onImageUploadError: (error: string) => void;
}


export interface ProductFormRef {
  getFormData: () => ProductFormData | null;
}

export const ProductForm = forwardRef<ProductFormRef, ProductFormProps>(
  ({ initialData, isSubmitting, formId, onImageUploadError }, ref) => {
    
    const [formData, setFormData] = useState<ProductFormData>({
      nombre: "",
      descripcion: "",
      tipo: "VIDRIO",
      imagenUrl: null,
    });
    useEffect(() => {
      setFormData({
          nombre: initialData?.nombre || "",
          descripcion: initialData?.descripcion || "",
          tipo: initialData?.tipo || "VIDRIO",
          imagenUrl: initialData?.imagenUrl || null,
      });
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (value: string) => {
      setFormData(prev => ({ ...prev, tipo: value }));
    };

    const handleImageUpdate = useCallback((url: string | null) => {
      setFormData(prev => ({ ...prev, imagenUrl: url }));
    },[]);

    useImperativeHandle(ref, () => ({
      getFormData: () => {
        if (formData.nombre.trim()) {
          return formData;
        }
        return null; 
      }
    }));

    return (
      <div className="space-y-4">
        <div>
          <Label htmlFor={`${formId}-nombre`}>Nombre</Label>
          <Input id={`${formId}-nombre`} name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Ej: Mampara Premium" disabled={isSubmitting} required />
        </div>
        <div>
          <Label htmlFor={`${formId}-descripcion`}>Descripción</Label>
          <Textarea id={`${formId}-descripcion`} name="descripcion" value={formData.descripcion} onChange={handleChange} placeholder="Describe el producto..." disabled={isSubmitting} />
        </div>
        <div>
          <Label htmlFor={`${formId}-tipo`}>Tipo</Label>
          <Select value={formData.tipo} onValueChange={handleSelectChange} disabled={isSubmitting}>
            <SelectTrigger id={`${formId}-tipo`}><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="VIDRIO">Vidrio</SelectItem>
              <SelectItem value="MAMPARA">Mampara</SelectItem>
              <SelectItem value="VITRINA">Vitrina</SelectItem>
              <SelectItem value="CUADRO">Cuadro</SelectItem>
              <SelectItem value="VENTANA">Ventana</SelectItem>
              <SelectItem value="ESPEJO">Espejo</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <ImageUploadInput
          label={formData.imagenUrl ? "Cambiar Imagen" : "Subir Imagen"}
          folderName="productos"
          initialImageUrl={formData.imagenUrl}
          onUploadSuccess={handleImageUpdate}
          onUploadError={onImageUploadError}
        />
      </div>
    );
  }
);

ProductForm.displayName = "ProductForm";

