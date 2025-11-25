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

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section - Full width banner with CTA */}
      <HeroSection />

      {/* Trust Factors - 4 key features */}
      <TrustFactors />

      {/* Category Carousel - Interactive category slider */}
      <CategoryCarousel />

      {/* Featured Products - 8 products grid */}
      <FeaturedProducts />

      {/* Promo Banner - 3 promotional banners */}
      <PromoBanner />

      {/* Seasonal Collection - Special collection showcase */}
      <SeasonalCollection />

      {/* Category Banners - 3 main categories */}
      <CategoryBanners />

      {/* Brand Showcase - Popular brands carousel */}
      <BrandShowcase />

      {/* Newsletter Subscription - Email capture */}
      <Newsletter />
    </main>
  );
}
