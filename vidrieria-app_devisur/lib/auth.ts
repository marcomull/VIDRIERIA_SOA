import API from "../services/usuario/api";

export const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token"); 
  }
  return null;
};

export interface LoginResponse {
  token: string;
  id: number;
  correo: string;
  rol: string;
}

export type UserRole = "ADMIN" | "CLIENTE" | "VENDEDOR" | "TALLER" | "ALMACEN";

export interface CurrentUser {
  id: number;
  correo: string;
  rol: UserRole;
  token: string;
}

export async function login(email: string, password: string): Promise<LoginResponse | null> {
  try {
    const response = await API.post<LoginResponse>("/login/usuario", {
      correo: email,
      contrasena: password,
    });

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("rol", response.data.rol);
    localStorage.setItem("correo", response.data.correo);
    localStorage.setItem("id", response.data.id.toString()); 

    return response.data;
  } catch (error: any) {
    console.error("Error en login:", error.response?.data || error.message);
    return null;
  }
}

export async function logout(): Promise<void> {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      await API.post("/login/logout", {}, { 
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log("Token invalidado en el servidor.");
    } catch (error: any) {
      console.error("Error al invalidar el token en el servidor:", error.response?.data || error.message);
    }
  }

  localStorage.removeItem("token");
  localStorage.removeItem("rol");
  localStorage.removeItem("correo");
  localStorage.removeItem("id");
}

export function getCurrentUser(): CurrentUser | null {
  if (typeof window === "undefined") {
    return null;
  }

  const token = localStorage.getItem("token");
  const idString = localStorage.getItem("id");
  const correo = localStorage.getItem("correo");
  const rolString = localStorage.getItem("rol");

  if (!token || !idString || !correo || !rolString) {
    return null;
  }

  const validRoles: UserRole[] = ["ADMIN", "CLIENTE", "VENDEDOR", "TALLER", "ALMACEN"];
  if (!validRoles.includes(rolString as UserRole)) {
      console.error("Rol inválido encontrado en localStorage:", rolString);
      localStorage.removeItem("token");
      localStorage.removeItem("rol");
      localStorage.removeItem("correo");
      localStorage.removeItem("id");
      return null;
  }

  const rol = rolString as UserRole;

  const id = parseInt(idString, 10);
  if (isNaN(id)) {
      console.error("ID en localStorage no es un número válido.");
      localStorage.removeItem("token");
      localStorage.removeItem("rol");
      localStorage.removeItem("correo");
      localStorage.removeItem("id");
      return null;
  }
  
  return { token, id, correo, rol };
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("token");
}

export function isAdmin(): boolean {
  if (typeof window === "undefined") return false;
  const rol = localStorage.getItem("rol");
  return rol === "ADMIN";
}

export interface ChangePasswordData {
  contrasenaActual: string;
  nuevaContrasena: string;
  confirmarNuevaContrasena: string;
}

export async function changePassword(data: ChangePasswordData): Promise<{ success: boolean; message: string }> {
  try {
    const response = await API.post("/usuarios/change-password", data);
    return { success: true, message: response.data };
  } catch (error: any) {
    const errorMessage = error.response?.data || "Ocurrió un error al cambiar la contraseña.";
    return { success: false, message: errorMessage };
  }
}

export async function forgotPassword(email: string): Promise<{ success: boolean; message: string }> {
  try {
    const response = await API.post("/usuarios/forgot-password", { correo: email });
    return { success: true, message: response.data };
  } catch (error: any) {
    return { success: true, message: "Si existe una cuenta con este correo, recibirás un enlace para restablecer tu contraseña." };
  }
}

export async function resetPassword(token: string, contrasena: string): Promise<{ success: boolean; message: string }> {
  try {
    const response = await API.post("/usuarios/reset-password", { token, contrasena });
    return { success: true, message: response.data };
  } catch (error: any) {
    const errorMessage = error.response?.data || "El enlace es inválido o ha expirado. Por favor, solicita uno nuevo.";
    return { success: false, message: errorMessage };
  }
}
