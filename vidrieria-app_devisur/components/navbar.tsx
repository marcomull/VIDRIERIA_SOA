"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { getCurrentUser, logout, type UserRole } from "@/lib/auth"
import { LogOut, User, LayoutDashboard, UserCircle } from "lucide-react"

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()

  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleLogout = async () => {
    await logout();
    router.push("/");
    router.refresh();
  };

  const currentUser = isClient ? getCurrentUser() : null;

  const getDashboardLink = (role: UserRole | undefined): string => {
    if (!role) return "/login"; 

    switch (role) {
      case "ADMIN":
        return "/dashboard/admin"; 
      case "CLIENTE":
        return "/dashboard/cliente"; 
      case "VENDEDOR":
        return "/dashboard/vendedor"; 
      case "TALLER":
        return "/dashboard/taller"; 
      case "ALMACEN":
        return "/dashboard/almacen"; 
      default:
        return "/"; 
    }
  };

  const getProfileLink = (role: UserRole | undefined): string | null => {
    if (!role) return null;

    switch (role) {
      case "ADMIN":
        return "/dashboard/admin/profile"; 
      case "CLIENTE":
        return "/dashboard/cliente/profile"; 
      case "VENDEDOR":
      case "TALLER":
      case "ALMACEN":
        return "/dashboard/perfil-empleado"; 
      default:
        return null;
    }
  };


  return (
    <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo-devisur.jpg"
            alt="DEVISUR S.A.C. Logo"
            width={40}
            height={40}
            className="rounded-lg"
          />
          <span className="font-bold text-xl text-primary">DEVISUR S.A.C.</span>
        </Link>

        <div className="flex items-center gap-4">
          {isClient ? (
            <>
              {currentUser ? (
                <>
                  <Link href={getDashboardLink(currentUser.rol)}>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Button>
                  </Link>

                  {getProfileLink(currentUser.rol) && (
                    <Link href={getProfileLink(currentUser.rol)!}>
                      <Button variant="ghost" size="sm" className="gap-2">
                        <UserCircle className="w-4 h-4" />
                        Mi Perfil
                      </Button>
                    </Link>
                  )}

                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4" />
                    <span>{currentUser.correo}</span>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                      {currentUser.rol}
                    </span>
                  </div>

                  <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2 bg-transparent">
                    <LogOut className="w-4 h-4" />
                    Salir
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="ghost" size="sm">
                      Iniciar Sesión
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button size="sm">Registrarse</Button>
                  </Link>
                </>
              )}
            </>
          ) : (
            <div className="h-9 w-48 animate-pulse bg-muted rounded-md"></div>
          )}
        </div>
      </div>
    </nav>
  )
}