"use client"

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { isAuthenticated, isAdmin, getCurrentUser, type CurrentUser, type UserRole } from "@/lib/auth";
import { Search, Loader2 } from "lucide-react";
import { EditUserDialog, AdminUserFormData } from "@/components/adminUsuarios/EditUserDialog";
import { DeleteUserDialog } from "@/components/adminUsuarios/DeleteUserDialog";
import { getUsuarios, updateUsuario, deleteUsuario, type ApiUser } from "@/services/usuario/usuarioService";
import { UsuarioCard } from "@/components/adminUsuarios/UserCard";

type User = ApiUser;

function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => { setDebouncedValue(value); }, delay);
        return () => { clearTimeout(handler); };
    }, [value, delay]);
    return debouncedValue;
}

export default function AdminUsuariosPage() {
    const router = useRouter();
    const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
    const [usuarios, setUsuarios] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const [filterRol, setFilterRol] = useState<string>("TODOS");
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);

    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedUsuario, setSelectedUsuario] = useState<User | null>(null);

    const fetchUsuarios = useCallback(async (page: number, search: string, role: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await getUsuarios(page, search, role);

            setUsuarios(data.content);
            setTotalPages(data.totalPages);
            setCurrentPage(data.number ?? 0); 
            setTotalElements(data.totalElements);

        } catch (error) {
            setError(error instanceof Error ? error.message : "Ocurrió un error inesperado.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!isAuthenticated() || !isAdmin()) {
            router.push("/login");
        } else {
            setCurrentUser(getCurrentUser());
        }
    }, [router]);

    useEffect(() => {
        if (currentUser) {
            fetchUsuarios(0, debouncedSearchTerm, filterRol);
        }
    }, [debouncedSearchTerm, filterRol, currentUser, fetchUsuarios]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 0 && newPage < totalPages) {
            fetchUsuarios(newPage, debouncedSearchTerm, filterRol);
        }
    };

    const handleOpenEditDialog = (user: User) => { setSelectedUsuario(user); setIsEditDialogOpen(true); };
    const handleOpenDeleteDialog = (user: User) => { setSelectedUsuario(user); setIsDeleteDialogOpen(true); };

    const handleUpdateUser = async (formData: Omit<AdminUserFormData, 'rol'>) => {
        if (!selectedUsuario) return;
        try {
            const payload = { ...formData, rol: selectedUsuario.rol };

            await updateUsuario(selectedUsuario.idUsuario, payload);

            setIsEditDialogOpen(false);
            setSelectedUsuario(null);
            await fetchUsuarios(currentPage, debouncedSearchTerm, filterRol);
        } catch (err) {
            alert(err instanceof Error ? err.message : "Ocurrió un error.");
        }
    };

    const handleDeleteUser = async () => {
        if (!selectedUsuario) return;
        try {
            await deleteUsuario(selectedUsuario.idUsuario);

            setIsDeleteDialogOpen(false);
            setSelectedUsuario(null);
            await fetchUsuarios(currentPage, debouncedSearchTerm, filterRol);
        } catch (err) {
            alert(err instanceof Error ? err.message : "Ocurrió un error.");
        }
    };

    const adminUsers = usuarios.filter((u) => u.rol === "ADMIN");
    const clientUsers = usuarios.filter((u) => u.rol === "CLIENTE");
    const vendedorUsers = usuarios.filter((u) => u.rol === "VENDEDOR");
    const tallerUsers = usuarios.filter((u) => u.rol === "TALLER");
    const almacenUsers = usuarios.filter((u) => u.rol === "ALMACEN");

    if (!currentUser) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <DashboardLayout title="Gestión de Usuarios">
            <div className="mb-6 space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Buscar por nombre, apellido o correo..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <Select value={filterRol} onValueChange={setFilterRol}>
                        <SelectTrigger className="w-full md:w-[200px]"><SelectValue placeholder="Filtrar por rol" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="TODOS">Todos los roles</SelectItem>
                            <SelectItem value="ADMIN">Administradores</SelectItem>
                            <SelectItem value="CLIENTE">Clientes</SelectItem>
                            <SelectItem value="VENDEDOR">Vendedores</SelectItem>
                            <SelectItem value="TALLER">Taller</SelectItem>
                            <SelectItem value="ALMACEN">Almacén</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="text-sm text-muted-foreground">
                    Mostrando {usuarios.length} de {totalElements} usuarios en total.
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" /><p className="ml-4 text-muted-foreground">Cargando usuarios...</p>
                </div>
            ) : error ? (
                <div className="text-center py-12 text-destructive">
                    <h3 className="text-lg font-semibold mb-2">Error al cargar</h3><p>{error}</p>
                </div>
            ) : (
                <>
                    <div className="space-y-8">
                        {(filterRol === 'TODOS' || filterRol === 'ADMIN') && adminUsers.length > 0 && (
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight mb-4">Administradores ({adminUsers.length})</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {adminUsers.map(user => (
                                        <UsuarioCard
                                            key={user.idUsuario}
                                            usuario={user}
                                            currentUser={currentUser}
                                            onEdit={handleOpenEditDialog}
                                            onDelete={handleOpenDeleteDialog}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {(filterRol === 'TODOS' || filterRol === 'CLIENTE') && clientUsers.length > 0 && (
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight mb-4">Clientes ({clientUsers.length})</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {clientUsers.map(user => (
                                        <UsuarioCard
                                            key={user.idUsuario}
                                            usuario={user}
                                            currentUser={currentUser}
                                            onEdit={handleOpenEditDialog}
                                            onDelete={handleOpenDeleteDialog}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {(filterRol === 'TODOS' || filterRol === 'VENDEDOR') && vendedorUsers.length > 0 && (
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight mb-4">Vendedores ({vendedorUsers.length})</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {vendedorUsers.map(user => (
                                        <UsuarioCard
                                            key={user.idUsuario}
                                            usuario={user}
                                            currentUser={currentUser}
                                            onEdit={handleOpenEditDialog}
                                            onDelete={handleOpenDeleteDialog}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {(filterRol === 'TODOS' || filterRol === 'TALLER') && tallerUsers.length > 0 && (
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight mb-4">Personal de Taller ({tallerUsers.length})</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {tallerUsers.map(user => (
                                        <UsuarioCard
                                            key={user.idUsuario}
                                            usuario={user}
                                            currentUser={currentUser}
                                            onEdit={handleOpenEditDialog}
                                            onDelete={handleOpenDeleteDialog}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {(filterRol === 'TODOS' || filterRol === 'ALMACEN') && almacenUsers.length > 0 && (
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight mb-4">Personal de Almacén ({almacenUsers.length})</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {almacenUsers.map(user => (
                                        <UsuarioCard
                                            key={user.idUsuario}
                                            usuario={user}
                                            currentUser={currentUser}
                                            onEdit={handleOpenEditDialog}
                                            onDelete={handleOpenDeleteDialog}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {usuarios.length === 0 && (
                            <p className="text-muted-foreground text-center py-12">
                                {filterRol !== 'TODOS' ? "No se encontraron usuarios con el rol seleccionado." :
                                    !searchTerm ? "No hay usuarios registrados (excepto tú, quizás)." :
                                        "No se encontraron usuarios con ese término de búsqueda."}
                            </p>
                        )}
                    </div>
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-4 mt-8">
                            <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}>
                                Anterior
                            </Button>
                            <span className="text-sm font-medium">Página {currentPage + 1} de {totalPages}</span>
                            <Button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= totalPages - 1}>
                                Siguiente
                            </Button>
                        </div>
                    )}
                </>
            )}
            {selectedUsuario && (
                <EditUserDialog
                    isOpen={isEditDialogOpen}
                    onClose={() => setIsEditDialogOpen(false)}
                    user={selectedUsuario}
                    onSave={handleUpdateUser}
                />
            )}
            {selectedUsuario && (
                <DeleteUserDialog
                    isOpen={isDeleteDialogOpen}
                    onClose={() => setIsDeleteDialogOpen(false)}
                    user={selectedUsuario}
                    onConfirm={handleDeleteUser}
                />
            )}
        </DashboardLayout>
    );
}