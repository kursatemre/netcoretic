import { Truck, RefreshCw, Shield, Headphones } from 'lucide-react';

const factors = [
  {
    icon: Truck,
    title: 'Ücretsiz Kargo',
    description: '500 TL üzeri'
  },
  {
    icon: Shield,
    title: 'Güvenli Ödeme',
    description: 'SSL korumalı'
  },
  {
    icon: RefreshCw,
    title: '14 Gün İade',
    description: 'Koşulsuz iade'
  },
  {
    icon: Headphones,
    title: '7/24 Destek',
    description: 'Canlı yardım'
  }
];

export default function TrustFactors() {
  return (
    <section className="py-8 md:py-12 bg-gradient-to-r from-[#F7A072] to-[#ff8c5a]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-2 md:gap-8">
          {factors.map((factor, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left text-white flex-1"
            >
              {/* Icon */}
              <div className="flex-shrink-0">
                <factor.icon className="w-6 h-6 md:w-10 md:h-10" strokeWidth={1.5} />
              </div>
              {/* Text */}
              <div>
                <h3 className="text-xs md:text-base font-bold leading-tight">
                  {factor.title}
                </h3>
                <p className="text-[10px] md:text-sm text-white/90 leading-tight">
                  {factor.description}
                </p>
              </div>
              {/* Separator - Hidden on last item */}
              {index < factors.length - 1 && (
                <div className="hidden md:block w-px h-12 bg-white/20 ml-auto" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
