"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useTransactions, type Transaction } from "@/hooks/use-transactions";
import { AddTransactionForm } from "@/components/transactions/add-transaction-form";
import { EditTransactionForm } from "@/components/transactions/edit-transaction-form";

export default function TransactionsPage() {
  const {
    transactions,
    loading,
    deleteTransaction,
    fetchTransactions,
    updateTransaction,
  } = useTransactions();

  const [showForm, setShowForm] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);

      await deleteTransaction(id);

      console.log("Transação deletada");
    } catch (error) {
      console.error("Erro ao deletar:", error);

      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Failed to delete transaction");
      }
    } finally {
      setDeletingId(null);
    }
  };

  const handleUpdate = async (id: string, updates: Partial<Transaction>) => {
    try {
      setUpdatingId(id);

      await updateTransaction(id, updates);

      console.log("Transação atualizada");
    } catch (error) {
      console.error("Erro ao atualizar:", error);

      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Failed to update transaction");
      }
    } finally {
      setUpdatingId(null);
    }
  };

  const typeBadgeColor = (type: string) => {
    return type === "income"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>

          <p className="text-muted-foreground mt-2">
            Manage and track all your transactions
          </p>
        </div>

        <Button className="gap-2" onClick={() => setShowForm(!showForm)}>
          <Plus className="size-4" />
          {showForm ? "Cancel" : "New Transaction"}
        </Button>
      </div>

      {showForm && (
        <AddTransactionForm
          onSuccess={() => {
            setShowForm(false);
            fetchTransactions();
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      <Card>
        <CardHeader>
          <CardTitle>All Transactions</CardTitle>

          <CardDescription>
            {loading
              ? "Loading..."
              : `You have ${transactions.length} transactions`}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {transactions.length === 0 && !loading ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No transactions yet. Create one to get started!
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{transaction.title}</p>

                        {transaction.description && (
                          <p className="text-sm text-muted-foreground">
                            {transaction.description}
                          </p>
                        )}
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant="outline"
                        className={typeBadgeColor(transaction.type)}
                      >
                        {transaction.type === "income" ? "Income" : "Expense"}
                      </Badge>
                    </TableCell>

                    <TableCell className="font-semibold">
                      <span
                        className={
                          transaction.type === "income"
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {transaction.type === "income" ? "+" : "-"}$
                        {transaction.amount.toFixed(2)}
                      </span>
                    </TableCell>

                    <TableCell>
                      {new Date(
                        transaction.transaction_date,
                      ).toLocaleDateString()}
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <EditTransactionForm
                          transaction={transaction}
                          updatingId={updatingId}
                          onUpdate={handleUpdate}
                        />

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              disabled={deletingId === transaction.id}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="size-4" />
                            </Button>
                          </AlertDialogTrigger>

                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Delete transaction?
                              </AlertDialogTitle>

                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete this transaction.
                              </AlertDialogDescription>
                            </AlertDialogHeader>

                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>

                              <AlertDialogAction
                                onClick={() => handleDelete(transaction.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
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