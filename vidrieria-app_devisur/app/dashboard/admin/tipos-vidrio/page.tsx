"use client"

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard-layout"; 
import { Button } from "@/components/ui/button"; 
import { Input } from "@/components/ui/input"; 
import { getToken, isAuthenticated, isAdmin } from '@/lib/auth'; 
import { getTiposVidrio } from '@/services/catalogo/tipoVidrioService'; 
import { TipoVidrioCard } from '@/components/adminTipoVidrio/TipoVidrioCard'; 
import { AddTipoVidrioDialog } from '@/components/adminTipoVidrio/AddTipoVidrioDialog'; 
import { EditTipoVidrioDialog } from '@/components/adminTipoVidrio/EditTipoVidrioDialog'; 
import { DeleteTipoVidrioDialog } from '@/components/adminTipoVidrio/DeleteTipoVidrioDialog'; 
import type { TipoVidrio } from '@/lib/types';
import {
  Glasses, Plus, Search, Loader2
} from "lucide-react";

export default function AdminTiposVidrioPage() {
  const router = useRouter();
  const token = getToken();
  const [tiposVidrio, setTiposVidrio] = useState<TipoVidrio[]>([]); 
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({ page: 0, size: 9, totalPages: 0 });
  const [isClient, setIsClient] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTipoVidrio, setSelectedTipoVidrio] = useState<TipoVidrio | null>(null); 

  const fetchTiposVidrio = useCallback(async (page = 0, size = 9, search = searchTerm) => {
    if (!token) {
      setIsLoading(false); return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const data = await getTiposVidrio(token, page, size, search || null); 
      setTiposVidrio(data.content); 
      setPagination(prev => ({ ...prev, totalPages: data.totalPages, page: page, size: size }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar tipos de vidrio.");
      setTiposVidrio([]);
      setPagination({ page: 0, size: 9, totalPages: 0 });
    } finally {
      setIsLoading(false);
    }
  }, [token, searchTerm, pagination.size]); 

  useEffect(() => { setIsClient(true); }, []);

  useEffect(() => {
    if (isClient) {
      if (!isAuthenticated() || !isAdmin()) { 
        router.push("/login");
      } else if (token !== null) {
        fetchTiposVidrio(); 
      } else {
        setIsLoading(false);
      }
    }
  }, [isClient, token, router, fetchTiposVidrio]); 

  const filteredTiposVidrio = useMemo(() => {
    return tiposVidrio; 
  }, [tiposVidrio]); 

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    fetchTiposVidrio(0, pagination.size, newSearchTerm); 
  };

  const handleOpenAddDialog = () => { setSelectedTipoVidrio(null); setIsAddDialogOpen(true); };
  const handleOpenEditDialog = (tipo: TipoVidrio) => { setSelectedTipoVidrio(tipo); setIsEditDialogOpen(true); };
  const handleOpenDeleteDialog = (tipo: TipoVidrio) => { setSelectedTipoVidrio(tipo); setIsDeleteDialogOpen(true); };

  const handleTipoVidrioAdded = (newTipo: TipoVidrio) => { fetchTiposVidrio(0, pagination.size, ""); setSearchTerm(""); };
  const handleTipoVidrioUpdated = (updatedTipo: TipoVidrio) => { fetchTiposVidrio(pagination.page, pagination.size, searchTerm); };
  const handleTipoVidrioDeleted = (id: number) => { fetchTiposVidrio(pagination.page, pagination.size, searchTerm); };

  const handleNextPage = () => { if (pagination.page < pagination.totalPages - 1) fetchTiposVidrio(pagination.page + 1, pagination.size, searchTerm); };
  const handlePreviousPage = () => { if (pagination.page > 0) fetchTiposVidrio(pagination.page - 1, pagination.size, searchTerm); };

  if (!isClient) {
    return (
        <DashboardLayout title="Gestión de Tipos de Vidrio">
            <div className="flex justify-center items-center h-64"><Loader2 className="w-8 h-8 animate-spin text-primary" /><p className="ml-2">Cargando...</p></div>
        </DashboardLayout>
    );
  }
  if (!isClient || (isLoading && tiposVidrio.length === 0)) {
     return (<DashboardLayout title="Gestión de Tipos de Vidrio"><div className="flex justify-center items-center h-64"><Loader2 className="w-8 h-8 animate-spin text-primary" /><p className="ml-2">Cargando...</p></div></DashboardLayout>);
  }

  return (
    <DashboardLayout title="Gestión de Tipos de Vidrio">
      {error && (<div className="mb-4 p-4 bg-red-100 text-red-700 border border-red-400 rounded flex justify-between items-center"><p><strong>Error:</strong> {error}</p><Button variant="ghost" size="sm" onClick={() => fetchTiposVidrio(pagination.page, pagination.size, searchTerm)}>Reintentar</Button></div>)}

      <div className="mb-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input placeholder="Buscar por nombre..." value={searchTerm} onChange={handleSearchChange} className="pl-10" /></div>
          <Button onClick={handleOpenAddDialog} className="gap-2"><Plus className="w-4 h-4" /> Agregar Tipo Vidrio</Button>
        </div>
        <div className="text-sm text-muted-foreground">Mostrando {filteredTiposVidrio.length} tipos de vidrio. {pagination.totalPages > 0 && ` Página ${pagination.page + 1} de ${pagination.totalPages}.`}</div>
      </div>

      {isLoading && tiposVidrio.length > 0 && (<div className="flex justify-center items-center py-4"><Loader2 className="w-6 h-6 animate-spin text-primary" /><p className="ml-2 text-sm text-muted-foreground">Actualizando...</p></div>)}

      {!isLoading && filteredTiposVidrio.length > 0 && (<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{filteredTiposVidrio.map((tipo) => (<TipoVidrioCard key={tipo.idTipoVidrio} tipoVidrio={tipo} onEdit={handleOpenEditDialog} onDelete={handleOpenDeleteDialog} />))}</div>)}

      {!isLoading && filteredTiposVidrio.length === 0 && (<div className="text-center py-12"><Glasses className="w-12 h-12 mx-auto text-muted-foreground mb-4" /><h3 className="text-lg font-semibold mb-2">No se encontraron tipos de vidrio</h3><p className="text-muted-foreground">{tiposVidrio.length === 0 && !searchTerm ? "Aún no hay tipos de vidrio registrados." : "Intenta con otros términos"}</p></div>)}

      {!isLoading && pagination.totalPages > 1 && (<div className="mt-6 flex justify-center items-center gap-4"><Button onClick={handlePreviousPage} disabled={pagination.page === 0} variant="outline">Anterior</Button><span className="text-sm text-muted-foreground">Página {pagination.page + 1} de {pagination.totalPages}</span><Button onClick={handleNextPage} disabled={pagination.page >= pagination.totalPages - 1} variant="outline">Siguiente</Button></div>)}

      <AddTipoVidrioDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} onTipoVidrioAdded={handleTipoVidrioAdded} />
      <EditTipoVidrioDialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} tipoVidrio={selectedTipoVidrio} onTipoVidrioUpdated={handleTipoVidrioUpdated} />
      <DeleteTipoVidrioDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen} tipoVidrio={selectedTipoVidrio} onTipoVidrioDeleted={handleTipoVidrioDeleted} />
    </DashboardLayout>
  );
}