"use client";

import { useState } from "react";
import { Pencil, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { commonIcons, iconMap } from "@/lib/category-icons";
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

            <Select value={type} onValueChange={(value) => setType(value as Category["type"])}>
              <SelectTrigger id={`type-${category.id}`}>
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
            <div className="flex gap-2 flex-wrap">
              {commonIcons.map(({ id, label }) => {
                const IconComponent = iconMap[id];
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setIcon(id)}
                    disabled={isUpdating}
                    className={`size-10 flex items-center justify-center rounded-lg border-2 transition-all ${
                      icon === id
                        ? 'border-primary bg-primary/10'
                        : 'border-muted hover:border-primary/50'
                    }`}
                    title={label}
                  >
                    <IconComponent className="size-5" />
                  </button>
                );
              })}
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