import { apiInventoryFetch } from '../inventario/apiService';
import type { MovimientoVidrio, MovimientoMaterial } from '@/lib/types';

export const getHistorialVidrio = async (
  idStockVidrio: number,
  token: string | null
): Promise<MovimientoVidrio[]> => {
  
  const data = await apiInventoryFetch(`/api/v1/historial/vidrio/${idStockVidrio}`, {
    method: 'GET',
    token: token,
  });
  return data || [];
};

export const getHistorialMaterial = async (
  idStockMaterial: number,
  token: string | null
): Promise<MovimientoMaterial[]> => {
  
  const data = await apiInventoryFetch(`/api/v1/historial/material/${idStockMaterial}`, {
    method: 'GET',
    token: token,
  });
  return data || [];
};