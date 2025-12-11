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
  // Función auxiliar para manejar error de imagen (para no repetir código)
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      if (e.currentTarget.src !== "/placeholder.svg") {
          e.currentTarget.src = "/placeholder.svg";
      }
  };

  return (
    <Card key={product.idProducto} className="hover:border-primary transition-colors overflow-hidden flex flex-col group"> {/* Agregué 'group' aquí */}
      
      {/* Contenedor de la Imagen modificado */}
      <div className="aspect-video w-full overflow-hidden bg-muted relative">
        
        {/* 1. Imagen Normal (Fondo recortado - object-cover) */}
        <img
          src={product.imagenUrl || "/placeholder.svg"} 
          alt={product.nombre}
          className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-20" 
          onError={handleImageError}
        />

        {/* 2. Imagen Completa (Superpuesta - object-contain) 
            Solo visible en hover, con fondo semitransparente para resaltar */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/5">
             <img
              src={product.imagenUrl || "/placeholder.svg"} 
              alt={product.nombre}
              className="w-full h-full object-contain drop-shadow-lg" // object-contain asegura que se vea TODO
              onError={handleImageError}
            />
        </div>

      </div>

      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg truncate" title={product.nombre}>{product.nombre}</CardTitle>
          <Badge className={getTypeColor(product.tipo)}>{product.tipo}</Badge>
        </div>
        {product.descripcion && <CardDescription className="line-clamp-2">{product.descripcion}</CardDescription>}
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