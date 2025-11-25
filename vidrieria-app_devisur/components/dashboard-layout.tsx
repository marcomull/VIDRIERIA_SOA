"use client"

import { ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { getCurrentUser, type UserRole, getToken } from "@/lib/auth";
import {
  LayoutDashboard, Users, Package, Layers, Glasses, ShoppingBag,
  UserCircle, UserPlus, User as ClientUserIcon, ShoppingCart, History,
  Warehouse, Ruler
} from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: ReactNode;
}

const adminNavItems: NavItem[] = [
  { href: "/dashboard/admin", label: "Inicio", icon: <LayoutDashboard className="w-5 h-5" /> },
  { href: "/dashboard/admin/profile", label: "Mi Perfil", icon: <UserCircle className="w-5 h-5" /> },
  { href: "/dashboard/admin/usuarios", label: "Gestionar Usuarios", icon: <Users className="w-5 h-5" /> },
  { href: "/dashboard/admin/agregar-personal", label: "Agregar Personal", icon: <UserPlus className="w-5 h-5" /> },
  { href: "/dashboard/admin/productos", label: "Productos", icon: <Package className="w-5 h-5" /> },
  { href: "/dashboard/admin/materiales", label: "Materiales", icon: <Layers className="w-5 h-5" /> },
  { href: "/dashboard/admin/tipos-vidrio", label: "Tipos de Vidrio", icon: <Glasses className="w-5 h-5" /> },
  { href: "/dashboard/admin/inventario-vidrio", label: "Stock de Vidrio", icon: <Warehouse className="w-5 h-5" /> },
  { href: "/dashboard/admin/inventario-material", label: "Stock de Material", icon: <Ruler className="w-5 h-5" /> },
  { href: "/dashboard/admin/pedidos", label: "Gestionar Pedidos", icon: <ShoppingBag className="w-5 h-5" /> },
];

const clientNavItems: NavItem[] = [
  { href: "/dashboard/cliente", label: "Inicio", icon: <ClientUserIcon className="w-5 h-5" /> },
  { href: "/dashboard/cliente/profile", label: "Mi Perfil", icon: <UserCircle className="w-5 h-5" /> },
  { href: "/dashboard/cliente/pedidos", label: "Hacer Pedido", icon: <ShoppingCart className="w-5 h-5" /> },
  { href: "/dashboard/cliente/historial", label: "Mis Pedidos", icon: <History className="w-5 h-5" /> },
];

const vendedorNavItems: NavItem[] = [];
const tallerNavItems: NavItem[] = [];
const almacenNavItems: NavItem[] = [];


interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
}

export function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const pathname = usePathname();
  const user = getCurrentUser();
  const token = getToken();

  let navItems: NavItem[] = [];

  if (user) {
    switch (user.rol) {
      case "ADMIN":
        navItems = adminNavItems;
        break;
      case "CLIENTE":
        navItems = clientNavItems;
        break;
      case "VENDEDOR":
        navItems = vendedorNavItems;
        break;
      case "TALLER":
        navItems = tallerNavItems;
        break;
      case "ALMACEN":
        navItems = almacenNavItems;
        break;
      default:
        navItems = [];
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-balance">{title}</h1>
        </div>
        <div className="grid lg:grid-cols-[240px_1fr] gap-8">
          <aside className="space-y-2">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                    pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                  )}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </aside>
          <main>
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}