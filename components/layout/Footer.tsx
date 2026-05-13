import Link from 'next/link';
import Image from 'next/image';
import { Share2, Users, MessageCircle, PlayCircle, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 pt-16 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Image src="/logo.png" alt="Zauracare" width={140} height={40} className="h-16 w-auto mb-4" />
            <p className="text-sm leading-relaxed mb-6 text-gray-500">
              Science-backed wellness products crafted with empathy and expertise. Your health is our purpose.
            </p>
            <div className="flex gap-3">
              {[Share2, Users, MessageCircle, PlayCircle].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-green-600 flex items-center justify-center transition-colors">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Products</h4>
            <ul className="space-y-2.5 text-sm">
              {['Supplements', 'Vitamins', 'Ayurvedic', 'Gut Health', 'Minerals', 'Beauty & Wellness'].map(cat => (
                <li key={cat}><Link href={`/products?category=${cat.toLowerCase().replace(' & ', '-').replace(' ', '-')}`} className="hover:text-green-400 transition-colors">{cat}</Link></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Contact', href: '/contact' },
                { label: 'Privacy Policy', href: '/legal/privacy' },
                { label: 'Terms of Service', href: '/legal/terms' },
                { label: 'My Profile', href: '/profile' },
                { label: 'My Orders', href: '/profile' },
              ].map(l => (
                <li key={l.label}><Link href={l.href} className="hover:text-green-400 transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3"><Mail size={16} className="mt-0.5 text-green-500 shrink-0" /><span>ptcvirar@gmail.com</span></li>
              <li className="flex gap-3"><Phone size={16} className="mt-0.5 text-green-500 shrink-0" /><span>+91 91208 79879</span></li>
              <li className="flex gap-3"><MapPin size={16} className="mt-0.5 text-green-500 shrink-0" /><span>201-202, Hirubhai Residency, Besides Vedant Hospital, Near Virar East-West Flyover, Virar West - 401303</span></li>
            </ul>
            <div className="mt-6 p-4 bg-gray-900 rounded-xl">
              <p className="text-xs text-gray-500 mb-2">Subscribe for wellness tips</p>
              <div className="flex gap-2">
                <input placeholder="Your email" className="flex-1 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg outline-none focus:ring-1 focus:ring-green-500" />
                <button className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors">➤</button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">Â© 2024 Zauracare | Powered by PTCGRAM Private Limited. </p>
          <div className="flex gap-4 text-xs text-gray-600">
            <Link href="/legal/privacy" className="hover:text-gray-400">Privacy</Link>
            <Link href="/legal/terms" className="hover:text-gray-400">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

