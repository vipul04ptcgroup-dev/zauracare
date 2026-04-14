import { mockUsers } from '@/data/index';
import type { User } from '@/types';

type AuthenticatedUser = {
  user: User;
};

const DEFAULT_ADMIN_EMAIL = 'ptcvirar@gmail.com';
const DEFAULT_DEMO_EMAIL = 'ptcvirar@gmail.com';
const DEFAULT_USER_PASSWORD = 'User@123';

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function getExpectedAdminPassword(email: string) {
  const adminEmail = normalizeEmail(process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL);
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (email === adminEmail) {
    return adminPassword || null;
  }

  return null;
}

export function authenticateUser(email: string, password: string): AuthenticatedUser | null {
  const normalizedEmail = normalizeEmail(email);
  const demoUserPassword = process.env.DEMO_USER_PASSWORD || DEFAULT_USER_PASSWORD;
  const demoUserEmail = normalizeEmail(process.env.DEMO_USER_EMAIL || DEFAULT_DEMO_EMAIL);
  const adminEmail = normalizeEmail(process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL);
  const user = mockUsers.find((candidate) => normalizeEmail(candidate.email) === normalizedEmail);

  const expectedAdminPassword = getExpectedAdminPassword(normalizedEmail);
  if (expectedAdminPassword && password === expectedAdminPassword) {

    const adminUser =
      user ||
      mockUsers.find((candidate) => candidate.role === 'admin') ||
      {
        id: 'u-admin',
        name: 'Admin User',
        email: process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL,
        role: 'admin',
        createdAt: new Date().toISOString(),
      };

    return { user: adminUser };
  }

  if (normalizedEmail === demoUserEmail || normalizedEmail === adminEmail) {
    if (password !== demoUserPassword) {
      return null;
    }

    return {
      user: {
        id: 'u-demo',
        name: 'Demo User',
        email: process.env.DEMO_USER_EMAIL || DEFAULT_DEMO_EMAIL,
        role: 'user',
        createdAt: new Date().toISOString(),
      },
    };
  }

  if (!user || user.role === 'admin') {
    return null;
  }

  if (password !== demoUserPassword) {
    return null;
  }

  return { user };
}

export function isAdminAuthConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD && process.env.ADMIN_PASSWORD.trim().length >= 8);
}
