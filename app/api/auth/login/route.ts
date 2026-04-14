import { NextResponse } from 'next/server';
import { authenticateUser, isAdminAuthConfigured } from '@/lib/auth';
import { createSessionToken, SESSION_COOKIE_NAME } from '@/lib/session';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string; password?: string };
    const email = body.email?.trim() || '';
    const password = body.password || '';

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
    }

    const authenticated = authenticateUser(email, password);
    if (!authenticated) {
      return NextResponse.json({ message: 'Invalid email or password.' }, { status: 401 });
    }

    if (authenticated.user.role === 'admin' && !isAdminAuthConfigured()) {
      return NextResponse.json(
        { message: 'Admin login is disabled until ADMIN_PASSWORD is configured.' },
        { status: 503 }
      );
    }

    const sessionToken = createSessionToken(authenticated.user);
    if (!sessionToken) {
      return NextResponse.json(
        { message: 'Session is not configured. Set SESSION_SECRET (min 32 chars).' },
        { status: 503 }
      );
    }

    const response = NextResponse.json({
      user: authenticated.user,
      token: `session-${authenticated.user.id}`,
    });

    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 8,
    });

    return response;
  } catch {
    return NextResponse.json({ message: 'Unable to process login request.' }, { status: 400 });
  }
}
