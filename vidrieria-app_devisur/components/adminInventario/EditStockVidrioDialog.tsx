"use client"

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { StockVidrioForm } from "./StockVidrioForm";
import { StockVidrio } from "@/lib/types";
import { getToken } from "@/lib/auth";
import { updateStockVidrio } from "@/services/inventario/stockService";
import { useToast } from "@/components/ui/use-toast";

interface EditStockVidrioDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onStockUpdated: () => void; // Para refrescar la lista
  stockItem: StockVidrio | null;
  tiposVidrioMap: Map<number, string>;
}

export function EditStockVidrioDialog({ isOpen, onClose, onStockUpdated, stockItem, tiposVidrioMap }: EditStockVidrioDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = getToken();
  const { toast } = useToast();

  const handleSubmit = async (formData: Omit<StockVidrio, 'idStockVidrio' | 'fechaIngreso' | 'activo'>) => {
    if (!stockItem) return;
    
    setIsSubmitting(true);
    try {
      await updateStockVidrio(stockItem.idStockVidrio, formData, token);
      toast({
        title: "Éxito",
        description: "Stock de vidrio actualizado. El historial ha sido actualizado.",
      });
      onStockUpdated(); // Llama a refrescar la lista
      onClose();
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "No se pudo actualizar el item.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Editar Stock de Vidrio (ID: {stockItem?.idStockVidrio})</DialogTitle>
          <DialogDescription>
            Modifique los detalles del item. Cualquier cambio de cantidad se registrará en el Kardex.
          </DialogDescription>
        </DialogHeader>
        <StockVidrioForm
          initialData={stockItem}
          tiposVidrioMap={tiposVidrioMap}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}