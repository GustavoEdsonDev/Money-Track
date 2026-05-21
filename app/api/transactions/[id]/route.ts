import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedSupabase, handleApiError, NotFoundError } from '@/lib/supabase/server-api';

// GET - Buscar transação por ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { supabase, user } = await getAuthenticatedSupabase();

    const { data: transaction, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('id', params.id)
      .eq('user_id', user.id)
      .single();

    if (error || !transaction) {
      throw new NotFoundError('Transaction not found');
    }

    return NextResponse.json(transaction);
  } catch (error) {
    return handleApiError(error);
  }
}

// PUT - Atualizar transação
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { supabase, user } = await getAuthenticatedSupabase();

    const { title, description, amount, type, category_id, account_id, transaction_date } = await req.json();

    const { data, error } = await supabase
      .from('transactions')
      .update({
        title,
        description,
        amount: amount ? parseFloat(amount) : undefined,
        type,
        category_id,
        account_id,
        transaction_date,
      })
      .eq('id', params.id)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { message: 'Transaction updated successfully', transaction: data }
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// DELETE - Deletar transação
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { supabase, user } = await getAuthenticatedSupabase();

    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', params.id)
      .eq('user_id', user.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { message: 'Transaction deleted successfully' }
    );
  } catch (error) {
    return handleApiError(error);
  }
}
