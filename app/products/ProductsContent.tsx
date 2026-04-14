'use client';
import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { getProducts, getCategories } from '@/services/api';
import type { Product, Category, FilterOptions } from '@/types';
import ProductCard from '@/components/product/ProductCard';

export default function ProductsContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState<FilterOptions>({
    category: searchParams.get('category') || undefined,
    search: searchParams.get('search') || undefined,
    sortBy: (searchParams.get('sort') as FilterOptions['sortBy']) || undefined,
    page: 1,
    limit: 8,
  });

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const res = await getProducts(filters);
    setProducts(res.data);
    setTotal(res.total);
    setTotalPages(res.totalPages);
    setLoading(false);
  }, [filters]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);
  useEffect(() => { getCategories().then(setCategories); }, []);

  const updateFilter = (key: keyof FilterOptions, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
  };

  const clearFilters = () => setFilters({ page: 1, limit: 8 });
  const hasFilters = filters.category || filters.search || filters.minPrice || filters.maxPrice || filters.sortBy;

  return (
    <div className="pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="py-10 border-b border-gray-100 dark:border-gray-800 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
            {filters.category ? categories.find(c => c.id === filters.category)?.name || 'Products' : 'All Products'}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">{total} products found</p>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1 min-w-64 relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={filters.search || ''}
              onChange={e => updateFilter('search', e.target.value || undefined)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <select
            value={filters.sortBy || ''}
            onChange={e => updateFilter('sortBy', e.target.value || undefined)}
            className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Sort by</option>
            <option value="popular">Most Popular</option>
            <option value="rating">Top Rated</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest First</option>
          </select>
          <button onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm hover:border-green-500 transition-colors">
            <SlidersHorizontal size={16} /> Filters
            <ChevronDown size={14} className={showFilters ? 'rotate-180' : ''} style={{ transition: 'transform 0.2s' }} />
          </button>
          {hasFilters && (
            <button onClick={clearFilters} className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950 transition-colors">
              <X size={14} /> Clear
            </button>
          )}
        </div>

        {showFilters && (
          <div className="card p-6 mb-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Category</label>
              <select value={filters.category || ''} onChange={e => updateFilter('category', e.target.value || undefined)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="">All Categories</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Min Price (₹)</label>
              <input type="number" placeholder="0" value={filters.minPrice || ''}
                onChange={e => updateFilter('minPrice', e.target.value ? Number(e.target.value) : undefined)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Max Price (₹)</label>
              <input type="number" placeholder="5000" value={filters.maxPrice || ''}
                onChange={e => updateFilter('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Min Rating</label>
              <select value={filters.rating || ''} onChange={e => updateFilter('rating', e.target.value ? Number(e.target.value) : undefined)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="">Any Rating</option>
                <option value="4">4★ & above</option>
                <option value="4.5">4.5★ & above</option>
              </select>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-8">
          <button onClick={() => updateFilter('category', undefined)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${!filters.category ? 'bg-green-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-green-50 dark:hover:bg-green-950'}`}>
            All
          </button>
          {categories.map(c => (
            <button key={c.id} onClick={() => updateFilter('category', c.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${filters.category === c.id ? 'bg-green-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-green-50 dark:hover:bg-green-950'}`}>
              {c.name}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="card overflow-hidden">
                <div className="aspect-square bg-gray-100 dark:bg-gray-800 animate-pulse" />
                <div className="p-4 space-y-3">
                  <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-1/3 animate-pulse" />
                  <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
                  <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-2/3 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg mb-2">No products found</p>
            <button onClick={clearFilters} className="btn-primary text-sm">Clear Filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <button disabled={filters.page === 1} onClick={() => updateFilter('page', (filters.page || 1) - 1)}
              className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              Previous
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button key={i} onClick={() => updateFilter('page', i + 1)}
                className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${(filters.page || 1) === i + 1 ? 'bg-green-600 text-white' : 'border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                {i + 1}
              </button>
            ))}
            <button disabled={filters.page === totalPages} onClick={() => updateFilter('page', (filters.page || 1) + 1)}
              className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
