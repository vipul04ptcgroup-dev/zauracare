import { mockProducts } from '@/data/products';
import { mockCategories, mockOrders, mockUsers } from '@/data/index';
import type { FilterOptions, PaginatedResponse, Product, Category, Order, User } from '@/types';

// Simulate API delay
const delay = (ms = 300) => new Promise(res => setTimeout(res, ms));

// Products
export async function getProducts(filters: FilterOptions = {}): Promise<PaginatedResponse<Product>> {
  await delay();
  let products = [...mockProducts];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    products = products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some(t => t.includes(q))
    );
  }

  if (filters.category) {
    products = products.filter(p => p.categoryId === filters.category);
  }

  if (filters.minPrice !== undefined) {
    products = products.filter(p => p.price >= filters.minPrice!);
  }

  if (filters.maxPrice !== undefined) {
    products = products.filter(p => p.price <= filters.maxPrice!);
  }

  if (filters.rating !== undefined) {
    products = products.filter(p => p.rating >= filters.rating!);
  }

  switch (filters.sortBy) {
    case 'price-asc': products.sort((a, b) => a.price - b.price); break;
    case 'price-desc': products.sort((a, b) => b.price - a.price); break;
    case 'rating': products.sort((a, b) => b.rating - a.rating); break;
    case 'newest': products.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
    case 'popular': products.sort((a, b) => b.reviewCount - a.reviewCount); break;
  }

  const page = filters.page || 1;
  const limit = filters.limit || 8;
  const total = products.length;
  const start = (page - 1) * limit;

  return {
    data: products.slice(start, start + limit),
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getProductById(id: string): Promise<Product | null> {
  await delay();
  return mockProducts.find(p => p.id === id || p.slug === id) || null;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  await delay(200);
  return mockProducts.filter(p => p.isFeatured).slice(0, 4);
}

export async function getBestSellers(): Promise<Product[]> {
  await delay(200);
  return mockProducts.filter(p => p.isBestSeller).slice(0, 4);
}

// Categories
export async function getCategories(): Promise<Category[]> {
  await delay(200);
  return mockCategories;
}

export async function getCategoryById(id: string): Promise<Category | null> {
  await delay(200);
  return mockCategories.find(c => c.id === id || c.slug === id) || null;
}

// Auth
export async function loginUser(email: string, password: string): Promise<{ user: User; token: string } | null> {
  await delay(150);
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as { user: User; token: string };
  } catch {
    return null;
  }
}

export async function logoutUser(): Promise<void> {
  try {
    await fetch('/api/auth/logout', { method: 'POST' });
  } catch {
    // noop: local state logout should still proceed.
  }
}

export async function registerUser(data: { name: string; email: string; password: string }): Promise<{ user: User; token: string }> {
  await delay(600);
  const newUser: User = {
    id: 'u' + Date.now(),
    name: data.name,
    email: data.email,
    role: 'user',
    createdAt: new Date().toISOString(),
  };
  return { user: newUser, token: 'mock-jwt-token-' + newUser.id };
}

export async function getUserProfile(userId: string): Promise<User | null> {
  await delay(200);
  return mockUsers.find(u => u.id === userId) || null;
}

// Orders
export async function getUserOrders(userId: string): Promise<Order[]> {
  await delay(400);
  return mockOrders.filter(o => o.userId === userId);
}

export async function getAllOrders(): Promise<Order[]> {
  await delay(300);
  return mockOrders;
}

export async function createOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> {
  await delay(700);
  return {
    ...orderData,
    id: 'ORD-' + Date.now(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

// Admin stats
export async function getAdminStats() {
  await delay(300);
  return {
    totalRevenue: 284750,
    totalOrders: 1247,
    totalProducts: mockProducts.length,
    totalUsers: mockUsers.length,
    revenueGrowth: 18.5,
    ordersGrowth: 12.3,
    topProducts: mockProducts.slice(0, 5),
    recentOrders: mockOrders,
  };
}
