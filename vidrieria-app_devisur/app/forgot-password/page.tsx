"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { forgotPassword } from '@/lib/auth';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    const result = await forgotPassword(email);
    setMessage(result.message);
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Recuperar Contraseña</CardTitle>
          <CardDescription>
            Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading || !!message}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading || !!message}>
              {isLoading ? "Enviando..." : "Enviar Enlace de Recuperación"}
            </Button>
          </form>
          {message && <p className="mt-4 text-sm text-center text-muted-foreground">{message}</p>}
           <div className="mt-4 text-center text-sm">
              <Link href="/login" className="underline">
                Volver a Iniciar Sesión
              </Link>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}