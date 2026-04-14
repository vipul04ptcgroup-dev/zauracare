export default function TermsPage() {
  return (
    <div className="pt-24 pb-16 max-w-3xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Terms of Service</h1>
      <p className="text-sm text-gray-400 mb-10">Last updated: January 1, 2024</p>
      <div className="prose dark:prose-invert max-w-none space-y-6 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
        {[
          { title: '1. Acceptance of Terms', content: 'By accessing and using the Zauracare website and purchasing our products, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.' },
          { title: '2. Products and Orders', content: 'All products listed on our website are subject to availability. We reserve the right to limit quantities, discontinue products, or refuse service. Prices are subject to change without notice. We will notify you of any price changes before processing your order.' },
          { title: '3. Health Disclaimer', content: 'Our products are dietary supplements and are not intended to diagnose, treat, cure, or prevent any disease. The information provided on our website is for educational purposes only and should not replace professional medical advice. Always consult your healthcare provider before starting any supplement regimen.' },
          { title: '4. Returns and Refunds', content: 'We offer a 30-day return policy for unopened products in their original packaging. To initiate a return, contact our customer service team. Refunds will be processed within 5-7 business days of receiving the returned item. Shipping costs are non-refundable.' },
          { title: '5. Intellectual Property', content: 'All content on this website, including text, graphics, logos, images, and product descriptions, is the property of Zauracare and protected by applicable intellectual property laws. Unauthorized use is prohibited.' },
          { title: '6. Limitation of Liability', content: 'Zauracare shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our products or services. Our total liability shall not exceed the amount paid for the specific product or service.' },
          { title: '7. Governing Law', content: 'These Terms of Service shall be governed by the laws of Maharashtra, India. Any disputes shall be subject to the exclusive jurisdiction of courts in Nashik, Maharashtra.' },
        ].map(s => (
          <section key={s.title}>
            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-2">{s.title}</h2>
            <p>{s.content}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
