'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useAccounts } from '@/hooks/use-accounts';
import { AddAccountForm } from '@/components/accounts/add-account-form';

const accountIcons: Record<string, string> = {
  cash: '💵',
  bank: '🏦',
  credit_card: '💳',
  investment: '📈',
};

const accountLabels: Record<string, string> = {
  cash: 'Cash',
  bank: 'Bank Account',
  credit_card: 'Credit Card',
  investment: 'Investment',
};

export default function AccountsPage() {
  const { accounts, loading, deleteAccount, fetchAccounts } = useAccounts();
  const [showForm, setShowForm] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this account?')) return;

    try {
      setDeletingId(id);
      await deleteAccount(id);
    } catch (error) {
      alert('Failed to delete account');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Accounts</h1>
          <p className="text-muted-foreground mt-2">Manage your bank accounts and cash wallets</p>
        </div>
        <Button className="gap-2" onClick={() => setShowForm(!showForm)}>
          <Plus className="size-4" />
          {showForm ? 'Cancel' : 'New Account'}
        </Button>
      </div>

      {/* Add Account Form */}
      {showForm && (
        <AddAccountForm
          onSuccess={() => {
            setShowForm(false);
            fetchAccounts();
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Accounts Grid */}
      {accounts.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {accounts.map((account) => (
            <Card key={account.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">
                    {accountIcons[account.type] || '🏦'}
                  </div>
                  <div>
                    <h3 className="font-semibold">{account.name}</h3>
                    <Badge variant="outline" className="mt-1 text-xs">
                      {accountLabels[account.type] || account.type}
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(account.id)}
                  disabled={deletingId === account.id}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="size-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Initial Balance</span>
                    <span className="text-lg font-semibold">
                      ${account.initial_balance.toFixed(2)}
                    </span>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground">
                      Created {new Date(account.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {accounts.length === 0 && !loading && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No accounts yet. Create one to get started!</p>
        </div>
      )}
    </div>
  );
}
