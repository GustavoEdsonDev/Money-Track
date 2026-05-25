"use client";

import { useState, useEffect } from "react";
import { Pencil, ArrowUpRight, ArrowDownLeft } from "lucide-react";
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

import { useTransactions, type Transaction } from "@/hooks/use-transactions";
import { useCategories } from "@/hooks/use-categories";import { renderCategoryIcon } from '@/lib/category-icons';
type EditTransactionFormProps = {
  transaction: Transaction;
  updatingId: string | null;
  onUpdate: (id: string, updates: Partial<Transaction>) => Promise<void>;
};

export function EditTransactionForm({
  transaction,
  updatingId,
  onUpdate,
}: EditTransactionFormProps) {
  const { categories } = useCategories();
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState(transaction.title);
  const [description, setDescription] = useState(
    transaction.description ?? "",
  );
  const [amount, setAmount] = useState(String(transaction.amount));
  const [type, setType] = useState(transaction.type);
  const [categoryId, setCategoryId] = useState(transaction.category_id ?? "");
  const [transactionDate, setTransactionDate] = useState(
    transaction.transaction_date
      ? transaction.transaction_date.split("T")[0]
      : "",
  );

  const filteredCategories = categories.filter(cat => cat.type === type);
  const isUpdating = updatingId === transaction.id;

  // Reset category when type changes
  useEffect(() => {
    const currentCategory = categories.find(cat => cat.id === categoryId);
    if (currentCategory && currentCategory.type !== type) {
      setCategoryId("");
    }
  }, [type, categoryId, categories]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      alert("O título não pode ficar vazio");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      alert("O valor precisa ser maior que zero");
      return;
    }

    if (!transactionDate) {
      alert("A data é obrigatória");
      return;
    }

    await onUpdate(transaction.id, {
      title: title.trim(),
      description: description.trim(),
      amount: Number(amount),
      type,
      category_id: categoryId || null,
      transaction_date: transactionDate,
    });

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" disabled={isUpdating}>
          <Pencil className="size-4" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar transação</DialogTitle>

          <DialogDescription>
            Altere os dados da transação abaixo.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={`title-${transaction.id}`}>Título</Label>

            <Input
              id={`title-${transaction.id}`}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Ex: Mercado"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`description-${transaction.id}`}>
              Descrição
            </Label>

            <Input
              id={`description-${transaction.id}`}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Ex: Compra do mês"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`amount-${transaction.id}`}>Valor</Label>

            <Input
              id={`amount-${transaction.id}`}
              type="number"
              step="0.01"
              min="0"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              placeholder="Ex: 150.00"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`type-${transaction.id}`}>Tipo</Label>

            <Select value={type} onValueChange={(value) => setType(value as Transaction["type"])}>
              <SelectTrigger id={`type-${transaction.id}`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income">
                  <div className="flex items-center gap-2">
                    <ArrowUpRight className="size-4" />
                    Income
                  </div>
                </SelectItem>
                <SelectItem value="expense">
                  <div className="flex items-center gap-2">
                    <ArrowDownLeft className="size-4" />
                    Expense
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`category-${transaction.id}`}>Categoria (Opcional)</Label>

            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger id={`category-${transaction.id}`} disabled={filteredCategories.length === 0}>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {filteredCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    <div className="flex items-center gap-2">
                      {renderCategoryIcon(category.icon, 'size-4')}
                      {category.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {filteredCategories.length === 0 && (
              <p className="text-xs text-muted-foreground">
                Nenhuma categoria disponível para este tipo
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor={`date-${transaction.id}`}>Data</Label>

            <Input
              id={`date-${transaction.id}`}
              type="date"
              value={transactionDate}
              onChange={(event) => setTransactionDate(event.target.value)}
            />
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