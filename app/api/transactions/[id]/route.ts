import { NextRequest, NextResponse } from 'next/server';
import {
  getAuthenticatedSupabase,
  handleApiError,
  NotFoundError,
} from '@/lib/supabase/server-api';

// GET - Buscar transação por ID
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { supabase, user } = await getAuthenticatedSupabase();

    console.log('GET transaction id:', id);
    console.log('Logged user id:', user.id);

    const { data: transaction, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .maybeSingle();

    if (error) {
      console.error('GET transaction error:', error);

      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    if (!transaction) {
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { supabase, user } = await getAuthenticatedSupabase();

    const {
      title,
      description,
      amount,
      type,
      category_id,
      account_id,
      transaction_date,
    } = await req.json();

    const { data, error } = await supabase
      .from('transactions')
      .update({
        title,
        description: description || null,
        amount: amount !== undefined ? Number(amount) : undefined,
        type,
        category_id: category_id || null,
        account_id: account_id || null,
        transaction_date,
      })
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .maybeSingle();

    if (error) {
      console.error('PUT transaction error:', error);

      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    if (!data) {
      throw new NotFoundError('Transaction not found');
    }

    return NextResponse.json({
      message: 'Transaction updated successfully',
      transaction: data,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

// DELETE - Deletar transação
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { supabase, user } = await getAuthenticatedSupabase();

    console.log('DELETE transaction id:', id);
    console.log('Logged user id:', user.id);

    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      console.error('DELETE transaction error:', error);

      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: 'Transaction deleted successfully',
    });
  } catch (error) {
    return handleApiError(error);
  }
}