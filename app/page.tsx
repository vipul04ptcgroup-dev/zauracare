'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Shield, Truck, Award, Leaf, Star, ChevronRight, Zap, Heart, FlaskConical } from 'lucide-react';
import { getFeaturedProducts, getCategories } from '@/services/api';
import { mockTestimonials } from '@/data/index';
import type { Product, Category } from '@/types';
import ProductCard from '@/components/product/ProductCard';

export default function HomePage() {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getFeaturedProducts().then(setFeatured);
    getCategories().then(setCategories);
  }, []);

  return (
    <div className="overflow-x-hidden">
      <section className="hero-gradient min-h-screen flex items-center pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full py-12 sm:py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 text-xs sm:text-sm font-medium px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6">
                <Leaf size={14} /> Science-backed wellness since 2025
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-4 sm:mb-6 text-gray-900 dark:text-white" style={{fontFamily:'Playfair Display,serif'}}>
                Health with <span className="text-gradient">Empathy</span> & <span className="text-gradient">Expertise</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6 sm:mb-8 max-w-lg">
                Premium healthcare supplements crafted with clinical precision and deep care for your wellbeing. Every product tested, trusted, and transparent.
              </p>
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 mb-8 sm:mb-10">
                <Link href="/products" className="btn-primary flex items-center gap-2">Shop Now <ArrowRight size={16} /></Link>
                <Link href="/about" className="btn-secondary flex items-center gap-2">Our Story <ChevronRight size={16} /></Link>
              </div>
              {/* <div className="flex flex-wrap gap-6 text-sm text-gray-600 dark:text-gray-400">
                {[{icon:Shield,text:'100% Tested'},{icon:Award,text:'GMP Certified'},{icon:Truck,text:'Free Delivery ₹499+'}].map(({icon:Icon,text})=>(
                  <div key={text} className="flex items-center gap-2"><Icon size={16} className="text-green-600"/>{text}</div>
                ))}
              </div> */}
            </div>
            <div className="relative">
              <div className="relative w-full aspect-square max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-green-200/50 to-blue-200/50 dark:from-green-900/30 dark:to-blue-900/30 rounded-3xl"/>
                <Image src="/Dummy.png" alt="Wellness" fill className="object-cover rounded-3xl"/>
                <div className="absolute -bottom-2 sm:-bottom-4 lg:-bottom-6 -left-2 sm:-left-4 lg:-left-6 bg-white dark:bg-gray-900 rounded-2xl p-3 sm:p-4 shadow-xl border border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center"><Heart size={18} className="text-green-600"/></div>
                    <div><p className="text-xs text-gray-500">Trusted by</p><p className="font-bold text-gray-900 dark:text-white">50,000+ users</p></div>
                  </div>
                </div>
                <div className="absolute -top-2 sm:-top-4 lg:-top-6 -right-2 sm:-right-4 lg:-right-6 bg-white dark:bg-gray-900 rounded-2xl p-3 sm:p-4 shadow-xl border border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900 rounded-xl flex items-center justify-center"><Star size={18} className="text-amber-500 fill-amber-500"/></div>
                    <div><p className="text-xs text-gray-500">Average rating</p><p className="font-bold text-gray-900 dark:text-white">4.8 / 5.0</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-950 border-y border-gray-100 dark:border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[{value:'50K+',label:'Happy Customers'},{value:'100+',label:'Products'},{value:'4.8★',label:'Average Rating'},{value:'GMP',label:'Certified Labs'}].map(s=>(
              <div key={s.label}><p className="text-2xl font-bold text-green-600 mb-1">{s.value}</p><p className="text-sm text-gray-500 dark:text-gray-400">{s.label}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="flex items-end justify-between mb-10">
          <div><p className="text-green-600 text-sm font-medium mb-2">Browse by type</p><h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white" style={{fontFamily:'Playfair Display,serif'}}>Shop Categories</h2></div>
          <Link href="/products" className="hidden sm:flex items-center gap-1 text-green-600 text-sm font-medium">All products <ArrowRight size={14}/></Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map(cat=>(
            <Link key={cat.id} href={`/products?category=${cat.id}`} className="card p-4 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-200 group">
              <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-3 bg-gray-50 dark:bg-gray-900">
                <Image src={cat.image} alt={cat.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300"/>
              </div>
              <p className="font-medium text-sm text-gray-900 dark:text-white group-hover:text-green-600 transition-colors">{cat.name}</p>
              <p className="text-xs text-gray-400 mt-0.5">{cat.productCount} products</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section bg-gray-50 dark:bg-gray-900/30 rounded-2xl sm:rounded-3xl mx-4 sm:mx-6">
        <div className="flex items-end justify-between mb-10">
          <div><p className="text-green-600 text-sm font-medium mb-2">Hand-picked for you</p><h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white" style={{fontFamily:'Playfair Display,serif'}}>Featured Products</h2></div>
          <Link href="/products" className="hidden sm:flex items-center gap-1 text-green-600 text-sm font-medium">View all <ArrowRight size={14}/></Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map(p=><ProductCard key={p.id} product={p}/>)}
        </div>
      </section>

      <section className="section">
        <div className="text-center mb-12">
          <p className="text-green-600 text-sm font-medium mb-2">Why choose us</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white" style={{fontFamily:'Playfair Display,serif'}}>The Zauracare Difference</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {icon:FlaskConical,title:'Clinically Tested',desc:'Every ingredient is backed by peer-reviewed research. We partner with NABL-certified labs for rigorous quality testing.'},
            {icon:Leaf,title:'Clean Ingredients',desc:'No harmful fillers, artificial colors, or banned substances. Pure formulations you can trust for your family.'},
            {icon:Shield,title:'Third-Party Verified',desc:'Independent third-party testing for heavy metals, pesticides, and contaminants. Full transparency, always.'},
            {icon:Heart,title:'Made with Empathy',desc:'Founded by healthcare professionals who understand wellness is personal. Every product is designed with you in mind.'},
            {icon:Award,title:'GMP Certified',desc:'Manufactured in WHO-GMP certified facilities following the highest pharmaceutical-grade production standards.'},
            {icon:Zap,title:'Fast & Free Delivery',desc:'Free shipping on orders above ₹499. Delivered in 2-5 business days across India with real-time tracking.'},
          ].map(f=>(
            <div key={f.title} className="card p-6 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/40 rounded-xl flex items-center justify-center mb-4"><f.icon size={22} className="text-green-600"/></div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section bg-gray-50 dark:bg-gray-900/30 rounded-2xl sm:rounded-3xl mx-4 sm:mx-6">
        <div className="text-center mb-12">
          <p className="text-green-600 text-sm font-medium mb-2">What our community says</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white" style={{fontFamily:'Playfair Display,serif'}}>Real Results, Real People</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTestimonials.map(t=>(
            <div key={t.id} className="card p-6">
              <div className="flex mb-3">{[1,2,3,4,5].map(s=><Star key={s} size={14} className={s<=t.rating?'fill-amber-400 text-amber-400':'text-gray-200'}/>)}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">"{t.review}"</p>
              <div className="flex items-center gap-3">
                {t.avatar&&<Image src={t.avatar} alt={t.name} width={36} height={36} className="rounded-full"/>}
                <div><p className="font-medium text-sm text-gray-900 dark:text-white">{t.name}</p>{t.product&&<p className="text-xs text-gray-400">{t.product}</p>}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-16 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10"><div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 -translate-y-1/2"/><div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 translate-y-1/2"/></div>
          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{fontFamily:'Playfair Display,serif'}}>Start Your Wellness Journey</h2>
            <p className="text-green-100 text-lg mb-8 max-w-xl mx-auto">Get 20% off your first order. Use code WELL20 at checkout.</p>
            <Link href="/products" className="inline-flex items-center gap-2 bg-white text-green-700 font-semibold px-8 py-4 rounded-xl hover:shadow-xl hover:-translate-y-0.5 transition-all">Shop Now <ArrowRight size={18}/></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
