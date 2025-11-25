'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useProduct, useCart } from '@/hooks';
import { Button, Badge, LoadingSpinner, ErrorMessage } from '@/components/ui';
import { formatCurrency } from '@/utils';
import { Minus, Plus } from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { product, loading, error } = useProduct(params.id as string);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (!product) return;

    addItem({
      productId: product.id,
      name: product.name,
      price: product.discountedPrice || product.basePrice,
      sku: product.sku,
      quantity,
    });

    router.push('/cart');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorMessage message={error || 'Ürün bulunamadı'} />
      </div>
    );
  }

  const price = product.discountedPrice || product.basePrice;
  const hasDiscount = product.discountedPrice && product.discountedPrice < product.basePrice;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
          <span className="text-gray-400 text-6xl">📦</span>
        </div>

        {/* Product Info */}
        <div>
          {product.isFeatured && (
            <Badge variant="warning" className="mb-4">
              Öne Çıkan Ürün
            </Badge>
          )}

          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

          {product.brand && (
            <p className="text-lg text-gray-600 mb-2">Marka: {product.brand.name}</p>
          )}

          {product.category && (
            <p className="text-sm text-gray-500 mb-4">Kategori: {product.category.name}</p>
          )}

          <p className="text-gray-700 mb-6">{product.description}</p>

          <div className="border-t pt-6 mb-6">
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-4xl font-bold text-blue-600">
                {formatCurrency(price)}
              </span>
              {hasDiscount && (
                <span className="text-xl text-gray-400 line-through">
                  {formatCurrency(product.basePrice)}
                </span>
              )}
            </div>

            <p className="text-sm text-gray-500 mb-6">SKU: {product.sku}</p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <label className="font-semibold">Adet:</label>
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-4 py-2 hover:bg-gray-100 transition"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-6 py-2 border-x">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="px-4 py-2 hover:bg-gray-100 transition"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button onClick={handleAddToCart} className="w-full" size="lg">
              Sepete Ekle
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
