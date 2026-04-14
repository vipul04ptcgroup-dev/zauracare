'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
import { registerUser } from '@/services/api';
import { useAuthStore } from '@/context/auth';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine(d => d.password === d.confirmPassword, { message: 'Passwords do not match', path: ['confirmPassword'] });

type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const result = await registerUser({ name: data.name, email: data.email, password: data.password });
    login(result.user, result.token);
    toast.success(`Welcome to Zauracare, ${result.user.name}!`);
    router.push('/profile');
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Image src="/logo.png" alt="Zauracare" width={160} height={50} className="h-12 w-auto mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Join Zauracare</h1>
          <p className="text-gray-500">Create your wellness account</p>
        </div>

        <div className="card p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {[
              { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Priya Sharma' },
              { name: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com' },
            ].map(f => (
              <div key={f.name}>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">{f.label}</label>
                <input {...register(f.name as keyof FormData)} type={f.type} placeholder={f.placeholder}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
                {errors[f.name as keyof FormData] && <p className="text-red-500 text-xs mt-1">{errors[f.name as keyof FormData]?.message}</p>}
              </div>
            ))}
            {[
              { name: 'password', label: 'Password' },
              { name: 'confirmPassword', label: 'Confirm Password' },
            ].map(f => (
              <div key={f.name}>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">{f.label}</label>
                <div className="relative">
                  <input {...register(f.name as keyof FormData)} type={showPass ? 'text' : 'password'} placeholder="••••••••"
                    className="w-full px-4 py-3 pr-11 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors[f.name as keyof FormData] && <p className="text-red-500 text-xs mt-1">{errors[f.name as keyof FormData]?.message}</p>}
              </div>
            ))}
            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
              {loading ? <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> : <UserPlus size={16} />}
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-green-600 hover:text-green-700 font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
