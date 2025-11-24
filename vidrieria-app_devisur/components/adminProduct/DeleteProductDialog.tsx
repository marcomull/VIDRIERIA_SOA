import React, { useState } from 'react';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { Product } from '@/lib/types'; 
import { deleteProduct } from '@/services/catalogo/productService'; 
import { getToken } from '@/lib/auth';
import { Loader2 } from 'lucide-react'; 

interface DeleteProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
  onProductDeleted: (id: number) => void; 
}

export function DeleteProductDialog({ open, onOpenChange, product, onProductDeleted }: DeleteProductDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const token = getToken();

  const handleDeleteConfirm = async () => {
    if (!product) return;

    setIsDeleting(true);
    setDeleteError(null); 
    try {
      await deleteProduct(product.idProducto, token); 
      onProductDeleted(product.idProducto); 
      onOpenChange(false); 
    } catch (error) {
      console.error("Error en handleDeleteConfirm:", error);
      setDeleteError(error instanceof Error ? error.message : "Error al eliminar el producto.");
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
            Esta acción marcará el producto "{product?.nombre}" como inactivo (borrado lógico). No se puede deshacer.
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
            {isDeleting ? "Eliminando..." : "Eliminar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
