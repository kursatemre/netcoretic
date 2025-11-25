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
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {factors.map((factor, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-blue-100 text-blue-600">
                <factor.icon className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{factor.title}</h3>
              <p className="text-gray-600 text-sm">{factor.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
