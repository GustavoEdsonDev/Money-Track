'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { useBudgets } from '@/hooks/use-budgets';
import { useCategories } from '@/hooks/use-categories';
import { AddBudgetForm } from '@/components/budgets/add-budget-form';

export default function BudgetsPage() {
  const { budgets, loading, deleteBudget, fetchBudgets } = useBudgets();
  const { categories } = useCategories();
  const [showForm, setShowForm] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this budget?')) return;

    try {
      setDeletingId(id);
      await deleteBudget(id);
    } catch (error) {
      alert('Failed to delete budget');
    } finally {
      setDeletingId(null);
    }
  };

  const getCategoryName = (categoryId: string) => {
    return categories.find((c) => c.id === categoryId)?.name || 'Unknown';
  };

  const getCategoryIcon = (categoryId: string) => {
    return categories.find((c) => c.id === categoryId)?.icon || '📁';
  };

  const getMonthName = (month: number) => {
    return new Date(2024, month - 1).toLocaleString('default', {
      month: 'long',
    });
  };

  const budgetsByMonth = budgets.reduce(
    (acc, budget) => {
      const key = `${budget.year}-${String(budget.month).padStart(2, '0')}`;
      if (!acc[key]) acc[key] = [];
      acc[key].push(budget);
      return acc;
    },
    {} as Record<string, typeof budgets>
  );

  const sortedMonths = Object.keys(budgetsByMonth).sort().reverse();

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Budgets</h1>
          <p className="text-muted-foreground mt-2">Set and track spending limits for each category</p>
        </div>
        <Button className="gap-2" onClick={() => setShowForm(!showForm)}>
          <Plus className="size-4" />
          {showForm ? 'Cancel' : 'New Budget'}
        </Button>
      </div>

      {/* Add Budget Form */}
      {showForm && (
        <AddBudgetForm
          onSuccess={() => {
            setShowForm(false);
            fetchBudgets();
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Budgets by Month */}
      {sortedMonths.length > 0 && (
        <div className="space-y-6">
          {sortedMonths.map((monthKey) => {
            const [year, month] = monthKey.split('-');
            const monthBudgets = budgetsByMonth[monthKey];
            const monthName = getMonthName(parseInt(month));

            return (
              <div key={monthKey} className="space-y-3">
                <h2 className="text-lg font-semibold">
                  {monthName} {year}
                </h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {monthBudgets.map((budget) => (
                    <Card key={budget.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">
                            {getCategoryIcon(budget.category_id)}
                          </div>
                          <div>
                            <h3 className="font-semibold">{getCategoryName(budget.category_id)}</h3>
                            <Badge variant="outline" className="mt-1 text-xs">
                              Budget
                            </Badge>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(budget.id)}
                          disabled={deletingId === budget.id}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Limit</span>
                            <span className="text-lg font-semibold">
                              ${budget.amount_limit.toFixed(2)}
                            </span>
                          </div>
                          <div className="pt-2 border-t">
                            <p className="text-xs text-muted-foreground">
                              Created {new Date(budget.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {budgets.length === 0 && !loading && (
        <div className="text-center py-12 rounded-lg border-2 border-dashed">
          <AlertCircle className="size-12 mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">No budgets yet. Create one to set spending limits!</p>
        </div>
      )}
    </div>
  );
}
