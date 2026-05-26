'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Wallet, AlertCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

export default function LoginPage() {
  const router = useRouter();
  const { signIn, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    try {
      const savedSession = localStorage.getItem('moneytrack_session');

      if (savedSession) {
        const sessionData = JSON.parse(savedSession);
        setEmail(sessionData.email);
        setRememberMe(true);
      }
    } catch (error) {
      console.error('Erro ao restaurar sessão:', error);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await signIn(email, password);

      if (rememberMe) {
        const sessionData = {
          email,
          rememberMe: true,
          timestamp: new Date().toISOString(),
        };

        localStorage.setItem('moneytrack_session', JSON.stringify(sessionData));
      } else {
        localStorage.removeItem('moneytrack_session');
      }

      router.push('/dashboard');
    } catch (err: any) {
      console.error('Erro de login:', err);

      let errorMessage = 'Falha ao entrar';

      if (err.message?.includes('Invalid login credentials')) {
        errorMessage = 'E-mail ou senha incorretos. Verifique seus dados.';
      } else if (err.message?.includes('Email not confirmed')) {
        errorMessage =
          'Confirme seu e-mail antes de fazer login. Verifique sua caixa de entrada.';
      } else if (err.message?.includes('User not found')) {
        errorMessage = 'Usuário não encontrado. Crie uma conta primeiro.';
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-3 text-foreground sm:p-4 md:p-6">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
        {/* Logo */}
        <div className="mb-6 flex justify-center sm:mb-8 md:mb-10">
          <Link href="/" className="flex items-center gap-2 sm:gap-3">
            <Wallet className="size-6 text-primary sm:size-7 md:size-8" />
            <span className="text-xl font-bold text-primary sm:text-2xl md:text-3xl">
              MoneyTrack
            </span>
          </Link>
        </div>

        {/* Login Card */}
        <Card className="border shadow-lg">
          <CardHeader className="px-4 py-4 text-center sm:px-6 sm:py-6">
            <CardTitle className="text-xl sm:text-2xl md:text-3xl">
              Bem-vindo de volta
            </CardTitle>

            <CardDescription className="text-xs sm:text-sm md:text-base">
              Entre na sua conta para continuar
            </CardDescription>
          </CardHeader>

          <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              {/* Error Message */}
              {error && (
                <div className="flex gap-2 rounded-lg border border-destructive/20 bg-destructive/10 p-2 sm:p-3">
                  <AlertCircle className="mt-0.5 size-4 shrink-0 text-destructive sm:size-5" />
                  <p className="text-xs text-destructive sm:text-sm">
                    {error}
                  </p>
                </div>
              )}

              {/* Email */}
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="email" className="text-xs sm:text-sm">
                  E-mail
                </Label>

                <Input
                  id="email"
                  type="email"
                  placeholder="voce@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="text-sm sm:text-base"
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="password" className="text-xs sm:text-sm">
                  Senha
                </Label>

                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="text-sm sm:text-base"
                />
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-border accent-primary sm:h-5 sm:w-5"
                    disabled={loading}
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />

                  <span className="text-muted-foreground">Lembrar de mim</span>
                </label>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full py-2 text-sm sm:py-2.5 sm:text-base"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 size-3 animate-spin sm:size-4" />
                    <span className="text-xs sm:text-sm">Entrando...</span>
                  </>
                ) : (
                  'Entrar'
                )}
              </Button>

              {/* Divider */}
              <div className="relative my-3 sm:my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t" />
                </div>

                <div className="relative flex justify-center text-xs sm:text-sm">
                  <span className="bg-card px-2 text-muted-foreground">
                    ou
                  </span>
                </div>
              </div>
            </form>

            {/* Sign Up Link */}
            <p className="mt-4 text-center text-xs text-muted-foreground sm:mt-6 sm:text-sm">
              Não tem uma conta?{' '}
              <Link
                href="/register"
                className="font-medium text-primary hover:underline"
              >
                Cadastre-se
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}