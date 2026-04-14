import { Suspense } from 'react';
import ProductsContent from './ProductsContent';

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center text-gray-400">Loading products...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
