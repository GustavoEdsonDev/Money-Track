import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedSupabase, handleApiError } from '@/lib/supabase/server-api';

// GET - Buscar todos os orçamentos do usuário
export async function GET(req: NextRequest) {
  try {
    const { supabase, user } = await getAuthenticatedSupabase();

    const { data: budgets, error } = await supabase
      .from('budgets')
      .select('*')
      .eq('user_id', user.id)
      .order('year', { ascending: false })
      .order('month', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(budgets);
  } catch (error) {
    return handleApiError(error);
  }
}

// POST - Criar novo orçamento
export async function POST(req: NextRequest) {
  try {
    const { supabase, user } = await getAuthenticatedSupabase();

    const { category_id, amount_limit, month, year } = await req.json();

    if (!category_id || !amount_limit || !month || !year) {
      return NextResponse.json(
        { error: 'Category ID, amount limit, month, and year are required' },
        { status: 400 }
      );
    }

    if (month < 1 || month > 12) {
      return NextResponse.json(
        { error: 'Month must be between 1 and 12' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('budgets')
      .insert({
        user_id: user.id,
        category_id,
        amount_limit: parseFloat(amount_limit),
        month: parseInt(month),
        year: parseInt(year),
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { message: 'Budget created successfully', budget: data },
      { status: 201 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}
