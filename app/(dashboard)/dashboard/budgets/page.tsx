'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { useBudgets, type Budget } from '@/hooks/use-budgets';
import { useCategories } from '@/hooks/use-categories';
import { AddBudgetForm } from '@/components/budgets/add-budget-form';
import { EditBudgetForm } from '@/components/budgets/edit-budget-form';
import { renderCategoryIcon } from '@/lib/category-icons';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function BudgetsPage() {
  const { budgets, loading, deleteBudget, updateBudget, fetchBudgets } = useBudgets();
  const { categories } = useCategories();
  const [showForm, setShowForm] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await deleteBudget(id);
    } catch (error) {
      alert('Falha ao excluir orçamento');
    } finally {
      setDeletingId(null);
    }
  };

  const handleUpdate = async (id: string, updates: Partial<Budget>) => {
    try {
      setUpdatingId(id);
      await updateBudget(id, updates);
      console.log('Orçamento atualizado');
    } catch (error) {
      console.error('Erro ao atualizar:', error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('Falha ao atualizar orçamento');
      }
    } finally {
      setUpdatingId(null);
    }
  };

  const getCategoryName = (categoryId: string) => {
    return categories.find((c) => c.id === categoryId)?.name || 'Desconhecido';
  };

  const getCategoryIcon = (categoryId: string) => {
    return categories.find((c) => c.id === categoryId)?.icon || '📁';
  };

  const getMonthName = (month: number) => {
    return new Date(2024, month - 1).toLocaleString('pt-BR', {
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
          <h1 className="text-3xl font-bold tracking-tight">Orçamentos</h1>
          <p className="text-muted-foreground mt-2">Defina e acompanhe limites de gastos para cada categoria</p>
        </div>
        <Button className="gap-2" onClick={() => setShowForm(!showForm)}>
          <Plus className="size-4" />
          {showForm ? 'Cancelar' : 'Novo Orçamento'}
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
                        <div className="size-12 rounded-lg bg-muted flex items-center justify-center">
  {renderCategoryIcon(getCategoryIcon(budget.category_id), 'size-6')}
</div>
                          <div>
                            <h3 className="font-semibold">{getCategoryName(budget.category_id)}</h3>
                            <Badge variant="outline" className="mt-1 text-xs">
                              Orçamento
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <EditBudgetForm
                            budget={budget}
                            updatingId={updatingId}
                            onUpdate={handleUpdate}
                          />
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                disabled={deletingId === budget.id}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="size-4" />
                              </Button>
                            </AlertDialogTrigger>

                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Excluir orçamento?</AlertDialogTitle>

                                <AlertDialogDescription>
                                  Esta ação não pode ser desfeita. Isso irá excluir
                                  permanentemente este orçamento.
                                </AlertDialogDescription>
                              </AlertDialogHeader>

                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>

                                <AlertDialogAction
                                  onClick={() => handleDelete(budget.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Excluir
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Limite</span>
                            <span className="text-lg font-semibold">
                              R$ {budget.amount_limit.toFixed(2)}
                            </span>
                          </div>
                          <div className="pt-2 border-t">
                            <p className="text-xs text-muted-foreground">
                              Criado em {new Date(budget.created_at).toLocaleDateString('pt-BR')}
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
          <p className="text-muted-foreground">Nenhum orçamento ainda. Crie um para definir limites de gastos!</p>
        </div>
      )}
    </div>
  );
}