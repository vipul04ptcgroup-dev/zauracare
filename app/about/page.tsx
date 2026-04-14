import Image from 'next/image';
import Link from 'next/link';
import { Heart, Shield, Leaf, Award, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="pt-20 pb-16">
      <section className="hero-gradient py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-green-600 text-sm font-medium mb-3">Our Story</p>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Wellness Built on <span className="text-gradient">Trust</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
            Zauracare was founded in 2025 by a team of doctors, nutritionists, and wellness advocates who were tired of the supplement industry's lack of transparency and accountability.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden">
              <Image src="/Dummy.png" alt="Our team" fill className="object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-green-600 text-white p-6 rounded-2xl shadow-2xl">
              <p className="text-4xl font-bold">5+</p>
              <p className="text-green-100 text-sm mt-1">Years of Trust</p>
            </div>
          </div>
          <div>
            <p className="text-green-600 text-sm font-medium mb-3">Why we exist</p>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              We believe that quality healthcare shouldn't be a luxury. Our mission is to make clinically validated, transparent, and affordable wellness products accessible to every Indian household.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
              Every product we create goes through rigorous research, clinical validation, and third-party testing before it reaches you. We never cut corners because your health matters.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Heart, title: 'Patient-First', desc: 'Designed by clinicians for real results' },
                { icon: Shield, title: 'Transparent', desc: 'Every ingredient, dose, and source disclosed' },
                { icon: Leaf, title: 'Clean Formula', desc: 'No fillers, additives, or proprietary blends' },
                { icon: Award, title: 'Certified', desc: 'GMP, ISO, and FSSAI certified production' },
              ].map(f => (
                <div key={f.title} className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-green-100 dark:bg-green-900/40 rounded-lg flex items-center justify-center shrink-0">
                    <f.icon size={16} className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-gray-900 dark:text-white">{f.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 dark:bg-gray-900/30 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: 'Playfair Display, serif' }}>Our Values</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { emoji: '🧬', title: 'Empathy', desc: 'We understand that health is deeply personal. Our products are made with compassion for the people who use them.' },
              { emoji: '🔬', title: 'Expertise', desc: 'Our formulations are developed by certified nutritionists, doctors, and research scientists with decades of combined experience.' },
              { emoji: '🌿', title: 'Wellness', desc: 'We take a holistic view of health — physical, mental, and preventive. Supplements are just one part of your wellness journey.' },
            ].map(v => (
              <div key={v.title} className="card p-8 text-center">
                <div className="text-4xl mb-4">{v.emoji}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>{v.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-3xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>Ready to Start Your Wellness Journey?</h2>
          <p className="text-green-100 mb-8 max-w-lg mx-auto">Browse our science-backed collection of supplements and take the first step toward better health.</p>
          <Link href="/products" className="inline-flex items-center gap-2 bg-white text-green-700 font-semibold px-8 py-4 rounded-xl hover:shadow-xl transition-all">
            Explore Products <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
