'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import { Button, Input, Card } from '@/components/ui';
import { adminBrandApi } from '@/lib/api';

export default function NewBrandPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    displayOrder: 0,
    isActive: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      await adminBrandApi.create(formData);
      alert('Marka başarıyla eklendi!');
      router.push('/admin/brands');
    } catch (error: any) {
      console.error('Error creating brand:', error);
      alert(`Hata: ${error.response?.data?.message || 'Marka eklenirken bir hata oluştu'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) : value
    }));
  };

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="secondary" onClick={() => router.back()}>
          <ArrowLeft size={18} className="mr-2" />
          Geri
        </Button>
        <h1 className="text-2xl font-bold">Yeni Marka Ekle</h1>
      </div>

      <Card padding="lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Marka Adı *</label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Örn: Samsung"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Slug *</label>
            <Input
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              placeholder="samsung"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Açıklama</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7A072] focus:border-transparent"
              placeholder="Marka açıklaması"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Sıralama</label>
            <Input
              type="number"
              name="displayOrder"
              value={formData.displayOrder}
              onChange={handleChange}
              min="0"
              placeholder="0"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
              className="w-4 h-4 rounded"
            />
            <label className="text-sm font-semibold">Aktif</label>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={loading}>
              <Save size={18} className="mr-2" />
              {loading ? 'Kaydediliyor...' : 'Markayı Kaydet'}
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
