import React, { useState, useRef } from 'react';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ProductForm, type ProductFormRef } from './ProductForm';
import type { ProductFormData, Product } from '@/lib/types';
import { createProduct } from '@/services/catalogo/productService';
import { getToken } from '@/lib/auth';
import { Loader2 } from 'lucide-react';

interface AddProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProductAdded: (newProduct: Product) => void;
}

export function AddProductDialog({ open, onOpenChange, onProductAdded }: AddProductDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const formRef = useRef<ProductFormRef>(null);
  const token = getToken(); 

  const handleAddSubmit = async () => {
    const formData = formRef.current?.getFormData();

    if (!formData) { 
        setFormError("El nombre del producto es obligatorio.");
        return;
    }

    setIsSubmitting(true);
    setFormError(null);
    try {
      const newProduct = await createProduct(formData, token);
      onProductAdded(newProduct);
      onOpenChange(false);
    } catch (error) {
      console.error("Error en handleAddSubmit:", error);
      setFormError(error instanceof Error ? error.message : "Error al agregar el producto.");
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
          <DialogTitle>Agregar Nuevo Producto</DialogTitle>
          <DialogDescription>Completa los datos y sube una imagen</DialogDescription>
        </DialogHeader>

        <ProductForm
          ref={formRef} 
          formId="add-product"
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
             {isSubmitting ? "Agregando..." : "Agregar"}
           </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}