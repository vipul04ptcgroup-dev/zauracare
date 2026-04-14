import { createHmac, timingSafeEqual } from 'node:crypto';
import type { User } from '@/types';

export const SESSION_COOKIE_NAME = 'zauracare_session';
const SESSION_TTL_SECONDS = 60 * 60 * 8; // 8 hours
const DEV_FALLBACK_SECRET = 'dev-only-session-secret-change-me-please';

type SessionPayload = {
  sub: string;
  role: User['role'];
  exp: number;
};

function getSessionSecret() {
  if (process.env.SESSION_SECRET && process.env.SESSION_SECRET.trim().length >= 32) {
    return process.env.SESSION_SECRET;
  }

  if (process.env.NODE_ENV !== 'production') {
    return DEV_FALLBACK_SECRET;
  }

  return null;
}

function sign(input: string, secret: string) {
  return createHmac('sha256', secret).update(input).digest('base64url');
}

function encodePayload(payload: SessionPayload) {
  return Buffer.from(JSON.stringify(payload)).toString('base64url');
}

function decodePayload(encoded: string): SessionPayload | null {
  try {
    const parsed = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8')) as SessionPayload;
    if (!parsed?.sub || !parsed?.role || !parsed?.exp) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function createSessionToken(user: User) {
  const secret = getSessionSecret();
  if (!secret) {
    return null;
  }

  const payload: SessionPayload = {
    sub: user.id,
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  };
  const encodedPayload = encodePayload(payload);
  const signature = sign(encodedPayload, secret);
  return `${encodedPayload}.${signature}`;
}

export function verifySessionToken(token: string | undefined | null) {
  if (!token) {
    return null;
  }

  const secret = getSessionSecret();
  if (!secret) {
    return null;
  }

  const [encodedPayload, signature] = token.split('.');
  if (!encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = sign(encodedPayload, secret);
  const receivedBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (receivedBuffer.length !== expectedBuffer.length) {
    return null;
  }

  if (!timingSafeEqual(receivedBuffer, expectedBuffer)) {
    return null;
  }

  const payload = decodePayload(encodedPayload);
  if (!payload) {
    return null;
  }

  if (payload.exp < Math.floor(Date.now() / 1000)) {
    return null;
  }

  return payload;
}
