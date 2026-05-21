'use client';

import { useState, useEffect } from 'react';

export interface Account {
  id: string;
  user_id: string;
  name: string;
  type: 'cash' | 'bank' | 'credit_card' | 'investment';
  initial_balance: number;
  created_at: string;
}

export function useAccounts() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/accounts');
      if (!response.ok) throw new Error('Failed to fetch accounts');
      const data = await response.json();
      setAccounts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setAccounts([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteAccount = async (id: string) => {
    try {
      const response = await fetch(`/api/accounts/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete account');
      setAccounts((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to delete account');
    }
  };

  const updateAccount = async (id: string, updates: Partial<Account>) => {
    try {
      const response = await fetch(`/api/accounts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (!response.ok) throw new Error('Failed to update account');
      const updatedAccount = await response.json();
      setAccounts((prev) =>
        prev.map((a) => (a.id === id ? updatedAccount : a))
      );
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to update account');
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  return { accounts, loading, error, fetchAccounts, deleteAccount, updateAccount };
}
