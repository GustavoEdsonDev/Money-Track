'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function CategoriesPage() {
  const categories = [
    { id: '1', name: 'Housing', icon: '🏠', color: '#FF6B6B', transactions: 12, totalSpent: 3600.00 },
    { id: '2', name: 'Food & Dining', icon: '🍽️', color: '#FFA94D', transactions: 28, totalSpent: 1245.30 },
    { id: '3', name: 'Transport', icon: '🚗', color: '#FFD93D', transactions: 15, totalSpent: 450.80 },
    { id: '4', name: 'Entertainment', icon: '🎬', color: '#A78BFA', transactions: 8, totalSpent: 320.50 },
    { id: '5', name: 'Shopping', icon: '🛍️', color: '#FF8787', transactions: 18, totalSpent: 890.25 },
    { id: '6', name: 'Utilities', icon: '💡', color: '#74B9FF', transactions: 6, totalSpent: 250.00 },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground mt-2">Manage your spending categories</p>
        </div>
        <Button className="gap-2">
          <Plus className="size-4" />
          New Category
        </Button>
      </div>

      {/* Categories Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Card key={category.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div className="flex items-center gap-3">
                <div
                  className="size-12 rounded-lg flex items-center justify-center text-2xl"
                  style={{ backgroundColor: `${category.color}20` }}
                >
                  {category.icon}
                </div>
                <div>
                  <h3 className="font-semibold">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.transactions} transactions</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="size-8">
                  <Edit2 className="size-4" />
                </Button>
                <Button variant="ghost" size="icon" className="size-8">
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Spent</span>
                <span className="text-lg font-semibold">
                  ${category.totalSpent.toFixed(2)}
                </span>
              </div>
              <div className="mt-3 w-full bg-muted rounded-full h-2">
                <div
                  className="h-2 rounded-full"
                  style={{
                    backgroundColor: category.color,
                    width: `${Math.min((category.totalSpent / 1000) * 100, 100)}%`,
                  }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
