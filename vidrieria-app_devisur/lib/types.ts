//-------
export interface Product {
  idProducto: number;
  nombre: string;
  descripcion: string;
  tipo: string; 
  imagenUrl: string | null;
  activo: boolean;
}

export interface ProductFormData {
  nombre: string;
  descripcion: string;
  tipo: string;
  imagenUrl: string | null; 
}

// ---------
export interface Material {
  idMaterial: number; 
  nombre: string;
  descripcion: string;
  tipoMaterial: string; 
  imagenUrl: string | null;
  activo: boolean;
}

export interface MaterialFormData {
  nombre: string;
  descripcion: string;
  tipoMaterial: string; 
  imagenUrl: string | null;
}

// -------
export interface TipoVidrio {
  idTipoVidrio: number; 
  nombre: string;
  descripcion: string;
  imagenUrl: string | null;
  activo: boolean; 
}

export interface TipoVidrioFormData {
  nombre: string;
  descripcion: string;
  imagenUrl: string | null; 
}

// ---------------
// El ENUM del backend
export type TipoMovimiento = 
  | "INGRESO_MANUAL"
  | "AJUSTE_MANUAL"
  | "BAJA_POR_ROTURA"
  | "CONSUMO_PEDIDO";

// Historial de Vidrio (Kardex)
export interface MovimientoVidrio {
  idHistorial: number;
  idStockVidrio: number;
  tipoMovimiento: TipoMovimiento;
  cantidadMovida: number;
  stockRestante: number;
  idUsuarioResponsable: number | null;
  fechaMovimiento: string; // (string de ISO 8601)
  nombreUsuarioResponsable: string; // (Enriquecido por el AppService)
}

// Historial de Material (Kardex)
export interface MovimientoMaterial {
  idHistorial: number;
  idStockMaterial: number;
  tipoMovimiento: TipoMovimiento;
  cantidadMovida: number;
  stockRestante: number;
  idUsuarioResponsable: number | null;
  fechaMovimiento: string;
  nombreUsuarioResponsable: string;
}

// El item de stock de vidrio
export interface StockVidrio {
  idStockVidrio: number;
  idVidrio: number;
  espesor: number;
  ancho: number;
  alto: number;
  cantidad: number;
  esRetazo: boolean;
  precioM2: number;
  ubicacion: string;
  fechaIngreso: string;
  activo: boolean;
  // Opcional: para mostrar el nombre
  nombreVidrio?: string; 
}

// El item de stock de material
export interface StockMaterial {
  idStockMaterial: number;
  idMaterial: number;
  largo: number;
  cantidad: number;
  esRetazo: boolean;
  precioMetro: number;
  ubicacion: string;
  fechaIngreso: string;
  activo: boolean;
  // Opcional: para mostrar el nombre
  nombreMaterial?: string;
}

// Para la alerta de stock bajo
export type LowStockStatus = {
  lowStockItemCount: number;
};