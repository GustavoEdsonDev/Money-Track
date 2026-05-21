'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Edit2, Trash2, CreditCard } from 'lucide-react';

export default function AccountsPage() {
  const accounts = [
    {
      id: '1',
      name: 'Checking Account',
      type: 'Checking',
      balance: 5250.75,
      currency: 'USD',
      lastTransaction: '2024-05-21',
      icon: '🏦',
    },
    {
      id: '2',
      name: 'Savings Account',
      type: 'Savings',
      balance: 12500.00,
      currency: 'USD',
      lastTransaction: '2024-05-15',
      icon: '💰',
    },
    {
      id: '3',
      name: 'Visa Credit Card',
      type: 'Credit Card',
      balance: -1250.50,
      currency: 'USD',
      lastTransaction: '2024-05-21',
      icon: '💳',
    },
    {
      id: '4',
      name: 'Investment Account',
      type: 'Investment',
      balance: 25000.00,
      currency: 'USD',
      lastTransaction: '2024-05-18',
      icon: '📈',
    },
  ];

  const getAccountColor = (type: string) => {
    const colors: { [key: string]: string } = {
      Checking: 'bg-blue-100 text-blue-800',
      Savings: 'bg-green-100 text-green-800',
      'Credit Card': 'bg-purple-100 text-purple-800',
      Investment: 'bg-yellow-100 text-yellow-800',
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Accounts</h1>
          <p className="text-muted-foreground mt-2">Manage all your financial accounts</p>
        </div>
        <Button className="gap-2">
          <Plus className="size-4" />
          New Account
        </Button>
      </div>

      {/* Total Balance Card */}
      <Card className="bg-gradient-to-r from-blue-600 to-blue-400 text-white border-0">
        <CardHeader>
          <CardTitle className="text-white">Total Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
          <p className="text-blue-100 mt-2">Across all accounts</p>
        </CardContent>
      </Card>

      {/* Accounts Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {accounts.map((account) => (
          <Card key={account.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-lg bg-muted flex items-center justify-center text-2xl">
                  {account.icon}
                </div>
                <div>
                  <h3 className="font-semibold">{account.name}</h3>
                  <Badge className={getAccountColor(account.type)}>{account.type}</Badge>
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
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Balance</span>
                  <span className={`text-lg font-semibold ${account.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${account.balance.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Last Transaction</span>
                  <span>{account.lastTransaction}</span>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4 gap-2">
                <CreditCard className="size-4" />
                View Transactions
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
