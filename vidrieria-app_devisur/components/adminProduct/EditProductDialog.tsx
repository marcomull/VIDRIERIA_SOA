import React, { useState, useEffect, useRef } from 'react';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ProductForm, type ProductFormRef } from './ProductForm';
import type { Product, ProductFormData } from '@/lib/types';
import { updateProduct } from '@/services/catalogo/productService';
import { getToken } from '@/lib/auth';
import { Loader2 } from 'lucide-react';

interface EditProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
  onProductUpdated: (updatedProduct: Product) => void;
}

export function EditProductDialog({ open, onOpenChange, product, onProductUpdated }: EditProductDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const formRef = useRef<ProductFormRef>(null);
  const token = getToken();
  const handleEditSubmit = async () => {
    const formData = formRef.current?.getFormData();

    if (!product || !formData) {
      setFormError("El nombre del producto es obligatorio.");
      return;
    }

    console.log("[EditDialog] Enviando datos al backend:", formData); // LOG

    setIsSubmitting(true);
    setFormError(null);

    try {
      const updatedProduct = await updateProduct(product.idProducto, formData, token);
      onProductUpdated(updatedProduct); 
      onOpenChange(false); 
    } catch (error) {
      console.error("Error en handleEditSubmit:", error);
      setFormError(error instanceof Error ? error.message : "Error al actualizar el producto.");
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

  if (!open || !product) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChangeWithReset}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Producto</DialogTitle>
          <DialogDescription>Modifica los datos del producto "{product.nombre}"</DialogDescription>
        </DialogHeader>

        <ProductForm
          ref={formRef} 
          formId={`edit-product-${product.idProducto}`}
          initialData={{
            nombre: product.nombre,
            descripcion: product.descripcion,
            tipo: product.tipo,
            imagenUrl: product.imagenUrl
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