"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Importa Select
import { getToken } from "@/lib/auth";
import { Loader2 } from "lucide-react";

interface PersonalFormData {
    nombre: string;
    apellido: string;
    correo: string;
    dni: string;
    telefono: string;
    direccion: string;
    ruc?: string;
    rol: "VENDEDOR" | "TALLER" | "ALMACEN";
}

export function AddPersonalForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [formData, setFormData] = useState<PersonalFormData>({
        nombre: "",
        apellido: "",
        correo: "",
        dni: "",
        telefono: "",
        direccion: "",
        ruc: "",
        rol: "VENDEDOR",
    });
    const token = getToken();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleRolChange = (value: "VENDEDOR" | "TALLER" | "ALMACEN") => {
        setFormData({ ...formData, rol: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token) {
            setError("No estás autenticado como administrador.");
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await axios.post(
                "http://localhost:8000/usuarios/admin/create-employee",
                formData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSuccess(response.data);
            setFormData({
                nombre: "", apellido: "", correo: "", dni: "",
                telefono: "", direccion: "", ruc: "", rol: "VENDEDOR"
            });
            setTimeout(() => router.push("/dashboard/admin/usuarios"), 2000);

        } catch (err: any) {
            setError(err.response?.data || "Error al crear el empleado.");
            console.error("Error al crear empleado:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-2xl mx-auto"> 
            <CardHeader>
                <CardTitle>Datos del Nuevo Empleado</CardTitle>
                <CardDescription>
                    Completa la información. Se enviará un enlace de activación al correo proporcionado.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="nombre">Nombre</Label>
                            <Input id="nombre" value={formData.nombre} onChange={handleChange} required disabled={loading} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="apellido">Apellido</Label>
                            <Input id="apellido" value={formData.apellido} onChange={handleChange} required disabled={loading} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="correo">Correo Electrónico</Label>
                        <Input id="correo" type="email" value={formData.correo} onChange={handleChange} required disabled={loading} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="dni">DNI</Label>
                            <Input id="dni" value={formData.dni} onChange={handleChange} required disabled={loading} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="telefono">Teléfono</Label>
                            <Input id="telefono" type="tel" value={formData.telefono} onChange={handleChange} required disabled={loading} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="direccion">Dirección</Label>
                        <Input id="direccion" value={formData.direccion} onChange={handleChange} required disabled={loading} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="ruc">RUC (Opcional)</Label>
                        <Input id="ruc" value={formData.ruc} onChange={handleChange} disabled={loading} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="rol">Rol del Empleado</Label>
                        <Select
                            value={formData.rol}
                            onValueChange={handleRolChange}
                            disabled={loading}
                        >
                            <SelectTrigger id="rol">
                                <SelectValue placeholder="Selecciona un rol" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="VENDEDOR">Vendedor</SelectItem>
                                <SelectItem value="TALLER">Taller</SelectItem>
                                <SelectItem value="ALMACEN">Almacén</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        {loading ? "Creando Empleado..." : "Crear Empleado"}
                    </Button>

                    {error && <p className="text-red-500 text-center text-sm mt-2">{error}</p>}
                    {success && <p className="text-green-600 text-center text-sm mt-2">{success}</p>}
                </form>
            </CardContent>
        </Card>
    );
}