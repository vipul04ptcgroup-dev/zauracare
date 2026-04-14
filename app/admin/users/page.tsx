'use client';
import { useState } from 'react';
import { mockUsers } from '@/data/index';
import type { User } from '@/types';
import { Search, Shield, User as UserIcon } from 'lucide-react';

export default function AdminUsersPage() {
  const [users] = useState<User[]>(mockUsers);
  const [search, setSearch] = useState('');

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: 'Playfair Display, serif' }}>Users</h1>
        <p className="text-sm text-gray-500 mt-0.5">{users.length} registered users</p>
      </div>

      <div className="card p-4">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..."
            className="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
        </div>
      </div>

      <div className="grid gap-4">
        {filtered.map(user => (
          <div key={user.id} className="card p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center text-lg font-bold text-green-600 shrink-0">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-semibold text-gray-900 dark:text-white">{user.name}</p>
                <span className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${user.role==='admin'?'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300':'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'}`}>
                  {user.role==='admin'?<Shield size={10}/>:<UserIcon size={10}/>}{user.role}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-0.5">{user.email}</p>
              {user.phone && <p className="text-xs text-gray-400 mt-0.5">{user.phone}</p>}
            </div>
            <div className="text-right text-sm text-gray-400 shrink-0">
              <p>Joined</p>
              <p className="font-medium text-gray-700 dark:text-gray-300">{new Date(user.createdAt).getFullYear()}</p>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div className="text-center py-12 text-gray-400">No users found</div>}
      </div>
    </div>
  );
}
