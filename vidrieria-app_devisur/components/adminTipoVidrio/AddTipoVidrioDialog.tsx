import React, { useState, useRef } from 'react';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog"; 
import { Button } from "@/components/ui/button"; 
import { TipoVidrioForm, type TipoVidrioFormRef } from './TipoVidrioForm'; 
import type { TipoVidrioFormData, TipoVidrio } from '@/lib/types'; 
import { createTipoVidrio } from '@/services/catalogo/tipoVidrioService'; 
import { getToken } from '@/lib/auth'; 
import { Loader2 } from 'lucide-react';

interface AddTipoVidrioDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTipoVidrioAdded: (newTipoVidrio: TipoVidrio) => void;
}

export function AddTipoVidrioDialog({ open, onOpenChange, onTipoVidrioAdded }: AddTipoVidrioDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const formRef = useRef<TipoVidrioFormRef>(null); 
  const token = getToken();

  const handleAddSubmit = async () => {
    const formData = formRef.current?.getFormData();

    if (!formData) {
        setFormError("El nombre del tipo de vidrio es obligatorio.");
        return;
    }

    setIsSubmitting(true); 
    setFormError(null); 
    try {
      const newTipoVidrio = await createTipoVidrio(formData, token);
      onTipoVidrioAdded(newTipoVidrio); 
      onOpenChange(false); 
    } catch (error) {
      console.error("Error en handleAddSubmit (TipoVidrio):", error);
      setFormError(error instanceof Error ? error.message : "Error al agregar el tipo de vidrio.");
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
          <DialogTitle>Agregar Nuevo Tipo de Vidrio</DialogTitle>
          <DialogDescription>Completa los datos y sube una imagen opcional.</DialogDescription>
        </DialogHeader>

        <TipoVidrioForm
          ref={formRef}
          formId="add-tipovidrio" 
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
             {isSubmitting ? "Agregando..." : "Agregar Tipo Vidrio"}
           </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}