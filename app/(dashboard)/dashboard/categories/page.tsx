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
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useCategories, type Category } from "@/hooks/use-categories";
import { AddCategoryForm } from "@/components/categories/add-category-form";
import { EditCategoryForm } from "@/components/categories/edit-category-form";
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

export default function CategoriesPage() {
  const { categories, loading, deleteCategory, updateCategory, fetchCategories } =
    useCategories();
  const [showForm, setShowForm] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await deleteCategory(id);
    } catch (error) {
      alert("Failed to delete category");
    } finally {
      setDeletingId(null);
    }
  };

  const handleUpdate = async (id: string, updates: Partial<Category>) => {
    try {
      setUpdatingId(id);
      await updateCategory(id, updates);
      console.log("Categoria atualizada");
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Failed to update category");
      }
    } finally {
      setUpdatingId(null);
    }
  };

  const expenseCategories = categories.filter((c) => c.type === "expense");
  const incomeCategories = categories.filter((c) => c.type === "income");

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground mt-2">
            Manage your spending and income categories
          </p>
        </div>
        <Button className="gap-2" onClick={() => setShowForm(!showForm)}>
          <Plus className="size-4" />
          {showForm ? "Cancel" : "New Category"}
        </Button>
      </div>

      {/* Add Category Form */}
      {showForm && (
        <AddCategoryForm
          onSuccess={() => {
            setShowForm(false);
            fetchCategories();
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Expense Categories */}
      {expenseCategories.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Expense Categories</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {expenseCategories.map((category) => (
              <Card
                key={category.id}
                className="hover:shadow-lg transition-shadow"
              >
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
                      <Badge variant="outline" className="mt-1 text-xs">
                        Expense
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <EditCategoryForm
                      category={category}
                      updatingId={updatingId}
                      onUpdate={handleUpdate}
                    />
                   <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={deletingId === category.id}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Category?</AlertDialogTitle>

                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete this Category.
                        </AlertDialogDescription>
                      </AlertDialogHeader>

                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>

                        <AlertDialogAction
                          onClick={() => handleDelete(category.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div
                    className="size-4 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Income Categories */}
      {incomeCategories.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Income Categories</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {incomeCategories.map((category) => (
              <Card
                key={category.id}
                className="hover:shadow-lg transition-shadow"
              >
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
                      <Badge
                        variant="outline"
                        className="mt-1 text-xs bg-green-100 text-green-800"
                      >
                        Income
                      </Badge>
                    </div>
                  </div>

                  <div className="flex gap-1">
                    <EditCategoryForm
                      category={category}
                      updatingId={updatingId}
                      onUpdate={handleUpdate}
                    />
                    <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={deletingId === category.id}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Category?</AlertDialogTitle>

                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete this Category.
                        </AlertDialogDescription>
                      </AlertDialogHeader>

                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>

                        <AlertDialogAction
                          onClick={() => handleDelete(category.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  {/* <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(category.id)}
                    disabled={deletingId === category.id}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="size-4" />
                  </Button> */}
                  </div>
                </CardHeader>
                <CardContent>
                  <div
                    className="size-4 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {categories.length === 0 && !loading && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            No categories yet. Create one to get started!
          </p>
        </div>
      )}
    </div>
  );
}
