import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedSupabase, handleApiError, NotFoundError } from '@/lib/supabase/server-api';

// GET - Buscar categoria por ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { supabase, user } = await getAuthenticatedSupabase();

    const { data: category, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', params.id)
      .eq('user_id', user.id)
      .single();

    if (error || !category) {
      throw new NotFoundError('Category not found');
    }

    return NextResponse.json(category);
  } catch (error) {
    return handleApiError(error);
  }
}

// PUT - Atualizar categoria
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { supabase, user } = await getAuthenticatedSupabase();
    const { name, type, color, icon } = await req.json();
    const { data, error } = await supabase
      .from('categories')
      .update({
        name,
        type,
        color,
        icon,
      })
      .eq('id', params.id)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { message: 'Category updated successfully', category: data }
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// DELETE - Deletar categoria
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { supabase, user } = await getAuthenticatedSupabase();

    console.log('DELETE category id:', id);
    console.log('Logged user id:', user.id);

    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      console.error('DELETE category error:', error);

      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: 'Category deleted successfully',
    });
  } catch (error) {
    return handleApiError(error);
  }
}