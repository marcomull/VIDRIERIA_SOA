const API_BASE_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL || "http://localhost:8000";

interface FetchOptions extends RequestInit {
  token?: string | null;
}

export const apiFetch = async (endpoint: string, options: FetchOptions = {}): Promise<any> => {
  const { token, ...fetchOptions } = options;

  const headersInit: HeadersInit = fetchOptions.headers ? new Headers(fetchOptions.headers) : new Headers();
  const headers = new Headers(headersInit);

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  if (!(fetchOptions.body instanceof FormData)) {
    if (!headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }
  } else {
    headers.delete('Content-Type');
  }


  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...fetchOptions,
      headers,
    });

    if (!response.ok && (response.status === 503 || response.status === 500)) {
      try {
        const fallbackBody = await response.json();
        if (fallbackBody.status === 'FALLBACK_RESILIENCIA') {
          return fallbackBody;
        }
      } catch (e) {
      }
    }

    if (!response.ok) {
      let errorMessage = `Error ${response.status}: ${response.statusText}`;
      try {
        if (response.headers.get("content-length") !== "0" && response.body) {
          const errorBody = await response.json();
          errorMessage = errorBody.message || errorBody.error || errorMessage;
        }
      } catch (e) { }
      throw new Error(errorMessage);
    }

    if (response.status === 204 || response.headers.get("content-length") === "0") {
      return null;
    }

    return await response.json();

  } catch (err) {
    throw new Error(err instanceof Error ? err.message : 'Error de red o conexión con la API');
  }
};
