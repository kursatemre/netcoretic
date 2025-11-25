'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Eye, Filter } from 'lucide-react';
import { Badge, LoadingSpinner, Select, Pagination } from '@/components/ui';
import { adminOrderApi } from '@/lib/api';
import { formatCurrency, formatDate, ORDER_STATUS_LABELS } from '@/utils';

interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  status: string;
  totalAmount: number;
  createdAt: string;
  items: Array<{
    id: string;
    productName: string;
    quantity: number;
  }>;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchOrders();
  }, [currentPage, statusFilter]);

  const fetchOrders = async () => {
    try {
      const params = {
        pageNumber: currentPage,
        pageSize: 20,
        ...(statusFilter && { status: statusFilter })
      };

      const response = await adminOrderApi.getAll(params);
      setOrders(response.data.items);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusVariant = (status: string): 'success' | 'info' | 'warning' | 'danger' | 'purple' | 'default' => {
    if (status === 'Delivered') return 'success';
    if (status === 'Processing') return 'info';
    if (status === 'Shipped') return 'purple';
    if (status === 'Pending') return 'warning';
    if (status === 'Cancelled') return 'danger';
    return 'default';
  };

  if (loading) return <div className="flex items-center justify-center h-64"><LoadingSpinner size="lg" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Siparişler</h1>
          <p className="mt-2 text-sm text-gray-700">Tüm siparişleri görüntüleyin ve yönetin</p>
        </div>
      </div>

      <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} label="Durum Filtresi">
        <option value="">Tüm Durumlar</option>
        <option value="Pending">Bekliyor</option>
        <option value="Processing">İşleniyor</option>
        <option value="Shipped">Kargoda</option>
        <option value="Delivered">Teslim Edildi</option>
        <option value="Cancelled">İptal</option>
      </Select>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sipariş No</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ürün Sayısı</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Toplam</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Durum</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tarih</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">İşlemler</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.orderNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.items.length} ürün</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(order.totalAmount)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant={getStatusVariant(order.status)}>
                    {ORDER_STATUS_LABELS[order.status] || order.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(order.createdAt)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link href={`/admin/orders/${order.id}`} className="text-indigo-600 hover:text-indigo-900">
                    <Eye className="h-5 w-5 inline" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
}
