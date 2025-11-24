import type { Material, TipoVidrio, Product, Order } from "./types"

export const mockMaterials: Material[] = [
  {
    id: 1,
    nombre: "Aluminio",
    descripcion: "Marco de aluminio estándar",
    precioBase: 25.0,
    imageUrl: "https://example.com/aluminio.jpg",
  },
  {
    id: 2,
    nombre: "Aluminio Premium",
    descripcion: "Marco de aluminio de alta calidad",
    precioBase: 45.0,
    imageUrl: "https://example.com/aluminio_premium.jpg",
  },
  {
    id: 3,
    nombre: "PVC",
    descripcion: "Marco de PVC resistente",
    precioBase: 30.0,
    imageUrl: "https://example.com/pvc.jpg",
  },
  {
    id: 4,
    nombre: "Madera",
    descripcion: "Marco de madera natural",
    precioBase: 60.0,
    imageUrl: "https://example.com/madera.jpg",
  },
  {
    id: 5,
    nombre: "Acero Inoxidable",
    descripcion: "Marco de acero inoxidable",
    precioBase: 80.0,
    imageUrl: "https://example.com/inoxidable.jpg",
  },
]

export const mockTiposVidrio: TipoVidrio[] = [
  { id: 1, nombre: "Transparente", descripcion: "Vidrio transparente estándar", espesor: 4, precioM2: 15.0 },
  { id: 2, nombre: "Templado", descripcion: "Vidrio templado de seguridad", espesor: 6, precioM2: 35.0 },
  { id: 3, nombre: "Laminado", descripcion: "Vidrio laminado de seguridad", espesor: 6, precioM2: 40.0 },
  { id: 4, nombre: "Esmerilado", descripcion: "Vidrio esmerilado para privacidad", espesor: 4, precioM2: 25.0 },
  { id: 5, nombre: "Reflectivo", descripcion: "Vidrio reflectivo con filtro UV", espesor: 6, precioM2: 45.0 },
  { id: 6, nombre: "Doble", descripcion: "Vidrio doble hermético", espesor: 20, precioM2: 65.0 },
]

export const mockProducts: Product[] = [
  {
    id: 1,
    nombre: "Vidrio a Medida",
    descripcion: "Vidrio cortado a las dimensiones que necesites",
    tipo: "VIDRIO",
    precioBase: 0,
    imageUrl: "https://example.com/vidrio_medida.jpg",
  },
  {
    id: 2,
    nombre: "Mampara de Baño",
    descripcion: "Mampara de baño con vidrio templado",
    tipo: "MAMPARA",
    precioBase: 250.0,
    imageUrl: "https://example.com/mampara_banio.jpg",
  },
  {
    id: 3,
    nombre: "Vitrina Exhibidora",
    descripcion: "Vitrina de vidrio para exhibición",
    tipo: "VITRINA",
    precioBase: 350.0,
    imageUrl: "https://example.com/vitrina.jpg",
  },
  {
    id: 4,
    nombre: "Marco para Cuadro",
    descripcion: "Marco con vidrio para cuadros y fotografías",
    tipo: "CUADRO",
    precioBase: 45.0,
    imageUrl: "https://example.com/marco_cuadro.jpg",
  },
  {
    id: 5,
    nombre: "Ventana Completa",
    descripcion: "Ventana con marco y vidrio",
    tipo: "VENTANA",
    precioBase: 180.0,
    imageUrl: "https://example.com/ventana_completa.jpg",
  },
]

export const mockOrders: Order[] = [
  {
    id: 1,
    usuarioId: 2,
    usuario: {
      id: 2,
      nombre: "Juan",
      apellido: "Pérez",
      email: "juan@example.com",
      telefono: "0987654321",
      direccion: "Av. Secundaria 456",
      rol: "CLIENTE",
      fechaRegistro: "2024-02-15T00:00:00Z",
    },
    fechaPedido: "2024-03-15T10:30:00Z",
    estado: "COMPLETADO",
    total: 425.0,
    items: [
      {
        id: 1,
        productoId: 2,
        producto: mockProducts[1],
        cantidad: 1,
        ancho: 1.2,
        alto: 2.0,
        materialId: 1,
        material: mockMaterials[0],
        tipoVidrioId: 2,
        tipoVidrio: mockTiposVidrio[1],
        precioUnitario: 425.0,
        subtotal: 425.0,
      },
    ],
    notas: "Instalación urgente",
  },
]
