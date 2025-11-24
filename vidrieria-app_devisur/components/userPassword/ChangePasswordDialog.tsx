"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { changePassword, ChangePasswordData } from "@/lib/auth"; 
import { Loader2 } from "lucide-react";

type ChangePasswordDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function ChangePasswordDialog({ isOpen, onClose }: ChangePasswordDialogProps) {
  const [formData, setFormData] = useState<ChangePasswordData>({
    contrasenaActual: "",
    nuevaContrasena: "",
    confirmarNuevaContrasena: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setError(null);
    setSuccess(null);

    if (formData.nuevaContrasena !== formData.confirmarNuevaContrasena) {
      setError("La nueva contraseña y su confirmación no coinciden.");
      return;
    }

    setIsSaving(true);
    const result = await changePassword(formData);
    setIsSaving(false);

    if (result.success) {
      setSuccess(result.message);
      // Limpiamos el formulario y cerramos el diálogo después de un momento
      setTimeout(() => {
        setFormData({ contrasenaActual: "", nuevaContrasena: "", confirmarNuevaContrasena: "" });
        onClose();
      }, 2000);
    } else {
      setError(result.message);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cambiar Contraseña</DialogTitle>
          <DialogDescription>
            Para cambiar tu contraseña, por favor, introduce tu contraseña actual seguida de la nueva.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="contrasenaActual">Contraseña Actual</Label>
            <Input id="contrasenaActual" name="contrasenaActual" type="password" value={formData.contrasenaActual} onChange={handleInputChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nuevaContrasena">Nueva Contraseña</Label>
            <Input id="nuevaContrasena" name="nuevaContrasena" type="password" value={formData.nuevaContrasena} onChange={handleInputChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmarNuevaContrasena">Confirmar Nueva Contraseña</Label>
            <Input id="confirmarNuevaContrasena" name="confirmarNuevaContrasena" type="password" value={formData.confirmarNuevaContrasena} onChange={handleInputChange} />
          </div>
          
          {error && <p className="text-sm text-destructive">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}

        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSubmit} disabled={isSaving}>
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Guardar Contraseña
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}