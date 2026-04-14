'use client';
import { useEffect, useState } from 'react';
import { getAllOrders } from '@/services/api';
import type { Order } from '@/types';
import { Search } from 'lucide-react';
import toast from 'react-hot-toast';

const STATUS_OPTIONS = ['pending','confirmed','processing','shipped','delivered','cancelled'] as const;
const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
  confirmed: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  processing: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  shipped: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
  delivered: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllOrders().then(o => { setOrders(o); setLoading(false); });
  }, []);

  const filtered = orders.filter(o =>
    (o.id.toLowerCase().includes(search.toLowerCase()) || o.userId.includes(search)) &&
    (!statusFilter || o.status === statusFilter)
  );

  const updateStatus = (id: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    toast.success(`Order ${id} updated to ${status}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: 'Playfair Display, serif' }}>Orders</h1>
        <p className="text-sm text-gray-500 mt-0.5">{orders.length} orders total</p>
      </div>

      <div className="card p-4 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by order ID..."
            className="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
          <option value="">All Statuses</option>
          {STATUS_OPTIONS.map(s => <option key={s} value={s} className="capitalize">{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
              <tr>
                {['Order ID','Date','Customer','Amount','Payment','Status','Update Status'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {loading ? (
                [...Array(3)].map((_, i) => <tr key={i}><td colSpan={7} className="px-4 py-4"><div className="h-4 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" /></td></tr>)
              ) : filtered.map(order => (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-gray-900 dark:text-white font-semibold">{order.id}</td>
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{new Date(order.createdAt).toLocaleDateString('en-IN')}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400 text-xs">{order.userId}</td>
                  <td className="px-4 py-3 font-bold text-gray-900 dark:text-white">₹{order.total.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">{order.paymentMethod}</p>
                      <span className={`text-xs font-medium ${order.paymentStatus==='paid'?'text-green-600':'text-red-500'}`}>{order.paymentStatus}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${statusColors[order.status]}`}>{order.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <select value={order.status} onChange={e => updateStatus(order.id, e.target.value as Order['status'])}
                      className="text-xs px-2 py-1.5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500">
                      {STATUS_OPTIONS.map(s => <option key={s} value={s} className="capitalize">{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!loading && filtered.length === 0 && <div className="text-center py-12 text-gray-400">No orders found</div>}
        </div>
      </div>
    </div>
  );
}
