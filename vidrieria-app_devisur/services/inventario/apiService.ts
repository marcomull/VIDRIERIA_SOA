const API_BASE_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL || "http://localhost:8000";

interface FetchOptions extends RequestInit {
  token?: string | null;
}

export const apiInventoryFetch = async (endpoint: string, options: FetchOptions = {}): Promise<any> => {
  const { token, ...fetchOptions } = options;
  const headersInit: HeadersInit = fetchOptions.headers ? new Headers(fetchOptions.headers) : new Headers();
  const headers = new Headers(headersInit);

  if (!headers.has('Content-Type') && !(fetchOptions.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...fetchOptions,
      headers,
    });

    if (response.status === 204) { 
      return null;
    }

    const text = await response.text(); 
    let data: any;

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        try {
            data = text ? JSON.parse(text) : {};
        } catch (jsonError) {
            console.error("Error al parsear JSON:", jsonError);
            throw new Error("Respuesta del servidor no es JSON válido.");
        }
    } else {
        data = text;
    }
    if (!response.ok) {
      const errorMessage = data?.error || data?.message || response.statusText || "Error desconocido";
      throw new Error(errorMessage);
    }

    return data;
  } catch (err) {
    console.error(`API Fetch Error (${endpoint}):`, err);
    throw err;
  }
};