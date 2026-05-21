import { NextResponse } from 'next/server';
import { createClient } from './server';

export class UnauthorizedError extends Error {
  constructor(message: string = 'Unauthorized') {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

export class NotFoundError extends Error {
  constructor(message: string = 'Not found') {
    super(message);
    this.name = 'NotFoundError';
  }
}

/**
 * Get authenticated Supabase client for API routes
 * Automatically checks user authentication and throws UnauthorizedError if not authenticated
 */
export async function getAuthenticatedSupabase() {
  const supabase = await createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new UnauthorizedError('Unauthorized');
  }

  return { supabase, user };
}

/**
 * Handle API errors and return appropriate response
 */
export function handleApiError(error: unknown) {
  console.error('API Error:', error);

  if (error instanceof UnauthorizedError) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (error instanceof NotFoundError) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  const message = error instanceof Error ? error.message : 'Internal server error';
  return NextResponse.json({ error: message }, { status: 500 });
}
