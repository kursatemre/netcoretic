'use client';

import { useState } from 'react';
import { Settings, Image, Sliders, Layout, ChevronUp, ChevronDown, Plus, Trash2, Edit2, Eye, Save } from 'lucide-react';
import { Button, Card, Badge } from '@/components/ui';

type Section = {
  id: string;
  type: 'hero' | 'trust-factors' | 'category-carousel' | 'featured-products' | 'promo-banner' | 'seasonal-collection' | 'category-banners' | 'brand-showcase' | 'newsletter';
  name: string;
  enabled: boolean;
  order: number;
};

type HeroSlide = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  cta: string;
  link: string;
  enabled: boolean;
};

const sectionTypes = [
  { value: 'hero', label: 'Hero Carousel', icon: Image },
  { value: 'trust-factors', label: 'Güven Faktörleri', icon: Settings },
  { value: 'category-carousel', label: 'Kategori Carousel', icon: Sliders },
  { value: 'featured-products', label: 'Öne Çıkan Ürünler', icon: Layout },
  { value: 'promo-banner', label: 'Promo Banner', icon: Image },
  { value: 'seasonal-collection', label: 'Sezonluk Koleksiyon', icon: Layout },
  { value: 'category-banners', label: 'Kategori Banner\'ları', icon: Image },
  { value: 'brand-showcase', label: 'Marka Vitrini', icon: Layout },
  { value: 'newsletter', label: 'Newsletter', icon: Settings },
];

