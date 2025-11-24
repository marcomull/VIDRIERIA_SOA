// components/admin/TipoVidrioForm.tsx
import React, { useState, useEffect, useCallback, useImperativeHandle, forwardRef } from 'react';
import { Input } from "@/components/ui/input"; //
import { Label } from "@/components/ui/label"; //
import { Textarea } from "@/components/ui/textarea"; //
import { ImageUploadInput } from '../imgInput/ImageUploadInput'; //
import type { TipoVidrioFormData } from '@/lib/types'; // Tipo específico

interface TipoVidrioFormProps {
  initialData?: Partial<TipoVidrioFormData>;
  isSubmitting: boolean;
  formId: string;
  onImageUploadError: (error: string) => void;
}

export interface TipoVidrioFormRef {
  getFormData: () => TipoVidrioFormData | null;
}

export const TipoVidrioForm = forwardRef<TipoVidrioFormRef, TipoVidrioFormProps>(
  ({ initialData, isSubmitting, formId, onImageUploadError }, ref) => {

    const [formData, setFormData] = useState<TipoVidrioFormData>({
      nombre: "",
      descripcion: "",
      imagenUrl: null, 
    });

    useEffect(() => {
      setFormData({
        nombre: initialData?.nombre || "",
        descripcion: initialData?.descripcion || "",
        imagenUrl: initialData?.imagenUrl || null,
      });
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpdate = useCallback((url: string | null) => {
      setFormData(prev => ({ ...prev, imagenUrl: url }));
    }, []);

    useImperativeHandle(ref, () => ({
      getFormData: () => {
        if (formData.nombre.trim()) {
          return formData;
        }
        console.error("El nombre del tipo de vidrio es obligatorio");
        return null; 
      }
    }));

    return (
      <div className="space-y-4">
        <div>
          <Label htmlFor={`${formId}-nombre`}>Nombre</Label>
          <Input
            id={`${formId}-nombre`}
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ej: Vidrio Templado 6mm"
            disabled={isSubmitting}
            required 
          />
        </div>
        <div>
          <Label htmlFor={`${formId}-descripcion`}>Descripción</Label>
          <Textarea
            id={`${formId}-descripcion`}
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Describe el tipo de vidrio..."
            disabled={isSubmitting}
          />
        </div>
        <ImageUploadInput
          label={formData.imagenUrl ? "Cambiar Imagen" : "Subir Imagen"}
          folderName="tipos_vidrio" 
          initialImageUrl={formData.imagenUrl}
          onUploadSuccess={handleImageUpdate}
          onUploadError={onImageUploadError}
        />
      </div>
    );
  }
);

TipoVidrioForm.displayName = "TipoVidrioForm";