'use client';

import { useEffect, useState } from 'react';

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

interface ApiError {
  error?: string;
  message?: string;
}

interface UpdateTransactionResponse {
  message: string;
  transaction: Transaction;
}

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getErrorMessage = (err: unknown) => {
    return err instanceof Error ? err.message : 'An error occurred';
  };

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/transactions');

      const data: Transaction[] | ApiError = await response.json();

      if (!response.ok) {
        throw new Error(
          'error' in data
            ? data.error
            : 'Failed to fetch transactions'
        );
      }

      setTransactions(data as Transaction[]);
    } catch (err: unknown) {
      const message = getErrorMessage(err);

      console.error('Fetch transactions error:', message);

      setError(message);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteTransaction = async (id: string) => {
  console.log('Chamou deleteTransaction com ID:', id);

  try {
    const response = await fetch(`/api/transactions/${id}`, {
      method: 'DELETE',
    });

    console.log('Status do DELETE:', response.status);

    const data = await response.json();
    console.log('Resposta do DELETE:', data);

    if (!response.ok) {
      throw new Error(data.error || 'Failed to delete transaction');
    }

    setTransactions((prev) =>
      prev.filter((transaction) => transaction.id !== id)
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'An error occurred';
    console.error('Delete transaction error:', message);
    throw new Error(message);
  }
};

  const updateTransaction = async (
    id: string,
    updates: Partial<Transaction>
  ) => {
    try {
      const response = await fetch(`/api/transactions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      const data: UpdateTransactionResponse | ApiError = await response.json();

      if (!response.ok) {
        throw new Error(
          'error' in data
            ? data.error
            : 'Failed to update transaction'
        );
      }

      const updatedData = data as UpdateTransactionResponse;

      setTransactions((prev) =>
        prev.map((transaction) =>
          transaction.id === id ? updatedData.transaction : transaction
        )
      );
    } catch (err: unknown) {
      const message = getErrorMessage(err);

      console.error('Update transaction error:', message);

      throw new Error(message);
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