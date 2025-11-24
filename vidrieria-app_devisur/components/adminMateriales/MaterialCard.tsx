import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from 'lucide-react';
import type { Material } from '@/lib/types'; 
interface MaterialCardProps {
  material: Material;
  onEdit: (material: Material) => void;
  onDelete: (material: Material) => void;
}


export function MaterialCard({ material, onEdit, onDelete }: MaterialCardProps) {
  return (
    <Card key={material.idMaterial} className="hover:border-primary transition-colors overflow-hidden flex flex-col">
      <div className="aspect-video w-full overflow-hidden bg-muted">
        <img
          src={material.imagenUrl || "/placeholder.svg"}
          alt={material.nombre}
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
          <CardTitle className="text-lg">{material.nombre}</CardTitle>
          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
             {material.tipoMaterial}
          </span>
        </div>
        {material.descripcion && <CardDescription>{material.descripcion}</CardDescription>}
      </CardHeader>
      <CardContent className="mt-auto pt-4">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-2 bg-transparent"
            onClick={() => onEdit(material)}
          >
            <Pencil className="w-4 h-4" />
            Editar
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-2 text-destructive hover:text-destructive bg-transparent"
            onClick={() => onDelete(material)}
          >
            <Trash2 className="w-4 h-4" />
            Eliminar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}