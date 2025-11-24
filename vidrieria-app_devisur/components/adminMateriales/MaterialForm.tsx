import React, { useState, useEffect, useCallback, useImperativeHandle, forwardRef } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploadInput } from '../imgInput/ImageUploadInput';
import type { MaterialFormData } from '@/lib/types'; 

interface MaterialFormProps {
  initialData?: Partial<MaterialFormData>;
  isSubmitting: boolean;
  formId: string;
  onImageUploadError: (error: string) => void;
}

export interface MaterialFormRef {
  getFormData: () => MaterialFormData | null;
}

export const MaterialForm = forwardRef<MaterialFormRef, MaterialFormProps>(
  ({ initialData, isSubmitting, formId, onImageUploadError }, ref) => {

    const [formData, setFormData] = useState<MaterialFormData>({
      nombre: "",
      descripcion: "",
      tipoMaterial: "", 
      imagenUrl: null,
    });

    useEffect(() => {
      setFormData({
        nombre: initialData?.nombre || "",
        descripcion: initialData?.descripcion || "",
        tipoMaterial: initialData?.tipoMaterial || "", 
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
        if (formData.nombre.trim() && formData.tipoMaterial.trim()) {
          return formData;
        }
        return null; 
      }
    }));

    return (
      <div className="space-y-4">
        <div>
          <Label htmlFor={`${formId}-nombre`}>Nombre</Label>
          <Input id={`${formId}-nombre`} name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Ej: Aluminio Premium" disabled={isSubmitting} required />
        </div>
        <div>
          <Label htmlFor={`${formId}-descripcion`}>Descripción</Label>
          <Textarea id={`${formId}-descripcion`} name="descripcion" value={formData.descripcion} onChange={handleChange} placeholder="Describe el material..." disabled={isSubmitting} />
        </div>
        <div>
          <Label htmlFor={`${formId}-tipoMaterial`}>Tipo de Material</Label>
          <Input id={`${formId}-tipoMaterial`} name="tipoMaterial" value={formData.tipoMaterial} onChange={handleChange} placeholder="Ej: Marco, Panel, Accesorio" disabled={isSubmitting} required />
        </div>
        <ImageUploadInput
          label={formData.imagenUrl ? "Cambiar Imagen" : "Subir Imagen"}
          folderName="materiales" 
          initialImageUrl={formData.imagenUrl}
          onUploadSuccess={handleImageUpdate}
          onUploadError={onImageUploadError}
        />
      </div>
    );
  }
);

MaterialForm.displayName = "MaterialForm";