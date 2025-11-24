import { apiFetch } from '../catalogo/apiService'; 

export const uploadImage = async (file: File, folder: string, token: string | null): Promise<string> => {
  const formData = new FormData(); 
  formData.append('file', file); 
  formData.append('folder', folder); 

  try {
    const response = await apiFetch('/media/upload', {
      method: 'POST',
      body: formData, 
      token: token,  
    });

    if (!response?.url) {
      throw new Error("La respuesta de subida de imagen no contiene una URL.");
    }
    return response.url;
  } catch (error) {
    throw error;
  }
};
