'use client';

import { useState, useEffect } from 'react';
import { Settings, Image, Sliders, Layout, ChevronUp, ChevronDown, Plus, Trash2, Edit2, Eye, Save, X, Type, Palette } from 'lucide-react';
import { Button, Card, Badge, ImageUpload, LoadingSpinner } from '@/components/ui';
import { storeSettingsApi } from '@/lib/api';

type SectionContent = {
  title?: string;
  subtitle?: string;
  description?: string;
  backgroundColor?: string;
  textColor?: string;
  buttonText?: string;
  buttonColor?: string;
  image?: string;
  images?: string[];
};

type Section = {
  id: string;
  type: 'hero' | 'trust-factors' | 'category-carousel' | 'featured-products' | 'promo-banner' | 'seasonal-collection' | 'category-banners' | 'brand-showcase' | 'newsletter';
  name: string;
  enabled: boolean;
  order: number;
  content: SectionContent;
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
    {
      id: '1',
      type: 'hero',
      name: 'Hero Carousel',
      enabled: true,
      order: 1,
      content: {}
    },
    {
      id: '2',
      type: 'category-carousel',
      name: 'Kategori Carousel',
      enabled: true,
      order: 2,
      content: {
        title: 'Kategorilere Göz Atın',
        subtitle: 'Geniş ürün yelpazemizi keşfedin',
        backgroundColor: '#ffffff'
      }
    },
    {
      id: '3',
      type: 'featured-products',
      name: 'Öne Çıkan Ürünler',
      enabled: true,
      order: 3,
      content: {
        title: 'Öne Çıkan Ürünler',
        subtitle: 'En çok satılan ve beğenilen ürünlerimiz',
        backgroundColor: '#f8f9fa',
        buttonText: 'Tümünü Gör',
        buttonColor: '#F7A072'
      }
    },
    {
      id: '4',
      type: 'promo-banner',
      name: 'Promo Banner',
      enabled: true,
      order: 4,
      content: {
        title: 'Yaz İndirimleri',
        description: 'Seçili ürünlerde %50\'ye varan indirim',
        backgroundColor: '#F7A072',
        textColor: '#ffffff',
        buttonText: 'Hemen İncele',
        image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=400&fit=crop&q=80'
      }
    },
    {
      id: '5',
      type: 'seasonal-collection',
      name: 'Sezonluk Koleksiyon',
      enabled: true,
      order: 5,
      content: {
        title: 'İlkbahar Koleksiyonu 2024',
        description: 'Yeni sezon trendleri burada',
        backgroundColor: '#ffffff'
      }
    },
    {
      id: '6',
      type: 'category-banners',
      name: 'Kategori Banner\'ları',
      enabled: true,
      order: 6,
      content: {
        images: [
          'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=800&fit=crop&q=80',
          'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=800&fit=crop&q=80'
        ]
      }
    },
    {
      id: '7',
      type: 'brand-showcase',
      name: 'Marka Vitrini',
      enabled: true,
      order: 7,
      content: {
        title: 'Güvenilir Markalar',
        backgroundColor: '#f8f9fa'
      }
    },
    {
      id: '8',
      type: 'trust-factors',
      name: 'Güven Faktörleri',
      enabled: true,
      order: 8,
      content: {
        backgroundColor: '#ffffff'
      }
    },
    {
      id: '9',
      type: 'newsletter',
      name: 'Newsletter',
      enabled: true,
      order: 9,
      content: {
        title: 'Kampanyalardan Haberdar Olun',
        description: 'E-posta adresinizi bırakın, özel fırsatları kaçırmayın',
        backgroundColor: '#F7A072',
        textColor: '#ffffff',
        buttonText: 'Abone Ol',
        buttonColor: '#ffffff'
      }
    },
  ]);

  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [showSlideModal, setShowSlideModal] = useState(false);
  const [showSectionModal, setShowSectionModal] = useState(false);
  const [editingSection, setEditingSection] = useState<Section | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load from API on mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await storeSettingsApi.get();
        if (response.data) {
          setLogo(response.data.logo || '');
          setSiteName(response.data.siteName || 'NetCoretic');
          setThemeColor(response.data.themeColor || '#F7A072');
          
          if (response.data.heroSlides && response.data.heroSlides.length > 0) {
            setHeroSlides(response.data.heroSlides);
          }
          
          if (response.data.sections && response.data.sections.length > 0) {
            setSections(response.data.sections);
          }
        }
      } catch (error) {
        console.error('Error fetching store settings:', error);
        // Fallback to localStorage
        const savedSettings = localStorage.getItem('storeSettings');
        if (savedSettings) {
          const settings = JSON.parse(savedSettings);
          setLogo(settings.logo || '');
          setSiteName(settings.siteName || 'NetCoretic');
          setThemeColor(settings.themeColor || '#F7A072');
        }

        const savedSlides = localStorage.getItem('heroSlides');
        if (savedSlides) {
          setHeroSlides(JSON.parse(savedSlides));
        }

        const savedSections = localStorage.getItem('storeSections');
        if (savedSections) {
          setSections(JSON.parse(savedSections));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // Save general settings
  const saveGeneralSettings = async () => {
    setSaving(true);
    try {
      await storeSettingsApi.updateGeneral({ siteName, logo, themeColor });
      // Also save to localStorage as backup
      localStorage.setItem('storeSettings', JSON.stringify({ logo, siteName, themeColor }));
      alert('Ayarlar başarıyla kaydedildi!');
    } catch (error) {
      console.error('Error saving settings:', error);
      // Fallback to localStorage only
      localStorage.setItem('storeSettings', JSON.stringify({ logo, siteName, themeColor }));
      alert('Ayarlar yerel olarak kaydedildi (API erişilemedi)');
    } finally {
      setSaving(false);
    }
  };

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
      order: sections.length + 1,
      content: {}
    };
    setSections([...sections, newSection]);
    setShowSectionModal(false);
  };

  const editSection = (section: Section) => {
    setEditingSection(section);
  };

  const saveSection = async () => {
    if (!editingSection) return;
    setSaving(true);
    try {
      const updatedSections = sections.map(s =>
        s.id === editingSection.id ? editingSection : s
      );
      setSections(updatedSections);
      await storeSettingsApi.updateSections(updatedSections);
      localStorage.setItem('storeSections', JSON.stringify(updatedSections));
      setEditingSection(null);
    } catch (error) {
      console.error('Error saving section:', error);
      const updatedSections = sections.map(s =>
        s.id === editingSection.id ? editingSection : s
      );
      setSections(updatedSections);
      localStorage.setItem('storeSections', JSON.stringify(updatedSections));
      setEditingSection(null);
    } finally {
      setSaving(false);
    }
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

  const saveSlide = async () => {
    if (!editingSlide) return;
    setSaving(true);

    try {
      const exists = heroSlides.find(s => s.id === editingSlide.id);
      let updatedSlides;
      if (exists) {
        updatedSlides = heroSlides.map(s => s.id === editingSlide.id ? editingSlide : s);
      } else {
        updatedSlides = [...heroSlides, editingSlide];
      }
      setHeroSlides(updatedSlides);
      await storeSettingsApi.updateHeroSlides(updatedSlides);
      localStorage.setItem('heroSlides', JSON.stringify(updatedSlides));
      setShowSlideModal(false);
      setEditingSlide(null);
    } catch (error) {
      console.error('Error saving slide:', error);
      // Fallback to localStorage
      const exists = heroSlides.find(s => s.id === editingSlide.id);
      let updatedSlides;
      if (exists) {
        updatedSlides = heroSlides.map(s => s.id === editingSlide.id ? editingSlide : s);
      } else {
        updatedSlides = [...heroSlides, editingSlide];
      }
      setHeroSlides(updatedSlides);
      localStorage.setItem('heroSlides', JSON.stringify(updatedSlides));
      setShowSlideModal(false);
      setEditingSlide(null);
    } finally {
      setSaving(false);
    }
  };

  const deleteSlide = async (id: string) => {
    const updatedSlides = heroSlides.filter(s => s.id !== id);
    setHeroSlides(updatedSlides);
    try {
      await storeSettingsApi.updateHeroSlides(updatedSlides);
    } catch (error) {
      console.error('Error deleting slide:', error);
    }
    localStorage.setItem('heroSlides', JSON.stringify(updatedSlides));
  };

  const renderSectionEditor = () => {
    if (!editingSection) return null;

    const { type, content } = editingSection;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
            <h3 className="text-xl font-bold">Bölüm Düzenle: {editingSection.name}</h3>
            <button
              onClick={() => setEditingSection(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Common Fields */}
            {(type !== 'hero' && type !== 'trust-factors' && type !== 'brand-showcase') && (
              <>
                <div>
                  <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                    <Type size={16} />
                    Başlık
                  </label>
                  <input
                    type="text"
                    value={content.title || ''}
                    onChange={(e) => setEditingSection({
                      ...editingSection,
                      content: { ...content, title: e.target.value }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7A072] focus:border-transparent"
                    placeholder="Bölüm başlığı"
                  />
                </div>

                {(type === 'category-carousel' || type === 'featured-products' || type === 'newsletter') && (
                  <div>
                    <label className="block text-sm font-semibold mb-2">Alt Başlık / Açıklama</label>
                    <input
                      type="text"
                      value={content.subtitle || content.description || ''}
                      onChange={(e) => setEditingSection({
                        ...editingSection,
                        content: { ...content, [type === 'newsletter' ? 'description' : 'subtitle']: e.target.value }
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7A072] focus:border-transparent"
                      placeholder="Kısa açıklama"
                    />
                  </div>
                )}
              </>
            )}

            {/* Background Color */}
            <div>
              <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                <Palette size={16} />
                Arkaplan Rengi
              </label>
              <div className="flex gap-3">
                <input
                  type="color"
                  value={content.backgroundColor || '#ffffff'}
                  onChange={(e) => setEditingSection({
                    ...editingSection,
                    content: { ...content, backgroundColor: e.target.value }
                  })}
                  className="h-10 w-20 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={content.backgroundColor || '#ffffff'}
                  onChange={(e) => setEditingSection({
                    ...editingSection,
                    content: { ...content, backgroundColor: e.target.value }
                  })}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7A072] focus:border-transparent"
                  placeholder="#ffffff"
                />
              </div>
            </div>

            {/* Text Color for certain sections */}
            {(type === 'promo-banner' || type === 'newsletter') && (
              <div>
                <label className="block text-sm font-semibold mb-2">Yazı Rengi</label>
                <div className="flex gap-3">
                  <input
                    type="color"
                    value={content.textColor || '#000000'}
                    onChange={(e) => setEditingSection({
                      ...editingSection,
                      content: { ...content, textColor: e.target.value }
                    })}
                    className="h-10 w-20 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={content.textColor || '#000000'}
                    onChange={(e) => setEditingSection({
                      ...editingSection,
                      content: { ...content, textColor: e.target.value }
                    })}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7A072] focus:border-transparent"
                    placeholder="#000000"
                  />
                </div>
              </div>
            )}

            {/* Button for sections with CTA */}
            {(type === 'featured-products' || type === 'promo-banner' || type === 'newsletter') && (
              <>
                <div>
                  <label className="block text-sm font-semibold mb-2">Buton Metni</label>
                  <input
                    type="text"
                    value={content.buttonText || ''}
                    onChange={(e) => setEditingSection({
                      ...editingSection,
                      content: { ...content, buttonText: e.target.value }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7A072] focus:border-transparent"
                    placeholder="Buton yazısı"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Buton Rengi</label>
                  <div className="flex gap-3">
                    <input
                      type="color"
                      value={content.buttonColor || '#F7A072'}
                      onChange={(e) => setEditingSection({
                        ...editingSection,
                        content: { ...content, buttonColor: e.target.value }
                      })}
                      className="h-10 w-20 border border-gray-300 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={content.buttonColor || '#F7A072'}
                      onChange={(e) => setEditingSection({
                        ...editingSection,
                        content: { ...content, buttonColor: e.target.value }
                      })}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7A072] focus:border-transparent"
                      placeholder="#F7A072"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Image for Promo Banner */}
            {type === 'promo-banner' && (
              <ImageUpload
                label="Banner Görseli"
                value={content.image || ''}
                onChange={(image) => setEditingSection({
                  ...editingSection,
                  content: { ...content, image: image as string }
                })}
                multiple={false}
              />
            )}

            {/* Description for Promo Banner */}
            {(type === 'promo-banner' || type === 'seasonal-collection') && (
              <div>
                <label className="block text-sm font-semibold mb-2">Açıklama</label>
                <textarea
                  value={content.description || ''}
                  onChange={(e) => setEditingSection({
                    ...editingSection,
                    content: { ...content, description: e.target.value }
                  })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7A072] focus:border-transparent"
                  placeholder="Detaylı açıklama"
                />
              </div>
            )}

            {/* Preview Section */}
            <div className="border-t pt-6">
              <h4 className="font-semibold mb-3">Önizleme</h4>
              <div
                className="rounded-lg p-8 text-center"
                style={{
                  backgroundColor: content.backgroundColor || '#ffffff',
                  color: content.textColor || '#000000'
                }}
              >
                {content.title && <h3 className="text-2xl font-bold mb-2">{content.title}</h3>}
                {(content.subtitle || content.description) && (
                  <p className="mb-4 opacity-80">{content.subtitle || content.description}</p>
                )}
                {content.buttonText && (
                  <button
                    style={{ backgroundColor: content.buttonColor || '#F7A072' }}
                    className="px-6 py-2 rounded-lg text-white font-semibold"
                  >
                    {content.buttonText}
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t">
            <Button
              variant="secondary"
              onClick={() => setEditingSection(null)}
            >
              İptal
            </Button>
            <Button onClick={saveSection} disabled={saving}>
              <Save size={18} className="mr-2" />
              {saving ? 'Kaydediliyor...' : 'Kaydet'}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

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

              <ImageUpload
                label="Logo Görseli"
                value={logo}
                onChange={(image) => setLogo(image as string)}
                multiple={false}
              />

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
                <p className="text-sm text-gray-500 mt-1">Ana tema rengi (butonlar, vurgular için)</p>
              </div>

              <div className="pt-4">
                <Button onClick={saveGeneralSettings} disabled={saving}>
                  <Save size={18} className="mr-2" />
                  {saving ? 'Kaydediliyor...' : 'Ayarları Kaydet'}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Hero Tab */}
      {activeTab === 'hero' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Hero Slaytları</h2>
            <Button onClick={addHeroSlide}>
              <Plus size={18} className="mr-2" />
              Yeni Slayt Ekle
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {heroSlides.map((slide) => (
              <Card key={slide.id} padding="none">
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  {slide.image && (
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute top-3 right-3">
                    <Badge variant={slide.enabled ? 'success' : 'default'}>
                      {slide.enabled ? 'Aktif' : 'Pasif'}
                    </Badge>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{slide.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{slide.subtitle}</p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => {
                        setEditingSlide(slide);
                        setShowSlideModal(true);
                      }}
                    >
                      <Edit2 size={16} className="mr-1" />
                      Düzenle
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => deleteSlide(slide.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
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
            <h2 className="text-xl font-bold">Ana Sayfa Bölümleri</h2>
            <Button onClick={() => setShowSectionModal(true)}>
              <Plus size={18} className="mr-2" />
              Yeni Bölüm Ekle
            </Button>
          </div>

          <div className="space-y-3">
            {sections.map((section) => {
              const SectionIcon = sectionTypes.find(s => s.value === section.type)?.icon || Layout;
              return (
                <Card key={section.id} padding="md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => moveSection(section.id, 'up')}
                          className="text-gray-400 hover:text-gray-600 disabled:opacity-30"
                          disabled={section.order === 1}
                        >
                          <ChevronUp size={16} />
                        </button>
                        <button
                          onClick={() => moveSection(section.id, 'down')}
                          className="text-gray-400 hover:text-gray-600 disabled:opacity-30"
                          disabled={section.order === sections.length}
                        >
                          <ChevronDown size={16} />
                        </button>
                      </div>

                      <SectionIcon size={24} className="text-gray-400" />

                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{section.name}</h3>
                          <Badge variant={section.enabled ? 'success' : 'default'}>
                            {section.enabled ? 'Aktif' : 'Pasif'}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500">
                          {section.content.title || 'İçerik ayarlanmamış'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => editSection(section)}
                      >
                        <Edit2 size={16} className="mr-1" />
                        Düzenle
                      </Button>
                      <Button
                        size="sm"
                        variant={section.enabled ? 'secondary' : 'primary'}
                        onClick={() => toggleSection(section.id)}
                      >
                        <Eye size={16} className="mr-1" />
                        {section.enabled ? 'Gizle' : 'Göster'}
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => removeSection(section.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Hero Slide Modal */}
      {showSlideModal && editingSlide && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold">Hero Slayt Düzenle</h3>
              <button
                onClick={() => {
                  setShowSlideModal(false);
                  setEditingSlide(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-4">
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
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <ImageUpload
                label="Slayt Görseli"
                value={editingSlide.image}
                onChange={(image) => setEditingSlide({ ...editingSlide, image: image as string })}
                multiple={false}
              />

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
                <label className="block text-sm font-semibold mb-2">Buton Linki</label>
                <input
                  type="text"
                  value={editingSlide.link}
                  onChange={(e) => setEditingSlide({ ...editingSlide, link: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7A072] focus:border-transparent"
                  placeholder="/products"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="slideEnabled"
                  checked={editingSlide.enabled}
                  onChange={(e) => setEditingSlide({ ...editingSlide, enabled: e.target.checked })}
                  className="rounded"
                />
                <label htmlFor="slideEnabled" className="text-sm font-semibold">Aktif</label>
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t">
              <Button
                variant="secondary"
                onClick={() => {
                  setShowSlideModal(false);
                  setEditingSlide(null);
                }}
              >
                İptal
              </Button>
              <Button onClick={saveSlide}>
                <Save size={18} className="mr-2" />
                Kaydet
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Add Section Modal */}
      {showSectionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full">
            <div className="px-6 py-4 border-b flex items-center justify-between">
              <h3 className="text-xl font-bold">Yeni Bölüm Ekle</h3>
              <button
                onClick={() => setShowSectionModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-3">
              {sectionTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.value}
                    onClick={() => addSection(type.value as Section['type'])}
                    className="w-full flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-[#F7A072] hover:bg-orange-50 transition"
                  >
                    <Icon size={24} className="text-gray-400" />
                    <span className="font-semibold">{type.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Section Editor Modal */}
      {renderSectionEditor()}
    </div>
  );
}
