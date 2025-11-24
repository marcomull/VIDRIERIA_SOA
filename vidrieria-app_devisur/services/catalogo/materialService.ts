import { apiFetch } from '../catalogo/apiService';
import type { Material, MaterialFormData } from '@/lib/types';

interface PageResponse<T> {
  content: T[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
}

export const getMaterials = async (
  token: string | null,
  page: number = 0,
  size: number = 10,
  searchTerm?: string | null
): Promise<{ content: Material[], totalPages: number, totalElements: number }> => {

  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('size', size.toString());
  if (searchTerm) params.append('search', searchTerm);

  const endpoint = `/catalogo/materiales?${params.toString()}`;
  const data = await apiFetch(endpoint, { method: 'GET', token });

  const totalPages =
    data.totalPages ??
    data.page?.totalPages ??
    0;

  const totalElements =
    data.totalElements ??
    data.page?.totalElements ??
    0;

  return {
    content: data.content || [],
    totalPages,
    totalElements
  };
};


export const createMaterial = async (materialData: MaterialFormData, token: string | null): Promise<Material> => {
  return await apiFetch('/catalogo/materiales', {
    method: 'POST',
    body: JSON.stringify(materialData),
    token: token,
  });
};

export const updateMaterial = async (id: number, materialData: MaterialFormData, token: string | null): Promise<Material> => {
  return await apiFetch(`/catalogo/materiales/${id}`, {
    method: 'PUT',
    body: JSON.stringify(materialData),
    token: token,
  });
};

export const deleteMaterial = async (id: number, token: string | null): Promise<void> => {
  await apiFetch(`/catalogo/materiales/${id}`, {
    method: 'DELETE',
    token: token,
  });
};