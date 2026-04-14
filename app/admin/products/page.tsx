'use client';
import { useEffect, useState } from 'react';
import { getProducts } from '@/services/api';
import type { Product } from '@/types';
import Image from 'next/image';
import { Plus, Search, Edit2, Trash2, Star } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts({ limit: 50 }).then(r => { setProducts(r.data); setLoading(false); });
  }, []);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Delete "${name}"?`)) {
      setProducts(prev => prev.filter(p => p.id !== id));
      toast.success('Product deleted (mock)');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: 'Playfair Display, serif' }}>Products</h1>
          <p className="text-sm text-gray-500 mt-0.5">{products.length} products total</p>
        </div>
        <button onClick={() => toast.success('Add product modal would open here')}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors">
          <Plus size={16} /> Add Product
        </button>
      </div>

      <div className="card p-4">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..."
            className="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
              <tr>
                {['Product','Category','Price','Stock','Rating','Status','Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i}><td colSpan={7} className="px-4 py-4"><div className="h-4 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" /></td></tr>
                ))
              ) : filtered.map(product => (
                <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0">
                        <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white line-clamp-1">{product.name}</p>
                        <p className="text-xs text-gray-400 font-mono">{product.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{product.category}</td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">₹{product.price}</p>
                      {product.originalPrice && <p className="text-xs text-gray-400 line-through">₹{product.originalPrice}</p>}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${product.stock > 100 ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300' : product.stock > 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                      {product.stock} units
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      <span className="text-gray-700 dark:text-gray-300">{product.rating}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {product.isFeatured && <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">Featured</span>}
                      {product.isBestSeller && <span className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">Best Seller</span>}
                      {product.isNew && <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded">New</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => toast.success(`Edit "${product.name}" would open modal`)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/30 text-blue-600 transition-colors">
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => handleDelete(product.id, product.name)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 text-red-500 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!loading && filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">No products found for "{search}"</div>
          )}
        </div>
      </div>
    </div>
  );
}
