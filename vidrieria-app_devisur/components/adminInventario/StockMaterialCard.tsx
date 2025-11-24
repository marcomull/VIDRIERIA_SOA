"use client"

import { StockMaterial } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { History, Edit, Trash2 } from "lucide-react";

type StockMaterialCardProps = {
  item: StockMaterial;
  nombreMaterial: string; // El nombre (ej. "Perfil Aluminio") lo pasamos desde la página
  onEdit: (item: StockMaterial) => void;
  onDelete: (item: StockMaterial) => void;
  onViewHistory: (item: StockMaterial) => void;
};

export function StockMaterialCard({ item, nombreMaterial, onEdit, onDelete, onViewHistory }: StockMaterialCardProps) {
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{nombreMaterial}</CardTitle>
        <CardDescription>ID Stock: {item.idStockMaterial} | Ubicación: {item.ubicacion || 'N/A'}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Largo:</span>
          <span className="font-semibold">{item.largo}m</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Cantidad:</span>
          <span className="font-bold text-2xl text-primary">{item.cantidad}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Precio por Metro:</span>
          <span className="font-semibold">S/ {item.precioMetro.toFixed(2)}</span>
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