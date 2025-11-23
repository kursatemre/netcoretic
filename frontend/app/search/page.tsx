'use client';

import { useState } from 'react';
import ProductCard from '@/components/ProductCard';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      setLoading(true);
      setError('');
      
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const url = `${apiUrl}/Products/search?query=${encodeURIComponent(query)}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setProducts(data.items || []);
      setSearched(true);
    } catch (err: any) {
      console.error('Search error:', err);
      setError(err.message || 'Arama sırasında hata oluştu');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">🔍 Ürün Ara</h1>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ürün adı, marka veya açıklama ara..."
            className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
          >
            {loading ? 'Aranıyor...' : 'Ara'}
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          💡 İpucu: "MacBook", "laptop", "Samsung" gibi terimler deneyin. Fuzzy search ile yanlış yazımları da bulur!
        </p>
      </form>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded p-4 mb-6">
          <p className="text-red-600">❌ {error}</p>
        </div>
      )}

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="border rounded-lg p-4 animate-pulse">
              <div className="aspect-square bg-gray-200 rounded-md mb-4"></div>
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-8 bg-gray-200 rounded"></div>
            </div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500 text-lg mb-2">
                😕 Aramanızla eşleşen ürün bulunamadı.
              </p>
              <p className="text-sm text-gray-400">
                Farklı bir arama terimi deneyin
              </p>
            </div>
          )}
        </>
      )}

      {!searched && !loading && (
        <div className="text-center py-12 bg-blue-50 rounded-lg">
          <p className="text-gray-600 text-lg mb-4">
            🔎 Aramak için yukarıdaki kutuya bir şeyler yazın
          </p>
          <div className="text-sm text-gray-500 space-y-1">
            <p>Örnek aramalar:</p>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              <button
                onClick={() => { setQuery('laptop'); handleSearch({ preventDefault: () => {} } as any); }}
                className="px-3 py-1 bg-white border rounded hover:bg-gray-50"
              >
                laptop
              </button>
              <button
                onClick={() => { setQuery('MacBook'); handleSearch({ preventDefault: () => {} } as any); }}
                className="px-3 py-1 bg-white border rounded hover:bg-gray-50"
              >
                MacBook
              </button>
              <button
                onClick={() => { setQuery('Samsung'); handleSearch({ preventDefault: () => {} } as any); }}
                className="px-3 py-1 bg-white border rounded hover:bg-gray-50"
              >
                Samsung
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
