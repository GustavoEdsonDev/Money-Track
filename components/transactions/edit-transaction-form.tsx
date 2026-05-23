"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Ajuste esse import para o local real do seu tipo Transaction
// Exemplo:
// import type { Transaction } from "@/types/transaction";

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
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState(transaction.title);
  const [description, setDescription] = useState(
    transaction.description ?? "",
  );
  const [amount, setAmount] = useState(String(transaction.amount));
  const [type, setType] = useState(transaction.type);
  const [transactionDate, setTransactionDate] = useState(
    transaction.transaction_date
      ? transaction.transaction_date.split("T")[0]
      : "",
  );

  const isUpdating = updatingId === transaction.id;

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

            <select
              id={`type-${transaction.id}`}
              value={type}
              onChange={(event) =>
                setType(event.target.value as Transaction["type"])
              }
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
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