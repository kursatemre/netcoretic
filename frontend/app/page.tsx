import {
  HeroSection,
  TrustFactors,
  FeaturedProducts,
  CategoryBanners,
  Newsletter
} from '@/components/home';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section - Full width banner with CTA */}
      <HeroSection />

      {/* Trust Factors - 4 key features */}
      <TrustFactors />

      {/* Featured Products - 8 products grid */}
      <FeaturedProducts />

      {/* Category Banners - 3 main categories */}
      <CategoryBanners />

      {/* Newsletter Subscription - Email capture */}
      <Newsletter />
    </main>
  );
}
