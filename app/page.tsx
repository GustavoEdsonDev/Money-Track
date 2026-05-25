import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, Wallet, BarChart3, Lock, Code, Mail } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white border-b backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <Wallet className="size-6 text-blue-600" />
              <span className="text-xl font-bold text-blue-600">MoneyTrack</span>
            </Link>
            <div className="flex gap-4">
              <Button variant="ghost" asChild>
                <Link href="/login">Entrar</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Começar</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            ✨ Desenvolvido por Gustavo Edson
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
            Assuma o Controle das suas <span className="text-blue-600">Finanças</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Uma aplicação moderna e open-source de gerenciamento financeiro, criada para ajudar você a acompanhar despesas, gerenciar contas e alcançar seus objetivos financeiros com facilidade e simplicidade.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/register">
                Começar Gratuitamente <ArrowRight className="size-4 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#features">Saiba Mais</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Recursos Poderosos</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 border rounded-lg hover:shadow-lg transition">
              <div className="size-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Wallet className="size-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Suporte a Múltiplas Contas</h3>
              <p className="text-gray-600">
                Gerencie várias contas bancárias e cartões de crédito em um só lugar
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 border rounded-lg hover:shadow-lg transition">
              <div className="size-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="size-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Análises Inteligentes</h3>
              <p className="text-gray-600">
                Tenha insights detalhados sobre seus padrões de gastos e tendências
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 border rounded-lg hover:shadow-lg transition">
              <div className="size-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="size-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Planejamento de Orçamento</h3>
              <p className="text-gray-600">
                Defina e acompanhe orçamentos para alcançar seus objetivos financeiros mais rápido
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 border rounded-lg hover:shadow-lg transition">
              <div className="size-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Lock className="size-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Segurança de Nível Bancário</h3>
              <p className="text-gray-600">
                Seus dados financeiros são criptografados e protegidos com segurança padrão de mercado
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 border rounded-lg hover:shadow-lg transition">
              <div className="size-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="size-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Histórico de Transações</h3>
              <p className="text-gray-600">
                Histórico completo e categorização de todas as suas transações
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 border rounded-lg hover:shadow-lg transition">
              <div className="size-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                <Wallet className="size-6 text-cyan-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Acompanhamento de Metas</h3>
              <p className="text-gray-600">
                Defina metas financeiras e acompanhe seu progresso até alcançá-las
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para gerenciar suas finanças?</h2>
          <p className="text-lg mb-8 opacity-90">
            Junte-se a usuários que já estão assumindo o controle do próprio dinheiro
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
            <Link href="/register">Começar Gratuitamente</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Wallet className="size-6 text-blue-600" />
                <h3 className="text-xl font-semibold text-white">MoneyTrack</h3>
              </div>
              <p className="text-sm mb-4">
                Uma aplicação moderna de gerenciamento financeiro criada para ajudar você a controlar seu dinheiro com facilidade e confiança.
              </p>
              <p className="text-sm text-gray-400">
                Criado com Next.js, TypeScript e Supabase para uma experiência fluida.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Conecte-se com o Desenvolvedor</h4>
              <div className="space-y-3">
                <a 
                  href="https://github.com/GustavoEdsonDev" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-blue-400 transition text-sm"
                >
                  <Code className="size-4" />
                  <span>GitHub: GustavoEdsonDev</span>
                </a>
                <a 
                  href="mailto:gustavoedsonunnunes@gmail.com"
                  className="flex items-center gap-2 hover:text-blue-400 transition text-sm"
                >
                  <Mail className="size-4" />
                  <span>gustavoedsonunnunes@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2024 MoneyTrack - Desenvolvido por Gustavo Edson. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}