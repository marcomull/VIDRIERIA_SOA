"use client"

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { StockMaterialForm } from "./StockMaterialForm";
import { StockMaterial } from "@/lib/types";
import { getToken } from "@/lib/auth";
import { updateStockMaterial } from "@/services/inventario/stockService";
import { useToast } from "@/components/ui/use-toast";

interface EditStockMaterialDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onStockUpdated: () => void;
  stockItem: StockMaterial | null;
  tiposMaterialMap: Map<number, string>;
}

export function EditStockMaterialDialog({ isOpen, onClose, onStockUpdated, stockItem, tiposMaterialMap }: EditStockMaterialDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = getToken();
  const { toast } = useToast();

  const handleSubmit = async (formData: Omit<StockMaterial, 'idStockMaterial' | 'fechaIngreso' | 'activo'>) => {
    if (!stockItem) return;
    
    setIsSubmitting(true);
    try {
      await updateStockMaterial(stockItem.idStockMaterial, formData, token);
      toast({
        title: "Éxito",
        description: "Stock de material actualizado. El historial ha sido actualizado.",
      });
      onStockUpdated();
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
          <DialogTitle>Editar Stock de Material (ID: {stockItem?.idStockMaterial})</DialogTitle>
          <DialogDescription>
            Modifique los detalles del item. Cualquier cambio de cantidad se registrará en el Kardex.
          </DialogDescription>
        </DialogHeader>
        <StockMaterialForm
          initialData={stockItem}
          tiposMaterialMap={tiposMaterialMap}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}