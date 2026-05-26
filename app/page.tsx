import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  TrendingUp,
  Wallet,
  BarChart3,
  Lock,
  Code,
  Mail,
} from 'lucide-react';
import { ThemeSwitch } from '@/components/theme-swith/theme-switch';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-3">
            {/* Logo */}
            <Link href="/" className="flex shrink-0 items-center gap-2">
              <Wallet className="size-5 text-primary sm:size-6" />
              <span className="text-base font-bold text-primary sm:text-xl">
                MoneyTrack
              </span>
            </Link>

            {/* Desktop Actions */}
            <div className="hidden items-center gap-3 sm:flex">
              <Button variant="ghost" asChild>
                <Link href="/login">Entrar</Link>
              </Button>

              <Button asChild>
                <Link href="/register">Começar</Link>
              </Button>

              <div className="h-6 w-px bg-border" />

              <div className="flex items-center rounded-full border bg-card px-3 py-1.5">
                <ThemeSwitch />
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-2 sm:hidden">
              <Button size="sm" asChild className="px-3">
                <Link href="/register">Começar</Link>
              </Button>

              <div className="flex items-center rounded-full border bg-card px-2 py-1">
                <ThemeSwitch />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary sm:px-4 sm:text-sm">
            ✨ Desenvolvido por Gustavo Edson
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Assuma o Controle das suas{' '}
            <span className="text-primary">Finanças</span>
          </h1>

          <p className="mx-auto mb-8 max-w-3xl text-base text-muted-foreground sm:text-xl">
            Uma aplicação moderna e open-source de gerenciamento financeiro,
            criada para ajudar você a acompanhar despesas, gerenciar contas e
            alcançar seus objetivos financeiros com facilidade e simplicidade.
          </p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
            <Button size="lg" asChild className="w-full sm:w-auto">
              <Link href="/register">
                Começar Gratuitamente
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              asChild
              className="w-full sm:w-auto"
            >
              <Link href="#features">Saiba Mais</Link>
            </Button>
          </div>

          {/* Mobile Login Link */}
          <p className="mt-5 text-sm text-muted-foreground sm:hidden">
            Já tem uma conta?{' '}
            <Link href="/login" className="font-medium text-primary underline-offset-4 hover:underline">
              Entrar
            </Link>
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="border-y bg-card px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Recursos Poderosos
            </h2>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              Tudo que você precisa para organizar sua vida financeira em um só lugar.
            </p>
          </div>

          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="rounded-xl border bg-background p-5 transition hover:shadow-lg sm:p-6">
              <div className="mb-4 flex size-11 items-center justify-center rounded-lg bg-primary/10 sm:size-12">
                <Wallet className="size-5 text-primary sm:size-6" />
              </div>

              <h3 className="mb-2 text-base font-semibold text-foreground sm:text-lg">
                Suporte a Múltiplas Contas
              </h3>

              <p className="text-sm text-muted-foreground sm:text-base">
                Gerencie várias contas bancárias e cartões de crédito em um só
                lugar.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-xl border bg-background p-5 transition hover:shadow-lg sm:p-6">
              <div className="mb-4 flex size-11 items-center justify-center rounded-lg bg-emerald-500/10 sm:size-12">
                <BarChart3 className="size-5 text-emerald-600 dark:text-emerald-400 sm:size-6" />
              </div>

              <h3 className="mb-2 text-base font-semibold text-foreground sm:text-lg">
                Análises Inteligentes
              </h3>

              <p className="text-sm text-muted-foreground sm:text-base">
                Tenha insights detalhados sobre seus padrões de gastos e
                tendências.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-xl border bg-background p-5 transition hover:shadow-lg sm:p-6">
              <div className="mb-4 flex size-11 items-center justify-center rounded-lg bg-purple-500/10 sm:size-12">
                <TrendingUp className="size-5 text-purple-600 dark:text-purple-400 sm:size-6" />
              </div>

              <h3 className="mb-2 text-base font-semibold text-foreground sm:text-lg">
                Planejamento de Orçamento
              </h3>

              <p className="text-sm text-muted-foreground sm:text-base">
                Defina e acompanhe orçamentos para alcançar seus objetivos
                financeiros mais rápido.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="rounded-xl border bg-background p-5 transition hover:shadow-lg sm:p-6">
              <div className="mb-4 flex size-11 items-center justify-center rounded-lg bg-red-500/10 sm:size-12">
                <Lock className="size-5 text-red-600 dark:text-red-400 sm:size-6" />
              </div>

              <h3 className="mb-2 text-base font-semibold text-foreground sm:text-lg">
                Segurança de Nível Bancário
              </h3>

              <p className="text-sm text-muted-foreground sm:text-base">
                Seus dados financeiros são criptografados e protegidos com
                segurança padrão de mercado.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="rounded-xl border bg-background p-5 transition hover:shadow-lg sm:p-6">
              <div className="mb-4 flex size-11 items-center justify-center rounded-lg bg-orange-500/10 sm:size-12">
                <TrendingUp className="size-5 text-orange-600 dark:text-orange-400 sm:size-6" />
              </div>

              <h3 className="mb-2 text-base font-semibold text-foreground sm:text-lg">
                Histórico de Transações
              </h3>

              <p className="text-sm text-muted-foreground sm:text-base">
                Histórico completo e categorização de todas as suas transações.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="rounded-xl border bg-background p-5 transition hover:shadow-lg sm:p-6">
              <div className="mb-4 flex size-11 items-center justify-center rounded-lg bg-cyan-500/10 sm:size-12">
                <Wallet className="size-5 text-cyan-600 dark:text-cyan-400 sm:size-6" />
              </div>

              <h3 className="mb-2 text-base font-semibold text-foreground sm:text-lg">
                Acompanhamento de Metas
              </h3>

              <p className="text-sm text-muted-foreground sm:text-base">
                Defina metas financeiras e acompanhe seu progresso até
                alcançá-las.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-2xl bg-primary p-6 text-center text-primary-foreground sm:p-12">
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
            Pronto para gerenciar suas finanças?
          </h2>

          <p className="mx-auto mb-8 max-w-2xl text-sm opacity-90 sm:text-lg">
            Junte-se a usuários que já estão assumindo o controle do próprio
            dinheiro.
          </p>

          <Button size="lg" variant="secondary" asChild className="w-full sm:w-auto">
            <Link href="/register">Começar Gratuitamente</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card px-4 py-10 text-muted-foreground sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 grid gap-10 md:grid-cols-2 md:gap-12">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <Wallet className="size-6 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">
                  MoneyTrack
                </h3>
              </div>

              <p className="mb-4 text-sm">
                Uma aplicação moderna de gerenciamento financeiro criada para
                ajudar você a controlar seu dinheiro com facilidade e confiança.
              </p>

              <p className="text-sm text-muted-foreground">
                Criado com Next.js, TypeScript e Supabase para uma experiência
                fluida.
              </p>
            </div>

            <div>
              <h4 className="mb-4 font-semibold text-foreground">
                Conecte-se com o Desenvolvedor
              </h4>

              <div className="space-y-3">
                <a
                  href="https://github.com/GustavoEdsonDev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm transition hover:text-primary"
                >
                  <Code className="size-4" />
                  <span>GitHub: GustavoEdsonDev</span>
                </a>

                <a
                  href="mailto:gustavoedsonunnunes@gmail.com"
                  className="flex items-center gap-2 text-sm transition hover:text-primary"
                >
                  <Mail className="size-4" />
                  <span className="break-all">gustavoedsonunnunes@gmail.com</span>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t pt-8 text-center text-xs sm:text-sm">
            <p>
              &copy; 2024 MoneyTrack - Desenvolvido por Gustavo Edson. Todos os
              direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}