'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      if (typeof window !== 'undefined') {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartCount(cart.reduce((sum: number, item: any) => sum + item.quantity, 0));
      }
    };
    
    updateCartCount();
    
    // Listen for storage changes
    window.addEventListener('storage', updateCartCount);
    
    return () => window.removeEventListener('storage', updateCartCount);
  }, []);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            🛍️ E-Commerce
          </Link>

          <div className="flex items-center space-x-6">
            <Link href="/products" className="hover:text-blue-600 transition">
              Ürünler
            </Link>
            <Link href="/search" className="hover:text-blue-600 transition">
              Ara
            </Link>
            <Link href="/cart" className="hover:text-blue-600 transition relative">
              Sepet
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
