'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/context/auth';
import { getUserOrders } from '@/services/api';
import type { Order } from '@/types';
import Link from 'next/link';
import { User, Package, MapPin, LogOut, ChevronRight, Clock, CheckCircle, Truck, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const statusConfig = {
  pending: { label: 'Pending', icon: Clock, color: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-950/30' },
  confirmed: { label: 'Confirmed', icon: CheckCircle, color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/30' },
  processing: { label: 'Processing', icon: Clock, color: 'text-purple-600 bg-purple-50 dark:bg-purple-950/30' },
  shipped: { label: 'Shipped', icon: Truck, color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/30' },
  delivered: { label: 'Delivered', icon: CheckCircle, color: 'text-green-600 bg-green-50 dark:bg-green-950/30' },
  cancelled: { label: 'Cancelled', icon: XCircle, color: 'text-red-600 bg-red-50 dark:bg-red-950/30' },
};

export default function ProfilePage() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<'profile' | 'orders'>('profile');

  useEffect(() => {
    if (!isAuthenticated) { router.push('/auth/login'); return; }
    if (user) getUserOrders(user.id).then(setOrders);
  }, [isAuthenticated, user, router]);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    router.push('/');
  };

  if (!user) return null;

  return (
    <div className="pt-20 pb-16">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: 'Playfair Display, serif' }}>My Account</h1>
            <p className="text-gray-500 text-sm mt-1">Welcome back, {user.name}</p>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600 border border-red-200 hover:border-red-300 px-4 py-2 rounded-lg transition-all">
            <LogOut size={14} /> Sign Out
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-8">
          {[{id:'profile',label:'Profile',icon:User},{id:'orders',label:'My Orders',icon:Package}].map(tab=>(
            <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all ${activeTab===tab.id?'border-b-2 border-green-600 text-green-600':'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}>
              <tab.icon size={15}/>{tab.label}
              {tab.id==='orders'&&orders.length>0&&<span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs px-1.5 py-0.5 rounded-full">{orders.length}</span>}
            </button>
          ))}
        </div>

        {activeTab === 'profile' && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center text-2xl font-bold text-green-600">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{user.name}</h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full mt-1 inline-block ${user.role==='admin'?'bg-purple-100 text-purple-700':'bg-green-100 text-green-700'}`}>
                    {user.role === 'admin' ? 'Administrator' : 'Member'}
                  </span>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                {user.phone && <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400"><span className="font-medium w-16">Phone</span>{user.phone}</div>}
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400"><span className="font-medium w-16">Email</span>{user.email}</div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400"><span className="font-medium w-16">Member</span>since {new Date(user.createdAt).getFullYear()}</div>
              </div>
              {user.role === 'admin' && (
                <Link href="/admin/dashboard" className="btn-primary w-full text-center block mt-6 text-sm">Go to Admin Panel →</Link>
              )}
            </div>

            {user.address && (
              <div className="card p-6">
                <div className="flex items-center gap-2 mb-4"><MapPin size={16} className="text-green-600"/><h3 className="font-semibold text-gray-900 dark:text-white">Saved Address</h3></div>
                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <p>{user.address.street}</p>
                  <p>{user.address.city}, {user.address.state} {user.address.pincode}</p>
                  <p>{user.address.country}</p>
                </div>
              </div>
            )}

            <div className="card p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Stats</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div><p className="text-2xl font-bold text-green-600">{orders.length}</p><p className="text-xs text-gray-500 mt-0.5">Orders</p></div>
                <div><p className="text-2xl font-bold text-green-600">{orders.filter(o=>o.status==='delivered').length}</p><p className="text-xs text-gray-500 mt-0.5">Delivered</p></div>
                <div><p className="text-2xl font-bold text-green-600">₹{orders.reduce((s,o)=>s+o.total,0).toLocaleString()}</p><p className="text-xs text-gray-500 mt-0.5">Spent</p></div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="text-center py-16">
                <Package size={48} className="text-gray-200 dark:text-gray-700 mx-auto mb-4"/>
                <p className="text-gray-500 mb-4">No orders yet</p>
                <Link href="/products" className="btn-primary">Shop Now</Link>
              </div>
            ) : orders.map(order => {
              const sc = statusConfig[order.status];
              const StatusIcon = sc.icon;
              return (
                <div key={order.id} className="card p-5">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                    <div>
                      <p className="font-mono text-sm font-semibold text-gray-900 dark:text-white">{order.id}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{new Date(order.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <span className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full ${sc.color}`}>
                      <StatusIcon size={12}/>{sc.label}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 items-center justify-between">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <p>Payment: <span className="font-medium text-gray-900 dark:text-white">{order.paymentMethod}</span></p>
                      {order.trackingNumber && <p className="mt-0.5">Tracking: <span className="font-mono text-green-600">{order.trackingNumber}</span></p>}
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900 dark:text-white">₹{order.total.toLocaleString()}</p>
                      <p className={`text-xs font-medium mt-0.5 ${order.paymentStatus==='paid'?'text-green-600':'text-red-500'}`}>{order.paymentStatus}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
