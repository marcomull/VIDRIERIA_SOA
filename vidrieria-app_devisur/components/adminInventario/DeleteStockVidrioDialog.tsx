"use client"

import { useState } from "react";
import { 
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, 
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle 
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { StockVidrio } from "@/lib/types";
import { getToken } from "@/lib/auth";
import { deleteStockVidrio } from "@/services/inventario/stockService";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

interface DeleteStockVidrioDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onStockDeleted: () => void; // Para refrescar la lista
  stockItem: StockVidrio | null;
}

export function DeleteStockVidrioDialog({ isOpen, onClose, onStockDeleted, stockItem }: DeleteStockVidrioDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const token = getToken();
  const { toast } = useToast();

  const handleDelete = async () => {
    if (!stockItem) return;

    setIsDeleting(true);
    try {
      await deleteStockVidrio(stockItem.idStockVidrio, token);
      toast({
        title: "Éxito",
        description: `Stock ID ${stockItem.idStockVidrio} dado de baja (Rotura). El historial ha sido actualizado.`,
      });
      onStockDeleted(); // Llama a refrescar la lista
      onClose();
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "No se pudo eliminar el item.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción dará de baja el item de stock (ID: {stockItem?.idStockVidrio}) y registrará el movimiento como
            <span className="font-bold text-destructive"> BAJA POR ROTURA</span> en el Kardex. 
            Esta acción no se puede deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Confirmar Baja"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}