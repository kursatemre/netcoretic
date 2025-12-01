'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import { Button, Input, Card, ImageUpload } from '@/components/ui';
import { adminProductApi, adminCategoryApi, adminBrandApi } from '@/lib/api';

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    shortDescription: '',
    sku: '',
    basePrice: 0,
    discountedPrice: 0,
    categoryId: '',
    brandId: '',
    isActive: true,
    isFeatured: false,
    images: [] as string[],
  });

  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await adminCategoryApi.getAll();
      setCategories(response.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await adminBrandApi.getAll();
      setBrands(response.data || []);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      await adminProductApi.create(formData);
      alert('Ürün başarıyla eklendi!');
      router.push('/admin/products');
    } catch (error: any) {
      console.error('Error creating product:', error);
      alert(`Hata: ${error.response?.data?.message || 'Ürün eklenirken bir hata oluştu'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value
    }));
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="secondary" onClick={() => router.back()}>
          <ArrowLeft size={18} className="mr-2" />
          Geri
        </Button>
        <h1 className="text-2xl font-bold">Yeni Ürün Ekle</h1>
      </div>

      <Card padding="lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Ürün Adı *</label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Örn: Samsung Galaxy S24"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Slug *</label>
              <Input
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
                placeholder="samsung-galaxy-s24"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">SKU *</label>
              <Input
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                required
                placeholder="SAM-S24-001"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Kategori *</label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7A072] focus:border-transparent"
              >
                <option value="">Kategori Seçin</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Marka</label>
              <select
                name="brandId"
                value={formData.brandId}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7A072] focus:border-transparent"
              >
                <option value="">Marka Seçin (Opsiyonel)</option>
                {brands.map(brand => (
                  <option key={brand.id} value={brand.id}>{brand.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Normal Fiyat *</label>
              <Input
                type="number"
                name="basePrice"
                value={formData.basePrice}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">İndirimli Fiyat</label>
              <Input
                type="number"
                name="discountedPrice"
                value={formData.discountedPrice}
                onChange={handleChange}
                min="0"
                step="0.01"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Kısa Açıklama</label>
            <Input
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              placeholder="Kısa ürün açıklaması"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Detaylı Açıklama</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7A072] focus:border-transparent"
              placeholder="Detaylı ürün açıklaması"
            />
          </div>

          {/* Ürün Görselleri */}
          <ImageUpload
            label="Ürün Görselleri"
            value={formData.images}
            onChange={(images) => setFormData(prev => ({ ...prev, images: images as string[] }))}
            multiple={true}
            maxFiles={10}
          />

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                className="w-4 h-4 rounded"
              />
              <span className="text-sm font-semibold">Aktif</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
                className="w-4 h-4 rounded"
              />
              <span className="text-sm font-semibold">Öne Çıkan</span>
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={loading}>
              <Save size={18} className="mr-2" />
              {loading ? 'Kaydediliyor...' : 'Ürünü Kaydet'}
            </Button>
            <Button type="button" variant="secondary" onClick={() => router.back()}>
              İptal
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
