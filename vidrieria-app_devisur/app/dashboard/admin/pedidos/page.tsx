"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getCurrentUser, isAuthenticated, isAdmin } from "@/lib/auth"
import { mockOrders } from "@/lib/mock-data"
import { LayoutDashboard, Users, Package, Layers, Glasses, ShoppingBag } from "lucide-react"
import type { OrderStatus } from "@/lib/types"

export default function AdminPedidosPage() {
  const router = useRouter()
  const [user, setUser] = useState(getCurrentUser())
  const [orders, setOrders] = useState(mockOrders)

  useEffect(() => {
    if (!isAuthenticated() || !isAdmin()) {
      router.push("/login")
    }
  }, [router])

  if (!user || user.rol !== "ADMIN") return null

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

  const updateOrderStatus = (orderId: number, newStatus: OrderStatus) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, estado: newStatus } : order)))
  }

  return (
    <DashboardLayout title="Gestión de Pedidos">
      <div className="space-y-6">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Pedido #{order.id}</CardTitle>
                  <CardDescription>
                    Cliente: {order.usuario.nombre} {order.usuario.apellido}
                  </CardDescription>
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
                <div className="flex flex-col gap-2 items-end">
                  <Badge className={getStatusColor(order.estado)}>{getStatusLabel(order.estado)}</Badge>
                  <Select
                    value={order.estado}
                    onValueChange={(value) => updateOrderStatus(order.id, value as OrderStatus)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PENDIENTE">Pendiente</SelectItem>
                      <SelectItem value="EN_PROCESO">En Proceso</SelectItem>
                      <SelectItem value="COMPLETADO">Completado</SelectItem>
                      <SelectItem value="CANCELADO">Cancelado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Información del Cliente:</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Email:</span> {order.usuario.email}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Teléfono:</span> {order.usuario.telefono}
                  </div>
                  <div className="col-span-2">
                    <span className="text-muted-foreground">Dirección:</span> {order.usuario.direccion}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Productos:</h4>
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">{item.producto.nombre}</p>
                      <p className="text-sm text-muted-foreground">Cantidad: {item.cantidad}</p>
                      {item.ancho && item.alto && (
                        <p className="text-sm text-muted-foreground">
                          Dimensiones: {item.ancho}m x {item.alto}m
                        </p>
                      )}
                      {item.material && (
                        <p className="text-sm text-muted-foreground">Material: {item.material.nombre}</p>
                      )}
                      {item.tipoVidrio && (
                        <p className="text-sm text-muted-foreground">
                          Vidrio: {item.tipoVidrio.nombre} ({item.tipoVidrio.espesor}mm)
                        </p>
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
                  <p className="text-sm font-medium mb-1">Notas del cliente:</p>
                  <p className="text-sm text-muted-foreground">{order.notas}</p>
                </div>
              )}

              <div className="flex justify-between items-center pt-4 border-t">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-2xl font-bold text-primary">${order.total.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  )
}
