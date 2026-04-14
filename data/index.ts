import { Category, Testimonial, Order, User } from '@/types';

export const mockCategories: Category[] = [
  { id: 'supplements', name: 'Supplements', slug: 'supplements', description: 'Science-backed health supplements', image: '/Dummy.png', productCount: 24 },
  { id: 'vitamins', name: 'Vitamins', slug: 'vitamins', description: 'Essential vitamins for daily wellness', image: '/Dummy.png', productCount: 18 },
  { id: 'ayurvedic', name: 'Ayurvedic', slug: 'ayurvedic', description: 'Traditional wisdom, modern science', image: '/Dummy.png', productCount: 15 },
  { id: 'gut-health', name: 'Gut Health', slug: 'gut-health', description: 'Probiotic & digestive support', image: '/Dummy.png', productCount: 12 },
  { id: 'minerals', name: 'Minerals', slug: 'minerals', description: 'Essential minerals for optimal health', image: '/Dummy.png', productCount: 10 },
  { id: 'beauty-wellness', name: 'Beauty & Wellness', slug: 'beauty-wellness', description: 'Glow from within supplements', image: '/Dummy.png', productCount: 8 },
];

export const mockTestimonials: Testimonial[] = [
  { id: '1', name: 'Priya Sharma', rating: 5, review: 'Zauracare\'s Ashwagandha has been life-changing. My stress levels dropped significantly within 2 weeks. The quality is unmatched and I love that everything is clinically tested.', product: 'Ashwagandha Root Extract', date: '2024-03-15', avatar: '/Dummy.png' },
  { id: '2', name: 'Rahul Mehta', rating: 5, review: 'Finally found a supplement brand I can trust. The Omega-3 is genuinely pure — no fishy aftertaste. Fast delivery and excellent packaging. Will definitely order again!', product: 'Omega-3 Fish Oil Premium', date: '2024-02-28', avatar: '/Dummy.png' },
  { id: '3', name: 'Anjali Nair', rating: 4, review: 'The Vitamin D3+K2 combo has helped my bone density according to my doctor. Been taking it for 6 months. Great product. Customer service is also very responsive.', product: 'Vitamin D3 + K2 Complex', date: '2024-03-01', avatar: '/Dummy.png' },
  { id: '4', name: 'Dr. Suresh Patel', rating: 5, review: 'As a physician, I recommend Zauracare to my patients. Their transparency about ingredients, sourcing, and testing is exemplary. The products genuinely work.', product: 'Probiotic 50 Billion CFU', date: '2024-01-20', avatar: '/Dummy.png' },
  { id: '5', name: 'Meera Krishnan', rating: 5, review: 'Been using the Magnesium Glycinate for sleep. I fall asleep faster and wake up refreshed. No groggy feeling. This is the best form of magnesium and Zauracare nailed the dosage.', product: 'Magnesium Glycinate', date: '2024-03-10', avatar: '/Dummy.png' },
];

export const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'Admin User',
    email: 'ptcvirar@gmail.com',
    phone: '+91 91208 79879',
    role: 'admin',
    createdAt: '2023-01-01',
    address: { street: '123 Health Street', city: 'Mumbai', state: 'Maharashtra', pincode: '400001', country: 'India' },
  },
  {
    id: 'u2',
    name: 'Priya Sharma',
    email: 'ptcvirar@gmail.com',
    phone: '+91 91208 79879',
    role: 'user',
    createdAt: '2023-06-15',
    avatar: '/Dummy.png',
    address: { street: '45 Wellness Avenue', city: 'Pune', state: 'Maharashtra', pincode: '411001', country: 'India' },
  },
];

export const mockOrders: Order[] = [
  {
    id: 'ORD-2024-001',
    userId: 'u2',
    items: [],
    total: 1548,
    status: 'delivered',
    createdAt: '2024-03-01',
    updatedAt: '2024-03-05',
    shippingAddress: { street: '45 Wellness Ave', city: 'Pune', state: 'Maharashtra', pincode: '411001', country: 'India' },
    paymentMethod: 'UPI',
    paymentStatus: 'paid',
    trackingNumber: 'TRK123456789',
  },
  {
    id: 'ORD-2024-002',
    userId: 'u2',
    items: [],
    total: 849,
    status: 'shipped',
    createdAt: '2024-03-10',
    updatedAt: '2024-03-11',
    shippingAddress: { street: '45 Wellness Ave', city: 'Pune', state: 'Maharashtra', pincode: '411001', country: 'India' },
    paymentMethod: 'Credit Card',
    paymentStatus: 'paid',
    trackingNumber: 'TRK987654321',
  },
  {
    id: 'ORD-2024-003',
    userId: 'u2',
    items: [],
    total: 2097,
    status: 'processing',
    createdAt: '2024-03-14',
    updatedAt: '2024-03-14',
    shippingAddress: { street: '45 Wellness Ave', city: 'Pune', state: 'Maharashtra', pincode: '411001', country: 'India' },
    paymentMethod: 'Net Banking',
    paymentStatus: 'paid',
  },
];
