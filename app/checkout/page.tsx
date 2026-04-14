'use client';
import { useState } from 'react';
import { useCartStore } from '@/context/cart';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CreditCard, Smartphone, Building2, CheckCircle, Lock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { createOrder } from '@/services/api';
import { useAuthStore } from '@/context/auth';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(10, 'Valid phone required'),
  street: z.string().min(5, 'Address required'),
  city: z.string().min(2, 'City required'),
  state: z.string().min(2, 'State required'),
  pincode: z.string().length(6, 'Valid 6-digit pincode required'),
});

type FormData = z.infer<typeof schema>;

const PAYMENT_METHODS = [
  { id: 'upi', label: 'UPI', icon: Smartphone, desc: 'Pay via PhonePe, GPay, Paytm' },
  { id: 'card', label: 'Credit/Debit Card', icon: CreditCard, desc: 'Visa, Mastercard, Rupay' },
  { id: 'netbanking', label: 'Net Banking', icon: Building2, desc: 'All major banks supported' },
];

export default function CheckoutPage() {
  const { items, total, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [step, setStep] = useState<'address' | 'payment' | 'success'>('address');
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState('');
  const checkoutDisabled = true;

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
    },
  });

  const cartTotal = total();
  const shipping = cartTotal >= 499 ? 0 : 99;
  const finalTotal = cartTotal + shipping;

  const onSubmitAddress = handleSubmit(() => setStep('payment'));

  const handlePlaceOrder = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    const order = await createOrder({
      userId: user?.id || 'guest',
      items,
      total: finalTotal,
      status: 'confirmed',
      shippingAddress: { street: 'â€”', city: 'â€”', state: 'â€”', pincode: 'â€”', country: 'India' },
      paymentMethod,
      paymentStatus: 'paid',
    });
    setOrderId(order.id);
    clearCart();
    setStep('success');
    setLoading(false);
  };

  if (items.length === 0 && step !== 'success') {
    return (
      <div className="pt-32 text-center">
        <p className="text-gray-500 mb-4">No items in cart</p>
        <Link href="/products" className="btn-primary">Shop Now</Link>
      </div>
    );
  }

  if (step === 'success') return (
    <div className="pt-32 pb-16 flex flex-col items-center justify-center text-center px-4">
      <div className="w-20 h-20 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mb-6">
        <CheckCircle size={40} className="text-green-600" />
      </div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Order Placed!</h2>
      <p className="text-gray-500 mb-2">Thank you for your purchase.</p>
      <p className="text-sm font-mono bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg mb-8">{orderId}</p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link href="/profile" className="btn-primary">View Orders</Link>
        <Link href="/products" className="btn-secondary">Continue Shopping</Link>
      </div>
    </div>
  );

  return (
    <div className="pt-20 pb-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="py-8 mb-6">
          <Link href="/cart" className="flex items-center gap-2 text-sm text-gray-500 hover:text-green-600 mb-4 transition-colors"><ArrowLeft size={14} />Back to Cart</Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: 'Playfair Display, serif' }}>Checkout</h1>
          {/* Steps */}
          <div className="flex items-center gap-3 mt-4">
            {(['address','payment'] as const).map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step === s || (s === 'address' && step === 'payment') ? 'bg-green-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'}`}>{i+1}</div>
                <span className={`text-sm capitalize ${step === s ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-400'}`}>{s}</span>
                {i === 0 && <span className="text-gray-200 dark:text-gray-700 mx-1">â†’</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            {step === 'address' && (
              <form onSubmit={onSubmitAddress} className="card p-6 space-y-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Shipping Address</h3>
                {[
                  { name: 'name', label: 'Full Name', placeholder: 'Priya Sharma' },
                  { name: 'email', label: 'Email Address', placeholder: 'ptcvirar@gmail.com' },
                  { name: 'phone', label: 'Phone Number', placeholder: '+91 91208 79879' },
                  { name: 'street', label: 'Street Address', placeholder: '123 Wellness Street, Apt 4B' },
                ].map(f => (
                  <div key={f.name}>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">{f.label}</label>
                    <input {...register(f.name as keyof FormData)} placeholder={f.placeholder}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
                    {errors[f.name as keyof FormData] && <p className="text-red-500 text-xs mt-1">{errors[f.name as keyof FormData]?.message}</p>}
                  </div>
                ))}
                <div className="grid grid-cols-3 gap-4">
                  {[{name:'city',label:'City',placeholder:'Mumbai'},{name:'state',label:'State',placeholder:'Maharashtra'},{name:'pincode',label:'Pincode',placeholder:'400001'}].map(f=>(
                    <div key={f.name}>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">{f.label}</label>
                      <input {...register(f.name as keyof FormData)} placeholder={f.placeholder}
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"/>
                      {errors[f.name as keyof FormData] && <p className="text-red-500 text-xs mt-1">{errors[f.name as keyof FormData]?.message}</p>}
                    </div>
                  ))}
                </div>
                <button type="submit" className="btn-primary w-full mt-2">Continue to Payment â†’</button>
              </form>
            )}

            {step === 'payment' && (
              <div className="card p-6 space-y-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Payment Method</h3>
                <div className="space-y-3">
                  {PAYMENT_METHODS.map(pm => (
                    <label key={pm.id} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === pm.id ? 'border-green-600 bg-green-50 dark:bg-green-950/30' : 'border-gray-100 dark:border-gray-800 hover:border-gray-300'}`}>
                      <input type="radio" name="payment" value={pm.id} checked={paymentMethod === pm.id} onChange={() => setPaymentMethod(pm.id)} className="hidden" />
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${paymentMethod === pm.id ? 'bg-green-100 dark:bg-green-900' : 'bg-gray-100 dark:bg-gray-800'}`}>
                        <pm.icon size={18} className={paymentMethod === pm.id ? 'text-green-600' : 'text-gray-500'} />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-gray-900 dark:text-white">{pm.label}</p>
                        <p className="text-xs text-gray-500">{pm.desc}</p>
                      </div>
                      {paymentMethod === pm.id && <CheckCircle size={18} className="text-green-600 ml-auto" />}
                    </label>
                  ))}
                </div>
                <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-4 text-sm text-amber-700 dark:text-amber-300">
                  This is a demo site. Checkout is disabled. For help contact +91 91208 79879 or ptcvirar@gmail.com.
                </div>
                <div className="flex gap-3 mt-4">
                  <button onClick={() => setStep('address')} className="btn-secondary flex-1">â† Back</button>
                  <button onClick={handlePlaceOrder} disabled={loading || checkoutDisabled} className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
                    {loading ? <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"/> : <Lock size={16} />}
                    {loading ? 'Processing...' : checkoutDisabled ? 'Checkout Disabled (Demo)' : `Pay â‚¹${finalTotal.toLocaleString()}`}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Summary */}
          <div>
            <div className="card p-5 sticky top-24">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h3>
              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {items.map(item => (
                  <div key={item.product.id} className="flex gap-3 items-center">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-gray-50 dark:bg-gray-900">
                      <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">{item.quantity}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-900 dark:text-white line-clamp-2">{item.product.name}</p>
                    </div>
                    <p className="text-xs font-bold shrink-0">â‚¹{(item.product.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 dark:border-gray-800 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>â‚¹{cartTotal.toLocaleString()}</span></div>
                <div className="flex justify-between text-gray-500"><span>Shipping</span><span className={shipping===0?'text-green-600':''}>{shipping===0?'FREE':`â‚¹${shipping}`}</span></div>
                <div className="flex justify-between font-bold text-gray-900 dark:text-white text-base pt-2 border-t border-gray-100 dark:border-gray-800"><span>Total</span><span>â‚¹{finalTotal.toLocaleString()}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

