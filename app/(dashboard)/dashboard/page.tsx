'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, ArrowDownLeft, TrendingUp, PlusCircle } from 'lucide-react';

export default function DashboardPage() {
  // Dados simulados
  const accounts = [
    { id: '1', name: 'Conta Corrente', balance: 5250.00, type: 'checking' },
    { id: '2', name: 'Poupança', balance: 12500.00, type: 'savings' },
    { id: '3', name: 'Cartão de Crédito', balance: -1250.00, type: 'credit_card' },
  ];

  const transactions = [
    {
      id: '1',
      description: 'Supermercado',
      amount: 250.50,
      type: 'expense',
      category: 'Alimentação',
      date: new Date('2024-05-21'),
      categoryColor: '#FF6B6B',
    },
    {
      id: '2',
      description: 'Salário',
      amount: 5000.00,
      type: 'income',
      category: 'Receita',
      date: new Date('2024-05-20'),
      categoryColor: '#51CF66',
    },
    {
      id: '3',
      description: 'Netflix',
      amount: 49.90,
      type: 'expense',
      category: 'Entretenimento',
      date: new Date('2024-05-19'),
      categoryColor: '#A78BFA',
    },
    {
      id: '4',
      description: 'Uber',
      amount: 35.00,
      type: 'expense',
      category: 'Transporte',
      date: new Date('2024-05-18'),
      categoryColor: '#FFD93D',
    },
    {
      id: '5',
      description: 'Freelance',
      amount: 1200.00,
      type: 'income',
      category: 'Receita Extra',
      date: new Date('2024-05-17'),
      categoryColor: '#51CF66',
    },
  ];

  const categorySpending = [
    { name: 'Alimentação', amount: 1250, percentage: 35 },
    { name: 'Transporte', amount: 450, percentage: 13 },
    { name: 'Entretenimento', amount: 600, percentage: 17 },
    { name: 'Utilidades', amount: 750, percentage: 21 },
    { name: 'Outros', amount: 400, percentage: 14 },
  ];

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-2">Bem-vindo ao seu painel financeiro</p>
        </div>
        <Button className="gap-2">
          <PlusCircle className="size-4" />
          Nova Transação
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Total</CardTitle>
            <TrendingUp className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {totalBalance.toLocaleString('pt-BR')}</div>
            <p className="text-xs text-muted-foreground mt-1">
              +2.5% em relação ao mês passado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receitas</CardTitle>
            <ArrowDownLeft className="size-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              R$ {totalIncome.toLocaleString('pt-BR')}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Despesas</CardTitle>
            <ArrowUpRight className="size-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              R$ {totalExpense.toLocaleString('pt-BR')}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Este mês</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Transactions */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Transações Recentes</CardTitle>
              <CardDescription>Suas últimas 5 transações</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-3 rounded-lg border"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="size-10 rounded-full flex items-center justify-center text-white"
                        style={{ backgroundColor: transaction.categoryColor }}
                      >
                        {transaction.type === 'income' ? (
                          <ArrowDownLeft className="size-5" />
                        ) : (
                          <ArrowUpRight className="size-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {transaction.category} • {transaction.date.toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                    <p
                      className={`font-semibold ${
                        transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {transaction.type === 'income' ? '+' : '-'}R${' '}
                      {transaction.amount.toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Accounts */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {accounts.map((account) => (
                <div key={account.id} className="flex items-center justify-between p-2">
                  <div>
                    <p className="font-medium text-sm">{account.name}</p>
                    <Badge variant="outline" className="mt-1">
                      {account.type === 'checking'
                        ? 'Corrente'
                        : account.type === 'savings'
                          ? 'Poupança'
                          : 'Crédito'}
                    </Badge>
                  </div>
                  <p
                    className={`font-semibold ${account.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}
                  >
                    R$ {account.balance.toFixed(2)}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Spending by Category */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Gastos por Categoria</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {categorySpending.map((category) => (
                <div key={category.name} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{category.name}</p>
                    <p className="text-sm text-muted-foreground">R$ {category.amount}</p>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
