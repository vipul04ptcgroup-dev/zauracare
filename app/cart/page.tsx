'use client';
import { useCartStore } from '@/context/cart';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCartStore();
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const cartTotal = total();

  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'WELL20') {
      setDiscount(Math.round(cartTotal * 0.2));
      toast.success('Coupon applied! 20% off');
    } else {
      toast.error('Invalid coupon code');
    }
  };

  const shipping = cartTotal >= 499 ? 0 : 99;
  const finalTotal = cartTotal - discount + shipping;

  if (items.length === 0) return (
    <div className="pt-32 pb-16 flex flex-col items-center justify-center text-center px-4">
      <ShoppingBag size={64} className="text-gray-200 dark:text-gray-700 mb-6" />
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Your Cart is Empty</h2>
      <p className="text-gray-500 mb-8">Looks like you haven't added any products yet.</p>
      <Link href="/products" className="btn-primary flex items-center gap-2">Browse Products <ArrowRight size={16} /></Link>
    </div>
  );

  return (
    <div className="pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="py-8 mb-6">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: 'Playfair Display, serif' }}>Shopping Cart</h1>
          <p className="text-gray-500 mt-1">{items.length} item{items.length !== 1 ? 's' : ''}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <div key={item.product.id} className="card p-4 flex gap-4">
                <Link href={`/products/${item.product.id}`} className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-gray-50 dark:bg-gray-900">
                  <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-2">
                    <div>
                      <p className="text-xs text-green-600 mb-1">{item.product.category}</p>
                      <Link href={`/products/${item.product.id}`} className="font-medium text-gray-900 dark:text-white hover:text-green-600 transition-colors line-clamp-2 text-sm">
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-gray-400 mt-1">SKU: {item.product.sku}</p>
                    </div>
                    <button onClick={() => removeItem(item.product.id)} className="text-gray-400 hover:text-red-500 transition-colors shrink-0">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 rounded transition-colors"><Minus size={12} /></button>
                      <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 rounded transition-colors"><Plus size={12} /></button>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900 dark:text-white">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                      {item.quantity > 1 && <p className="text-xs text-gray-400">₹{item.product.price} each</p>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button onClick={() => { clearCart(); toast.success('Cart cleared'); }}
              className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1.5 mt-2 transition-colors">
              <Trash2 size={14} /> Clear all items
            </button>
          </div>

          {/* Summary */}
          <div className="space-y-4">
            <div className="card p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal ({items.reduce((s,i)=>s+i.quantity,0)} items)</span>
                  <span>₹{cartTotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Coupon Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-green-600' : ''}>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                </div>
                {shipping > 0 && <p className="text-xs text-gray-400">Add ₹{499 - cartTotal} more for free shipping</p>}
                <div className="border-t border-gray-100 dark:border-gray-800 pt-3 flex justify-between font-bold text-gray-900 dark:text-white text-base">
                  <span>Total</span>
                  <span>₹{finalTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Coupon */}
            <div className="card p-4">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1.5"><Tag size={14} />Apply Coupon</label>
              <div className="flex gap-2">
                <input value={coupon} onChange={e => setCoupon(e.target.value)} placeholder="Enter code (WELL20)"
                  className="flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
                <button onClick={applyCoupon} className="px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors">Apply</button>
              </div>
            </div>

            <Link href="/checkout" className="btn-primary w-full text-center block">
              Proceed to Checkout →
            </Link>
            <Link href="/products" className="btn-secondary w-full text-center block text-sm">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
