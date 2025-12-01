'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button, LoadingSpinner } from '@/components/ui';
import { adminProductApi } from '@/lib/api';

interface ProductDetail {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  sku?: string;
  brandId?: string;
  brandName?: string;
  categoryIds?: string[];
  images?: { url: string; isPrimary: boolean }[];
  isActive: boolean;
  createdAt: string;
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await adminProductApi.getById(params.id);
        setProduct(response.data);
      } catch (err) {
        setError('Ürün yüklenirken hata oluştu');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="space-y-6">
        <Button onClick={() => router.push('/admin/products')} variant="secondary">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Geri Dön
        </Button>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error || 'Ürün bulunamadı'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button onClick={() => router.push('/admin/products')} variant="secondary">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Geri Dön
        </Button>
        <Button onClick={() => router.push(`/admin/products/${params.id}/edit`)}>
          Düzenle
        </Button>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">{product.name}</h1>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Fiyat</h3>
            <p className="mt-1 text-lg font-semibold">{product.price.toLocaleString('tr-TR')} ₺</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Stok</h3>
            <p className="mt-1 text-lg">{product.stock}</p>
          </div>

          {product.sku && (
            <div>
              <h3 className="text-sm font-medium text-gray-500">SKU</h3>
              <p className="mt-1">{product.sku}</p>
            </div>
          )}

          {product.brandName && (
            <div>
              <h3 className="text-sm font-medium text-gray-500">Marka</h3>
              <p className="mt-1">{product.brandName}</p>
            </div>
          )}

          <div>
            <h3 className="text-sm font-medium text-gray-500">Durum</h3>
            <p className="mt-1">
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${
                product.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {product.isActive ? 'Aktif' : 'Pasif'}
              </span>
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Oluşturulma Tarihi</h3>
            <p className="mt-1">{new Date(product.createdAt).toLocaleDateString('tr-TR')}</p>
          </div>
        </div>

        {product.description && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-500">Açıklama</h3>
            <p className="mt-1 text-gray-900">{product.description}</p>
          </div>
        )}

        {product.images && product.images.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-500 mb-3">Görseller</h3>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image.url}
                    alt={`${product.name} - ${index + 1}`}
                    className="w-full h-32 object-cover rounded border"
                  />
                  {image.isPrimary && (
                    <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                      Ana Görsel
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
