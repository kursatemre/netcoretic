'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const categories = [
  {
    name: 'Kadın Giyim',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&h=600&fit=crop',
    href: '/products?category=kadin',
    color: 'from-pink-500 to-rose-500'
  },
  {
    name: 'Erkek Giyim',
    image: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=500&h=600&fit=crop',
    href: '/products?category=erkek',
    color: 'from-blue-500 to-indigo-500'
  },
  {
    name: 'Ayakkabı',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=600&fit=crop',
    href: '/products?category=ayakkabi',
    color: 'from-gray-700 to-gray-900'
  },
  {
    name: 'Çanta & Aksesuar',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&h=600&fit=crop',
    href: '/products?category=aksesuar',
    color: 'from-amber-500 to-orange-500'
  },
  {
    name: 'Spor Giyim',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&h=600&fit=crop',
    href: '/products?category=spor',
    color: 'from-green-500 to-teal-500'
  },
  {
    name: 'İç Giyim',
    image: 'https://images.unsplash.com/photo-1519374892035-fc102af888a4?w=500&h=600&fit=crop',
    href: '/products?category=ic-giyim',
    color: 'from-purple-500 to-pink-500'
  }
];

export default function CategoryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % categories.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + categories.length) % categories.length);
  };

  // Auto-play
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-4">Kategorileri Keşfet</h2>
          <p className="text-gray-600 text-lg">Size özel seçilmiş kategoriler</p>
        </div>

        {/* Desktop: Grid View */}
        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <Link
              key={index}
              href={category.href}
              className="group relative h-64 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute inset-0">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60 group-hover:opacity-70 transition-opacity`} />
              </div>
              <div className="relative h-full flex items-end p-4">
                <h3 className="text-white font-bold text-lg">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile: Carousel */}
        <div className="md:hidden relative">
          <div className="overflow-hidden rounded-xl">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {categories.map((category, index) => (
                <Link
                  key={index}
                  href={category.href}
                  className="min-w-full h-80 relative"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60`} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-white font-bold text-3xl">{category.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-4">
            {categories.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex ? 'w-8 bg-[#F7A072]' : 'w-2 bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
