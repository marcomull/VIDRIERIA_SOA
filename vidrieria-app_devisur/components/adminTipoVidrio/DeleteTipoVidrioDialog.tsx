// components/admin/DeleteTipoVidrioDialog.tsx
import React, { useState } from 'react';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { TipoVidrio } from '@/lib/types'; 
import { deleteTipoVidrio } from '@/services/catalogo/tipoVidrioService'; 
import { getToken } from '@/lib/auth'; 
import { Loader2 } from 'lucide-react'; 

interface DeleteTipoVidrioDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tipoVidrio: TipoVidrio | null; 
  onTipoVidrioDeleted: (id: number) => void; 
}

export function DeleteTipoVidrioDialog({ open, onOpenChange, tipoVidrio, onTipoVidrioDeleted }: DeleteTipoVidrioDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false); 
  const [deleteError, setDeleteError] = useState<string | null>(null); 
  const token = getToken(); 

  const handleDeleteConfirm = async () => {
    if (!tipoVidrio) return;

    setIsDeleting(true); 
    setDeleteError(null); 
    try {
      await deleteTipoVidrio(tipoVidrio.idTipoVidrio, token);
      onTipoVidrioDeleted(tipoVidrio.idTipoVidrio); 
      onOpenChange(false);
    } catch (error) {
      console.error("Error en handleDeleteConfirm (TipoVidrio):", error);
      setDeleteError(error instanceof Error ? error.message : "Error al eliminar el tipo de vidrio.");
    } finally {
      setIsDeleting(false); 
    }
  };

   const handleOpenChangeWithReset = (isOpen: boolean) => {
      onOpenChange(isOpen);
      if (!isOpen) {
          setDeleteError(null);
          setIsDeleting(false);
      }
  };

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChangeWithReset}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción marcará el tipo de vidrio "{tipoVidrio?.nombre}" como inactivo (borrado lógico).
          </AlertDialogDescription>
        </AlertDialogHeader>
         {deleteError && <p className="text-sm text-red-500 mt-2 px-6">{deleteError}</p>}
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteConfirm}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
             {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {isDeleting ? "Eliminando..." : "Confirmar Eliminación"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}