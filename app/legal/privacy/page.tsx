export default function PrivacyPage() {
  return (
    <div className="pt-24 pb-16 max-w-3xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Privacy Policy</h1>
      <p className="text-sm text-gray-400 mb-10">Last updated: January 1, 2024</p>
      <div className="prose dark:prose-invert max-w-none space-y-6 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
        {[
          { title: '1. Information We Collect', content: 'We collect information you provide directly to us, such as when you create an account, place an order, or contact us for support. This includes name, email address, shipping address, phone number, and payment information (processed securely by our payment partners).' },
          { title: '2. How We Use Your Information', content: 'We use the information we collect to process transactions, send you order confirmations and updates, provide customer support, send you marketing communications (with your consent), improve our products and services, and comply with legal obligations.' },
          { title: '3. Information Sharing', content: 'We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website and conducting our business, subject to confidentiality agreements.' },
          { title: '4. Data Security', content: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. All payment transactions are encrypted using SSL technology.' },
          { title: '5. Your Rights', content: 'You have the right to access, correct, or delete your personal information. You may also opt out of marketing communications at any time. To exercise these rights, please contact us at privacy@zauracare.com.' },
          { title: '6. Cookies', content: 'We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookie settings through your browser preferences.' },
          { title: '7. Contact Us', content: 'If you have any questions about this Privacy Policy, please contact us at privacy@zauracare.com or write to us at Zauracare, Health House, MG Road, Nashik, Maharashtra 422001, India.' },
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
