'use client';

import { useState, useEffect } from 'react';

export interface Transaction {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  amount: number;
  type: 'income' | 'expense';
  category_id: string | null;
  account_id: string | null;
  transaction_date: string;
  created_at: string;
}

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch transactions
  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/transactions');

      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }

      const data = await response.json();
      setTransactions(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  // Delete transaction
  const deleteTransaction = async (id: string) => {
    try {
      const response = await fetch(`/api/transactions/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete transaction');
      }

      setTransactions(transactions.filter((t) => t.id !== id));
    } catch (err: any) {
      throw new Error(err.message || 'An error occurred');
    }
  };

  // Update transaction
  const updateTransaction = async (id: string, updates: Partial<Transaction>) => {
    try {
      const response = await fetch(`/api/transactions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('Failed to update transaction');
      }

      const updatedTransaction = await response.json();
      setTransactions(
        transactions.map((t) => (t.id === id ? updatedTransaction.transaction : t))
      );
    } catch (err: any) {
      throw new Error(err.message || 'An error occurred');
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return {
    transactions,
    loading,
    error,
    fetchTransactions,
    deleteTransaction,
    updateTransaction,
  };
}
