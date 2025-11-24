"use client"

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { StockMaterialForm } from "./StockMaterialForm";
import { StockMaterial } from "@/lib/types";
import { getToken } from "@/lib/auth";
import { createStockMaterial } from "@/services/inventario/stockService";
import { useToast } from "@/components/ui/use-toast";

interface AddStockMaterialDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onStockAdded: () => void;
  tiposMaterialMap: Map<number, string>;
}

export function AddStockMaterialDialog({ isOpen, onClose, onStockAdded, tiposMaterialMap }: AddStockMaterialDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = getToken();
  const { toast } = useToast();

  const handleSubmit = async (formData: Omit<StockMaterial, 'idStockMaterial' | 'fechaIngreso' | 'activo'>) => {
    setIsSubmitting(true);
    try {
      await createStockMaterial(formData, token);
      toast({
        title: "Éxito",
        description: "Nuevo stock de material creado. El historial ha sido actualizado.",
      });
      onStockAdded();
      onClose();
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "No se pudo crear el item.",
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
          <DialogTitle>Añadir Nuevo Stock de Material</DialogTitle>
          <DialogDescription>
            Complete los detalles del nuevo item. El movimiento se registrará en el Kardex.
          </DialogDescription>
        </DialogHeader>
        <StockMaterialForm
          tiposMaterialMap={tiposMaterialMap}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}