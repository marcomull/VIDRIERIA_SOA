import React, { useState } from 'react';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { Material } from '@/lib/types'; 
import { deleteMaterial } from '@/services/catalogo/materialService'; 
import { getToken } from '@/lib/auth';
import { Loader2 } from 'lucide-react';

interface DeleteMaterialDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  material: Material | null; 
  onMaterialDeleted: (id: number) => void;
}

export function DeleteMaterialDialog({ open, onOpenChange, material, onMaterialDeleted }: DeleteMaterialDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const token = getToken();

  const handleDeleteConfirm = async () => {
    if (!material) return;

    setIsDeleting(true);
    setDeleteError(null);
    try {
      await deleteMaterial(material.idMaterial, token); 
      onMaterialDeleted(material.idMaterial); 
      onOpenChange(false); 
    } catch (error) {
      console.error("Error en handleDeleteConfirm (Material):", error);
      setDeleteError(error instanceof Error ? error.message : "Error al eliminar el material.");
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
            Esta acción marcará el material "{material?.nombre}" como inactivo (borrado lógico). Podrás reactivarlo si es necesario (si implementas esa función).
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