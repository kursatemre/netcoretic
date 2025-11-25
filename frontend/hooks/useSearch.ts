'use client';

import { useState } from 'react';
import { Product } from './useProducts';
import { API_URL } from '@/utils';

export function useSearch() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [searched, setSearched] = useState(false);

  const search = async (query: string) => {
    if (!query.trim()) return;

    try {
      setLoading(true);
      setError('');

      const url = `${API_URL}/Products/search?query=${encodeURIComponent(query)}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setProducts(data.items || []);
      setSearched(true);
    } catch (err: any) {
      setError(err.message || 'Arama sırasında hata oluştu');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setProducts([]);
    setSearched(false);
    setError('');
  };

  return {
    products,
    loading,
    error,
    searched,
    search,
    reset,
  };
}
