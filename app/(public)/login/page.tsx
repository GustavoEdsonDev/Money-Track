'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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

  // Restore saved session data on component mount
  useEffect(() => {
    try {
      const savedSession = localStorage.getItem('moneytrack_session');
      if (savedSession) {
        const sessionData = JSON.parse(savedSession);
        setEmail(sessionData.email);
        setRememberMe(true);
      }
    } catch (error) {
      console.error('Error restoring session:', error);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await signIn(email, password);
      
      // Save session to localStorage if "Remember me" is checked
      if (rememberMe) {
        const sessionData = {
          email,
          rememberMe: true,
          timestamp: new Date().toISOString(),
        };
        localStorage.setItem('moneytrack_session', JSON.stringify(sessionData));
      } else {
        // Clear localStorage if "Remember me" is unchecked
        localStorage.removeItem('moneytrack_session');
      }
      
      router.push('/dashboard');
    } catch (err: any) {
      // Melhorar mensagem de erro
      console.error('Login error:', err);
      
      let errorMessage = 'Failed to sign in';
      
      if (err.message?.includes('Invalid login credentials')) {
        errorMessage = 'Email ou senha incorretos. Verifique seus dados.';
      } else if (err.message?.includes('Email not confirmed')) {
        errorMessage = 'Confirme seu email antes de fazer login. Verifique seu inbox.';
      } else if (err.message?.includes('User not found')) {
        errorMessage = 'Usuário não encontrado. Crie uma conta primeiro.';
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <Wallet className="size-8 text-blue-600" />
            <span className="text-2xl font-bold text-blue-600">MoneyTrack</span>
          </div>
        </div>

        {/* Login Card */}
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>Sign in to your account to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Error Message */}
              {error && (
                <div className="flex gap-2 p-3 rounded-lg bg-red-50 border border-red-200">
                  <AlertCircle className="size-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="rounded" 
                    disabled={loading}
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  Remember me
                </label>
              </div>

              {/* Login Button */}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="size-4 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>

              {/* Divider */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-background text-muted-foreground">or</span>
                </div>
              </div>

              {/* Social Login */}
              <Button type="button" variant="outline" className="w-full" disabled={loading}>
                Sign in with Google
              </Button>
            </form>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-muted-foreground mt-6">
              Don't have an account?{' '}
              <Link href="/register" className="text-blue-600 hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
