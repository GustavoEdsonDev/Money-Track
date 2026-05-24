import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedSupabase, handleApiError, NotFoundError } from '@/lib/supabase/server-api';

// GET - Buscar orçamento por ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { supabase, user } = await getAuthenticatedSupabase();

    const { data: budget, error } = await supabase
      .from('budgets')
      .select('*')
      .eq('id', params.id)
      .eq('user_id', user.id)
      .single();

    if (error || !budget) {
      throw new NotFoundError('Budget not found');
    }

    return NextResponse.json(budget);
  } catch (error) {
    return handleApiError(error);
  }
}

// PUT - Atualizar orçamento
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { supabase, user } = await getAuthenticatedSupabase();

    const { data: existingBudget } = await supabase
      .from('budgets')
      .select('id')
      .eq('id', params.id)
      .eq('user_id', user.id)
      .single();

    if (!existingBudget) {
      throw new NotFoundError('Budget not found');
    }

    const updates = await req.json();

    const { data, error } = await supabase
      .from('budgets')
      .update(updates)
      .eq('id', params.id)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { message: 'Budget updated successfully', budget: data }
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// DELETE - Deletar orçamento
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { supabase, user } = await getAuthenticatedSupabase();

    console.log('DELETE budget id:', id);
    console.log('Logged user id:', user.id);

    const { error } = await supabase
      .from('budgets')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      console.error('DELETE budget error:', error);

      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: 'Budgets deleted successfully',
    });
  } catch (error) {
    return handleApiError(error);
  }
}