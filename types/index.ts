export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  images: string[];
  category: string;
  categoryId: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  sku: string;
  ingredients?: string;
  usage?: string;
  benefits?: string[];
  isFeatured: boolean;
  isNew: boolean;
  isBestSeller: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  address?: Address;
  createdAt: string;
  role: 'user' | 'admin';
}

export interface Address {
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  shippingAddress: Address;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  trackingNumber?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  review: string;
  product?: string;
  date: string;
}

export interface FilterOptions {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  sortBy?: 'price-asc' | 'price-desc' | 'rating' | 'newest' | 'popular';
  search?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
