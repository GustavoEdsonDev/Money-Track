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
import { useAccounts } from "@/hooks/use-accounts";
import { useBudgets } from "@/hooks/use-budgets";
import { AddTransactionForm } from "@/components/transactions/add-transaction-form";
import { useState } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { transactions, loading: transactionsLoading } = useTransactions();
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
    <div className="space-y-6 sm:space-y-8 p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2">
            Bem-vindo ao seu painel financeiro
          </p>
        </div>
        <Link href="/dashboard/transactions" className="cursor-pointer w-full sm:w-auto">
        <Button className="w-full sm:w-auto">
          <Plus className="size-3 sm:size-4" /> 
          <span className="text-xs sm:text-sm">New Transaction</span>
        </Button> 
        </Link>
        
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Saldo Total</CardTitle>
            <TrendingUp className="size-3 sm:size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-2xl font-bold">
              R$ {formatCurrency(balance)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Receitas</CardTitle>
            <ArrowDownLeft className="size-3 sm:size-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-2xl font-bold text-green-600">
              R$ {totalIncome.toLocaleString("pt-BR")}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Despesas</CardTitle>
            <ArrowUpRight className="size-3 sm:size-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-2xl font-bold text-red-600">
              R$ {totalExpense.toLocaleString("pt-BR")}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Transactions */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6">
              <CardTitle className="text-base sm:text-lg">Transações Recentes</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Suas últimas 5 transações</CardDescription>
            </CardHeader>
            <CardContent className="px-3 sm:px-6">
              <div className="space-y-3 sm:space-y-4">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 sm:p-3 rounded-lg border gap-3 sm:gap-0"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                      <div className="size-8 sm:size-10 rounded-full flex items-center justify-center text-white shrink-0">
                        {transaction.type === "income" ? (
                          <ArrowDownLeft className="size-4 sm:size-5" />
                        ) : (
                          <ArrowUpRight className="size-4 sm:size-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm sm:text-base">{transaction.title}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground"></p>
                      </div>
                    </div>
                    <p
                      className={`font-semibold text-sm sm:text-base ${
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
        <div className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6">
              <CardTitle className="text-base sm:text-lg">Contas</CardTitle>
            </CardHeader>
            <CardContent className="px-3 sm:px-6 space-y-2 sm:space-y-3">
              {accounts.map((account) => (
                <div
                  key={account.id}
                  className="flex items-center justify-between p-2"
                >
                  <div>
                    <p className="font-medium text-xs sm:text-sm">{account.name}</p>
                    <Badge variant="outline" className="mt-1 text-xs">
                      {account.type}
                    </Badge>
                  </div>
                  <p
                    className={`font-semibold text-xs sm:text-sm ${account.initial_balance >= 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    R$ {account.initial_balance.toFixed(2)}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>


        </div>
      </div>
    </div>
  );
}
