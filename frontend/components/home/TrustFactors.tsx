import { Truck, RefreshCw, Shield, Headphones } from 'lucide-react';

const factors = [
  {
    icon: Truck,
    title: 'Hızlı Kargo',
    description: '1-3 iş günü içinde kapınızda'
  },
  {
    icon: RefreshCw,
    title: 'Kolay İade',
    description: '14 gün içinde ücretsiz iade'
  },
  {
    icon: Shield,
    title: 'Güvenli Ödeme',
    description: 'SSL sertifikası ile koruma'
  },
  {
    icon: Headphones,
    title: '7/24 Destek',
    description: 'Her zaman yanınızdayız'
  }
];

export default function TrustFactors() {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-2 md:px-4">
        <div className="grid grid-cols-4 gap-2 md:gap-8">
          {factors.map((factor, index) => (
            <div key={index} className="text-center">
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-10 h-10 md:w-16 md:h-16 mb-2 md:mb-4 rounded-full bg-[#F7A072]/10 text-[#F7A072]">
                <factor.icon className="w-5 h-5 md:w-8 md:h-8" />
              </div>
              {/* Title */}
              <h3 className="text-xs md:text-lg font-semibold mb-1 md:mb-2 leading-tight">
                {factor.title}
              </h3>
              {/* Description - Hidden on mobile */}
              <p className="hidden md:block text-gray-600 text-sm">
                {factor.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
