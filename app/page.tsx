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
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            ✨ Developed by Gustavo Edson
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
            Take Control of Your <span className="text-blue-600">Finances</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            A modern, open-source financial management application built to help you track expenses, manage accounts, and achieve your financial goals with ease and simplicity.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/register">
                Get Started Free <ArrowRight className="size-4 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Powerful Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 border rounded-lg hover:shadow-lg transition">
              <div className="size-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Wallet className="size-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Multi-Account Support</h3>
              <p className="text-gray-600">
                Manage multiple bank accounts and credit cards in one place
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 border rounded-lg hover:shadow-lg transition">
              <div className="size-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="size-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Analytics</h3>
              <p className="text-gray-600">
                Get detailed insights into your spending patterns and trends
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 border rounded-lg hover:shadow-lg transition">
              <div className="size-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="size-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Budget Planning</h3>
              <p className="text-gray-600">
                Set and track budgets to reach your financial goals faster
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 border rounded-lg hover:shadow-lg transition">
              <div className="size-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Lock className="size-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Bank-Level Security</h3>
              <p className="text-gray-600">
                Your financial data is encrypted and protected with industry-standard security
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 border rounded-lg hover:shadow-lg transition">
              <div className="size-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="size-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Transaction History</h3>
              <p className="text-gray-600">
                Complete history and categorization of all your transactions
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 border rounded-lg hover:shadow-lg transition">
              <div className="size-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                <Wallet className="size-6 text-cyan-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Goal Tracking</h3>
              <p className="text-gray-600">
                Set financial goals and monitor your progress towards them
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to manage your finances?</h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of users who are already taking control of their money
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
            <Link href="/register">Get Started Free</Link>
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
                A modern financial management application designed to help you take control of your money with ease and confidence.
              </p>
              <p className="text-sm text-gray-400">
                Built with Next.js, TypeScript, and Supabase for a seamless experience.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Connect with the Developer</h4>
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
            <p>&copy; 2024 MoneyTrack - Developed by Gustavo Edson. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
