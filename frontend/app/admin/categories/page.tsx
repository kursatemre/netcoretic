'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button, Input, TextArea, Modal, LoadingSpinner } from '@/components/ui';
import { adminCategoryApi } from '@/lib/api';

interface Category {
  id: string;
  name: string;
  description: string;
  productCount: number;
  createdAt: string;
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({ name: '', description: '' });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await adminCategoryApi.getAll();
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await adminCategoryApi.update(editingCategory.id, { id: editingCategory.id, ...formData });
      } else {
        await adminCategoryApi.create(formData);
      }
      setShowModal(false);
      setFormData({ name: '', description: '' });
      setEditingCategory(null);
      fetchCategories();
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu kategoriyi silmek istediğinizden emin misiniz?')) return;
    try {
      await adminCategoryApi.delete(id);
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64"><LoadingSpinner size="lg" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kategoriler</h1>
          <p className="mt-2 text-sm text-gray-700">Ürün kategorilerini yönetin</p>
        </div>
        <Button onClick={() => { setEditingCategory(null); setFormData({ name: '', description: '' }); setShowModal(true); }}>
          <Plus className="h-5 w-5 mr-2" />
          Yeni Kategori
        </Button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kategori Adı</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Açıklama</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ürün Sayısı</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">İşlemler</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map((category) => (
              <tr key={category.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{category.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{category.description}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{category.productCount}</td>
                <td className="px-6 py-4 text-right text-sm font-medium">
                  <button onClick={() => { setEditingCategory(category); setFormData({ name: category.name, description: category.description || '' }); setShowModal(true); }} className="text-indigo-600 hover:text-indigo-900 mr-4">
                    <Edit className="h-5 w-5 inline" />
                  </button>
                  <button onClick={() => handleDelete(category.id)} className="text-red-600 hover:text-red-900">
                    <Trash2 className="h-5 w-5 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editingCategory ? 'Kategori Düzenle' : 'Yeni Kategori'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Kategori Adı" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          <TextArea label="Açıklama" rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
          <div className="flex gap-3 pt-4">
            <Button type="submit">Kaydet</Button>
            <Button type="button" variant="secondary" onClick={() => setShowModal(false)}>İptal</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
