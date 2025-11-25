'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: 'Yeni Sezon Koleksiyonu',
    subtitle: 'Trend parçalarla stilinizi tamamlayın. Premium kalite, uygun fiyat.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&h=1080&fit=crop&q=80',
    cta: 'Ürünleri Keşfet',
    link: '/products'
  },
  {
    id: 2,
    title: 'Kadın Giyim Koleksiyonu',
    subtitle: 'Şık ve modern parçalarla gardırobunuzu yenileyin. İndirimli fiyatlarla.',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&h=1080&fit=crop&q=80',
    cta: 'Kadın Ürünleri',
    link: '/products?category=kadin'
  },
  {
    id: 3,
    title: 'Erkek Giyim Tarzı',
    subtitle: 'Klasik ve rahat kombinler. Her tarza uygun ürünler sizleri bekliyor.',
    image: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=1920&h=1080&fit=crop&q=80',
    cta: 'Erkek Ürünleri',
    link: '/products?category=erkek'
  },
  {
    id: 4,
    title: 'Özel İndirim Fırsatları',
    subtitle: '%50\'ye varan indirimler. Kaçırılmayacak fiyatlar ve kaliteli ürünler.',
    image: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=1920&h=1080&fit=crop&q=80',
    cta: 'İndirimleri Gör',
    link: '/products?sale=true'
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-play
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[600px] md:h-[700px] overflow-hidden">
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              {/* Dark Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative h-full container mx-auto px-4 flex items-center">
              <div className="max-w-2xl text-white">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed animate-fade-in-delay">
                  {slide.subtitle}
                </p>
                <Link
                  href={slide.link}
                  className="inline-block bg-[#F7A072] hover:bg-[#ff8c5a] text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fade-in-delay-2"
                >
                  {slide.cta}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all duration-300 z-10 group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="text-white group-hover:scale-110 transition-transform" size={28} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all duration-300 z-10 group"
        aria-label="Next slide"
      >
        <ChevronRight className="text-white group-hover:scale-110 transition-transform" size={28} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? 'w-12 h-3 bg-[#F7A072]'
                : 'w-3 h-3 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
