"use client"

import { useEffect, useState } from "react";
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

export type AdminUserFormData = {
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  dni: string;
  ruc: string;
  direccion: string; 
};

type EditUserDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  user: AdminUserFormData | null;
  onSave: (formData: Omit<AdminUserFormData, 'rol'>) => void; 
};

export function EditUserDialog({ isOpen, onClose, user, onSave }: EditUserDialogProps) {
  const [formData, setFormData] = useState<Omit<AdminUserFormData, 'rol'>>({
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    dni: "",
    ruc: "",
    direccion: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        nombre: user.nombre || "",
        apellido: user.apellido || "",
        correo: user.correo || "",
        telefono: user.telefono || "",
        dni: user.dni || "",
        ruc: user.ruc || "",
        direccion: user.direccion || "",
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  
  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Cliente: {user.nombre} {user.apellido}</DialogTitle>
          <DialogDescription>
            Modifica los datos del cliente. El rol no puede ser cambiado.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div><Label htmlFor="nombre">Nombre</Label><Input id="nombre" name="nombre" value={formData.nombre} onChange={handleInputChange} /></div>
            <div><Label htmlFor="apellido">Apellido</Label><Input id="apellido" name="apellido" value={formData.apellido} onChange={handleInputChange} /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label htmlFor="dni">DNI</Label><Input id="dni" name="dni" value={formData.dni} onChange={handleInputChange} /></div>
            <div><Label htmlFor="ruc">RUC</Label><Input id="ruc" name="ruc" value={formData.ruc} onChange={handleInputChange} /></div>
          </div>
          <div><Label htmlFor="correo">Email</Label><Input id="correo" name="correo" type="email" value={formData.correo} onChange={handleInputChange} /></div>
          <div><Label htmlFor="telefono">Teléfono</Label><Input id="telefono" name="telefono" value={formData.telefono} onChange={handleInputChange} /></div>
          <div><Label htmlFor="direccion">Dirección</Label><Input id="direccion" name="direccion" value={formData.direccion} onChange={handleInputChange} /></div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={() => onSave(formData)}>Guardar Cambios</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}