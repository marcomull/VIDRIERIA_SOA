import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"; //
import { Button } from "@/components/ui/button"; 
import { Pencil, Trash2 } from 'lucide-react';
import type { TipoVidrio } from '@/lib/types'; 

interface TipoVidrioCardProps {
  tipoVidrio: TipoVidrio;
  onEdit: (tipoVidrio: TipoVidrio) => void;
  onDelete: (tipoVidrio: TipoVidrio) => void;
}

export function TipoVidrioCard({ tipoVidrio, onEdit, onDelete }: TipoVidrioCardProps) {
  return (
    <Card key={tipoVidrio.idTipoVidrio} className="hover:border-primary transition-colors overflow-hidden flex flex-col">
      <div className="aspect-video w-full overflow-hidden bg-muted">
        <img
          src={tipoVidrio.imagenUrl || "/placeholder.svg"}
          className="w-full h-full object-cover"
          onError={(e) => {
              if (e.currentTarget.src !== "/placeholder.svg") {
                  e.currentTarget.src = "/placeholder.svg";
              }
          }}
        />
      </div>
      <CardHeader>
        <CardTitle className="text-lg">{tipoVidrio.nombre}</CardTitle>
        {tipoVidrio.descripcion && <CardDescription>{tipoVidrio.descripcion}</CardDescription>}
      </CardHeader>
      <CardContent className="mt-auto pt-4"> 
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-2 bg-transparent"
            onClick={() => onEdit(tipoVidrio)}
          >
            <Pencil className="w-4 h-4" />
            Editar
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-2 text-destructive hover:text-destructive bg-transparent"
            onClick={() => onDelete(tipoVidrio)}
          >
            <Trash2 className="w-4 h-4" />
            Eliminar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}