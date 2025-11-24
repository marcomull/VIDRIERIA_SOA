"use client"

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getToken, isAuthenticated, isAdmin } from '@/lib/auth';
import { getProducts } from '@/services/catalogo/productService';
import { ProductCard } from '@/components/adminProduct/ProductCard';
import { AddProductDialog } from '@/components/adminProduct/AddProductDialog';
import { EditProductDialog } from '@/components/adminProduct/EditProductDialog';
import { DeleteProductDialog } from '@/components/adminProduct/DeleteProductDialog';
import type { Product } from '@/lib/types';
import {
  LayoutDashboard, Users, Package, Layers, Glasses, ShoppingBag, Plus, Search, Loader2, UserCircle
} from "lucide-react";

export default function AdminProductosPage() {
  const router = useRouter();
  const token = getToken();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("TODOS");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({ page: 0, size: 9, totalPages: 0 });
  const [isClient, setIsClient] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const fetchProducts = useCallback(async (page = 0, size = 9, search = searchTerm) => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const data = await getProducts(token, page, size, search || null);
      setProducts(data.content);
      setPagination(prev => ({ ...prev, totalPages: data.totalPages, page: page, size: size }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar productos.");
      setProducts([]);
      setPagination({ page: 0, size: 9, totalPages: 0 });
    } finally {
      setIsLoading(false);
    }
  }, [token, searchTerm, pagination.size]);
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      if (!isAuthenticated() || !isAdmin()) {
        router.push("/login");
      } else if (token !== null) {
        fetchProducts();
      } else {
        setIsLoading(false);
      }
    }
  }, [isClient, token, router]);

  const filteredProducts = useMemo(() => {
    let filtered = products;
    if (filterType !== "TODOS") {
      filtered = filtered.filter(p => p.tipo === filterType);
    }
    return filtered;
  }, [filterType, products]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    fetchProducts(0, pagination.size, newSearchTerm);
  };

  const handleOpenAddDialog = () => { setSelectedProduct(null); setIsAddDialogOpen(true); };
  const handleOpenEditDialog = (product: Product) => { setSelectedProduct(product); setIsEditDialogOpen(true); };
  const handleOpenDeleteDialog = (product: Product) => { setSelectedProduct(product); setIsDeleteDialogOpen(true); };

  const handleProductAdded = (newProduct: Product) => { fetchProducts(0, pagination.size, ""); setSearchTerm(""); };
  const handleProductUpdated = (updatedProduct: Product) => { fetchProducts(pagination.page, pagination.size, searchTerm); };
  const handleProductDeleted = (id: number) => { fetchProducts(pagination.page, pagination.size, searchTerm); };

  const handleNextPage = () => { if (pagination.page < pagination.totalPages - 1) fetchProducts(pagination.page + 1, pagination.size, searchTerm); };
  const handlePreviousPage = () => { if (pagination.page > 0) fetchProducts(pagination.page - 1, pagination.size, searchTerm); };

  if (!isClient) {
    return (
      <DashboardLayout title="Gestión de Productos">
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="ml-2">Cargando...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!isClient || (isLoading && products.length === 0)) {
    return (<DashboardLayout title="Gestión de Productos">
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="ml-2">Cargando...</p>
      </div></DashboardLayout>);
  }

  return (
    <DashboardLayout title="Gestión de Productos">
      {error && (<div className="mb-4 p-4 bg-red-100 text-red-700 border border-red-400 rounded flex justify-between items-center"><p><strong>Error:</strong> {error}</p><Button variant="ghost" size="sm" onClick={() => fetchProducts(pagination.page, pagination.size, searchTerm)}>Reintentar</Button></div>)}

      <div className="mb-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input placeholder="Buscar por nombre..." value={searchTerm} onChange={handleSearchChange} className="pl-10" /></div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full md:w-[200px]"><SelectValue placeholder="Filtrar por tipo" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="TODOS">Todos los tipos</SelectItem>
              <SelectItem value="VIDRIO">Vidrio</SelectItem>
              <SelectItem value="MAMPARA">Mampara</SelectItem>
              <SelectItem value="VITRINA">Vitrina</SelectItem>
              <SelectItem value="CUADRO">Cuadro</SelectItem>
              <SelectItem value="VENTANA">Ventana</SelectItem>
              <SelectItem value="ESPEJO">Espejo</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleOpenAddDialog} className="gap-2"><Plus className="w-4 h-4" /> Agregar Producto</Button>
        </div>
        <div className="text-sm text-muted-foreground">Mostrando {filteredProducts.length} productos filtrados (Tipo: {filterType}). {pagination.totalPages > 0 && ` Página ${pagination.page + 1} de ${pagination.totalPages}.`}</div>
      </div>

      {isLoading && products.length > 0 && (<div className="flex justify-center items-center py-4">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
        <p className="ml-2 text-sm text-muted-foreground">Actualizando...</p>
      </div>)}

      {!isLoading && filteredProducts.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.idProducto} product={product} onEdit={handleOpenEditDialog} onDelete={handleOpenDeleteDialog} />))}
        </div>)
      }

      {!isLoading && filteredProducts.length === 0 && (<div className="text-center py-12"><Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" /><h3 className="text-lg font-semibold mb-2">No se encontraron productos</h3><p className="text-muted-foreground">{products.length === 0 && !searchTerm && filterType === 'TODOS' ? "Aún no hay productos registrados." : "Intenta con otros términos o filtros"}</p></div>)}

      {!isLoading && pagination.totalPages > 1 && (<div className="mt-6 flex justify-center items-center gap-4"><Button onClick={handlePreviousPage} disabled={pagination.page === 0} variant="outline">Anterior</Button><span className="text-sm text-muted-foreground">Página {pagination.page + 1} de {pagination.totalPages}</span><Button onClick={handleNextPage} disabled={pagination.page >= pagination.totalPages - 1} variant="outline">Siguiente</Button></div>)}

      <AddProductDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} onProductAdded={handleProductAdded} />
      <EditProductDialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} product={selectedProduct} onProductUpdated={handleProductUpdated} />
      <DeleteProductDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen} product={selectedProduct} onProductDeleted={handleProductDeleted} />
    </DashboardLayout>
  );
}

