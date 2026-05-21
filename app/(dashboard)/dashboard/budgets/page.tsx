'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Edit2, Trash2, TrendingUp } from 'lucide-react';

export default function BudgetsPage() {
  const budgets = [
    {
      id: '1',
      category: 'Housing',
      icon: '🏠',
      budgeted: 1500.00,
      spent: 1248.20,
      remaining: 251.80,
      color: '#FF6B6B',
    },
    {
      id: '2',
      category: 'Food & Dining',
      icon: '🍽️',
      budgeted: 800.00,
      spent: 624.30,
      remaining: 175.70,
      color: '#FFA94D',
    },
    {
      id: '3',
      category: 'Transport',
      icon: '🚗',
      budgeted: 600.00,
      spent: 468.10,
      remaining: 131.90,
      color: '#FFD93D',
    },
    {
      id: '4',
      category: 'Entertainment',
      icon: '🎬',
      budgeted: 400.00,
      spent: 249.80,
      remaining: 150.20,
      color: '#A78BFA',
    },
    {
      id: '5',
      category: 'Utilities',
      icon: '💡',
      budgeted: 250.00,
      spent: 200.00,
      remaining: 50.00,
      color: '#74B9FF',
    },
  ];

  const getStatusColor = (percentage: number) => {
    if (percentage <= 50) return 'text-green-600';
    if (percentage <= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressColor = (percentage: number) => {
    if (percentage <= 50) return 'bg-green-600';
    if (percentage <= 75) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  const totalBudgeted = budgets.reduce((sum, b) => sum + b.budgeted, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const totalRemaining = budgets.reduce((sum, b) => sum + b.remaining, 0);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Budgets</h1>
          <p className="text-muted-foreground mt-2">Track and manage your monthly budgets</p>
        </div>
        <Button className="gap-2">
          <Plus className="size-4" />
          New Budget
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Budgeted</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${totalBudgeted.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground mt-1">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${totalSpent.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground mt-1">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Remaining</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">${totalRemaining.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground mt-1">Available to spend</p>
          </CardContent>
        </Card>
      </div>

      {/* Budgets Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {budgets.map((budget) => {
          const percentage = (budget.spent / budget.budgeted) * 100;
          return (
            <Card key={budget.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div className="flex items-center gap-3">
                  <div
                    className="size-12 rounded-lg flex items-center justify-center text-2xl"
                    style={{ backgroundColor: `${budget.color}20` }}
                  >
                    {budget.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold">{budget.category}</h3>
                    <p className={`text-sm font-medium ${getStatusColor(percentage)}`}>
                      {percentage.toFixed(0)}% spent
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Budget</span>
                    <span className="font-semibold">${budget.budgeted.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getProgressColor(percentage)}`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Spent</span>
                  <span className="font-semibold">${budget.spent.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Remaining</span>
                  <span className="font-semibold text-green-600">${budget.remaining.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
