'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AlertCircle, Loader2, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { useCategories } from '@/hooks/use-categories';
import { renderCategoryIcon } from '@/lib/category-icons';

interface AddTransactionFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function AddTransactionForm({ onSuccess, onCancel }: AddTransactionFormProps) {
  const { categories } = useCategories();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [categoryId, setCategoryId] = useState('');
  const [transactionDate, setTransactionDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Filter categories by type
  const filteredCategories = categories.filter(cat => cat.type === type);

  // Reset category when type changes
  useEffect(() => {
    setCategoryId('');
  }, [type]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title || !amount) {
      setError('Título e valor são obrigatórios');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          amount: parseFloat(amount),
          type,
          category_id: categoryId || null,
          transaction_date: transactionDate,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Falha ao criar transação');
      }

      // Reset form
      setTitle('');
      setDescription('');
      setAmount('');
      setCategoryId('');
      setType('expense');
      setTransactionDate(new Date().toISOString().split('T')[0]);

      onSuccess?.();
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nova Transação</CardTitle>
        <CardDescription>Adicione uma nova transação</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="flex gap-2 p-3 rounded-lg bg-red-50 border border-red-200">
              <AlertCircle className="size-4 text-red-600 mt-0.5 shrink-0" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              placeholder="Ex.: Compras no mercado"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Descrição (opcional)</Label>
            <Input
              id="description"
              placeholder="Adicione uma observação..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
            />
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount">Valor</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="0,00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          {/* Type */}
          <div className="space-y-2">
            <Label htmlFor="type">Tipo</Label>
            <Select value={type} onValueChange={(value) => setType(value as 'income' | 'expense')}>
              <SelectTrigger id="type" disabled={loading}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="expense">
                  <div className="flex items-center gap-2">
                    <ArrowDownLeft className="size-4" />
                    Despesa
                  </div>
                </SelectItem>
                <SelectItem value="income">
                  <div className="flex items-center gap-2">
                    <ArrowUpRight className="size-4" />
                    Receita
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Categoria (opcional)</Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger id="category" disabled={loading || filteredCategories.length === 0}>
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

          {/* Date */}
          <div className="space-y-2">
            <Label htmlFor="date">Data</Label>
            <Input
              id="date"
              type="date"
              value={transactionDate}
              onChange={(e) => setTransactionDate(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="size-4 mr-2 animate-spin" />
                  Criando...
                </>
              ) : (
                'Adicionar Transação'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}