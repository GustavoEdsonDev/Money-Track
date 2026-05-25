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

import { useAccounts, type Account } from "@/hooks/use-accounts";

type EditAccountFormProps = {
  account: Account;
  updatingId: string | null;
  onUpdate: (id: string, updates: Partial<Account>) => Promise<void>;
};

export function EditAccountForm({
  account,
  updatingId,
  onUpdate,
}: EditAccountFormProps) {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState(account.name);
  const [type, setType] = useState(account.type);
  const [initialBalance, setInitialBalance] = useState(
    String(account.initial_balance)
  );

  const isUpdating = updatingId === account.id;

  const accountTypes = [
    { value: "cash", label: "💵 Cash" },
    { value: "bank", label: "🏦 Bank Account" },
    { value: "credit_card", label: "💳 Credit Card" },
    { value: "investment", label: "📈 Investment" },
  ];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim()) {
      alert("O nome não pode ficar vazio");
      return;
    }

    if (initialBalance === "" || Number(initialBalance) < 0) {
      alert("O saldo inicial não pode ser negativo");
      return;
    }

    await onUpdate(account.id, {
      name: name.trim(),
      type: type as Account["type"],
      initial_balance: Number(initialBalance),
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
          <DialogTitle>Editar conta</DialogTitle>

          <DialogDescription>
            Altere os dados da conta abaixo.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={`name-${account.id}`}>Nome</Label>

            <Input
              id={`name-${account.id}`}
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Ex: Minha Poupança"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`type-${account.id}`}>Tipo</Label>

            <Select
              value={type}
              onValueChange={(value) =>
                setType(value as Account["type"])
              }
            >
              <SelectTrigger id={`type-${account.id}`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {accountTypes.map((at) => (
                  <SelectItem key={at.value} value={at.value}>
                    {at.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`balance-${account.id}`}>Saldo Inicial</Label>

            <Input
              id={`balance-${account.id}`}
              type="number"
              step="0.01"
              min="0"
              value={initialBalance}
              onChange={(event) => setInitialBalance(event.target.value)}
              placeholder="Ex: 1000.00"
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
