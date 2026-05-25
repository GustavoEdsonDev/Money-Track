'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Banknote, Building2, CreditCard, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { useAccounts, type Account } from '@/hooks/use-accounts';
import { AddAccountForm } from '@/components/accounts/add-account-form';
import { EditAccountForm } from '@/components/accounts/edit-account-form';
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

const accountIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  cash: Banknote,
  bank: Building2,
  credit_card: CreditCard,
  investment: TrendingUp,
};

const accountLabels: Record<string, string> = {
  cash: 'Dinheiro',
  bank: 'Conta Bancária',
  credit_card: 'Cartão de Crédito',
  investment: 'Investimento',
};

export default function AccountsPage() {
  const { accounts, loading, deleteAccount, updateAccount, fetchAccounts } = useAccounts();
  const [showForm, setShowForm] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await deleteAccount(id);
    } catch (error) {
      alert('Falha ao excluir conta');
    } finally {
      setDeletingId(null);
    }
  };

  const handleUpdate = async (id: string, updates: Partial<Account>) => {
    try {
      setUpdatingId(id);
      await updateAccount(id, updates);
      console.log('Conta atualizada');
    } catch (error) {
      console.error('Erro ao atualizar:', error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('Falha ao atualizar conta');
      }
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contas</h1>
          <p className="text-muted-foreground mt-2">Gerencie suas contas bancárias e carteiras em dinheiro</p>
        </div>
        <Button className="gap-2" onClick={() => setShowForm(!showForm)}>
          <Plus className="size-4" />
          {showForm ? 'Cancelar' : 'Nova Conta'}
        </Button>
      </div>

      {/* Add Account Form */}
      {showForm && (
        <AddAccountForm
          onSuccess={() => {
            setShowForm(false);
            fetchAccounts();
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Accounts Grid */}
      {accounts.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {accounts.map((account) => (
            <Card key={account.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
                <div className="flex items-center gap-3">
                  <div>
                    {(() => {
                      const Icon = accountIcons[account.type] || Building2;
                      return <Icon className="size-8" />;
                    })()}
                  </div>
                  <div>
                    <h3 className="font-semibold">{account.name}</h3>
                    <Badge variant="outline" className="mt-1 text-xs">
                      {accountLabels[account.type] || account.type}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-1">
                  <EditAccountForm
                    account={account}
                    updatingId={updatingId}
                    onUpdate={handleUpdate}
                  />
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={deletingId === account.id}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Excluir conta?</AlertDialogTitle>

                        <AlertDialogDescription>
                          Esta ação não pode ser desfeita. Isso irá excluir
                          permanentemente esta conta.
                        </AlertDialogDescription>
                      </AlertDialogHeader>

                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>

                        <AlertDialogAction
                          onClick={() => handleDelete(account.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Excluir
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Saldo Inicial</span>
                    <span className="text-lg font-semibold">
                      R$ {account.initial_balance.toFixed(2)}
                    </span>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground">
                      Criada em {new Date(account.created_at).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {accounts.length === 0 && !loading && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Nenhuma conta ainda. Crie uma para começar!</p>
        </div>
      )}
    </div>
  );
}