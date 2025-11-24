import React, { useState, useEffect, useRef } from 'react';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog"; 
import { Button } from "@/components/ui/button"; 
import { TipoVidrioForm, type TipoVidrioFormRef } from './TipoVidrioForm'; 
import type { TipoVidrio, TipoVidrioFormData } from '@/lib/types';
import { updateTipoVidrio } from '@/services/catalogo/tipoVidrioService';
import { getToken } from '@/lib/auth'; 
import { Loader2 } from 'lucide-react'; 

interface EditTipoVidrioDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tipoVidrio: TipoVidrio | null; 
  onTipoVidrioUpdated: (updatedTipoVidrio: TipoVidrio) => void; 
}

export function EditTipoVidrioDialog({ open, onOpenChange, tipoVidrio, onTipoVidrioUpdated }: EditTipoVidrioDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null); 
  const formRef = useRef<TipoVidrioFormRef>(null); 
  const token = getToken(); 

  const handleEditSubmit = async () => {
    const formData = formRef.current?.getFormData();

    if (!tipoVidrio || !formData) {
      setFormError("El nombre del tipo de vidrio es obligatorio.");
      return;
    }

    console.log(`[EditTipoVidrioDialog] Enviando datos actualizados (${tipoVidrio.idTipoVidrio}) al backend:`, formData); // Log

    setIsSubmitting(true);
    setFormError(null); 

    try {
      const updatedTipoVidrio = await updateTipoVidrio(tipoVidrio.idTipoVidrio, formData, token);
      onTipoVidrioUpdated(updatedTipoVidrio); 
      onOpenChange(false); 
    } catch (error) {
      console.error("Error en handleEditSubmit (TipoVidrio):", error);
      setFormError(error instanceof Error ? error.message : "Error al actualizar el tipo de vidrio.");
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

  if (!open || !tipoVidrio) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChangeWithReset}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Tipo de Vidrio</DialogTitle>
          <DialogDescription>Modifica los datos del tipo "{tipoVidrio.nombre}"</DialogDescription>
        </DialogHeader>

        <TipoVidrioForm
          ref={formRef}
          formId={`edit-tipovidrio-${tipoVidrio.idTipoVidrio}`} 
          initialData={{ 
              nombre: tipoVidrio.nombre,
              descripcion: tipoVidrio.descripcion,
              imagenUrl: tipoVidrio.imagenUrl
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