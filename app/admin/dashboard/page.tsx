'use client';
import { useEffect, useState } from 'react';
import { getAdminStats } from '@/services/api';
import { TrendingUp, Package, ShoppingBag, Users, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminStats().then(s => { setStats(s); setLoading(false); });
  }, []);

  const statCards = stats ? [
    { label: 'Total Revenue', value: `₹${stats.totalRevenue.toLocaleString()}`, change: stats.revenueGrowth, icon: TrendingUp, color: 'bg-green-100 dark:bg-green-900/40 text-green-600' },
    { label: 'Total Orders', value: stats.totalOrders.toLocaleString(), change: stats.ordersGrowth, icon: ShoppingBag, color: 'bg-blue-100 dark:bg-blue-900/40 text-blue-600' },
    { label: 'Products', value: stats.totalProducts, change: null, icon: Package, color: 'bg-purple-100 dark:bg-purple-900/40 text-purple-600' },
    { label: 'Users', value: stats.totalUsers, change: null, icon: Users, color: 'bg-amber-100 dark:bg-amber-900/40 text-amber-600' },
  ] : [];

  if (loading) return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => <div key={i} className="card p-6 h-28 animate-pulse bg-gray-50 dark:bg-gray-800" />)}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: 'Playfair Display, serif' }}>Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Overview of your store performance</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(card => (
          <div key={card.label} className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.color}`}>
                <card.icon size={18} />
              </div>
              {card.change !== null && (
                <div className={`flex items-center gap-1 text-xs font-medium ${card.change >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {card.change >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {Math.abs(card.change)}%
                </div>
              )}
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{card.value}</p>
            <p className="text-sm text-gray-500 mt-0.5">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="card p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Recent Orders</h3>
          <div className="space-y-3">
            {stats?.recentOrders.map((order: any) => (
              <div key={order.id} className="flex items-center justify-between py-2 border-b border-gray-50 dark:border-gray-800 last:border-0">
                <div>
                  <p className="text-sm font-mono font-medium text-gray-900 dark:text-white">{order.id}</p>
                  <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString('en-IN')}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">₹{order.total.toLocaleString()}</p>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                    order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>{order.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="card p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Top Products</h3>
          <div className="space-y-3">
            {stats?.topProducts.map((product: any, i: number) => (
              <div key={product.id} className="flex items-center gap-3">
                <span className="text-sm font-bold text-gray-400 w-5">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{product.name}</p>
                  <p className="text-xs text-gray-400">{product.reviewCount} reviews · ★{product.rating}</p>
                </div>
                <p className="text-sm font-bold text-gray-900 dark:text-white shrink-0">₹{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
