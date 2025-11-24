// services/inventario/stockService.ts
import { apiInventoryFetch } from '../inventario/apiService';
import type { StockVidrio, StockMaterial, LowStockStatus } from '@/lib/types';

// --- SERVICIOS DE ALERTA ---

export const checkLowStockStatus = async (token: string | null): Promise<LowStockStatus> => {
  return await apiInventoryFetch('/api/v1/stock/status-check', {
    method: 'GET',
    token: token,
  });
};

export const triggerNotificationCheck = async (token: string | null): Promise<string> => {
  return await apiInventoryFetch('/api/v1/stock/trigger-notification-check', {
    method: 'POST',
    token: token,
  });
};

// --- SERVICIOS DE STOCK VIDRIO ---

export const getAllStockVidrio = async (token: string | null): Promise<StockVidrio[]> => {
  const data = await apiInventoryFetch('/api/v1/stock/vidrios', {
    method: 'GET',
    token: token,
  });
  return data || [];
};

export const createStockVidrio = async (data: Omit<StockVidrio, 'idStockVidrio' | 'fechaIngreso' | 'activo'>, token: string | null): Promise<StockVidrio> => {
  return await apiInventoryFetch('/api/v1/stock/vidrios', {
    method: 'POST',
    token: token,
    body: JSON.stringify(data),
  });
};

export const updateStockVidrio = async (id: number, data: Partial<StockVidrio>, token: string | null): Promise<StockVidrio> => {
  return await apiInventoryFetch(`/api/v1/stock/vidrios/${id}`, {
    method: 'PUT',
    token: token,
    body: JSON.stringify(data),
  });
};

export const deleteStockVidrio = async (id: number, token: string | null): Promise<void> => {
  await apiInventoryFetch(`/api/v1/stock/vidrios/${id}`, {
    method: 'DELETE',
    token: token,
  });
};

// --- SERVICIO DE MATERIALES ----

export const getAllStockMaterial = async (token: string | null): Promise<StockMaterial[]> => {
  const data = await apiInventoryFetch('/api/v1/stock/materiales', {
    method: 'GET',
    token: token,
  });
  return data || [];
};

export const createStockMaterial = async (data: Omit<StockMaterial, 'idStockMaterial' | 'fechaIngreso' | 'activo'>, token: string | null): Promise<StockMaterial> => {
  return await apiInventoryFetch('/api/v1/stock/materiales', {
    method: 'POST',
    token: token,
    body: JSON.stringify(data),
  });
};

export const updateStockMaterial = async (id: number, data: Partial<StockMaterial>, token: string | null): Promise<StockMaterial> => {
  return await apiInventoryFetch(`/api/v1/stock/materiales/${id}`, {
    method: 'PUT',
    token: token,
    body: JSON.stringify(data),
  });
};

export const deleteStockMaterial = async (id: number, token: string | null): Promise<void> => {
  await apiInventoryFetch(`/api/v1/stock/materiales/${id}`, {
    method: 'DELETE',
    token: token,
  });
};