import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedSupabase, handleApiError } from '@/lib/supabase/server-api';

// GET - Buscar todas as categorias do usuário
export async function GET(req: NextRequest) {
  try {
    const { supabase, user } = await getAuthenticatedSupabase();

    const { data: categories, error } = await supabase
      .from('categories')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(categories);
  } catch (error) {
    return handleApiError(error);
  }
}

// POST - Criar nova categoria
export async function POST(req: NextRequest) {
  try {
    const { supabase, user } = await getAuthenticatedSupabase();

    const { name, type, color, icon } = await req.json();

    if (!name || !type) {
      return NextResponse.json(
        { error: 'Name and type are required' },
        { status: 400 }
      );
    }

    if (!['income', 'expense'].includes(type)) {
      return NextResponse.json(
        { error: 'Type must be either "income" or "expense"' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('categories')
      .insert({
        user_id: user.id,
        name,
        type,
        color: color || '#000000',
        icon: icon || '📁',
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { message: 'Category created successfully', category: data },
      { status: 201 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}
