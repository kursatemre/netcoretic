'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks';
import { Search, ShoppingCart, User, Menu, X, ChevronDown } from 'lucide-react';

const categories = [
  { name: 'Kadın', href: '/products?category=kadin' },
  { name: 'Erkek', href: '/products?category=erkek' },
  { name: 'Aksesuar', href: '/products?category=aksesuar' },
  { name: 'İndirimli Ürünler', href: '/products?sale=true' },
  { name: 'Yeni Gelenler', href: '/products?sort=newest' },
];

export default function Navbar() {
  const { itemCount } = useCart();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top Bar - Announcement */}
      <div className="bg-gradient-to-r from-[#F7A072] to-[#ff8c5a] text-white text-center py-2 text-sm font-medium">
        🎉 Ücretsiz Kargo - 500 TL ve Üzeri Alışverişlerde
      </div>

      {/* Main Header */}
      <div className="border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="text-3xl font-bold">
                <span className="text-[#333333]">Net</span>
                <span className="text-[#F7A072]">Coretic</span>
              </div>
            </Link>

            {/* Search Bar - Desktop */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Ürün, kategori veya marka ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F7A072] focus:border-transparent"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-[#F7A072] transition"
                >
                  <Search size={20} />
                </button>
              </div>
            </form>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-6">
              {/* User Account - Desktop */}
              <Link
                href="/admin"
                className="hidden md:flex items-center space-x-2 hover:text-[#F7A072] transition group"
              >
                <User size={24} className="group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">Hesabım</span>
              </Link>

              {/* Shopping Cart */}
              <Link
                href="/cart"
                className="relative flex items-center space-x-2 hover:text-[#F7A072] transition group"
              >
                <div className="relative">
                  <ShoppingCart size={24} className="group-hover:scale-110 transition-transform" />
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#F7A072] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </div>
                <span className="hidden md:block text-sm font-medium">Sepet</span>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu - Desktop */}
      <nav className="hidden md:block bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <ul className="flex items-center justify-center space-x-8 h-14">
            {categories.map((category) => (
              <li key={category.name}>
                <Link
                  href={category.href}
                  className="text-[#333333] hover:text-[#F7A072] font-medium transition-colors relative group"
                >
                  {category.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F7A072] group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="container mx-auto px-4 py-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ürün ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F7A072]"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500"
                >
                  <Search size={20} />
                </button>
              </div>
            </form>

            {/* Mobile Navigation */}
            <nav className="space-y-2">
              <Link
                href="/admin"
                className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User size={20} />
                <span className="font-medium">Hesabım</span>
              </Link>

              <div className="border-t border-gray-200 my-2"></div>

              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="block px-4 py-3 hover:bg-gray-50 rounded-lg transition font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
