"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LogIn } from "lucide-react"
import { login } from "@/lib/auth"


const LoginPage: React.FC = () => {
  const router = useRouter()
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string>("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const user = await login(email, password)

    if (user) {
      switch (user.rol) {
        case "ADMIN":
          router.push("/dashboard/admin"); //
          break; 
        case "CLIENTE":
          router.push("/dashboard/cliente"); //
          break;
        case "VENDEDOR":
          setError(`El dashboard para VENDEDOR aún no está disponible.`);
          break;
        case "TALLER":
          setError(`El dashboard para TALLER aún no está disponible.`);
          break;
        case "ALMACEN":
          setError(`El dashboard para ALMACEN aún no está disponible.`);
          break;
        default:
          setError("Rol de usuario desconocido. Contacta al administrador.");
      }
    } else {
      setError("Credenciales incorrectas o error en el servidor.");
    }
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-[#caf0f8] via-[#ade8f4] to-[#90e0ef] p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <LogIn className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Iniciar Sesión</CardTitle>
          <CardDescription className="text-center">Ingresa tus credenciales para acceder</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Contraseña</Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full">
              Iniciar Sesión
            </Button>

            <div className="text-center text-sm mt-2">
              <span className="text-muted-foreground">¿No tienes cuenta? </span>
              <Link href="/register" className="text-primary hover:underline">
                Regístrate aquí
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}

export default LoginPage
