"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { UserPlus } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    contrasena: "",
    telefono: "",
    dni: "",
    ruc: "",
    direccion: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await axios.post("http://localhost:8000/usuarios/add", formData)
      setSuccess(response.data)
      setTimeout(() => router.push("/login"), 2000)
    } catch (err: any) {
      const errorMsg = err.response?.data;
      if (typeof errorMsg === 'object') {
        setError(errorMsg.message || JSON.stringify(errorMsg));
      } else {
        setError(errorMsg || "Error al registrar usuario.");
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-[#caf0f8] via-[#ade8f4] to-[#90e0ef] p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <UserPlus className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Crear Cuenta</CardTitle>
          <CardDescription className="text-center">
            Regístrate para comenzar a hacer pedidos
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre</Label>
                <Input id="nombre" value={formData.nombre} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apellido">Apellido</Label>
                <Input id="apellido" value={formData.apellido} onChange={handleChange} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="correo">Correo electrónico</Label>
              <Input id="correo" type="email" value={formData.correo} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contrasena">Contraseña</Label>
              <Input id="contrasena" type="password" value={formData.contrasena} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefono">Teléfono</Label>
              <Input id="telefono" type="tel" value={formData.telefono} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dni">DNI</Label>
              <Input id="dni" value={formData.dni} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ruc">RUC (opcional)</Label>
              <Input id="ruc" value={formData.ruc} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="direccion">Dirección</Label>
              <Input id="direccion" value={formData.direccion} onChange={handleChange} required />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Registrando..." : "Registrarse"}
            </Button>

            {error && <p className="text-red-500 text-center text-sm">{error}</p>}
            {success && <p className="text-green-600 text-center text-sm">{success}</p>}

            <div className="text-center text-sm">
              <span className="text-muted-foreground">¿Ya tienes cuenta? </span>
              <Link href="/login" className="text-primary hover:underline">
                Inicia sesión aquí
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
