"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { getCurrentUser, isAuthenticated } from "@/lib/auth"
import { mockProducts, mockMaterials, mockTiposVidrio } from "@/lib/mock-data"
import { User, ShoppingCart, History, Plus, Trash2 } from "lucide-react"

interface CartItem {
  productoId: number
  cantidad: number
  ancho?: number
  alto?: number
  materialId?: number
  tipoVidrioId?: number
}

export default function PedidosPage() {
  const router = useRouter()
  const [user, setUser] = useState(getCurrentUser())
  const [cart, setCart] = useState<CartItem[]>([])
  const [currentItem, setCurrentItem] = useState<CartItem>({
    productoId: 1,
    cantidad: 1,
  })
  const [notas, setNotas] = useState("")

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

  const selectedProduct = mockProducts.find((p) => p.id === currentItem.productoId)
  const needsDimensions = selectedProduct?.tipo !== "CUADRO"

  const addToCart = () => {
    setCart([...cart, { ...currentItem }])
    setCurrentItem({
      productoId: 1,
      cantidad: 1,
    })
  }

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index))
  }

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const product = mockProducts.find((p) => p.id === item.productoId)
      const material = mockMaterials.find((m) => m.id === item.materialId)
      const tipoVidrio = mockTiposVidrio.find((t) => t.id === item.tipoVidrioId)

      let itemTotal = product?.precioBase || 0

      if (item.ancho && item.alto && tipoVidrio) {
        const area = item.ancho * item.alto
        itemTotal += area * tipoVidrio.precioM2
      }

      if (material) {
        itemTotal += material.precioBase
      }

      return total + itemTotal * item.cantidad
    }, 0)
  }

  const submitOrder = () => {
    alert("Pedido enviado exitosamente! Total: $" + calculateTotal().toFixed(2))
    setCart([])
    setNotas("")
    router.push("/dashboard/cliente/historial")
  }

  return (
    <DashboardLayout navItems={navItems} title="Hacer Pedido">
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Agregar Producto</CardTitle>
            <CardDescription>Selecciona y configura tu producto</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Producto</Label>
              <Select
                value={currentItem.productoId.toString()}
                onValueChange={(value) => setCurrentItem({ ...currentItem, productoId: Number.parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {mockProducts.map((product) => (
                    <SelectItem key={product.id} value={product.id.toString()}>
                      {product.nombre} - {product.tipo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedProduct && <p className="text-sm text-muted-foreground">{selectedProduct.descripcion}</p>}
            </div>

            {needsDimensions && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Ancho (m)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    min="0.1"
                    value={currentItem.ancho || ""}
                    onChange={(e) => setCurrentItem({ ...currentItem, ancho: Number.parseFloat(e.target.value) })}
                    placeholder="1.5"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Alto (m)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    min="0.1"
                    value={currentItem.alto || ""}
                    onChange={(e) => setCurrentItem({ ...currentItem, alto: Number.parseFloat(e.target.value) })}
                    placeholder="2.0"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label>Material</Label>
              <Select
                value={currentItem.materialId?.toString() || ""}
                onValueChange={(value) => setCurrentItem({ ...currentItem, materialId: Number.parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un material" />
                </SelectTrigger>
                <SelectContent>
                  {mockMaterials.map((material) => (
                    <SelectItem key={material.id} value={material.id.toString()}>
                      {material.nombre} - ${material.precioBase}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Tipo de Vidrio</Label>
              <Select
                value={currentItem.tipoVidrioId?.toString() || ""}
                onValueChange={(value) => setCurrentItem({ ...currentItem, tipoVidrioId: Number.parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona tipo de vidrio" />
                </SelectTrigger>
                <SelectContent>
                  {mockTiposVidrio.map((tipo) => (
                    <SelectItem key={tipo.id} value={tipo.id.toString()}>
                      {tipo.nombre} - ${tipo.precioM2}/m² ({tipo.espesor}mm)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Cantidad</Label>
              <Input
                type="number"
                min="1"
                value={currentItem.cantidad}
                onChange={(e) => setCurrentItem({ ...currentItem, cantidad: Number.parseInt(e.target.value) })}
              />
            </div>

            <Button onClick={addToCart} className="w-full gap-2">
              <Plus className="w-4 h-4" />
              Agregar al Carrito
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Carrito ({cart.length})</CardTitle>
              <CardDescription>Productos agregados a tu pedido</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {cart.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No hay productos en el carrito</p>
              ) : (
                <>
                  {cart.map((item, index) => {
                    const product = mockProducts.find((p) => p.id === item.productoId)
                    const material = mockMaterials.find((m) => m.id === item.materialId)
                    const tipoVidrio = mockTiposVidrio.find((t) => t.id === item.tipoVidrioId)

                    return (
                      <div key={index} className="flex justify-between items-start p-4 border rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium">{product?.nombre}</p>
                          <p className="text-sm text-muted-foreground">Cantidad: {item.cantidad}</p>
                          {item.ancho && item.alto && (
                            <p className="text-sm text-muted-foreground">
                              Dimensiones: {item.ancho}m x {item.alto}m
                            </p>
                          )}
                          {material && <p className="text-sm text-muted-foreground">Material: {material.nombre}</p>}
                          {tipoVidrio && <p className="text-sm text-muted-foreground">Vidrio: {tipoVidrio.nombre}</p>}
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => removeFromCart(index)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    )
                  })}

                  <div className="pt-4 border-t">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-primary">${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {cart.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Finalizar Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Notas adicionales (opcional)</Label>
                  <Textarea
                    value={notas}
                    onChange={(e) => setNotas(e.target.value)}
                    placeholder="Instrucciones especiales, horario de entrega, etc."
                    rows={3}
                  />
                </div>
                <Button onClick={submitOrder} className="w-full" size="lg">
                  Enviar Pedido - ${calculateTotal().toFixed(2)}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
