'use client';

import Link from 'next/link';

const brands = [
  { name: 'Nike', logo: 'NIKE' },
  { name: 'Adidas', logo: 'ADIDAS' },
  { name: 'Zara', logo: 'ZARA' },
  { name: 'H&M', logo: 'H&M' },
  { name: 'Mango', logo: 'MANGO' },
  { name: 'Puma', logo: 'PUMA' },
  { name: 'LC Waikiki', logo: 'LC WAİKİKİ' },
  { name: 'Koton', logo: 'KOTON' }
];

export default function BrandShowcase() {
  return (
    <section className="py-16 bg-gray-50 border-y border-gray-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Popüler Markalar</h2>
          <p className="text-gray-600">Güvendiğiniz markaların ürünleri</p>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid grid-cols-4 lg:grid-cols-8 gap-6">
          {brands.map((brand, index) => (
            <Link
              key={index}
              href={`/products?brand=${brand.name.toLowerCase()}`}
              className="bg-white rounded-lg p-6 flex items-center justify-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="text-center">
                <span className="text-2xl font-bold text-gray-800 group-hover:text-[#F7A072] transition-colors">
                  {brand.logo}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile: Horizontal Scroll */}
        <div className="md:hidden overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 pb-4">
            {brands.map((brand, index) => (
              <Link
                key={index}
                href={`/products?brand=${brand.name.toLowerCase()}`}
                className="flex-shrink-0 bg-white rounded-lg p-4 w-28 h-28 flex items-center justify-center shadow hover:shadow-md transition"
              >
                <span className="text-lg font-bold text-gray-800">
                  {brand.logo}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
