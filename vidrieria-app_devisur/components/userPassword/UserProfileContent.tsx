"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Mail, Phone, Pencil, UserCircle, KeyRound, Building, Hash, MapPin
} from "lucide-react";
import { ProfileEditDialog, ProfileFormData } from "./ProfileEditDialog";
import { ChangePasswordDialog } from "./ChangePasswordDialog";
import { Skeleton } from "@/components/ui/skeleton";

type UserProfileData = {
    nombre: string;
    apellido: string;
    correo: string;
    telefono: string;
    dni: string;
    ruc: string;
    direccion: string;
};

export function UserProfileContent() {
    const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

    const fetchUserProfile = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error("No estás autenticado.");

            const response = await fetch("http://localhost:8000/usuarios/profile", {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error("No se pudieron cargar los datos del perfil.");

            const data: UserProfileData = await response.json();
            setUserProfile(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error desconocido.");
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        fetchUserProfile();
    }, []);

    const handleUpdateProfile = async (formData: ProfileFormData) => {
        try {
            const response = await fetch(`http://localhost:8000/usuarios/update-profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) throw new Error(await response.text() || "Error al actualizar.");

            setIsEditDialogOpen(false);
            await fetchUserProfile();
        } catch (err) {
            alert(err instanceof Error ? err.message : "Ocurrió un error.");
        }
    };

    if (isLoading) {
        return (
            <Card>
                <CardHeader><Skeleton className="h-8 w-1/2" /></CardHeader>
                <CardContent className="space-y-4">
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                </CardContent>
            </Card>
        );
    }
    
    if (error) {
         return <p className="text-center text-destructive">{error}</p>
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Información de la Cuenta</CardTitle>
                    <CardDescription>Aquí puedes ver y editar tus datos personales.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <>
                        <div className="flex items-center"><UserCircle className="w-5 h-5 mr-3 text-muted-foreground" /> <strong>Nombre:</strong><span className="ml-2">{userProfile?.nombre} {userProfile?.apellido}</span></div>
                        <div className="flex items-center"><Mail className="w-5 h-5 mr-3 text-muted-foreground" /> <strong>Correo:</strong><span className="ml-2">{userProfile?.correo}</span></div>
                        <div className="flex items-center"><Phone className="w-5 h-5 mr-3 text-muted-foreground" /> <strong>Teléfono:</strong><span className="ml-2">{userProfile?.telefono || 'No especificado'}</span></div>
                        <div className="flex items-center"><MapPin className="w-5 h-5 mr-3 text-muted-foreground" /> <strong>Dirección:</strong><span className="ml-2">{userProfile?.direccion || 'No especificada'}</span></div>
                        <div className="flex items-center"><Hash className="w-5 h-5 mr-3 text-muted-foreground" /> <strong>DNI:</strong><span className="ml-2">{userProfile?.dni || 'No especificado'}</span></div>
                        <div className="flex items-center"><Building className="w-5 h-5 mr-3 text-muted-foreground" /> <strong>RUC:</strong><span className="ml-2">{userProfile?.ruc || 'No especificado'}</span></div>
                    </>
                </CardContent>
                <div className="p-6 pt-4 border-t flex flex-wrap gap-2">
                    <Button onClick={() => setIsEditDialogOpen(true)}>
                        <Pencil className="w-4 h-4 mr-2" /> Editar Perfil
                    </Button>
                    <Button variant="secondary" onClick={() => setIsChangePasswordOpen(true)}>
                        <KeyRound className="w-4 h-4 mr-2" /> Cambiar Contraseña
                    </Button>
                </div>
            </Card>

            {/* --- AQUÍ SE LLAMAN A LOS DIÁLOGOS --- */}
            {userProfile && (
                <ProfileEditDialog
                    isOpen={isEditDialogOpen}
                    onClose={() => setIsEditDialogOpen(false)}
                    user={{
                        nombre: userProfile.nombre,
                        apellido: userProfile.apellido,
                        correo: userProfile.correo,
                        telefono: userProfile.telefono || '',
                        dni: userProfile.dni || '',
                        ruc: userProfile.ruc || '',
                        direccion: userProfile.direccion || '',
                    }}
                    onSave={handleUpdateProfile}
                />
            )}

            <ChangePasswordDialog
                isOpen={isChangePasswordOpen}
                onClose={() => setIsChangePasswordOpen(false)}
            />
        </>
    );
}