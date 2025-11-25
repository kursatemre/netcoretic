'use client';

import { useState } from 'react';
import { useSearch } from '@/hooks';
import { ProductGrid, ProductSkeleton } from '@/components/product';
import { Button, Input, EmptyState, ErrorMessage } from '@/components/ui';
import { Search as SearchIcon } from 'lucide-react';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const { products, loading, error, searched, search } = useSearch();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    search(query);
  };

  const quickSearches = ['laptop', 'MacBook', 'Samsung'];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Ürün Ara</h1>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2">
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ürün adı, marka veya açıklama ara..."
            className="flex-1"
          />
          <Button type="submit" isLoading={loading}>
            <SearchIcon className="h-5 w-5 mr-2" />
            Ara
          </Button>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          İpucu: Fuzzy search ile yanlış yazımları da bulur!
        </p>
      </form>

      {error && <ErrorMessage message={error} className="mb-6" />}

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      )}

      {!loading && searched && (
        <>
          <div className="mb-4">
            <p className="text-gray-600">
              <strong>{products.length}</strong> sonuç bulundu
              {query && ` "${query}" için`}
            </p>
          </div>

          {products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <EmptyState
              icon={<SearchIcon className="h-16 w-16" />}
              title="Aramanızla eşleşen ürün bulunamadı"
              description="Farklı bir arama terimi deneyin"
            />
          )}
        </>
      )}

      {!searched && !loading && (
        <div className="text-center py-12 bg-blue-50 rounded-lg">
          <SearchIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg mb-4">
            Aramak için yukarıdaki kutuya bir şeyler yazın
          </p>
          <div className="text-sm text-gray-500 space-y-2">
            <p>Örnek aramalar:</p>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {quickSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => { setQuery(term); search(term); }}
                  className="px-3 py-1 bg-white border rounded hover:bg-gray-50 transition"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
