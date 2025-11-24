"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getCurrentUser, isAuthenticated } from "@/lib/auth"
import { mockOrders } from "@/lib/mock-data"
import { User, ShoppingCart, History } from "lucide-react"
import type { OrderStatus } from "@/lib/types"

export default function HistorialPage() {
  const router = useRouter()
  const [user, setUser] = useState(getCurrentUser())

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login")
    }
  }, [router])

  if (!user) return null

  const navItems = [
    { href: "/dashboard/cliente", label: "Inicio", icon: <User className="w-5 h-5" /> },
    { href: "/dashboard/cliente/pedidos", label: "Hacer Pedido", icon: <ShoppingCart className="w-5 h-5" /> },
    { href: "/dashboard/cliente/historial", label: "Mis Pedidos", icon: <History className="w-5 h-5" /> },
  ]

  const userOrders = mockOrders.filter((order) => order.usuarioId === user.id)

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "COMPLETADO":
        return "bg-green-500"
      case "EN_PROCESO":
        return "bg-blue-500"
      case "PENDIENTE":
        return "bg-yellow-500"
      case "CANCELADO":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusLabel = (status: OrderStatus) => {
    switch (status) {
      case "COMPLETADO":
        return "Completado"
      case "EN_PROCESO":
        return "En Proceso"
      case "PENDIENTE":
        return "Pendiente"
      case "CANCELADO":
        return "Cancelado"
      default:
        return status
    }
  }

  return (
    <DashboardLayout navItems={navItems} title="Mis Pedidos">
      <div className="space-y-6">
        {userOrders.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <History className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg text-muted-foreground">No tienes pedidos aún</p>
              <p className="text-sm text-muted-foreground mt-2">Comienza haciendo tu primer pedido</p>
            </CardContent>
          </Card>
        ) : (
          userOrders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Pedido #{order.id}</CardTitle>
                    <CardDescription>
                      {new Date(order.fechaPedido).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(order.estado)}>{getStatusLabel(order.estado)}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">{item.producto.nombre}</p>
                        <p className="text-sm text-muted-foreground">Cantidad: {item.cantidad}</p>
                        {item.ancho && item.alto && (
                          <p className="text-sm text-muted-foreground">
                            {item.ancho}m x {item.alto}m
                          </p>
                        )}
                        {item.material && (
                          <p className="text-sm text-muted-foreground">Material: {item.material.nombre}</p>
                        )}
                        {item.tipoVidrio && (
                          <p className="text-sm text-muted-foreground">Vidrio: {item.tipoVidrio.nombre}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${item.subtotal.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {order.notas && (
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm font-medium mb-1">Notas:</p>
                    <p className="text-sm text-muted-foreground">{order.notas}</p>
                  </div>
                )}

                <div className="flex justify-between items-center pt-4 border-t">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-2xl font-bold text-primary">${order.total.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </DashboardLayout>
  )
}
