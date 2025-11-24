import React, { useState, useRef } from 'react';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MaterialForm, type MaterialFormRef } from './MaterialForm';
import type { MaterialFormData, Material } from '@/lib/types'; 
import { createMaterial } from '@/services/catalogo/materialService'; 
import { getToken } from '@/lib/auth';
import { Loader2 } from 'lucide-react';

interface AddMaterialDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMaterialAdded: (newMaterial: Material) => void; 
}

export function AddMaterialDialog({ open, onOpenChange, onMaterialAdded }: AddMaterialDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const formRef = useRef<MaterialFormRef>(null); 
  const token = getToken();

  const handleAddSubmit = async () => {
    const formData = formRef.current?.getFormData();

    if (!formData) {
        setFormError("Por favor, completa los campos obligatorios (Nombre, Tipo de Material).");
        return;
    }

    console.log("[AddMaterialDialog] Enviando datos al backend:", formData);

    setIsSubmitting(true);
    setFormError(null);
    try {
      const newMaterial = await createMaterial(formData, token);
      onMaterialAdded(newMaterial); 
      onOpenChange(false); 
    } catch (error) {
      console.error("Error en handleAddSubmit (Material):", error);
      setFormError(error instanceof Error ? error.message : "Error al agregar el material.");
      // No cierra el diálogo si hay error
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

  return (
    <Dialog open={open} onOpenChange={handleOpenChangeWithReset}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Material</DialogTitle>
          <DialogDescription>Completa los datos del material y sube una imagen opcional.</DialogDescription>
        </DialogHeader>

        <MaterialForm
          ref={formRef}
          formId="add-material"
          isSubmitting={isSubmitting}
          onImageUploadError={setFormError}
        />

         {formError && <p className="text-sm text-red-500 mt-2 px-6">{formError}</p>}

        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChangeWithReset(false)} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button onClick={handleAddSubmit} disabled={isSubmitting}>
             {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
             {isSubmitting ? "Agregando..." : "Agregar Material"} 
           </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}