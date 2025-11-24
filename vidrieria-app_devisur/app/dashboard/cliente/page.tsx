"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getCurrentUser, isAuthenticated } from "@/lib/auth"
import { User, ShoppingCart, History, Package, Loader2, UserCircle } from "lucide-react"
import API from "@/services/usuario/api"; 

type UserProfile = {
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  direccion: string;
};

export default function ClienteDashboard() {
  const router = useRouter()

  const [currentUser] = useState(getCurrentUser());
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login")
      return; 
    }

    const fetchProfile = async () => {
      try {
        const response = await API.get("/usuarios/profile");
        setUserProfile(response.data);
      } catch (error) {
        console.error("Error al cargar el perfil del cliente:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();

  }, [router]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!currentUser || !userProfile) return null;

  return (
    <DashboardLayout title="Dashboard Cliente">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Bienvenido, {userProfile.nombre}!</CardTitle>
            <CardDescription>Gestiona tus pedidos y perfil desde aquí</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span className="font-medium">{userProfile.correo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Teléfono:</span>
                <span className="font-medium">{userProfile.telefono || 'No especificado'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Dirección:</span>
                <span className="font-medium">{userProfile.direccion || 'No especificada'}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card
            className="border-2 hover:border-primary transition-colors cursor-pointer"
            onClick={() => router.push("/dashboard/cliente/pedidos")}
          >
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                <ShoppingCart className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Hacer un Pedido</CardTitle>
              <CardDescription>Crea un nuevo pedido personalizado de productos en vidrio</CardDescription>
            </CardHeader>
          </Card>

          <Card
            className="border-2 hover:border-primary transition-colors cursor-pointer"
            onClick={() => router.push("/dashboard/cliente/historial")}
          >
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Mis Pedidos</CardTitle>
              <CardDescription>Revisa el estado y historial de tus pedidos</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}