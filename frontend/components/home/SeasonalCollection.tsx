import Link from 'next/link';
import { Sparkles } from 'lucide-react';

const products = [
  {
    name: 'Premium Denim Ceket',
    price: 899,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop'
  },
  {
    name: 'Casual T-Shirt',
    price: 249,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop'
  },
  {
    name: 'Şık Elbise',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop'
  },
  {
    name: 'Spor Ayakkabı',
    price: 799,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=500&fit=crop'
  }
];

export default function SeasonalCollection() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header with Full Width Banner */}
        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-12 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500">
            <img
              src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&h=800&fit=crop"
              alt="Sonbahar Koleksiyonu"
              className="w-full h-full object-cover mix-blend-overlay opacity-60"
            />
          </div>
          <div className="relative h-full flex flex-col items-center justify-center text-white text-center p-8">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="text-yellow-300" />
              <span className="text-sm md:text-base font-semibold uppercase tracking-wider">
                Özel Koleksiyon
              </span>
              <Sparkles className="text-yellow-300" />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              Sonbahar Esintileri
            </h2>
            <p className="text-lg md:text-xl mb-6 max-w-2xl">
              Mevsimin en trend parçaları ile dolabınızı yenileyin
            </p>
            <Link
              href="/products?collection=sonbahar"
              className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Koleksiyonu İncele
            </Link>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, index) => (
            <Link
              key={index}
              href="/products"
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative h-64 md:h-80 overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                  <span className="bg-[#F7A072] text-white text-xs font-bold px-2 py-1 rounded-full">
                    YENİ
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-sm md:text-base mb-2 group-hover:text-[#F7A072] transition-colors">
                  {product.name}
                </h3>
                <p className="text-lg font-bold text-[#F7A072]">
                  ₺{product.price.toLocaleString('tr-TR')}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Link
            href="/products?collection=sonbahar"
            className="inline-block bg-gradient-to-r from-[#F7A072] to-[#ff8c5a] text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all hover:scale-105"
          >
            Tüm Koleksiyonu Gör
          </Link>
        </div>
      </div>
    </section>
  );
}
