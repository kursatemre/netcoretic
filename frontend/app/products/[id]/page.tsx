'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useProduct, useCart } from '@/hooks';
import { Button, Badge, LoadingSpinner, ErrorMessage } from '@/components/ui';
import { formatCurrency } from '@/utils';
import { Minus, Plus, Heart, Share2, Truck, RefreshCw, Shield, ChevronRight, Star } from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { product, loading, error } = useProduct(params.id as string);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const handleAddToCart = () => {
    if (!product) return;

    addItem({
      productId: product.id,
      name: product.name,
      price: product.discountedPrice || product.basePrice,
      sku: product.sku,
      quantity,
    });

    router.push('/cart');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
              <div className="h-20 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorMessage message={error || 'Ürün bulunamadı'} />
      </div>
    );
  }

  const price = product.discountedPrice || product.basePrice;
  const hasDiscount = product.discountedPrice && product.discountedPrice < product.basePrice;
  const discountPercentage = hasDiscount
    ? Math.round(((product.basePrice - product.discountedPrice!) / product.basePrice) * 100)
    : 0;

  // Mock images for gallery
  const images = [0, 1, 2, 3];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm">
            <a href="/" className="text-gray-600 hover:text-[#F7A072] transition">Ana Sayfa</a>
            <ChevronRight size={16} className="text-gray-400" />
            <a href="/products" className="text-gray-600 hover:text-[#F7A072] transition">Ürünler</a>
            <ChevronRight size={16} className="text-gray-400" />
            {product.category && (
              <>
                <span className="text-gray-600">{product.category.name}</span>
                <ChevronRight size={16} className="text-gray-400" />
              </>
            )}
            <span className="text-gray-900 font-medium truncate">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-lg overflow-hidden shadow-md">
              {hasDiscount && (
                <div className="absolute top-4 left-4 z-10">
                  <Badge variant="danger" className="text-lg px-3 py-1">
                    %{discountPercentage} İNDİRİM
                  </Badge>
                </div>
              )}
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <span className="text-gray-400 text-8xl">📦</span>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-4">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-gray-100 rounded-lg flex items-center justify-center transition ${
                    selectedImage === index ? 'ring-2 ring-[#F7A072]' : 'hover:ring-2 hover:ring-gray-300'
                  }`}
                >
                  <span className="text-gray-400 text-2xl">📦</span>
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            {/* Badges */}
            <div className="flex gap-2 mb-4">
              {product.isFeatured && (
                <Badge variant="warning">Öne Çıkan</Badge>
              )}
              {product.brand && (
                <Badge variant="secondary">{product.brand.name}</Badge>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

            {/* Reviews */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-yellow-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={18} fill="currentColor" />
                ))}
              </div>
              <span className="text-sm text-gray-600">(24 değerlendirme)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4 mb-6 pb-6 border-b">
              <span className="text-4xl font-bold text-[#F7A072]">
                {formatCurrency(price)}
              </span>
              {hasDiscount && (
                <span className="text-xl text-gray-400 line-through">
                  {formatCurrency(product.basePrice)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>

            {/* SKU */}
            <p className="text-sm text-gray-500 mb-6">Ürün Kodu: {product.sku}</p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <label className="font-semibold">Adet:</label>
              <div className="flex items-center border-2 border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-4 py-2 hover:bg-gray-50 transition"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-6 py-2 border-x-2 border-gray-300 font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="px-4 py-2 hover:bg-gray-50 transition"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-6">
              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-[#F7A072] hover:bg-[#ff8c5a]"
                size="lg"
              >
                Sepete Ekle
              </Button>
              <button className="p-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition">
                <Heart size={24} />
              </button>
              <button className="p-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition">
                <Share2 size={24} />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 gap-3 pt-6 border-t">
              <div className="flex items-center gap-3 text-sm">
                <Truck className="text-[#F7A072]" size={20} />
                <span className="text-gray-700">Ücretsiz kargo (500 TL ve üzeri)</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <RefreshCw className="text-[#F7A072]" size={20} />
                <span className="text-gray-700">14 gün içinde koşulsuz iade</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield className="text-[#F7A072]" size={20} />
                <span className="text-gray-700">Güvenli ödeme garantisi</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-lg p-6 shadow-md mb-8">
          <div className="border-b mb-6">
            <div className="flex gap-8">
              <button className="pb-4 border-b-2 border-[#F7A072] font-semibold text-[#F7A072]">
                Ürün Açıklaması
              </button>
              <button className="pb-4 text-gray-600 hover:text-[#F7A072] transition">
                Özellikler
              </button>
              <button className="pb-4 text-gray-600 hover:text-[#F7A072] transition">
                Yorumlar (24)
              </button>
            </div>
          </div>
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
