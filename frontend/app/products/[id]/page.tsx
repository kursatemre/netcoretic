'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(`/Products/${params.id}`);
      setProduct(response.data);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Ürün yüklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find((item: any) => item.productId === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        productId: product.id,
        name: product.name,
        price: product.discountedPrice || product.basePrice,
        quantity: quantity,
        sku: product.sku
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Ürün sepete eklendi!');
    router.push('/cart');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Yükleniyor...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-red-600">{error || 'Ürün bulunamadı'}</div>
      </div>
    );
  }

  const price = product.discountedPrice || product.basePrice;
  const hasDiscount = product.discountedPrice && product.discountedPrice < product.basePrice;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
          <span className="text-gray-400 text-xl">No Image</span>
        </div>

        {/* Product Info */}
        <div>
          {product.isFeatured && (
            <span className="inline-block bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded mb-4">
              Öne Çıkan Ürün
            </span>
          )}

          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

          {product.brand && (
            <p className="text-lg text-gray-600 mb-2">Marka: {product.brand.name}</p>
          )}

          {product.category && (
            <p className="text-sm text-gray-500 mb-4">Kategori: {product.category.name}</p>
          )}

          <p className="text-gray-700 mb-6">{product.description}</p>

          <div className="border-t pt-6 mb-6">
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-4xl font-bold text-blue-600">
                ₺{price.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
              </span>
              {hasDiscount && (
                <span className="text-xl text-gray-400 line-through">
                  ₺{product.basePrice.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                </span>
              )}
            </div>

            <p className="text-sm text-gray-500 mb-6">SKU: {product.sku}</p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <label className="font-semibold">Adet:</label>
              <div className="flex items-center border rounded">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-6 py-2 border-x">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={addToCart}
              className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
            >
              Sepete Ekle
            </button>
          </div>

          {/* Product Variations */}
          {product.variations && product.variations.length > 0 && (
            <div className="border-t pt-6">
              <h3 className="font-semibold text-lg mb-4">Varyasyonlar</h3>
              <div className="space-y-2">
                {product.variations.map((variant: any) => (
                  <div key={variant.id} className="p-3 border rounded hover:border-blue-500">
                    <p className="font-medium">{variant.name}</p>
                    <p className="text-sm text-gray-600">SKU: {variant.sku}</p>
                    <p className="text-blue-600 font-semibold">
                      ₺{(variant.basePrice + (variant.priceAdjustment || 0)).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
