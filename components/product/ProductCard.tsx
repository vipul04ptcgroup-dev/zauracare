'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Star, MessageCircle, Heart } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Product } from '@/types';

export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  const [wished, setWished] = useState(false);
  
  const handleEnquiry = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/contact');
  };

  return (
    <Link href={`/products/${product.id}`} className="group card block hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <div className="relative aspect-square overflow-hidden bg-gray-50 dark:bg-gray-900">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.discount && (
            <span className="text-xs font-bold bg-red-500 text-white px-2 py-1 rounded-lg">-{product.discount}%</span>
          )}
          {product.isBestSeller && (
            <span className="text-xs font-bold bg-amber-500 text-white px-2 py-1 rounded-lg">Best Seller</span>
          )}
          {product.isNew && (
            <span className="text-xs font-bold bg-blue-500 text-white px-2 py-1 rounded-lg">New</span>
          )}
        </div>
        {/* Wishlist */}
        <button
          onClick={e => { e.preventDefault(); setWished(!wished); }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 dark:bg-gray-900/90 flex items-center justify-center shadow hover:scale-110 transition-all"
        >
          <Heart size={14} className={wished ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
        </button>
      </div>

      <div className="p-4">
        <p className="text-xs text-green-600 dark:text-green-400 font-medium mb-1">{product.category}</p>
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-snug mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">{product.name}</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">{product.shortDescription}</p>

        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex">
            {[1,2,3,4,5].map(s => (
              <Star key={s} size={12} className={s <= Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200 dark:text-gray-700'} />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviewCount})</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-gray-900 dark:text-white">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
            )}
          </div>
          <button
            onClick={handleEnquiry}
            className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white text-xs font-medium px-3 py-2 rounded-lg transition-colors"
          >
            <MessageCircle size={13} />
            Enquiry
          </button>
        </div>
      </div>
    </Link>
  );
}
