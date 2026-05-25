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
        alert("Falha ao excluir transação");
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
        alert("Falha ao atualizar transação");
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
          <h1 className="text-3xl font-bold tracking-tight">Transações</h1>

          <p className="text-muted-foreground mt-2">
            Gerencie e acompanhe todas as suas transações
          </p>
        </div>

        <Button className="gap-2" onClick={() => setShowForm(!showForm)}>
          <Plus className="size-4" />
          {showForm ? "Cancelar" : "Nova Transação"}
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
          <CardTitle>Todas as Transações</CardTitle>

          <CardDescription>
            {loading
              ? "Carregando..."
              : `Você tem ${transactions.length} transações`}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {transactions.length === 0 && !loading ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Nenhuma transação ainda. Crie uma para começar!
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
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
                        {transaction.type === "income" ? "Receita" : "Despesa"}
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
                        {transaction.type === "income" ? "+" : "-"}R${" "}
                        {transaction.amount.toFixed(2)}
                      </span>
                    </TableCell>

                    <TableCell>
                      {new Date(
                        transaction.transaction_date,
                      ).toLocaleDateString("pt-BR")}
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
                                Excluir transação?
                              </AlertDialogTitle>

                              <AlertDialogDescription>
                                Esta ação não pode ser desfeita. Isso irá
                                excluir permanentemente esta transação.
                              </AlertDialogDescription>
                            </AlertDialogHeader>

                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>

                              <AlertDialogAction
                                onClick={() => handleDelete(transaction.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Excluir
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