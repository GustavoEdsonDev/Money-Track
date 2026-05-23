"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  ArrowDownLeft,
  TrendingUp,
  PlusCircle,
} from "lucide-react";
import { useTransactions } from "@/hooks/use-transactions";
import { useCategories } from "@/hooks/use-categories";
import { useAccounts } from "@/hooks/use-accounts";
import { useBudgets } from "@/hooks/use-budgets";
import { AddTransactionForm } from "@/components/transactions/add-transaction-form";
import { useState } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { transactions, loading: transactionsLoading } = useTransactions();
  const { categories, loading, deleteCategory, fetchCategories } =
    useCategories();
  const { accounts, deleteAccount, fetchAccounts } = useAccounts();
  const [showForm, setShowForm] = useState(false);
  const { budgets } = useBudgets();

  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalExpense = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const balance = totalIncome - totalExpense;

  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <div className="space-y-8 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Bem-vindo ao seu painel financeiro
          </p>
        </div>
        <Link href="/dashboard/transactions" className="cursor-pointer">
        <Button>
          <Plus /> 
          New Transaction 
        </Button> 
        </Link>
        
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Total</CardTitle>
            <TrendingUp className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {formatCurrency(balance)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              +2.5% em relação ao mês passado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receitas</CardTitle>
            <ArrowDownLeft className="size-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              R$ {totalIncome.toLocaleString("pt-BR")}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Despesas</CardTitle>
            <ArrowUpRight className="size-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              R$ {totalExpense.toLocaleString("pt-BR")}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Este mês</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Transactions */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Transações Recentes</CardTitle>
              <CardDescription>Suas últimas 5 transações</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-3 rounded-lg border"
                  >
                    <div className="flex items-center gap-4">
                      <div className="size-10 rounded-full flex items-center justify-center text-white">
                        {transaction.type === "income" ? (
                          <ArrowDownLeft className="size-5" />
                        ) : (
                          <ArrowUpRight className="size-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{transaction.title}</p>
                        <p className="text-sm text-muted-foreground"></p>
                      </div>
                    </div>
                    <p
                      className={`font-semibold ${
                        transaction.type === "income"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.type === "income" ? "+" : "-"}R${" "}
                      {transaction.amount.toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Accounts */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {accounts.map((account) => (
                <div
                  key={account.id}
                  className="flex items-center justify-between p-2"
                >
                  <div>
                    <p className="font-medium text-sm">{account.name}</p>
                    <Badge variant="outline" className="mt-1">
                      {account.type}
                    </Badge>
                  </div>
                  <p
                    className={`font-semibold ${account.initial_balance >= 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    R$ {account.initial_balance.toFixed(2)}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Spending by Category */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Gastos por Categoria</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {categories.map((category) => (
                <div key={category.id} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{category.name}</p>
                    <p className="text-sm text-muted-foreground">
                      R$ {category.type}
                    </p>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${category.color}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
