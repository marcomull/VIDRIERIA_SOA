"use client"

import { useEffect, useState, useCallback } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { PlusCircle, Loader2 } from "lucide-react";
import { getToken } from "@/lib/auth";
import { StockMaterial, Material } from "@/lib/types";
import { getAllStockMaterial } from "@/services/inventario/stockService";
import { getMaterials } from "@/services/catalogo/materialService";
import { StockMaterialCard } from "@/components/adminInventario/StockMaterialCard";
import { HistorialDialog } from "@/components/adminInventario/HistorialDialog";
import { AddStockMaterialDialog } from "@/components/adminInventario/AddStockMaterialDialog";
import { EditStockMaterialDialog } from "@/components/adminInventario/EditStockMaterialDialog";
import { DeleteStockMaterialDialog } from "@/components/adminInventario/DeleteStockMaterialDialog";

export default function InventarioMaterialPage() {
    const [stock, setStock] = useState<StockMaterial[]>([]);
    const [tiposMaterial, setTiposMaterial] = useState<Map<number, string>>(new Map());
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const token = getToken();

    const [isHistorialOpen, setIsHistorialOpen] = useState(false);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedStockItem, setSelectedStockItem] = useState<StockMaterial | null>(null);

    const loadData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const tiposData = await getMaterials(token);
            const tiposMap = new Map(
                tiposData.content.map((tipo: Material) => [tipo.idMaterial, tipo.nombre])
            );
            setTiposMaterial(tiposMap);

            const stockData = await getAllStockMaterial(token);
            setStock(stockData);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error al cargar datos.");
        } finally {
            setIsLoading(false);
        }
    }, [token]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    // --- Handlers para diálogos ---
    const handleOpenAdd = () => setIsAddOpen(true);

    const handleOpenHistorial = (item: StockMaterial) => {
        setSelectedStockItem(item);
        setIsHistorialOpen(true);
    };

    const handleOpenEdit = (item: StockMaterial) => {
        setSelectedStockItem(item);
        setIsEditOpen(true);
    };

    const handleOpenDelete = (item: StockMaterial) => {
        setSelectedStockItem(item);
        setIsDeleteOpen(true);
    };

    const handleCloseAndRefresh = () => {
        setIsAddOpen(false);
        setIsEditOpen(false);
        setIsDeleteOpen(false);
        setIsHistorialOpen(false);
        setSelectedStockItem(null);
        loadData();
    };

    const handleClose = () => {
        setIsAddOpen(false);
        setIsEditOpen(false);
        setIsDeleteOpen(false);
        setIsHistorialOpen(false);
        setSelectedStockItem(null);
    };

    const getNombreMaterial = (idMaterial: number) => {
        return tiposMaterial.get(idMaterial) || `ID ${idMaterial}`;
    };

    return (
        <DashboardLayout title="Inventario de Stock (Materiales)">
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
                        <StockMaterialCard
                            key={item.idStockMaterial}
                            item={item}
                            nombreMaterial={getNombreMaterial(item.idMaterial)}
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
                itemType="material"
                itemId={selectedStockItem?.idStockMaterial || null}
                itemName={selectedStockItem ?
                    `${getNombreMaterial(selectedStockItem.idMaterial)} (Largo: ${selectedStockItem.largo}m)`
                    : ""}
            />

            <AddStockMaterialDialog
                isOpen={isAddOpen}
                onClose={handleClose}
                onStockAdded={handleCloseAndRefresh}
                tiposMaterialMap={tiposMaterial}
            />

            <EditStockMaterialDialog
                isOpen={isEditOpen}
                onClose={handleClose}
                onStockUpdated={handleCloseAndRefresh}
                stockItem={selectedStockItem}
                tiposMaterialMap={tiposMaterial}
            />

            <DeleteStockMaterialDialog
                isOpen={isDeleteOpen}
                onClose={handleClose}
                onStockDeleted={handleCloseAndRefresh}
                stockItem={selectedStockItem}
            />

        </DashboardLayout>
    );
}