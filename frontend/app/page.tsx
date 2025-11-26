'use client';

import { useEffect, useState } from 'react';
import {
  HeroSection,
  TrustFactors,
  FeaturedProducts,
  CategoryBanners,
  Newsletter,
  CategoryCarousel,
  BrandShowcase,
  PromoBanner,
  SeasonalCollection
} from '@/components/home';

type Section = {
  id: string;
  type: string;
  enabled: boolean;
  order: number;
};

const componentMap: Record<string, React.ComponentType<any>> = {
  'hero': HeroSection,
  'trust-factors': TrustFactors,
  'category-carousel': CategoryCarousel,
  'featured-products': FeaturedProducts,
  'promo-banner': PromoBanner,
  'seasonal-collection': SeasonalCollection,
  'category-banners': CategoryBanners,
  'brand-showcase': BrandShowcase,
  'newsletter': Newsletter,
};

export default function Home() {
  const [sections, setSections] = useState<Section[]>([
    { id: '1', type: 'hero', enabled: true, order: 1 },
    { id: '2', type: 'category-carousel', enabled: true, order: 2 },
    { id: '3', type: 'featured-products', enabled: true, order: 3 },
    { id: '4', type: 'promo-banner', enabled: true, order: 4 },
    { id: '5', type: 'seasonal-collection', enabled: true, order: 5 },
    { id: '6', type: 'category-banners', enabled: true, order: 6 },
    { id: '7', type: 'brand-showcase', enabled: true, order: 7 },
    { id: '8', type: 'trust-factors', enabled: true, order: 8 },
    { id: '9', type: 'newsletter', enabled: true, order: 9 },
  ]);

  useEffect(() => {
    // Load sections from localStorage
    const savedSections = localStorage.getItem('storeSections');
    if (savedSections) {
      setSections(JSON.parse(savedSections));
    }
  }, []);

  // Sort sections by order and filter enabled ones
  const enabledSections = sections
    .filter(section => section.enabled)
    .sort((a, b) => a.order - b.order);

  return (
    <main className="min-h-screen">
      {enabledSections.map(section => {
        const Component = componentMap[section.type];
        return Component ? <Component key={section.id} /> : null;
      })}
    </main>
  );
}
