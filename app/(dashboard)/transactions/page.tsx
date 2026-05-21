'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowUpRight, ArrowDownLeft, Plus } from 'lucide-react';

export default function TransactionsPage() {
  const transactions = [
    {
      id: '1',
      title: 'Salary',
      category: 'Income',
      account: 'Checking Account',
      type: 'Income',
      amount: 3500.00,
      date: '2024-05-21',
    },
    {
      id: '2',
      title: 'Grocery Shopping',
      category: 'Food & Dining',
      account: 'Debit Card',
      type: 'Expense',
      amount: 87.45,
      date: '2024-05-20',
    },
    {
      id: '3',
      title: 'Rent Payment',
      category: 'Housing',
      account: 'Checking Account',
      type: 'Expense',
      amount: 1200.00,
      date: '2024-05-20',
    },
    {
      id: '4',
      title: 'Uber Ride',
      category: 'Transport',
      account: 'Debit Card',
      type: 'Expense',
      amount: 23.60,
      date: '2024-05-19',
    },
    {
      id: '5',
      title: 'Freelance Project',
      category: 'Freelance',
      account: 'Checking Account',
      type: 'Income',
      amount: 800.00,
      date: '2024-05-18',
    },
  ];

  const categoryBadgeColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Income: 'bg-green-100 text-green-800',
      'Food & Dining': 'bg-orange-100 text-orange-800',
      Housing: 'bg-red-100 text-red-800',
      Transport: 'bg-yellow-100 text-yellow-800',
      Freelance: 'bg-purple-100 text-purple-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const typeBadgeColor = (type: string) => {
    return type === 'Income'
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
        <Button className="gap-2">
          <Plus className="size-4" />
          New Transaction
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <Button variant="outline">Filter by Category</Button>
        <Button variant="outline">Filter by Date</Button>
        <Button variant="outline">Filter by Account</Button>
      </div>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Transactions</CardTitle>
          <CardDescription>Complete list of your transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Account</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <div
                          className={`size-8 rounded-full flex items-center justify-center text-white ${transaction.type === 'Income' ? 'bg-green-600' : 'bg-red-600'}`}
                        >
                          {transaction.type === 'Income' ? (
                            <ArrowDownLeft className="size-4" />
                          ) : (
                            <ArrowUpRight className="size-4" />
                          )}
                        </div>
                        {transaction.title}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={categoryBadgeColor(transaction.category)}>
                        {transaction.category}
                      </Badge>
                    </TableCell>
                    <TableCell>{transaction.account}</TableCell>
                    <TableCell>
                      <Badge className={typeBadgeColor(transaction.type)}>
                        {transaction.type}
                      </Badge>
                    </TableCell>
                    <TableCell
                      className={`font-semibold ${transaction.type === 'Income' ? 'text-green-600' : 'text-red-600'}`}
                    >
                      {transaction.type === 'Income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        ...
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
