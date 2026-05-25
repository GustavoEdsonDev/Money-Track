"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useBudgets, type Budget } from "@/hooks/use-budgets";
import { useCategories } from "@/hooks/use-categories";

type EditBudgetFormProps = {
  budget: Budget;
  updatingId: string | null;
  onUpdate: (id: string, updates: Partial<Budget>) => Promise<void>;
};

export function EditBudgetForm({
  budget,
  updatingId,
  onUpdate,
}: EditBudgetFormProps) {
  const [open, setOpen] = useState(false);
  const { categories } = useCategories();

  const [categoryId, setCategoryId] = useState(budget.category_id);
  const [amountLimit, setAmountLimit] = useState(
    String(budget.amount_limit)
  );
  const [month, setMonth] = useState(String(budget.month));
  const [year, setYear] = useState(String(budget.year));

  const isUpdating = updatingId === budget.id;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!categoryId) {
      alert("Selecione uma categoria");
      return;
    }

    if (!amountLimit || Number(amountLimit) <= 0) {
      alert("O valor limite precisa ser maior que zero");
      return;
    }

    await onUpdate(budget.id, {
      category_id: categoryId,
      amount_limit: Number(amountLimit),
      month: Number(month),
      year: Number(year),
    });

    setOpen(false);
  };

  const expenseCategories = categories.filter((c) => c.type === "expense");
  const currentYear = new Date().getFullYear();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" disabled={isUpdating}>
          <Pencil className="size-4" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar orçamento</DialogTitle>

          <DialogDescription>
            Altere os dados do orçamento abaixo.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={`category-${budget.id}`}>Categoria</Label>

            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger id={`category-${budget.id}`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {expenseCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.icon} {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`amount-${budget.id}`}>Limite de Gastos</Label>

            <Input
              id={`amount-${budget.id}`}
              type="number"
              step="0.01"
              min="0"
              value={amountLimit}
              onChange={(event) => setAmountLimit(event.target.value)}
              placeholder="Ex: 500.00"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`month-${budget.id}`}>Mês</Label>

              <Select value={month} onValueChange={setMonth}>
                <SelectTrigger id={`month-${budget.id}`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                    <SelectItem key={m} value={String(m)}>
                      {new Date(2024, m - 1).toLocaleString("default", {
                        month: "long",
                      })}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`year-${budget.id}`}>Ano</Label>

              <Select value={year} onValueChange={setYear}>
                <SelectTrigger id={`year-${budget.id}`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 3 }, (_, i) => currentYear - 1 + i).map(
                    (y) => (
                      <SelectItem key={y} value={String(y)}>
                        {y}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>

            <Button type="submit" disabled={isUpdating}>
              {isUpdating ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
