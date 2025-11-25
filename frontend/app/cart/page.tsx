'use client';

import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks';
import { Button, Card, EmptyState, LoadingSpinner } from '@/components/ui';
import { formatCurrency, TAX_RATE } from '@/utils';
import { ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react';

export default function CartPage() {
  const router = useRouter();
  const { cart, isLoaded, updateQuantity, removeItem, clearCart, subTotal, tax, total } = useCart();

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <EmptyState
          icon={<ShoppingCart className="h-16 w-16" />}
          title="Sepetiniz Boş"
          description="Alışverişe başlamak için ürünlere göz atın"
          action={{
            label: 'Ürünlere Git',
            onClick: () => router.push('/products'),
          }}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Sepetim</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <Card key={item.productId} padding="md">
              <div className="flex gap-4">
                <div className="w-24 h-24 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center">
                  <span className="text-2xl">📦</span>
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">SKU: {item.sku}</p>
                  <p className="text-blue-600 font-bold">{formatCurrency(item.price)}</p>
                </div>

                <div className="flex flex-col justify-between items-end">
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="text-red-600 hover:text-red-800 transition"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>

                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="px-3 py-1 hover:bg-gray-100 transition"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-1 border-x">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="px-3 py-1 hover:bg-gray-100 transition"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <p className="font-bold text-lg">
                    {formatCurrency(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            </Card>
          ))}

          <Button variant="danger" size="sm" onClick={clearCart}>
            Sepeti Temizle
          </Button>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card padding="md" className="sticky top-4">
            <h2 className="text-xl font-bold mb-4">Sipariş Özeti</h2>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span>Ara Toplam:</span>
                <span className="font-semibold">{formatCurrency(subTotal)}</span>
              </div>

              <div className="flex justify-between">
                <span>KDV ({TAX_RATE * 100}%):</span>
                <span className="font-semibold">{formatCurrency(tax)}</span>
              </div>

              <div className="border-t pt-3 flex justify-between text-lg font-bold">
                <span>Toplam:</span>
                <span className="text-blue-600">{formatCurrency(total)}</span>
              </div>
            </div>

            <Button onClick={() => alert('Ödeme sayfası henüz hazır değil')} className="w-full mb-3">
              Siparişi Tamamla
            </Button>

            <Button variant="secondary" onClick={() => router.push('/products')} className="w-full">
              Alışverişe Devam Et
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
