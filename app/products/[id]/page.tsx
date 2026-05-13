'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Star, MessageCircle, Heart, Shield, Truck, Award, ChevronRight, Check } from 'lucide-react';
import { getProductById, getProducts } from '@/services/api';
import type { Product } from '@/types';
import ProductCard from '@/components/product/ProductCard';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState<'description' | 'ingredients' | 'usage'>('description');

  useEffect(() => {
    getProductById(id).then(p => {
      setProduct(p);
      setLoading(false);
      if (p) getProducts({ category: p.categoryId, limit: 4 }).then(r => setRelated(r.data.filter(x => x.id !== p.id).slice(0, 4)));
    });
  }, [id]);

  if (loading) return (
    <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="grid lg:grid-cols-2 gap-12 animate-pulse">
        <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-2xl" />
        <div className="space-y-4"><div className="h-8 bg-gray-100 dark:bg-gray-800 rounded w-2/3"/><div className="h-6 bg-gray-100 dark:bg-gray-800 rounded w-1/3"/><div className="h-4 bg-gray-100 dark:bg-gray-800 rounded"/><div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-5/6"/></div>
      </div>
    </div>
  );

  if (!product) return (
    <div className="pt-32 text-center">
      <p className="text-gray-500 text-lg">Product not found</p>
      <Link href="/products" className="btn-primary inline-block mt-4">Back to Products</Link>
    </div>
  );

  return (
    <div className="pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 py-4 sm:py-6 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-green-600">Home</Link>
          <ChevronRight size={14} />
          <Link href="/products" className="hover:text-green-600">Products</Link>
          <ChevronRight size={14} />
          <Link href={`/products?category=${product.categoryId}`} className="hover:text-green-600">{product.category}</Link>
          <ChevronRight size={14} />
          <span className="text-gray-900 dark:text-white line-clamp-1">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 mb-12 sm:mb-16">
          {/* Images */}
          <div>
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 dark:bg-gray-900 mb-4">
              <Image src={product.images[selectedImage]} alt={product.name} fill className="object-cover" />
              {product.discount && (
                <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-xl">-{product.discount}%</div>
              )}
            </div>
            <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-1">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setSelectedImage(i)}
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${selectedImage === i ? 'border-green-600' : 'border-transparent'}`}>
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-xs font-medium text-green-600 bg-green-50 dark:bg-green-900/30 px-2.5 py-1 rounded-full">{product.category}</span>
              {product.isBestSeller && <span className="text-xs font-medium text-amber-600 bg-amber-50 dark:bg-amber-900/30 px-2.5 py-1 rounded-full">Best Seller</span>}
              {product.isNew && <span className="text-xs font-medium text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-2.5 py-1 rounded-full">New</span>}
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>{product.name}</h1>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(s => <Star key={s} size={16} className={s <= Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'} />)}
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{product.rating}</span>
              <span className="text-sm text-gray-400">({product.reviewCount} reviews)</span>
            </div>

            <div className="flex flex-wrap items-baseline gap-2 sm:gap-3 mb-6">
              <span className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">₹{product.price}</span>
              {product.originalPrice && <span className="text-lg sm:text-xl text-gray-400 line-through">₹{product.originalPrice}</span>}
              {product.discount && <span className="text-sm font-bold text-green-600 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-lg">Save ₹{product.originalPrice! - product.price}</span>}
            </div>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">{product.shortDescription}</p>

            {product.benefits && (
              <div className="mb-6">
                <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Key Benefits</p>
                <ul className="space-y-2">
                  {product.benefits.map(b => (
                    <li key={b} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Check size={14} className="text-green-600 shrink-0" /> {b}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <p className="text-sm text-gray-400 mb-6">{product.stock} in stock</p>

            <div className="flex gap-3 mb-8">
              <Link href="/contact" className="flex-1 btn-primary flex items-center justify-center gap-2">
                <MessageCircle size={18} /> Enquiry
              </Link>
              <button className="w-12 h-12 flex items-center justify-center rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-red-300 hover:text-red-500 transition-all">
                <Heart size={18} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
              {[{icon:Shield,text:'Quality Tested'},{icon:Truck,text:'Free Delivery'},{icon:Award,text:'GMP Certified'}].map(({icon:Icon,text})=>(
                <div key={text} className="flex flex-col items-center gap-1.5 text-center">
                  <Icon size={18} className="text-green-600" />
                  <span className="text-xs text-gray-500">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-12 sm:mb-16">
          <div className="flex flex-wrap border-b border-gray-200 dark:border-gray-700 mb-6">
            {(['description','ingredients','usage'] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-4 sm:px-6 py-3 text-sm font-medium capitalize transition-all ${activeTab === tab ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}>
                {tab}
              </button>
            ))}
          </div>
          <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            {activeTab === 'description' && <p>{product.description}</p>}
            {activeTab === 'ingredients' && <p>{product.ingredients || 'Ingredients information not available.'}</p>}
            {activeTab === 'usage' && <p>{product.usage || 'Usage information not available.'}</p>}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
