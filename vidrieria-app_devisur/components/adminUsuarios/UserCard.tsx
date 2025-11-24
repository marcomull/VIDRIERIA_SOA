"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Pencil, Trash2 } from "lucide-react";
import type { UserRole, CurrentUser } from "@/lib/auth"; 

export type User = {
    idUsuario: number;
    nombre: string;
    apellido: string;
    correo: string;
    telefono: string;
    dni: string;
    ruc: string;
    direccion: string;
    rol: UserRole;
    fechaRegistro: string;
};

interface UsuarioCardProps {
  usuario: User;
  currentUser: CurrentUser | null;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export function UsuarioCard({ usuario, currentUser, onEdit, onDelete }: UsuarioCardProps) {
    
    let cardColor = 'from-gray-500 to-gray-700';
    let badgeColor = 'bg-gray-500';

    switch (usuario.rol) {
        case 'ADMIN':
            cardColor = 'from-purple-500 to-indigo-500';
            badgeColor = 'bg-purple-500';
            break;
        case 'CLIENTE':
            cardColor = 'from-blue-500 to-cyan-500';
            badgeColor = 'bg-blue-500';
            break;
        case 'VENDEDOR':
            cardColor = 'from-green-500 to-teal-500';
            badgeColor = 'bg-green-500';
            break;
        case 'TALLER':
            cardColor = 'from-orange-500 to-amber-500';
            badgeColor = 'bg-orange-500';
            break;
        case 'ALMACEN':
            cardColor = 'from-yellow-500 to-lime-500'; 
            badgeColor = 'bg-yellow-600';
            break;
    }

    const showActions = usuario.rol !== 'ADMIN' && currentUser?.id !== usuario.idUsuario;

    return (
        <Card key={usuario.idUsuario} className="flex flex-col">
            <CardHeader>
                <div className="flex items-start gap-4">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold bg-gradient-to-br ${cardColor}`}>
                        {usuario.nombre?.[0] || '?'}{usuario.apellido?.[0] || ''}
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle>{usuario.nombre} {usuario.apellido}</CardTitle>
                                <CardDescription>Registrado: {new Date(usuario.fechaRegistro).toLocaleDateString("es-ES")}</CardDescription>
                            </div>
                            <Badge className={badgeColor}>{usuario.rol}</Badge>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex-grow space-y-3">
                <div className="flex items-center gap-3 text-sm"><Mail className="w-4 h-4 text-muted-foreground" /><span>{usuario.correo}</span></div>
                <div className="flex items-center gap-3 text-sm"><Phone className="w-4 h-4 text-muted-foreground" /><span>{usuario.telefono || 'N/A'}</span></div>
                <div className="flex items-center gap-3 text-sm"><MapPin className="w-4 h-4 text-muted-foreground" /><span>{usuario.direccion || 'N/A'}</span></div>
            </CardContent>
            
            {showActions && (
                <CardFooter>
                    <div className="flex gap-2 pt-3 border-t w-full">
                        <Button variant="outline" size="sm" className="flex-1 gap-2" onClick={() => onEdit(usuario)}>
                            <Pencil className="w-4 h-4" /> Editar
                        </Button>
                        <Button
                            variant="outline" size="sm" className="flex-1 gap-2 text-destructive hover:text-destructive"
                            onClick={() => onDelete(usuario)}
                        >
                            <Trash2 className="w-4 h-4" /> Eliminar
                        </Button>
                    </div>
                </CardFooter>
            )}
        </Card>
    );
}