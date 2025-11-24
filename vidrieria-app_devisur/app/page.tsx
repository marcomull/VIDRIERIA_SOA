import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, Target, Heart, ShoppingCart, Shield, Clock, Award } from "lucide-react"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <section className="relative bg-gradient-to-br from-[#0077b6] via-[#00b4d8] to-[#48cae4] text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">Soluciones en Vidrio de Alta Calidad</h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 text-pretty">
              Transformamos tus espacios con productos de vidrio personalizados y profesionales
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" variant="secondary" className="gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Hacer un Pedido
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  Iniciar Sesión
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">Misión</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Proporcionar soluciones en vidrio de la más alta calidad, combinando innovación, artesanía y servicio
                  excepcional para satisfacer las necesidades únicas de cada cliente.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">Visión</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Ser la vidriería líder reconocida por nuestra excelencia, innovación constante y compromiso con la
                  satisfacción del cliente en cada proyecto que realizamos.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">Valores</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Calidad, integridad, innovación y compromiso con nuestros clientes. Trabajamos con pasión y dedicación
                  en cada detalle de nuestros productos.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-balance">¿Por Qué Elegirnos?</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Ofrecemos la mejor experiencia en productos de vidrio con garantía de calidad
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Calidad Garantizada</h3>
              <p className="text-muted-foreground">
                Todos nuestros productos cumplen con los más altos estándares de calidad y seguridad
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
                <Clock className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Entrega Rápida</h3>
              <p className="text-muted-foreground">Cumplimos con los tiempos de entrega acordados para tu comodidad</p>
            </div>

            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
                <Award className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Experiencia Profesional</h3>
              <p className="text-muted-foreground">Años de experiencia respaldando cada proyecto que realizamos</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-[#023e8a] to-[#0077b6] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4 text-balance">¿Listo para tu Proyecto?</h2>
          <p className="text-xl mb-8 text-white/90 text-pretty max-w-2xl mx-auto">
            Regístrate ahora y comienza a crear tus pedidos personalizados
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary" className="gap-2">
              <ShoppingCart className="w-5 h-5" />
              Comenzar Ahora
            </Button>
          </Link>
        </div>
      </section>

      <footer className="bg-card border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 Vidriería. Todos los derechos reservados.</p>
        </div>
      </footer>
    </main>
  )
}
