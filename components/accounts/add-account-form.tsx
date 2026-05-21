'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function AddAccountForm({
  onSuccess,
  onCancel,
}: {
  onSuccess?: () => void;
  onCancel?: () => void;
}) {
  const [name, setName] = useState('');
  const [type, setType] = useState<'cash' | 'bank' | 'credit_card' | 'investment'>('bank');
  const [initialBalance, setInitialBalance] = useState('0');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const accountTypes = [
    { value: 'cash', label: '💵 Cash', icon: '💵' },
    { value: 'bank', label: '🏦 Bank Account', icon: '🏦' },
    { value: 'credit_card', label: '💳 Credit Card', icon: '💳' },
    { value: 'investment', label: '📈 Investment', icon: '📈' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Account name is required');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('/api/accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          type,
          initial_balance: parseFloat(initialBalance) || 0,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create account');
      }

      setName('');
      setType('bank');
      setInitialBalance('0');
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Create New Account</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="flex gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600">
              <AlertCircle className="size-4 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Account Name</Label>
            <Input
              id="name"
              placeholder="e.g., My Savings"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Account Type</Label>
            <Select value={type} onValueChange={(value) => setType(value as any)}>
              <SelectTrigger id="type">
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
            <Label htmlFor="balance">Initial Balance</Label>
            <Input
              id="balance"
              type="number"
              placeholder="0.00"
              step="0.01"
              value={initialBalance}
              onChange={(e) => setInitialBalance(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="flex gap-2 justify-end pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Account'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
