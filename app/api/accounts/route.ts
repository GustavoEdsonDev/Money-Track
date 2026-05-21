import { NextResponse } from 'next/server';
import { getAuthenticatedSupabase, handleApiError } from '@/lib/supabase/server-api';

export async function GET() {
  try {
    const { supabase, user } = await getAuthenticatedSupabase();

    const { data, error } = await supabase
      .from('accounts')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const { supabase, user } = await getAuthenticatedSupabase();

    const { name, type, initial_balance } = await request.json();

    if (!name || !type) {
      return NextResponse.json(
        { error: 'Name and type are required' },
        { status: 400 }
      );
    }

    const validTypes = ['cash', 'bank', 'credit_card', 'investment'];
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { error: 'Invalid account type' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('accounts')
      .insert({
        user_id: user.id,
        name,
        type,
        initial_balance: initial_balance || 0,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
