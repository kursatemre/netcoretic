import Link from 'next/link';

const categories = [
  {
    name: 'Kadın',
    description: 'Şık ve modern koleksiyon',
    href: '/products?category=kadin',
    gradient: 'from-pink-400 to-rose-500'
  },
  {
    name: 'Erkek',
    description: 'Klasik ve rahat tarzlar',
    href: '/products?category=erkek',
    gradient: 'from-blue-400 to-indigo-500'
  },
  {
    name: 'Aksesuar',
    description: 'Stilinizi tamamlayın',
    href: '/products?category=aksesuar',
    gradient: 'from-purple-400 to-pink-500'
  }
];

export default function CategoryBanners() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link
              key={index}
              href={category.href}
              className="group relative h-80 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient}`} />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />

              <div className="relative h-full flex flex-col items-center justify-center text-white p-8 text-center">
                <h3 className="text-3xl font-bold mb-2">{category.name}</h3>
                <p className="text-lg mb-4 opacity-90">{category.description}</p>
                <span className="inline-block border-b-2 border-white pb-1 font-semibold group-hover:border-b-4 transition-all">
                  Keşfet →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
