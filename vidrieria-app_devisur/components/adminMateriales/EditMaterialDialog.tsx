import React, { useState, useEffect, useRef } from 'react';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MaterialForm, type MaterialFormRef } from './MaterialForm';
import type { Material, MaterialFormData } from '@/lib/types';
import { updateMaterial } from '@/services/catalogo/materialService';
import { getToken } from '@/lib/auth';
import { Loader2 } from 'lucide-react';

interface EditMaterialDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  material: Material | null;
  onMaterialUpdated: (updatedMaterial: Material) => void;
}

export function EditMaterialDialog({ open, onOpenChange, material, onMaterialUpdated }: EditMaterialDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const formRef = useRef<MaterialFormRef>(null);
  const token = getToken();

  const handleEditSubmit = async () => {
    const formData = formRef.current?.getFormData();

    if (!material || !formData) {
      setFormError("Por favor, completa los campos obligatorios (Nombre, Tipo de Material).");
      return;
    }

    console.log(`[EditMaterialDialog] Enviando datos actualizados (${material.idMaterial}) al backend:`, formData);

    setIsSubmitting(true);
    setFormError(null);

    try {
      const updatedMaterial = await updateMaterial(material.idMaterial, formData, token);
      onMaterialUpdated(updatedMaterial);
      onOpenChange(false);
    } catch (error) {
      console.error("Error en handleEditSubmit (Material):", error);
      setFormError(error instanceof Error ? error.message : "Error al actualizar el material.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChangeWithReset = (isOpen: boolean) => {
    onOpenChange(isOpen);
    if (!isOpen) {
      setFormError(null);
      setIsSubmitting(false);
    }
  };

  if (!open || !material) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChangeWithReset}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Material</DialogTitle>
          <DialogDescription>Modifica los datos del material "{material.nombre}"</DialogDescription>
        </DialogHeader>

        <MaterialForm
          ref={formRef}
          formId={`edit-material-${material.idMaterial}`}
          initialData={{
            nombre: material.nombre,
            descripcion: material.descripcion,
            tipoMaterial: material.tipoMaterial,
            imagenUrl: material.imagenUrl
          }}
          isSubmitting={isSubmitting}
          onImageUploadError={setFormError}
        />

        {formError && <p className="text-sm text-red-500 mt-2 px-6">{formError}</p>}

        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChangeWithReset(false)} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button onClick={handleEditSubmit} disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {isSubmitting ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}