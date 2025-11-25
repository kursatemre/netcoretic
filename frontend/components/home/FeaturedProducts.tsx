'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { productApi } from '@/lib/api';
import { ProductGrid } from '@/components/product';
import { Button, LoadingSpinner } from '@/components/ui';
import type { Product } from '@/hooks';

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await productApi.getAll({ pageSize: 8 });
      setProducts(response.data.items.slice(0, 8));
    } catch (error) {
      console.error('Error fetching featured products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Öne Çıkan Ürünler</h2>
          <p className="text-gray-600 text-lg">En çok tercih edilen ürünlerimizi keşfedin</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <>
            <ProductGrid products={products} />

            <div className="text-center mt-12">
              <Link href="/products">
                <Button size="lg">
                  Tüm Ürünleri Görüntüle
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
