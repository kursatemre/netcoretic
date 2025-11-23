'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const cartData = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(cartData);
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cart.map(item =>
      item.productId === productId ? { ...item, quantity: newQuantity } : item
    );
    
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = (productId: string) => {
    const updatedCart = cart.filter(item => item.productId !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    return calculateTotal() * 0.20; // 20% KDV
  };

  const calculateGrandTotal = () => {
    return calculateTotal() + calculateTax();
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Sepetiniz Boş</h1>
        <p className="text-gray-600 mb-8">Alışverişe başlamak için ürünlere göz atın</p>
        <button
          onClick={() => router.push('/products')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Ürünlere Git
        </button>
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
            <div key={item.productId} className="border rounded-lg p-4 flex gap-4">
              <div className="w-24 h-24 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center">
                <span className="text-xs text-gray-400">No Image</span>
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                <p className="text-sm text-gray-500 mb-2">SKU: {item.sku}</p>
                <p className="text-blue-600 font-bold">
                  ₺{item.price.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                </p>
              </div>

              <div className="flex flex-col justify-between items-end">
                <button
                  onClick={() => removeItem(item.productId)}
                  className="text-red-600 hover:text-red-800"
                >
                  Sil
                </button>

                <div className="flex items-center border rounded">
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    className="px-3 py-1 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 border-x">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    className="px-3 py-1 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                <p className="font-bold text-lg">
                  ₺{(item.price * item.quantity).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          ))}

          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-800 mt-4"
          >
            Sepeti Temizle
          </button>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6 sticky top-4">
            <h2 className="text-xl font-bold mb-4">Sipariş Özeti</h2>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span>Ara Toplam:</span>
                <span className="font-semibold">
                  ₺{calculateTotal().toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                </span>
              </div>

              <div className="flex justify-between">
                <span>KDV (%20):</span>
                <span className="font-semibold">
                  ₺{calculateTax().toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                </span>
              </div>

              <div className="border-t pt-3 flex justify-between text-lg font-bold">
                <span>Toplam:</span>
                <span className="text-blue-600">
                  ₺{calculateGrandTotal().toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            <button
              onClick={() => alert('Ödeme sayfası henüz hazır değil')}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Siparişi Tamamla
            </button>

            <button
              onClick={() => router.push('/products')}
              className="w-full mt-3 border border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Alışverişe Devam Et
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
