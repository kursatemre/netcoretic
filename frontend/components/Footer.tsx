import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, CreditCard } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#333333] text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-white">Net</span>
              <span className="text-[#F7A072]">Coretic</span>
            </h3>
            <p className="text-gray-300 mb-4 text-sm leading-relaxed">
              Kaliteli ürünler, uygun fiyatlar ve hızlı teslimat ile Türkiye&apos;nin en güvenilir online alışveriş platformu.
            </p>

            {/* Social Media */}
            <div className="flex space-x-4 mt-6">
              <a
                href="#"
                className="bg-gray-700 hover:bg-[#F7A072] p-2 rounded-full transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="bg-gray-700 hover:bg-[#F7A072] p-2 rounded-full transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="bg-gray-700 hover:bg-[#F7A072] p-2 rounded-full transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="bg-gray-700 hover:bg-[#F7A072] p-2 rounded-full transition-colors duration-300"
                aria-label="Youtube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Kurumsal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-[#F7A072] transition-colors text-sm">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-[#F7A072] transition-colors text-sm">
                  İletişim
                </Link>
              </li>
              <li>
                <Link href="/stores" className="text-gray-300 hover:text-[#F7A072] transition-colors text-sm">
                  Mağazalarımız
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-300 hover:text-[#F7A072] transition-colors text-sm">
                  Kariyer
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-[#F7A072] transition-colors text-sm">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Müşteri Hizmetleri</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-gray-300 hover:text-[#F7A072] transition-colors text-sm">
                  Yardım Merkezi
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-300 hover:text-[#F7A072] transition-colors text-sm">
                  Kargo & Teslimat
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-300 hover:text-[#F7A072] transition-colors text-sm">
                  İptal & İade
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-[#F7A072] transition-colors text-sm">
                  Gizlilik Politikası
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-[#F7A072] transition-colors text-sm">
                  Kullanım Koşulları
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-[#F7A072] transition-colors text-sm">
                  Sıkça Sorulan Sorular
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">İletişim</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-gray-300 text-sm">
                <Phone size={18} className="mt-0.5 flex-shrink-0 text-[#F7A072]" />
                <div>
                  <p className="font-medium text-white">Müşteri Hizmetleri</p>
                  <a href="tel:+908501234567" className="hover:text-[#F7A072] transition-colors">
                    0850 123 45 67
                  </a>
                  <p className="text-xs mt-1">Hafta içi 09:00 - 18:00</p>
                </div>
              </li>
              <li className="flex items-start space-x-3 text-gray-300 text-sm">
                <Mail size={18} className="mt-0.5 flex-shrink-0 text-[#F7A072]" />
                <div>
                  <a href="mailto:info@netcoretic.com" className="hover:text-[#F7A072] transition-colors">
                    info@netcoretic.com
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3 text-gray-300 text-sm">
                <MapPin size={18} className="mt-0.5 flex-shrink-0 text-[#F7A072]" />
                <div>
                  <p>Merkez Mahallesi, Teknoloji Cad.</p>
                  <p>No: 123, 34000 İstanbul</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods & Security */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h5 className="text-sm font-semibold mb-3 text-white">Güvenli Alışveriş</h5>
              <div className="flex items-center space-x-4">
                <div className="bg-white px-3 py-2 rounded">
                  <CreditCard size={24} className="text-gray-700" />
                </div>
                <div className="bg-white px-3 py-2 rounded text-gray-700 font-bold text-xs">
                  VISA
                </div>
                <div className="bg-white px-3 py-2 rounded text-gray-700 font-bold text-xs">
                  MasterCard
                </div>
                <div className="bg-white px-3 py-2 rounded text-gray-700 font-bold text-xs">
                  TROY
                </div>
              </div>
            </div>

            <div className="text-center md:text-right">
              <h5 className="text-sm font-semibold mb-3 text-white">Mobil Uygulamalar</h5>
              <div className="flex space-x-3">
                <a
                  href="#"
                  className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors text-xs font-medium"
                >
                  App Store
                </a>
                <a
                  href="#"
                  className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors text-xs font-medium"
                >
                  Google Play
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-black/30 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p className="text-center md:text-left mb-2 md:mb-0">
              © 2024 NetCoretic. Tüm hakları saklıdır.
            </p>
            <div className="flex items-center space-x-4">
              <Link href="/sitemap" className="hover:text-[#F7A072] transition-colors">
                Site Haritası
              </Link>
              <span className="text-gray-600">|</span>
              <Link href="/cookie-policy" className="hover:text-[#F7A072] transition-colors">
                Çerez Politikası
              </Link>
              <span className="text-gray-600">|</span>
              <Link href="/legal" className="hover:text-[#F7A072] transition-colors">
                Yasal Uyarı
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
