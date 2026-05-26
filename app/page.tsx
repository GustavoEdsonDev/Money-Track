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
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="flex h-16 items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
        <Wallet className="size-6 text-primary" />
        <span className="text-xl font-bold text-primary">
          MoneyTrack
        </span>
      </Link>

      <div className="flex items-center gap-3">
        <Button variant="ghost" asChild>
          <Link href="/login">Entrar</Link>
        </Button>

        <Button asChild>
          <Link href="/register">Começar</Link>
        </Button>

        <div className="h-6 w-px bg-border" />

        <div className="flex items-center">
          <ThemeSwitch />
        </div>
      </div>
    </div>
  </div>
</nav>

      {/* Hero Section */}
      <section className="px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
            ✨ Desenvolvido por Gustavo Edson
          </div>

          <h1 className="mb-6 text-5xl font-bold text-foreground sm:text-6xl">
            Assuma o Controle das suas{' '}
            <span className="text-primary">Finanças</span>
          </h1>

          <p className="mb-8 text-xl text-muted-foreground">
            Uma aplicação moderna e open-source de gerenciamento financeiro,
            criada para ajudar você a acompanhar despesas, gerenciar contas e
            alcançar seus objetivos financeiros com facilidade e simplicidade.
          </p>

          <div className="flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/register">
                Começar Gratuitamente
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>

            <Button size="lg" variant="outline" asChild>
              <Link href="#features">Saiba Mais</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="border-y bg-card px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground">
            Recursos Poderosos
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="rounded-lg border bg-background p-6 transition hover:shadow-lg">
              <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-primary/10">
                <Wallet className="size-6 text-primary" />
              </div>

              <h3 className="mb-2 text-lg font-semibold text-foreground">
                Suporte a Múltiplas Contas
              </h3>

              <p className="text-muted-foreground">
                Gerencie várias contas bancárias e cartões de crédito em um só
                lugar
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-lg border bg-background p-6 transition hover:shadow-lg">
              <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-emerald-500/10">
                <BarChart3 className="size-6 text-emerald-600 dark:text-emerald-400" />
              </div>

              <h3 className="mb-2 text-lg font-semibold text-foreground">
                Análises Inteligentes
              </h3>

              <p className="text-muted-foreground">
                Tenha insights detalhados sobre seus padrões de gastos e
                tendências
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-lg border bg-background p-6 transition hover:shadow-lg">
              <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-purple-500/10">
                <TrendingUp className="size-6 text-purple-600 dark:text-purple-400" />
              </div>

              <h3 className="mb-2 text-lg font-semibold text-foreground">
                Planejamento de Orçamento
              </h3>

              <p className="text-muted-foreground">
                Defina e acompanhe orçamentos para alcançar seus objetivos
                financeiros mais rápido
              </p>
            </div>

            {/* Feature 4 */}
            <div className="rounded-lg border bg-background p-6 transition hover:shadow-lg">
              <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-red-500/10">
                <Lock className="size-6 text-red-600 dark:text-red-400" />
              </div>

              <h3 className="mb-2 text-lg font-semibold text-foreground">
                Segurança de Nível Bancário
              </h3>

              <p className="text-muted-foreground">
                Seus dados financeiros são criptografados e protegidos com
                segurança padrão de mercado
              </p>
            </div>

            {/* Feature 5 */}
            <div className="rounded-lg border bg-background p-6 transition hover:shadow-lg">
              <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-orange-500/10">
                <TrendingUp className="size-6 text-orange-600 dark:text-orange-400" />
              </div>

              <h3 className="mb-2 text-lg font-semibold text-foreground">
                Histórico de Transações
              </h3>

              <p className="text-muted-foreground">
                Histórico completo e categorização de todas as suas transações
              </p>
            </div>

            {/* Feature 6 */}
            <div className="rounded-lg border bg-background p-6 transition hover:shadow-lg">
              <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-cyan-500/10">
                <Wallet className="size-6 text-cyan-600 dark:text-cyan-400" />
              </div>

              <h3 className="mb-2 text-lg font-semibold text-foreground">
                Acompanhamento de Metas
              </h3>

              <p className="text-muted-foreground">
                Defina metas financeiras e acompanhe seu progresso até
                alcançá-las
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-2xl bg-primary p-12 text-center text-primary-foreground">
          <h2 className="mb-4 text-3xl font-bold">
            Pronto para gerenciar suas finanças?
          </h2>

          <p className="mb-8 text-lg opacity-90">
            Junte-se a usuários que já estão assumindo o controle do próprio
            dinheiro
          </p>

          <Button size="lg" variant="secondary" asChild>
            <Link href="/register">Começar Gratuitamente</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card px-4 py-12 text-muted-foreground sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 grid gap-12 md:grid-cols-2">
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
                  <span>gustavoedsonunnunes@gmail.com</span>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t pt-8 text-center text-sm">
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