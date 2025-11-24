"use client"

import { useEffect, useState, useCallback } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { PlusCircle, Loader2 } from "lucide-react";
import { getToken } from "@/lib/auth";
import { StockVidrio, TipoVidrio } from "@/lib/types";
import { getAllStockVidrio } from "@/services/inventario/stockService";
import { getTiposVidrio } from "@/services/catalogo/tipoVidrioService";
import { StockVidrioCard } from "@/components/adminInventario/StockVidrioCard";
import { HistorialDialog } from "@/components/adminInventario/HistorialDialog";
import { AddStockVidrioDialog } from "@/components/adminInventario/AddStockVidrioDialog";
import { EditStockVidrioDialog } from "@/components/adminInventario/EditStockVidrioDialog";
import { DeleteStockVidrioDialog } from "@/components/adminInventario/DeleteStockVidrioDialog";

export default function InventarioVidrioPage() {
  const [stock, setStock] = useState<StockVidrio[]>([]);
  const [tiposVidrio, setTiposVidrio] = useState<Map<number, string>>(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = getToken();

  // --- Estados para los Diálogos ---
  const [isHistorialOpen, setIsHistorialOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  
  // El item seleccionado para CUALQUIER acción (Editar, Borrar, Historial)
  const [selectedStockItem, setSelectedStockItem] = useState<StockVidrio | null>(null);

  // --- Función central para cargar datos ---
  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Cargar los tipos de vidrio (para el dropdown y los nombres)
      // Usamos .content porque getTiposVidrio devuelve un objeto de paginación
      const tiposData = await getTiposVidrio(token); 
      const tiposMap = new Map(
        tiposData.content.map((tipo: TipoVidrio) => [tipo.idTipoVidrio, tipo.nombre])
      );
      setTiposVidrio(tiposMap);

      // Cargar el stock (getAllStockVidrio devuelve un array simple)
      const stockData = await getAllStockVidrio(token);
      setStock(stockData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar datos.");
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  // Carga inicial
  useEffect(() => {
    loadData();
  }, [loadData]);

  // --- Handlers para abrir los diálogos ---
  const handleOpenAdd = () => setIsAddOpen(true);
  
  const handleOpenHistorial = (item: StockVidrio) => {
    setSelectedStockItem(item);
    setIsHistorialOpen(true);
  };

  const handleOpenEdit = (item: StockVidrio) => {
    setSelectedStockItem(item);
    setIsEditOpen(true);
  };

  const handleOpenDelete = (item: StockVidrio) => {
    setSelectedStockItem(item);
    setIsDeleteOpen(true);
  };

  // --- Handlers para cerrar y refrescar ---
  const handleCloseAndRefresh = () => {
    // Cierra todos los diálogos
    setIsAddOpen(false);
    setIsEditOpen(false);
    setIsDeleteOpen(false);
    setIsHistorialOpen(false);
    setSelectedStockItem(null);
    // Vuelve a cargar los datos
    loadData();
  };
  
  const handleClose = () => {
    setIsAddOpen(false);
    setIsEditOpen(false);
    setIsDeleteOpen(false);
    setIsHistorialOpen(false);
    setSelectedStockItem(null);
  };

  const getNombreVidrio = (idVidrio: number) => {
    return tiposVidrio.get(idVidrio) || `ID ${idVidrio}`;
  };

  return (
    <DashboardLayout title="Inventario de Stock (Vidrios)">
      <div className="flex justify-end mb-4">
        <Button onClick={handleOpenAdd}>
          <PlusCircle className="w-4 h-4 mr-2" />
          Añadir Stock
        </Button>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      )}
      {error && <p className="text-center text-destructive">{error}</p>}

      {!isLoading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stock.map((item) => (
            <StockVidrioCard
              key={item.idStockVidrio}
              item={item}
              nombreVidrio={getNombreVidrio(item.idVidrio)}
              onViewHistory={handleOpenHistorial}
              onEdit={handleOpenEdit}
              onDelete={handleOpenDelete}
            />
          ))}
        </div>
      )}
      
      {/* --- Renderizado de todos los Diálogos --- */}
      
      <HistorialDialog
        isOpen={isHistorialOpen}
        onClose={handleClose}
        itemType="vidrio"
        itemId={selectedStockItem?.idStockVidrio || null}
        itemName={selectedStockItem ? 
            `${getNombreVidrio(selectedStockItem.idVidrio)} ${selectedStockItem.espesor}mm (${selectedStockItem.ancho}x${selectedStockItem.alto})` 
            : ""}
      />

      <AddStockVidrioDialog
        isOpen={isAddOpen}
        onClose={handleClose}
        onStockAdded={handleCloseAndRefresh}
        tiposVidrioMap={tiposVidrio}
      />
      
      <EditStockVidrioDialog
        isOpen={isEditOpen}
        onClose={handleClose}
        onStockUpdated={handleCloseAndRefresh}
        stockItem={selectedStockItem}
        tiposVidrioMap={tiposVidrio}
      />

      <DeleteStockVidrioDialog
        isOpen={isDeleteOpen}
        onClose={handleClose}
        onStockDeleted={handleCloseAndRefresh}
        stockItem={selectedStockItem}
      />

    </DashboardLayout>
  );
}