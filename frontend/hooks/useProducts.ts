'use client';

import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api';

export interface Product {
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
  category?: { id: string; name: string };
  brand?: { id: string; name: string };
}

interface UseProductsOptions {
  pageNumber?: number;
  pageSize?: number;
  autoFetch?: boolean;
}

export function useProducts(options: UseProductsOptions = {}) {
  const { pageNumber = 1, pageSize = 12, autoFetch = true } = options;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(pageNumber);

  const fetchProducts = async (page: number = currentPage) => {
    try {
      setLoading(true);
      setError('');

      const response = await apiClient.get('/Products', {
        params: { pageNumber: page, pageSize }
      });

      setProducts(response.data.items || []);
      setTotalPages(response.data.totalPages || 1);
      setCurrentPage(page);
    } catch (err: any) {
      setError(err.message || 'Ürünler yüklenirken hata oluştu');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchProducts();
    }
  }, [autoFetch]);

  return {
    products,
    loading,
    error,
    totalPages,
    currentPage,
    fetchProducts,
    refetch: () => fetchProducts(currentPage),
  };
}
