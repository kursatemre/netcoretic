'use client';

import Link from 'next/link';
import { Product } from '@/hooks';
import { Badge, Button } from '../ui';
import { formatCurrency } from '@/utils';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const price = product.discountedPrice || product.basePrice;
  const hasDiscount = product.discountedPrice && product.discountedPrice < product.basePrice;

  return (
    <Link href={`/products/${product.id}`}>
      <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col bg-white">
        <div className="aspect-square bg-gray-100 rounded-md mb-4 flex items-center justify-center">
          <span className="text-gray-400 text-4xl">📦</span>
        </div>

        {product.isFeatured && (
          <Badge variant="warning" className="mb-2 w-fit">
            Öne Çıkan
          </Badge>
        )}

        <h3 className="font-semibold text-lg mb-2 line-clamp-2 flex-grow">{product.name}</h3>

        {product.brand && (
          <p className="text-sm text-gray-600 mb-1">{product.brand.name}</p>
        )}

        <p className="text-sm text-gray-500 mb-3 line-clamp-2">
          {product.shortDescription || product.description}
        </p>

        <div className="mt-auto">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-2xl font-bold text-blue-600">
              {formatCurrency(price)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-400 line-through">
                {formatCurrency(product.basePrice)}
              </span>
            )}
          </div>

          <Button
            variant="primary"
            className="w-full"
            onClick={(e) => {
              e.preventDefault();
              alert('Sepete ekleme özelliği detay sayfasında aktif!');
            }}
          >
            Sepete Ekle
          </Button>
        </div>
      </div>
    </Link>
  );
}
