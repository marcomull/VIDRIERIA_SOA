import { apiFetch } from '../catalogo/apiService';
import type { Product, ProductFormData } from '@/lib/types';

export const getProducts = async (
  token: string | null,
  page: number = 0,
  size: number = 10,
  searchTerm?: string | null
): Promise<{ content: Product[], totalPages: number, totalElements: number }> => {
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('size', size.toString());
  if (searchTerm) {
    params.append('search', searchTerm);
  }
  const endpoint = `/catalogo/productos?${params.toString()}`;

  const data = await apiFetch(endpoint, { method: 'GET', token });

  return {
    content: data.content || [],
    totalPages: data.totalPages ?? data.page?.totalPages ?? 0,
    totalElements: data.totalElements ?? data.page?.totalElements ?? 0
  };
};


export const createProduct = async (productData: ProductFormData, token: string | null): Promise<Product> => {
  return await apiFetch('/catalogo/productos', {
    method: 'POST',
    body: JSON.stringify(productData),
    token: token,
  });
};

export const updateProduct = async (id: number, productData: ProductFormData, token: string | null): Promise<Product> => {
  return await apiFetch(`/catalogo/productos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(productData),
    token: token,
  });
};

export const deleteProduct = async (id: number, token: string | null): Promise<void> => {
  await apiFetch(`/catalogo/productos/${id}`, {
    method: 'DELETE',
    token: token,
  });
};
