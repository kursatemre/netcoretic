'use client';

import { useProducts } from '@/hooks';
import { ProductGrid, ProductSkeleton } from '@/components/product';
import { ErrorMessage, EmptyState, Pagination } from '@/components/ui';
import { Package } from 'lucide-react';

export default function ProductsPage() {
  const { products, loading, error, totalPages, currentPage, fetchProducts } = useProducts();

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="h-10 bg-gray-200 rounded w-64 mb-8 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorMessage message={error} onRetry={() => fetchProducts(currentPage)} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Tüm Ürünler</h1>
      <p className="text-gray-600 mb-6">{products.length} ürün bulundu</p>

      {products.length === 0 ? (
        <EmptyState
          icon={<Package className="h-16 w-16" />}
          title="Henüz ürün bulunmamaktadır"
          description="Yakında yeni ürünler eklenecektir"
        />
      ) : (
        <>
          <ProductGrid products={products} />

          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={fetchProducts}
            />
          </div>
        </>
      )}
    </div>
  );
}
