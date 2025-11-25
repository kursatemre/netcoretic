import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function PromoBanner() {
  return (
    <section className="py-8 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Banner - Large */}
          <Link
            href="/products?collection=yaz-2024"
            className="group relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600">
              <img
                src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=1000&fit=crop"
                alt="Yaz Koleksiyonu"
                className="w-full h-full object-cover mix-blend-overlay opacity-80 group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="relative h-full flex flex-col justify-end p-8 md:p-12 text-white">
              <span className="text-sm font-semibold mb-2 uppercase tracking-wider">
                Yeni Sezon
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Yaz Koleksiyonu 2024
              </h2>
              <p className="text-lg mb-6 text-white/90">
                %50&apos;ye varan indirimlerle tüm yaz ürünlerinde
              </p>
              <div className="flex items-center gap-2 font-semibold text-lg group-hover:gap-4 transition-all">
                Şimdi Keşfet
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Right Banners - Two Stacked */}
          <div className="flex flex-col gap-6">
            {/* Top Right Banner */}
            <Link
              href="/products?sale=true"
              className="group relative h-44 md:h-60 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-orange-500">
                <img
                  src="https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=800&h=600&fit=crop"
                  alt="İndirimli Ürünler"
                  className="w-full h-full object-cover mix-blend-overlay opacity-70 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="relative h-full flex flex-col justify-center p-6 md:p-8 text-white">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  Fırsat Ürünleri
                </h3>
                <p className="text-sm md:text-base mb-3">Sezonun en iyi fiyatları</p>
                <div className="flex items-center gap-2 font-semibold group-hover:gap-3 transition-all">
                  Alışverişe Başla
                  <ArrowRight size={18} />
                </div>
              </div>
            </Link>

            {/* Bottom Right Banner */}
            <Link
              href="/products?sort=newest"
              className="group relative h-44 md:h-60 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500">
                <img
                  src="https://images.unsplash.com/photo-1523359346063-d879354c0ea5?w=800&h=600&fit=crop"
                  alt="Yeni Gelenler"
                  className="w-full h-full object-cover mix-blend-overlay opacity-70 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="relative h-full flex flex-col justify-center p-6 md:p-8 text-white">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  Yeni Gelenler
                </h3>
                <p className="text-sm md:text-base mb-3">Trendleri ilk sizin keşfedin</p>
                <div className="flex items-center gap-2 font-semibold group-hover:gap-3 transition-all">
                  İncele
                  <ArrowRight size={18} />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
