"use client"

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { getToken } from "@/lib/auth";
import { getHistorialVidrio, getHistorialMaterial } from "@/services/inventario/historialService";
import type { MovimientoVidrio, MovimientoMaterial } from "@/lib/types";

type HistorialDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  itemType: "vidrio" | "material";
  itemId: number | null;
  itemName: string;
};

export function HistorialDialog({ isOpen, onClose, itemType, itemId, itemName }: HistorialDialogProps) {
  const [historial, setHistorial] = useState<(MovimientoVidrio | MovimientoMaterial)[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const token = getToken();

  useEffect(() => {
    if (isOpen && itemId) {
      setIsLoading(true);
      setError(null);
      
      const fetchHistorial = itemType === "vidrio" 
        ? getHistorialVidrio(itemId, token)
        : getHistorialMaterial(itemId, token);

      fetchHistorial
        .then(data => setHistorial(data))
        .catch(err => setError(err.message || "No se pudo cargar el historial."))
        .finally(() => setIsLoading(false));
    }
  }, [isOpen, itemId, itemType, token]);

  const getMovementColor = (tipo: string) => {
    if (tipo.includes("INGRESO")) return "border-green-600 bg-green-500/10 text-green-700";
    if (tipo.includes("AJUSTE")) return "border-yellow-600 bg-yellow-500/10 text-yellow-700";
    if (tipo.includes("BAJA")) return "border-red-600 bg-red-500/10 text-red-700";
    if (tipo.includes("CONSUMO")) return "border-blue-600 bg-blue-500/10 text-blue-700";
    return "border-gray-500 bg-gray-500/10 text-gray-700";
  };

  const formatFecha = (fecha: string) => {
      return new Date(fecha).toLocaleString("es-ES", {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Historial de Movimientos (Kardex)</DialogTitle>
          <DialogDescription>
            Mostrando historial para el item: <span className="font-semibold">{itemName}</span>
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto">
          {isLoading ? (
            <div className="flex justify-center items-center h-48">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <p className="text-destructive text-center">{error}</p>
          ) : historial.length === 0 ? (
              <p className="text-muted-foreground text-center h-48">No hay movimientos registrados para este item.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Responsable</TableHead>
                  <TableHead>Movimiento</TableHead>
                  <TableHead className="text-right">Cantidad</TableHead>
                  <TableHead className="text-right">Stock Final</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {historial.map((mov) => (
                  <TableRow key={mov.idHistorial}>
                    <TableCell className="text-xs text-muted-foreground">{formatFecha(mov.fechaMovimiento)}</TableCell>
                    <TableCell>{mov.nombreUsuarioResponsable}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`font-medium ${getMovementColor(mov.tipoMovimiento)}`}>
                        {mov.tipoMovimiento.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell className={`text-right font-medium ${
                        mov.cantidadMovida > 0 ? "text-green-600" : "text-red-600"
                    }`}>
                      {mov.cantidadMovida > 0 ? `+${mov.cantidadMovida}` : mov.cantidadMovida}
                    </TableCell>
                    <TableCell className="text-right font-bold">{mov.stockRestante}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}