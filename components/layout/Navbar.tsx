'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { User, Menu, X, Search, Megaphone } from 'lucide-react';
import { useAuthStore } from '@/context/auth';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const { isAuthenticated } = useAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 dark:bg-gray-950 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-gray-800">
      <div className="bg-green-600 text-white text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-2 text-center">
          <Megaphone size={14} />
          <span>We will start selling products soon. For now, please send us an enquiry.</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Zauracare" width={160} height={60} className="h-14 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-950/30 rounded-lg transition-all">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link href="/products" className="hidden sm:flex items-center justify-center w-9 h-9 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
            <Search size={18} />
          </Link>
          <Link href={isAuthenticated ? '/profile' : '/auth/login'}
            className="hidden sm:flex items-center justify-center w-9 h-9 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
            <User size={18} />
          </Link>

          <Link href="/contact" className="hidden sm:inline-flex items-center justify-center rounded-lg bg-green-600 px-3 py-2 text-xs font-semibold text-white hover:bg-green-700 transition-all">
            Enquiry
          </Link>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 px-4 py-4 space-y-1">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-950/30 rounded-lg transition-all">
              {link.label}
            </Link>
          ))}
          <Link href={isAuthenticated ? '/profile' : '/auth/login'} onClick={() => setMobileOpen(false)}
            className="block px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-950/30 rounded-lg transition-all">
            {isAuthenticated ? 'My Account' : 'Login / Register'}
          </Link>
          <Link href="/contact" onClick={() => setMobileOpen(false)}
            className="block px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-950/30 rounded-lg transition-all">
            Enquiry
          </Link>
        </div>
      )}
    </header>
  );
}
