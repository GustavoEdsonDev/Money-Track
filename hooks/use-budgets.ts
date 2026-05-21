'use client';

import { useState, useEffect } from 'react';

export interface Budget {
  id: string;
  user_id: string;
  category_id: string;
  amount_limit: number;
  month: number;
  year: number;
  created_at: string;
}

export function useBudgets() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBudgets = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/budgets');
      if (!response.ok) throw new Error('Failed to fetch budgets');
      const data = await response.json();
      setBudgets(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setBudgets([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteBudget = async (id: string) => {
    try {
      const response = await fetch(`/api/budgets/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete budget');
      setBudgets((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to delete budget');
    }
  };

  const updateBudget = async (id: string, updates: Partial<Budget>) => {
    try {
      const response = await fetch(`/api/budgets/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (!response.ok) throw new Error('Failed to update budget');
      const updatedBudget = await response.json();
      setBudgets((prev) =>
        prev.map((b) => (b.id === id ? updatedBudget.budget : b))
      );
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to update budget');
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  return { budgets, loading, error, fetchBudgets, deleteBudget, updateBudget };
}
