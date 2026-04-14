'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Valid email required'),
  subject: z.string().min(5, 'Subject required'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});
type FormData = z.infer<typeof schema>;

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    await new Promise(r => setTimeout(r, 800));
    setSent(true);
    reset();
    toast.success('Message sent! We\'ll respond within 24 hours.');
  };

  return (
    <div className="pt-20 pb-16">
      <div className="hero-gradient py-16 px-4 text-center mb-12">
        <p className="text-green-600 text-sm font-medium mb-3">Get in Touch</p>
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: 'Playfair Display, serif' }}>We're Here to Help</h1>
        <p className="text-gray-500 mt-4 max-w-lg mx-auto">Have a question about our products or your order? Our wellness experts are ready to assist you.</p>
      </div>

      <div className="max-w-5xl mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Info */}
          <div className="space-y-4">
            {[
              { icon: Mail, title: 'Email Us', info: 'support@zauracare.com', sub: 'Response within 24 hours' },
              { icon: Phone, title: 'Call Us', info: '+91 98765 43210', sub: 'Mon-Sat, 9am - 6pm IST' },
              { icon: MapPin, title: 'Visit Us', info: 'Health House, MG Road', sub: 'Nashik, Maharashtra 422001' },
            ].map(c => (
              <div key={c.title} className="card p-5 flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/40 rounded-xl flex items-center justify-center shrink-0">
                  <c.icon size={18} className="text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-900 dark:text-white">{c.title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-0.5">{c.info}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{c.sub}</p>
                </div>
              </div>
            ))}
            <div className="card p-5">
              <div className="flex items-center gap-2 mb-3"><MessageSquare size={16} className="text-green-600"/><p className="font-semibold text-sm text-gray-900 dark:text-white">FAQ</p></div>
              <div className="space-y-2 text-sm text-gray-500">
                {['What is your return policy?', 'How long does shipping take?', 'Are products FSSAI certified?'].map(q => (
                  <p key={q} className="hover:text-green-600 cursor-pointer transition-colors">→ {q}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="card p-8">
              {sent ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send size={28} className="text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Message Sent!</h3>
                  <p className="text-gray-500 mb-6">Thank you for reaching out. We'll be in touch within 24 hours.</p>
                  <button onClick={() => setSent(false)} className="btn-secondary text-sm">Send Another Message</button>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>Send us a Message</h2>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      {[{name:'name',label:'Full Name',placeholder:'Priya Sharma'},{name:'email',label:'Email',placeholder:'you@example.com',type:'email'}].map(f=>(
                        <div key={f.name}>
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">{f.label}</label>
                          <input {...register(f.name as keyof FormData)} type={f.type||'text'} placeholder={f.placeholder}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"/>
                          {errors[f.name as keyof FormData]&&<p className="text-red-500 text-xs mt-1">{errors[f.name as keyof FormData]?.message}</p>}
                        </div>
                      ))}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">Subject</label>
                      <input {...register('subject')} placeholder="How can we help?"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"/>
                      {errors.subject&&<p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">Message</label>
                      <textarea {...register('message')} rows={5} placeholder="Tell us more about your question or concern..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"/>
                      {errors.message&&<p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                    </div>
                    <button type="submit" disabled={isSubmitting} className="btn-primary flex items-center gap-2">
                      {isSubmitting?<span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"/>:<Send size={16}/>}
                      {isSubmitting?'Sending...':'Send Message'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
