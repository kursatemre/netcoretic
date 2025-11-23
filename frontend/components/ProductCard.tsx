'use client';

import Link from 'next/link';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    description: string;
    shortDescription?: string;
    sku: string;
    basePrice: number;
    discountedPrice?: number;
    isActive: boolean;
    isFeatured: boolean;
    category?: {
      name: string;
    };
    brand?: {
      name: string;
    };
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const price = product.discountedPrice || product.basePrice;
  const hasDiscount = product.discountedPrice && product.discountedPrice < product.basePrice;

  return (
    <Link href={`/products/${product.id}`}>
      <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
        <div className="aspect-square bg-gray-100 rounded-md mb-4 flex items-center justify-center">
          <span className="text-gray-400">📦</span>
        </div>

        {product.isFeatured && (
          <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded mb-2 w-fit">
            ⭐ Öne Çıkan
          </span>
        )}

        <h3 className="font-semibold text-lg mb-2 line-clamp-2 flex-grow">{product.name}</h3>
        
        {product.brand && (
          <p className="text-sm text-gray-600 mb-1">🏷️ {product.brand.name}</p>
        )}

        <p className="text-sm text-gray-500 mb-3 line-clamp-2">
          {product.shortDescription || product.description}
        </p>

        <div className="mt-auto">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-2xl font-bold text-blue-600">
              ₺{price.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-400 line-through">
                ₺{product.basePrice.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
              </span>
            )}
          </div>

          <button 
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            onClick={(e) => {
              e.preventDefault();
              alert('Sepete ekleme özelliği detay sayfasında aktif!');
            }}
          >
            Sepete Ekle
          </button>
        </div>
      </div>
    </Link>
  );
}
