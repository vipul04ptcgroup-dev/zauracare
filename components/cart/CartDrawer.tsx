'use client';
import { useCartStore } from '@/context/cart';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total } = useCartStore();
  const cartTotal = total();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm" onClick={closeCart} />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-gray-950 shadow-2xl z-50 flex flex-col transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-green-600" />
            <h2 className="font-semibold text-gray-900 dark:text-white text-lg">Your Cart</h2>
            <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs font-bold px-2 py-0.5 rounded-full">{items.length}</span>
          </div>
          <button onClick={closeCart} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingBag size={48} className="text-gray-200 dark:text-gray-700" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Your cart is empty</p>
                <p className="text-sm text-gray-500 mt-1">Add some wellness products!</p>
              </div>
              <Link href="/products" onClick={closeCart} className="btn-primary text-sm">
                Browse Products
              </Link>
            </div>
          ) : (
            items.map(item => (
              <div key={item.product.id} className="flex gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-900">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                  <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-gray-900 dark:text-white line-clamp-2 leading-snug">{item.product.name}</p>
                  <p className="text-green-600 font-bold text-sm mt-1">₹{item.product.price}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-lg p-1">
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
                        <Minus size={12} />
                      </button>
                      <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
                        <Plus size={12} />
                      </button>
                    </div>
                    <button onClick={() => removeItem(item.product.id)} className="text-red-400 hover:text-red-600 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-gray-100 dark:border-gray-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
              <span className="text-xl font-bold text-gray-900 dark:text-white">₹{cartTotal.toLocaleString()}</span>
            </div>
            <p className="text-xs text-gray-500 text-center">Taxes & shipping calculated at checkout</p>
            <Link href="/checkout" onClick={closeCart} className="btn-primary w-full text-center block">
              Proceed to Checkout
            </Link>
            <Link href="/cart" onClick={closeCart} className="btn-secondary w-full text-center block text-sm py-2.5">
              View Full Cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
