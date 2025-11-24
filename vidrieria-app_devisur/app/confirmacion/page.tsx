"use client"

// 1. Importa useState además de lo que ya tenías
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import axios from "axios"

// 2. Mueve toda la lógica que depende del navegador a un nuevo componente hijo
function ConfirmacionContent() {
  const searchParams = useSearchParams()
  const codigo = searchParams.get("codigo")
  const [mensaje, setMensaje] = useState("Verificando tu correo...")

  useEffect(() => {
    // La lógica de la petición se queda aquí
    if (codigo) {
      axios
        .get(`http://localhost:8080/usuarios/confirm?codigo=${codigo}`)
        .then((res) => {
          setMensaje(res.data || "Correo confirmado exitosamente")
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            setMensaje(error.response.data)
          } else {
            setMensaje("No se pudo conectar con el servidor. Inténtalo de nuevo.")
          }
        })
    } else {
        // Maneja el caso en que no hay código en la URL
        setMensaje("No se proporcionó un código de verificación en la URL.");
    }
  }, [codigo]) // Se ejecuta solo cuando 'codigo' cambia

  // Este es el JSX que depende del estado y el código
  return <p>{mensaje}</p>
}


// 3. Tu componente principal (la página) ahora es mucho más simple
export default function ConfirmacionPage() {
  // Un estado para saber si ya estamos en el navegador (cliente)
  const [isClient, setIsClient] = useState(false)

  // Este efecto se ejecuta solo una vez en el cliente, después del render inicial
  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <main className="flex h-screen items-center justify-center bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-semibold mb-4">Confirmación de correo</h1>
        {/*
          Renderiza un mensaje de "Cargando..." en el servidor y en el primer
          render del cliente. Luego, cuando 'isClient' se vuelve true,
          renderiza el componente con la lógica real.
        */}
        {isClient ? <ConfirmacionContent /> : <p>Cargando...</p>}
      </div>
    </main>
  )
}