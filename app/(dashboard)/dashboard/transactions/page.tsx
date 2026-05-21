'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowUpRight, ArrowDownLeft, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useTransactions } from '@/hooks/use-transactions';
import { AddTransactionForm } from '@/components/transactions/add-transaction-form';

export default function TransactionsPage() {
  const { transactions, loading, deleteTransaction, fetchTransactions } = useTransactions();
  const [showForm, setShowForm] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this transaction?')) return;

    try {
      setDeletingId(id);
      await deleteTransaction(id);
    } catch (error) {
      alert('Failed to delete transaction');
    } finally {
      setDeletingId(null);
    }
  };

  const categoryBadgeColor = (category?: string) => {
    const colors: { [key: string]: string } = {
      Income: 'bg-green-100 text-green-800',
      'Food & Dining': 'bg-orange-100 text-orange-800',
      Housing: 'bg-red-100 text-red-800',
      Transport: 'bg-yellow-100 text-yellow-800',
      Freelance: 'bg-purple-100 text-purple-800',
    };
    return colors[category || ''] || 'bg-gray-100 text-gray-800';
  };

  const typeBadgeColor = (type: string) => {
    return type === 'income'
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground mt-2">Manage and track all your transactions</p>
        </div>
        <Button className="gap-2" onClick={() => setShowForm(!showForm)}>
          <Plus className="size-4" />
          {showForm ? 'Cancel' : 'New Transaction'}
        </Button>
      </div>

      {/* Add Transaction Form */}
      {showForm && (
        <AddTransactionForm
          onSuccess={() => {
            setShowForm(false);
            fetchTransactions();
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Transactions</CardTitle>
          <CardDescription>
            {loading ? 'Loading...' : `You have ${transactions.length} transactions`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 && !loading ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No transactions yet. Create one to get started!</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{transaction.title}</p>
                        {transaction.description && (
                          <p className="text-sm text-muted-foreground">{transaction.description}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={typeBadgeColor(transaction.type)}>
                        {transaction.type === 'income' ? 'Income' : 'Expense'}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-semibold">
                      <span
                        className={
                          transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                        }
                      >
                        {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                      </span>
                    </TableCell>
                    <TableCell>
                      {new Date(transaction.transaction_date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(transaction.id)}
                        disabled={deletingId === transaction.id}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
