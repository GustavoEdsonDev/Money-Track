import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// GET - Buscar todas as transações do usuário
export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();

    // Obter o usuário autenticado
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Buscar transações do usuário
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
    console.error('Get transactions error:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching transactions' },
      { status: 500 }
    );
  }
}

// POST - Criar nova transação
export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();

    // Obter o usuário autenticado
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { title, description, amount, type, category_id, account_id, transaction_date } = await req.json();

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
        description,
        amount: parseFloat(amount),
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
      { message: 'Transaction created successfully', transaction: data },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create transaction error:', error);
    return NextResponse.json(
      { error: 'An error occurred while creating the transaction' },
      { status: 500 }
    );
  }
}