export default function StorePage() {
  const [activeTab, setActiveTab] = useState<'general' | 'hero' | 'sections'>('general');
  const [logo, setLogo] = useState('');
  const [siteName, setSiteName] = useState('NetCoretic');
  const [themeColor, setThemeColor] = useState('#F7A072');

  // Hero slides
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([
    {
      id: '1',
      title: 'Yeni Sezon Koleksiyonu',
      subtitle: 'Trend parçalarla stilinizi tamamlayın. Premium kalite, uygun fiyat.',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&h=1080&fit=crop&q=80',
      cta: 'Ürünleri Keşfet',
      link: '/products',
      enabled: true
    },
    {
      id: '2',
      title: 'Kadın Giyim Koleksiyonu',
      subtitle: 'Şık ve modern parçalarla gardırobunuzu yenileyin. İndirimli fiyatlarla.',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&h=1080&fit=crop&q=80',
      cta: 'Kadın Ürünleri',
      link: '/products?category=kadin',
      enabled: true
    }
  ]);

  // Sections
  const [sections, setSections] = useState<Section[]>([
    { id: '1', type: 'hero', name: 'Hero Carousel', enabled: true, order: 1 },
    { id: '2', type: 'category-carousel', name: 'Kategori Carousel', enabled: true, order: 2 },
    { id: '3', type: 'featured-products', name: 'Öne Çıkan Ürünler', enabled: true, order: 3 },
    { id: '4', type: 'promo-banner', name: 'Promo Banner', enabled: true, order: 4 },
    { id: '5', type: 'seasonal-collection', name: 'Sezonluk Koleksiyon', enabled: true, order: 5 },
    { id: '6', type: 'category-banners', name: 'Kategori Banner\'ları', enabled: true, order: 6 },
    { id: '7', type: 'brand-showcase', name: 'Marka Vitrini', enabled: true, order: 7 },
    { id: '8', type: 'trust-factors', name: 'Güven Faktörleri', enabled: true, order: 8 },
    { id: '9', type: 'newsletter', name: 'Newsletter', enabled: true, order: 9 },
  ]);

  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [showSlideModal, setShowSlideModal] = useState(false);
  const [showSectionModal, setShowSectionModal] = useState(false);

  const moveSection = (id: string, direction: 'up' | 'down') => {
    const index = sections.findIndex(s => s.id === id);
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === sections.length - 1)
    ) return;

    const newSections = [...sections];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    [newSections[index], newSections[swapIndex]] = [newSections[swapIndex], newSections[index]];

    // Update order numbers
    newSections.forEach((section, idx) => {
      section.order = idx + 1;
    });

    setSections(newSections);
  };

  const toggleSection = (id: string) => {
    setSections(sections.map(s =>
      s.id === id ? { ...s, enabled: !s.enabled } : s
    ));
  };

  const removeSection = (id: string) => {
    setSections(sections.filter(s => s.id !== id));
  };

  const addSection = (type: Section['type']) => {
    const sectionType = sectionTypes.find(s => s.value === type);
    const newSection: Section = {
      id: Date.now().toString(),
      type,
      name: sectionType?.label || type,
      enabled: true,
      order: sections.length + 1
    };
    setSections([...sections, newSection]);
    setShowSectionModal(false);
  };

  const addHeroSlide = () => {
    const newSlide: HeroSlide = {
      id: Date.now().toString(),
      title: 'Yeni Slayt',
      subtitle: 'Açıklama',
      image: '',
      cta: 'Buton Metni',
      link: '/products',
      enabled: true
    };
    setEditingSlide(newSlide);
    setShowSlideModal(true);
  };

  const saveSlide = () => {
    if (!editingSlide) return;

    const exists = heroSlides.find(s => s.id === editingSlide.id);
    if (exists) {
      setHeroSlides(heroSlides.map(s => s.id === editingSlide.id ? editingSlide : s));
    } else {
      setHeroSlides([...heroSlides, editingSlide]);
    }
    setShowSlideModal(false);
    setEditingSlide(null);
  };

  const deleteSlide = (id: string) => {
    setHeroSlides(heroSlides.filter(s => s.id !== id));
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Mağaza Ayarları</h1>
        <p className="text-gray-600">Sitenizin görünümünü ve içeriğini yönetin</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab('general')}
            className={`pb-4 border-b-2 transition ${
              activeTab === 'general'
                ? 'border-[#F7A072] text-[#F7A072] font-semibold'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <Settings size={20} />
              Genel Ayarlar
            </div>
          </button>
          <button
            onClick={() => setActiveTab('hero')}
            className={`pb-4 border-b-2 transition ${
              activeTab === 'hero'
                ? 'border-[#F7A072] text-[#F7A072] font-semibold'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <Image size={20} />
              Hero Slaytları
            </div>
          </button>
          <button
            onClick={() => setActiveTab('sections')}
            className={`pb-4 border-b-2 transition ${
              activeTab === 'sections'
                ? 'border-[#F7A072] text-[#F7A072] font-semibold'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <Layout size={20} />
              Bölümler
            </div>
          </button>
        </div>
      </div>

      {/* General Settings Tab */}
      {activeTab === 'general' && (
        <div className="max-w-2xl">
          <Card padding="lg">
            <h2 className="text-xl font-bold mb-6">Genel Ayarlar</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Site Adı</label>
                <input
                  type="text"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7A072] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Logo URL</label>
                <input
                  type="text"
                  value={logo}
                  onChange={(e) => setLogo(e.target.value)}
                  placeholder="https://example.com/logo.png"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7A072] focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-1">Boş bırakırsanız site adı gösterilir</p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Tema Rengi</label>
                <div className="flex gap-3">
                  <input
                    type="color"
                    value={themeColor}
                    onChange={(e) => setThemeColor(e.target.value)}
                    className="h-10 w-20 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={themeColor}
                    onChange={(e) => setThemeColor(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7A072] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="pt-4">
                <Button className="bg-[#F7A072] hover:bg-[#ff8c5a]">
                  <Save size={18} className="mr-2" />
                  Değişiklikleri Kaydet
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Hero Slides Tab */}
      {activeTab === 'hero' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold">Hero Slaytları</h2>
              <p className="text-gray-600 text-sm">Ana sayfadaki carousel slaytlarını yönetin</p>
            </div>
            <Button onClick={addHeroSlide} className="bg-[#F7A072] hover:bg-[#ff8c5a]">
              <Plus size={18} className="mr-2" />
              Yeni Slayt
            </Button>
          </div>

          <div className="grid gap-4">
            {heroSlides.map((slide, index) => (
              <Card key={slide.id} padding="md">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-32 h-20 bg-gray-100 rounded overflow-hidden">
                    {slide.image ? (
                      <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <Image size={24} />
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{slide.title}</h3>
                      <Badge variant={slide.enabled ? 'success' : 'secondary'}>
                        {slide.enabled ? 'Aktif' : 'Pasif'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{slide.subtitle}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingSlide(slide);
                        setShowSlideModal(true);
                      }}
                      className="p-2 hover:bg-gray-100 rounded transition"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => deleteSlide(slide.id)}
                      className="p-2 hover:bg-red-50 text-red-600 rounded transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Sections Tab */}
      {activeTab === 'sections' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold">Ana Sayfa Bölümleri</h2>
              <p className="text-gray-600 text-sm">Bölümleri sıralayın, ekleyin veya kaldırın</p>
            </div>
            <Button onClick={() => setShowSectionModal(true)} className="bg-[#F7A072] hover:bg-[#ff8c5a]">
              <Plus size={18} className="mr-2" />
              Yeni Bölüm
            </Button>
          </div>

          <div className="grid gap-3">
            {sections.map((section, index) => (
              <Card key={section.id} padding="md">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => moveSection(section.id, 'up')}
                      disabled={index === 0}
                      className="p-1 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed transition"
                    >
                      <ChevronUp size={16} />
                    </button>
                    <button
                      onClick={() => moveSection(section.id, 'down')}
                      disabled={index === sections.length - 1}
                      className="p-1 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed transition"
                    >
                      <ChevronDown size={16} />
                    </button>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono text-gray-500">#{section.order}</span>
                      <h3 className="font-semibold">{section.name}</h3>
                      <Badge variant={section.enabled ? 'success' : 'secondary'}>
                        {section.enabled ? 'Görünür' : 'Gizli'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{section.type}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleSection(section.id)}
                      className={`p-2 rounded transition ${
                        section.enabled ? 'hover:bg-gray-100' : 'hover:bg-green-50 text-green-600'
                      }`}
                    >
                      <Eye size={18} />
                    </button>
                    {section.type !== 'hero' && (
                      <button
                        onClick={() => removeSection(section.id)}
                        className="p-2 hover:bg-red-50 text-red-600 rounded transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Slide Edit Modal */}
      {showSlideModal && editingSlide && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">Slayt Düzenle</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Başlık</label>
                  <input
                    type="text"
                    value={editingSlide.title}
                    onChange={(e) => setEditingSlide({ ...editingSlide, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7A072] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Alt Başlık</label>
                  <textarea
                    value={editingSlide.subtitle}
                    onChange={(e) => setEditingSlide({ ...editingSlide, subtitle: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7A072] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Görsel URL</label>
                  <input
                    type="text"
                    value={editingSlide.image}
                    onChange={(e) => setEditingSlide({ ...editingSlide, image: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7A072] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Buton Metni</label>
                  <input
                    type="text"
                    value={editingSlide.cta}
                    onChange={(e) => setEditingSlide({ ...editingSlide, cta: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7A072] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Link</label>
                  <input
                    type="text"
                    value={editingSlide.link}
                    onChange={(e) => setEditingSlide({ ...editingSlide, link: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7A072] focus:border-transparent"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="slideEnabled"
                    checked={editingSlide.enabled}
                    onChange={(e) => setEditingSlide({ ...editingSlide, enabled: e.target.checked })}
                    className="rounded border-gray-300 text-[#F7A072] focus:ring-[#F7A072]"
                  />
                  <label htmlFor="slideEnabled" className="text-sm font-semibold">Slaytı aktif et</label>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button onClick={saveSlide} className="flex-1 bg-[#F7A072] hover:bg-[#ff8c5a]">
                  Kaydet
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setShowSlideModal(false);
                    setEditingSlide(null);
                  }}
                  className="flex-1"
                >
                  İptal
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Section Modal */}
      {showSectionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">Yeni Bölüm Ekle</h2>

              <div className="grid grid-cols-2 gap-3">
                {sectionTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => addSection(type.value as Section['type'])}
                    className="p-4 border-2 border-gray-300 rounded-lg hover:border-[#F7A072] hover:bg-[#F7A072]/5 transition text-left"
                  >
                    <type.icon size={24} className="mb-2 text-[#F7A072]" />
                    <div className="font-semibold text-sm">{type.label}</div>
                  </button>
                ))}
              </div>

              <div className="mt-6">
                <Button
                  variant="secondary"
                  onClick={() => setShowSectionModal(false)}
                  className="w-full"
                >
                  İptal
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
