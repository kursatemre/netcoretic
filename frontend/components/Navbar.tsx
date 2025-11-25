'use client';

import Link from 'next/link';
import { useCart } from '@/hooks';
import { Badge } from './ui';

export default function Navbar() {
  const { itemCount } = useCart();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            E-Commerce
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
              {itemCount > 0 && (
                <Badge variant="danger" size="sm" className="absolute -top-2 -right-2">
                  {itemCount}
                </Badge>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
