'use client';

import { useState } from 'react';
import { useProducts } from '@/hooks';
import { ProductGrid, ProductSkeleton } from '@/components/product';
import { ErrorMessage, EmptyState, Pagination } from '@/components/ui';
import { Package, SlidersHorizontal, Grid, List, X, ChevronRight } from 'lucide-react';

export default function ProductsPage() {
  const { products, loading, error, totalPages, currentPage, fetchProducts } = useProducts();
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb Skeleton */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-8">
            {/* Sidebar Skeleton */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="bg-white rounded-lg p-6 space-y-4">
                <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Products Grid Skeleton */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <ProductSkeleton key={i} />
                ))}
              </div>
            </div>
          </div>
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
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm">
            <a href="/" className="text-gray-600 hover:text-[#F7A072] transition">Ana Sayfa</a>
            <ChevronRight size={16} className="text-gray-400" />
            <span className="text-gray-900 font-medium">Ürünler</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg p-6 sticky top-24">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <SlidersHorizontal size={20} />
                Filtreler
              </h3>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3 text-sm text-gray-700">Kategoriler</h4>
                <div className="space-y-2">
                  {['Tümü', 'Kadın', 'Erkek', 'Aksesuar', 'Ayakkabı'].map((cat) => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer hover:text-[#F7A072] transition">
                      <input type="checkbox" className="rounded border-gray-300 text-[#F7A072] focus:ring-[#F7A072]" />
                      <span className="text-sm">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3 text-sm text-gray-700">Fiyat Aralığı</h4>
                <div className="space-y-2">
                  {['0 - 200 TL', '200 - 500 TL', '500 - 1000 TL', '1000+ TL'].map((range) => (
                    <label key={range} className="flex items-center gap-2 cursor-pointer hover:text-[#F7A072] transition">
                      <input type="checkbox" className="rounded border-gray-300 text-[#F7A072] focus:ring-[#F7A072]" />
                      <span className="text-sm">{range}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3 text-sm text-gray-700">Markalar</h4>
                <div className="space-y-2">
                  {['Nike', 'Adidas', 'Zara', 'H&M', 'Mango'].map((brand) => (
                    <label key={brand} className="flex items-center gap-2 cursor-pointer hover:text-[#F7A072] transition">
                      <input type="checkbox" className="rounded border-gray-300 text-[#F7A072] focus:ring-[#F7A072]" />
                      <span className="text-sm">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header with Sort and View Options */}
            <div className="bg-white rounded-lg p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold mb-1">Tüm Ürünler</h1>
                <p className="text-sm text-gray-600">{products.length} ürün bulundu</p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  <SlidersHorizontal size={18} />
                  <span className="text-sm font-medium">Filtreler</span>
                </button>

                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F7A072] focus:border-transparent"
                >
                  <option value="newest">Yeni Eklenenler</option>
                  <option value="price-asc">Fiyat: Düşükten Yükseğe</option>
                  <option value="price-desc">Fiyat: Yüksekten Düşüğe</option>
                  <option value="popular">En Popüler</option>
                </select>

                {/* View Toggle */}
                <div className="hidden md:flex border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 transition ${viewMode === 'grid' ? 'bg-[#F7A072] text-white' : 'hover:bg-gray-50'}`}
                  >
                    <Grid size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 transition ${viewMode === 'list' ? 'bg-[#F7A072] text-white' : 'hover:bg-gray-50'}`}
                  >
                    <List size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Filters Overlay */}
            {showFilters && (
              <div className="lg:hidden fixed inset-0 bg-black/50 z-50" onClick={() => setShowFilters(false)}>
                <div className="absolute right-0 top-0 bottom-0 w-80 bg-white p-6 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold">Filtreler</h3>
                    <button onClick={() => setShowFilters(false)} className="p-1 hover:bg-gray-100 rounded">
                      <X size={20} />
                    </button>
                  </div>
                  {/* Same filters as desktop */}
                  <div className="space-y-6">
                    {/* Add same filter content here */}
                  </div>
                </div>
              </div>
            )}

            {/* Products Grid */}
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
        </div>
      </div>
    </div>
  );
}
