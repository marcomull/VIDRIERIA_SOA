import { apiFetch } from '../catalogo/apiService'; //
import type { TipoVidrio, TipoVidrioFormData } from '@/lib/types'; 

interface PageResponse<T> {
  content: T[];
  page: {
    totalPages: number;
    totalElements: number;
    number: number;
    size: number;
  };
}

export const getTiposVidrio = async (
  token: string | null,
  page: number = 0,
  size: number = 10,
  searchTerm?: string | null
): Promise<{ content: TipoVidrio[], totalPages: number, totalElements: number }> => {
  
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('size', size.toString());
  if (searchTerm) params.append('search', searchTerm);

  const endpoint = `/catalogo/tipos-vidrio?${params.toString()}`;
  const data = await apiFetch(endpoint, { method: 'GET', token });

  return {
    content: data.content || [],
    totalPages: data.totalPages ?? data.page?.totalPages ?? 0,
    totalElements: data.totalElements ?? data.page?.totalElements ?? 0
  };
};


export const createTipoVidrio = async (tipoVidrioData: TipoVidrioFormData, token: string | null): Promise<TipoVidrio> => {
  console.log("Enviando para crear tipo de vidrio:", tipoVidrioData);
  return await apiFetch('/catalogo/tipos-vidrio', { 
    method: 'POST',
    body: JSON.stringify(tipoVidrioData),
    token: token, //
  });
};

export const updateTipoVidrio = async (id: number, tipoVidrioData: TipoVidrioFormData, token: string | null): Promise<TipoVidrio> => {
  console.log(`Enviando para actualizar tipo de vidrio ${id}:`, tipoVidrioData);
  return await apiFetch(`/catalogo/tipos-vidrio/${id}`, {
    method: 'PUT',
    body: JSON.stringify(tipoVidrioData),
    token: token, 
  });
};

export const deleteTipoVidrio = async (id: number, token: string | null): Promise<void> => {
  console.log(`Enviando para eliminar tipo de vidrio ${id}`);
  await apiFetch(`/catalogo/tipos-vidrio/${id}`, { 
    method: 'DELETE',
    token: token, 
  });
};