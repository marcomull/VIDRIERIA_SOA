"use client"

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { StockVidrioForm } from "./StockVidrioForm";
import { StockVidrio } from "@/lib/types";
import { getToken } from "@/lib/auth";
import { createStockVidrio } from "@/services/inventario/stockService";
import { useToast } from "@/components/ui/use-toast";

interface AddStockVidrioDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onStockAdded: () => void; // Para refrescar la lista
  tiposVidrioMap: Map<number, string>;
}

export function AddStockVidrioDialog({ isOpen, onClose, onStockAdded, tiposVidrioMap }: AddStockVidrioDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = getToken();
  const { toast } = useToast();

  const handleSubmit = async (formData: Omit<StockVidrio, 'idStockVidrio' | 'fechaIngreso' | 'activo'>) => {
    setIsSubmitting(true);
    try {
      await createStockVidrio(formData, token);
      toast({
        title: "Éxito",
        description: "Nuevo stock de vidrio creado. El historial ha sido actualizado.",
      });
      onStockAdded(); // Llama a refrescar la lista en la página
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
          <DialogTitle>Añadir Nuevo Stock de Vidrio</DialogTitle>
          <DialogDescription>
            Complete los detalles del nuevo item de inventario. El movimiento se registrará en el Kardex.
          </DialogDescription>
        </DialogHeader>
        <StockVidrioForm
          tiposVidrioMap={tiposVidrioMap}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}