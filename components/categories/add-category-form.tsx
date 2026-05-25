'use client';

import { useState } from 'react';
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
import { commonIcons, iconMap, renderCategoryIcon } from '@/lib/category-icons';

interface AddCategoryFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function AddCategoryForm({ onSuccess, onCancel }: AddCategoryFormProps) {
  const [name, setName] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [color, setColor] = useState('#FF6B6B');
  const [icon, setIcon] = useState('folder');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const commonColors = [
    '#FF6B6B', // Red
    '#FFA94D', // Orange
    '#FFD93D', // Yellow
    '#51CF66', // Green
    '#74B9FF', // Blue
    '#A78BFA', // Purple
    '#FF8787', // Pink
    '#845EF7', // Purple Dark
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name) {
      setError('Category name is required');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          type,
          color,
          icon,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create category');
      }

      // Reset form
      setName('');
      setType('expense');
      setColor('#FF6B6B');
      setIcon('folder');

      onSuccess?.();
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Category</CardTitle>
        <CardDescription>Create a new income or expense category</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="flex gap-2 p-3 rounded-lg bg-red-50 border border-red-200">
              <AlertCircle className="size-4 text-red-600 mt-0.5 shrink-0" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Category Name</Label>
            <Input
              id="name"
              placeholder="e.g., Groceries, Rent, Salary"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          {/* Type */}
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select value={type} onValueChange={(value) => setType(value as 'income' | 'expense')}>
              <SelectTrigger id="type" disabled={loading}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="expense">
                  <div className="flex items-center gap-2">
                    <ArrowDownLeft className="size-4" />
                    Expense
                  </div>
                </SelectItem>
                <SelectItem value="income">
                  <div className="flex items-center gap-2">
                    <ArrowUpRight className="size-4" />
                    Income
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Icon */}
          <div className="space-y-2">
            <Label>Icon</Label>
            <div className="flex gap-2 flex-wrap">
              {commonIcons.map(({ id, label }) => {
                const IconComponent = iconMap[id];
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setIcon(id)}
                    disabled={loading}
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

          {/* Color */}
          <div className="space-y-2">
            <Label>Color</Label>
            <div className="flex gap-2 flex-wrap">
              {commonColors.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  disabled={loading}
                  className={`size-10 rounded-lg border-2 transition-all ${
                    color === c ? 'border-gray-800 ring-2 ring-offset-2' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-2">
            <Label>Preview</Label>
            <div
              className="size-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: color }}
            >
              {renderCategoryIcon(icon, 'size-6')}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="size-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Category'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
