'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Button, Input, TextArea, Modal, Badge, LoadingSpinner } from '@/components/ui';
import { adminBrandApi } from '@/lib/api';

interface Brand {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logoUrl?: string;
  isActive: boolean;
  productCount?: number;
}

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [formData, setFormData] = useState({ name: '', description: '', logoUrl: '', isActive: true });

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await adminBrandApi.getAll();
      setBrands(response.data);
    } catch (error) {
      console.error('Error fetching brands:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingBrand) {
        await adminBrandApi.update(editingBrand.id, formData);
      } else {
        await adminBrandApi.create(formData);
      }
      setShowModal(false);
      setFormData({ name: '', description: '', logoUrl: '', isActive: true });
      setEditingBrand(null);
      fetchBrands();
    } catch (error) {
      console.error('Error saving brand:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu markayı silmek istediğinizden emin misiniz?')) return;
    try {
      await adminBrandApi.delete(id);
      fetchBrands();
    } catch (error) {
      console.error('Error deleting brand:', error);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64"><LoadingSpinner size="lg" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Markalar</h1>
          <p className="mt-2 text-sm text-gray-700">Marka yönetimi</p>
        </div>
        <Button onClick={() => { setEditingBrand(null); setFormData({ name: '', description: '', logoUrl: '', isActive: true }); setShowModal(true); }}>
          <Plus className="h-5 w-5 mr-2" />
          Yeni Marka
        </Button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Marka Adı</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Açıklama</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ürün Sayısı</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Durum</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">İşlemler</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {brands.map((brand) => (
              <tr key={brand.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{brand.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{brand.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{brand.productCount || 0}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant={brand.isActive ? 'success' : 'danger'}>
                    {brand.isActive ? 'Aktif' : 'Pasif'}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => { setEditingBrand(brand); setFormData({ name: brand.name, description: brand.description || '', logoUrl: brand.logoUrl || '', isActive: brand.isActive }); setShowModal(true); }} className="text-blue-600 hover:text-blue-900 mr-3">
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleDelete(brand.id)} className="text-red-600 hover:text-red-900">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editingBrand ? 'Marka Düzenle' : 'Yeni Marka'} footer={<><Button variant="secondary" onClick={() => setShowModal(false)}>İptal</Button><Button onClick={handleSubmit}>{editingBrand ? 'Güncelle' : 'Oluştur'}</Button></>}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Marka Adı" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          <TextArea label="Açıklama" rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
          <Input label="Logo URL" type="url" value={formData.logoUrl} onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })} />
          <label className="flex items-center">
            <input type="checkbox" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} className="mr-2" />
            <span className="text-sm text-gray-700">Aktif</span>
          </label>
        </form>
      </Modal>
    </div>
  );
}
