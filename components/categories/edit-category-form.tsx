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

import { useCategories, type Category } from "@/hooks/use-categories";

type EditCategoryFormProps = {
  category: Category;
  updatingId: string | null;
  onUpdate: (id: string, updates: Partial<Category>) => Promise<void>;
};

export function EditCategoryForm({
  category,
  updatingId,
  onUpdate,
}: EditCategoryFormProps) {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState(category.name);
  const [type, setType] = useState(category.type);
  const [color, setColor] = useState(category.color);
  const [icon, setIcon] = useState(category.icon);

  const isUpdating = updatingId === category.id;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim()) {
      alert("O nome não pode ficar vazio");
      return;
    }

    if (!color.trim()) {
      alert("A cor é obrigatória");
      return;
    }

    if (!icon.trim()) {
      alert("O ícone é obrigatório");
      return;
    }

    await onUpdate(category.id, {
      name: name.trim(),
      type,
      color: color.trim(),
      icon: icon.trim(),
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
          <DialogTitle>Editar categoria</DialogTitle>

          <DialogDescription>
            Altere os dados da categoria abaixo.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={`name-${category.id}`}>Nome</Label>

            <Input
              id={`name-${category.id}`}
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Ex: Alimentação"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`type-${category.id}`}>Tipo</Label>

            <select
              id={`type-${category.id}`}
              value={type}
              onChange={(event) =>
                setType(event.target.value as Category["type"])
              }
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`color-${category.id}`}>Cor</Label>

            <Input
              id={`color-${category.id}`}
              type="color"
              value={color}
              onChange={(event) => setColor(event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`icon-${category.id}`}>Ícone</Label>

            <Input
              id={`icon-${category.id}`}
              value={icon}
              onChange={(event) => setIcon(event.target.value)}
              placeholder="Ex: 🍔"
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