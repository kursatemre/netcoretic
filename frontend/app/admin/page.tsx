'use client';

import { useEffect, useState } from 'react';
import { DollarSign, ShoppingCart, Package, Users } from 'lucide-react';
import { StatsCard } from '@/components/admin';
import { Card, Badge, LoadingSpinner } from '@/components/ui';
import { adminDashboardApi } from '@/lib/api';
import { formatCurrency, formatDate, ORDER_STATUS_LABELS } from '@/utils';

interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  activeProducts: number;
  lowStockProducts: number;
  totalUsers: number;
  activeUsers: number;
  todayOrders: number;
  todayRevenue: number;
  pendingOrders: number;
  processingOrders: number;
  ordersGrowth: number;
  revenueGrowth: number;
}

interface RecentOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  totalAmount: number;
  status: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, ordersRes] = await Promise.all([
        adminDashboardApi.getOverview(),
        adminDashboardApi.getRecentOrders(5)
      ]);

      if (statsRes.data) setStats(statsRes.data);
      if (ordersRes.data) setRecentOrders(ordersRes.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const getStatusVariant = (status: string): 'success' | 'info' | 'warning' | 'default' => {
    if (status === 'Delivered') return 'success';
    if (status === 'Processing') return 'info';
    if (status === 'Pending') return 'warning';
    return 'default';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-sm text-gray-700">
          E-ticaret platformunuzun genel durumu
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Toplam Gelir"
          value={stats ? formatCurrency(stats.totalRevenue) : '-'}
          icon={DollarSign}
          trend={stats && stats.revenueGrowth !== 0 ? {
            value: stats.revenueGrowth,
            isPositive: stats.revenueGrowth > 0
          } : undefined}
        />

        <StatsCard
          title="Toplam Sipariş"
          value={stats?.totalOrders || 0}
          icon={ShoppingCart}
          trend={stats && stats.ordersGrowth !== 0 ? {
            value: stats.ordersGrowth,
            isPositive: stats.ordersGrowth > 0
          } : undefined}
        />

        <StatsCard
          title="Toplam Ürün"
          value={stats?.totalProducts || 0}
          subtitle={stats ? `${stats.activeProducts} aktif, ${stats.lowStockProducts} düşük stok` : undefined}
          icon={Package}
        />

        <StatsCard
          title="Toplam Kullanıcı"
          value={stats?.totalUsers || 0}
          subtitle={stats ? `${stats.activeUsers} aktif kullanıcı` : undefined}
          icon={Users}
        />
      </div>

      {/* Recent Orders */}
      <Card padding="none">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Son Siparişler</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sipariş No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Müşteri
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tutar
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tarih
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.orderNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.customerName}</div>
                    <div className="text-sm text-gray-500">{order.customerEmail}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(order.totalAmount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={getStatusVariant(order.status)}>
                      {ORDER_STATUS_LABELS[order.status] || order.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(order.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <Card padding="md">
          <h3 className="text-sm font-medium text-gray-500">Bugün</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">
              {stats?.todayOrders || 0} Sipariş
            </p>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            {stats ? formatCurrency(stats.todayRevenue) : '-'} gelir
          </p>
        </Card>

        <Card padding="md">
          <h3 className="text-sm font-medium text-gray-500">Bekleyen Siparişler</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold text-yellow-600">
              {stats?.pendingOrders || 0}
            </p>
          </div>
          <p className="mt-1 text-sm text-gray-500">İşlem bekliyor</p>
        </Card>

        <Card padding="md">
          <h3 className="text-sm font-medium text-gray-500">İşlemdeki Siparişler</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold text-blue-600">
              {stats?.processingOrders || 0}
            </p>
          </div>
          <p className="mt-1 text-sm text-gray-500">Hazırlanıyor</p>
        </Card>
      </div>
    </div>
  );
}
