'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/lib/auth-context';
import { useState, useEffect } from 'react';
import { AlertCircle, Check, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const { user, loading, updateProfile, signOut } = useAuth();
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (user) {
      setFullName(user.user_metadata?.full_name || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setUpdating(true);

    try {
      await updateProfile({
        full_name: fullName,
        email: email,
      });
      setMessage('Perfil atualizado com sucesso!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err: any) {
      console.error('Update error:', err);
      let errorMessage = 'Erro ao atualizar perfil';
      
      if (err.message?.includes('already registered')) {
        errorMessage = 'Este email já está registrado.';
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setUpdating(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  return (
    <div className="space-y-6 sm:space-y-8 p-3 sm:p-4 md:p-6 lg:p-8">
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">Configurações</h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2">
          Gerencie suas informações de perfil
        </p>
      </div>

      <div className="grid gap-4 sm:gap-6 max-w-2xl">
        {/* Profile Information */}
        <Card>
          <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6">
            <CardTitle className="text-base sm:text-lg">Informações do Perfil</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Atualize seus dados pessoais
            </CardDescription>
          </CardHeader>
          <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Success Message */}
              {message && (
                <div className="flex gap-2 p-2 sm:p-3 rounded-lg bg-green-50 border border-green-200">
                  <Check className="size-4 sm:size-5 text-green-600 mt-0.5 shrink-0" />
                  <p className="text-xs sm:text-sm text-green-600">{message}</p>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="flex gap-2 p-2 sm:p-3 rounded-lg bg-red-50 border border-red-200">
                  <AlertCircle className="size-4 sm:size-5 text-red-600 mt-0.5 shrink-0" />
                  <p className="text-xs sm:text-sm text-red-600">{error}</p>
                </div>
              )}

              {/* Full Name */}
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="fullName" className="text-xs sm:text-sm">
                  Nome Completo
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Seu nome completo"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={updating}
                  className="text-sm sm:text-base"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="email" className="text-xs sm:text-sm">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={updating}
                  className="text-sm sm:text-base"
                />
                <p className="text-xs text-muted-foreground">
                  Alterar seu email enviará um email de confirmação
                </p>
              </div>

              {/* Submit Button */}
              <Button type="submit" disabled={updating || loading} className="w-full sm:w-auto text-sm sm:text-base">
                {updating ? (
                  <>
                    <Loader2 className="size-3 sm:size-4 mr-2 animate-spin" />
                    Atualizando...
                  </>
                ) : (
                  'Salvar Alterações'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6">
            <CardTitle className="text-base sm:text-lg">Segurança</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Gerencie sua sessão
            </CardDescription>
          </CardHeader>
          <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-muted-foreground">
                Desconecte de todas as suas sessões clicando no botão abaixo.
              </p>
              <Button
                onClick={handleSignOut}
                variant="destructive"
                disabled={loading}
                className="w-full sm:w-auto text-sm sm:text-base"
              >
                Desconectar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Account Information */}
        <Card>
          <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6">
            <CardTitle className="text-base sm:text-lg">Informações da Conta</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Detalhes da sua conta
            </CardDescription>
          </CardHeader>
          <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">ID da Conta</p>
                <p className="text-xs sm:text-sm font-mono bg-muted p-2 rounded break-all">
                  {user?.id}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">Data de Criação</p>
                <p className="text-xs sm:text-sm">
                  {user?.created_at
                    ? new Date(user.created_at).toLocaleDateString('pt-BR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    : 'N/A'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
