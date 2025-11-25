'use client';

import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api';
import { Product } from './useProducts';

export function useProduct(id: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const fetchProduct = async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError('');
      const response = await apiClient.get(`/Products/${id}`);
      setProduct(response.data);
    } catch (err: any) {
      setError(err.message || 'Ürün yüklenirken hata oluştu');
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  return {
    product,
    loading,
    error,
    refetch: fetchProduct,
  };
}
