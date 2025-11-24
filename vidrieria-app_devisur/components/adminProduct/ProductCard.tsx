import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from 'lucide-react';
import type { Product } from '@/lib/types'; 

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}


const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      VIDRIO: "bg-blue-500", MAMPARA: "bg-green-500", VITRINA: "bg-purple-500",
      CUADRO: "bg-orange-500", VENTANA: "bg-cyan-500", ESPEJO: "bg-gray-400",
    };
    return `${colors[type] || "bg-gray-500"} text-white`;
};

export function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  return (
    <Card key={product.idProducto} className="hover:border-primary transition-colors overflow-hidden flex flex-col">
      <div className="aspect-video w-full overflow-hidden bg-muted">
        <img
          src={product.imagenUrl || "/placeholder.svg"} 
          alt={product.nombre}
          className="w-full h-full object-cover"
          onError={(e) => {
              if (e.currentTarget.src !== "/placeholder.svg") {
                  e.currentTarget.src = "/placeholder.svg";
              }
          }}
        />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{product.nombre}</CardTitle>
          <Badge className={getTypeColor(product.tipo)}>{product.tipo}</Badge>
        </div>
        {product.descripcion && <CardDescription>{product.descripcion}</CardDescription>}
      </CardHeader>
      <CardContent className="mt-auto pt-4"> 
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-2 bg-transparent"
            onClick={() => onEdit(product)} 
          >
            <Pencil className="w-4 h-4" />
            Editar
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-2 text-destructive hover:text-destructive bg-transparent"
            onClick={() => onDelete(product)}
          >
            <Trash2 className="w-4 h-4" />
            Eliminar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
