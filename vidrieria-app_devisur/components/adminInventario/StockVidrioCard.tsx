"use client"

import { StockVidrio } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { History, Edit, Trash2 } from "lucide-react";

type StockVidrioCardProps = {
  item: StockVidrio;
  nombreVidrio: string; // El nombre (ej. "Vidrio Templado") lo pasamos desde la página
  onEdit: (item: StockVidrio) => void;
  onDelete: (item: StockVidrio) => void;
  onViewHistory: (item: StockVidrio) => void;
};

export function StockVidrioCard({ item, nombreVidrio, onEdit, onDelete, onViewHistory }: StockVidrioCardProps) {
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{nombreVidrio} {item.espesor}mm</CardTitle>
        <CardDescription>ID Stock: {item.idStockVidrio} | Ubicación: {item.ubicacion || 'N/A'}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Medidas (A x A):</span>
          <span className="font-semibold">{item.ancho}m x {item.alto}m</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Cantidad:</span>
          <span className="font-bold text-2xl text-primary">{item.cantidad}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Precio m²:</span>
          <span className="font-semibold">S/ {item.precioM2.toFixed(2)}</span>
        </div>
        {item.esRetazo && <Badge variant="destructive">Retazo</Badge>}
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          onClick={() => onViewHistory(item)}
        >
          <History className="w-4 h-4 mr-2" />
          Historial
        </Button>
        <Button variant="ghost" size="icon" onClick={() => onEdit(item)}>
          <Edit className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => onDelete(item)}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}