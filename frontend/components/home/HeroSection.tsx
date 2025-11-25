'use client';

import Link from 'next/link';
import { Button } from '@/components/ui';

export default function HeroSection() {
  return (
    <section className="relative h-[600px] bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex items-center justify-center">
        <div className="text-center text-white max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Yeni Sezon Koleksiyonu
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            Trend parçalarla stilinizi tamamlayın. Premium kalite, uygun fiyat.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" className="w-full sm:w-auto">
                Ürünleri Keşfet
              </Button>
            </Link>
            <Link href="/search">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto bg-white text-gray-900 hover:bg-gray-100">
                Ara ve Bul
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
