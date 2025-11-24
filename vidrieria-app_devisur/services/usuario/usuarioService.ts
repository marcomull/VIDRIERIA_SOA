import API from "../usuario/api";
import type { UserRole } from '@/lib/auth';
import type { AdminUserFormData } from '@/components/adminUsuarios/EditUserDialog';

export interface ApiUser {
  idUsuario: number;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  dni: string;
  ruc: string;
  direccion: string;
  rol: UserRole;
  fechaRegistro: string;
}

interface PageResponse {
  content: ApiUser[];
  totalPages: number;
  totalElements: number;
  number: number;
}

export interface AdminUpdatePayload extends AdminUserFormData {
  rol: UserRole;
}

export const getUsuarios = async (
  page: number,
  search: string,
  role: string
): Promise<PageResponse> => {

  const params = new URLSearchParams({
    page: page.toString(),
    size: '9',
    sort: 'nombre,asc',
    searchTerm: search,
    rol: role,
  });

  const response = await API.get<PageResponse>(`/usuarios/listUsers?${params.toString()}`);

  if (response.data && Array.isArray(response.data.content)) {
    return response.data;
  }

  return { content: [], totalPages: 0, totalElements: 0, number: 0 };
};

export const updateUsuario = async (
  id: number,
  userData: AdminUpdatePayload
): Promise<ApiUser> => {

  const response = await API.put<ApiUser>(`/usuarios/admin/update/${id}`, userData);
  return response.data;
};

export const deleteUsuario = async (id: number): Promise<void> => {
  await API.delete(`/usuarios/delete/${id}`);
};