"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getCurrentUser, isAuthenticated, isAdmin, getToken } from "@/lib/auth"
import { mockOrders, mockProducts, mockMaterials, mockTiposVidrio } from "@/lib/mock-data"
import {
  TrendingUp, DollarSign, ShoppingBag, Package, Layers, Glasses, Users, BellRing, Loader2
} from "lucide-react"

import { useToast } from "@/components/ui/use-toast"
import { triggerNotificationCheck } from "@/services/inventario/stockService"

export default function AdminDashboard() {
  const router = useRouter()
  const [user, setUser] = useState(getCurrentUser())

  const [isTriggering, setIsTriggering] = useState(false);
  const token = getToken();
  const { toast } = useToast();

  useEffect(() => {
    if (!isAuthenticated() || !isAdmin()) {
      router.push("/login")
    }
  }, [router])

  if (!user || user.rol !== "ADMIN") return null

  const totalRevenue = mockOrders.reduce((sum, order) => sum + order.total, 0)
  const pendingOrders = mockOrders.filter((o) => o.estado === "PENDIENTE").length
  const completedOrders = mockOrders.filter((o) => o.estado === "COMPLETADO").length
  const handleForceCheck = async () => {
    setIsTriggering(true);
    try {
      const message = await triggerNotificationCheck(token);
      toast({
        title: "Revisión Iniciada",
        description: message,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Error al forzar la revisión.",
        variant: "destructive",
      });
    } finally {
      setIsTriggering(false);
    }
  }
  return (
    <DashboardLayout title="Dashboard Administrador">
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
              <DollarSign className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">${totalRevenue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground mt-1">De {mockOrders.length} pedidos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pedidos Pendientes</CardTitle>
              <ShoppingBag className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{pendingOrders}</div>
              <p className="text-xs text-muted-foreground mt-1">Requieren atención</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pedidos Completados</CardTitle>
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{completedOrders}</div>
              <p className="text-xs text-muted-foreground mt-1">Finalizados exitosamente</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Productos</CardTitle>
              <Package className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockProducts.length}</div>
              <p className="text-xs text-muted-foreground mt-1">En catálogo</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Inventario</CardTitle>
              <CardDescription>Resumen de recursos disponibles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <Layers className="w-5 h-5 text-primary" />
                  <span>Materiales</span>
                </div>
                <span className="font-bold">{mockMaterials.length}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <Glasses className="w-5 h-5 text-primary" />
                  <span>Tipos de Vidrio</span>
                </div>
                <span className="font-bold">{mockTiposVidrio.length}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-primary" />
                  <span>Productos</span>
                </div>
                <span className="font-bold">{mockProducts.length}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Accesos Rápidos</CardTitle>
              <CardDescription>Gestiona tu vidriería</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <button
                onClick={() => router.push("/dashboard/admin/pedidos")}
                className="w-full flex items-center gap-3 p-3 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors text-left"
              >
                <ShoppingBag className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Gestionar Pedidos</p>
                  <p className="text-sm text-muted-foreground">Ver y actualizar pedidos</p>
                </div>
              </button>
              <button
                onClick={() => router.push("/dashboard/admin/productos")}
                className="w-full flex items-center gap-3 p-3 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors text-left"
              >
                <Package className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Gestionar Productos</p>
                  <p className="text-sm text-muted-foreground">Agregar o editar productos</p>
                </div>
              </button>
              <button
                onClick={() => router.push("/dashboard/admin/usuarios")}
                className="w-full flex items-center gap-3 p-3 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors text-left"
              >
                <Users className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Gestionar Usuarios</p>
                  <p className="text-sm text-muted-foreground">Ver clientes registrados</p>
                </div>
              </button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Acciones del Sistema</CardTitle>
              <CardDescription>Ejecuta tareas administrativas bajo demanda.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <button
                onClick={handleForceCheck}
                disabled={isTriggering}
                className="w-full flex items-center gap-3 p-3 bg-blue-500/10 hover:bg-blue-500/20 rounded-lg transition-colors text-left text-blue-700 dark:bg-blue-300/10 dark:text-blue-300 dark:hover:bg-blue-300/20"
              >
                {isTriggering ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <BellRing className="w-5 h-5" />
                )}
                <div>
                  <p className="font-medium">Forzar Revisión de Alertas</p>
                  <p className="text-sm text-muted-foreground">
                    {isTriggering ? "Enviando correos..." : "Revisar stock y enviar emails."}
                  </p>
                </div>
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
