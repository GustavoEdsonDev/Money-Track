import { NextRequest, NextResponse } from 'next/server';
import {
  getAuthenticatedSupabase,
  handleApiError,
} from '@/lib/supabase/server-api';

// GET - Buscar todas as transações do usuário
export async function GET(req: NextRequest) {
  try {
    const { supabase, user } = await getAuthenticatedSupabase();

    const { data: transactions, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', user.id)
      .order('transaction_date', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(transactions);
  } catch (error) {
    return handleApiError(error);
  }
}

// POST - Criar nova transação
export async function POST(req: NextRequest) {
  try {
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

    if (!title || !amount || !type || !transaction_date) {
      return NextResponse.json(
        { error: 'Title, amount, type, and transaction_date are required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('transactions')
      .insert({
        user_id: user.id,
        title,
        description: description || null,
        amount: Number(amount),
        type,
        category_id: category_id || null,
        account_id: account_id || null,
        transaction_date,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      {
        message: 'Transaction created successfully',
        transaction: data,
      },
      { status: 201 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}