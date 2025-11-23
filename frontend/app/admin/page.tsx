'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Package, ShoppingCart, Users, DollarSign } from 'lucide-react';

interface DashboardStats {
  totalProducts: number;
  activeProducts: number;
  lowStockProducts: number;
  totalOrders: number;
  pendingOrders: number;
  processingOrders: number;
  todayOrders: number;
  totalRevenue: number;
  todayRevenue: number;
  thisMonthRevenue: number;
  totalUsers: number;
  activeUsers: number;
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
      const token = localStorage.getItem('token');
      
      const [statsRes, ordersRes] = await Promise.all([
        fetch('http://localhost:5000/api/admin/dashboard/overview', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('http://localhost:5000/api/admin/dashboard/recent-orders?limit=5', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }

      if (ordersRes.ok) {
        const ordersData = await ordersRes.json();
        setRecentOrders(ordersData);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Yükleniyor...</div>
      </div>
    );
  }

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
        {/* Total Revenue */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DollarSign className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Toplam Gelir
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      ₺{stats?.totalRevenue.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                    </div>
                    {stats && stats.revenueGrowth !== 0 && (
                      <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                        stats.revenueGrowth > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stats.revenueGrowth > 0 ? (
                          <TrendingUp className="h-4 w-4 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 mr-1" />
                        )}
                        {Math.abs(stats.revenueGrowth)}%
                      </div>
                    )}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ShoppingCart className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Toplam Sipariş
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {stats?.totalOrders}
                    </div>
                    {stats && stats.ordersGrowth !== 0 && (
                      <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                        stats.ordersGrowth > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stats.ordersGrowth > 0 ? (
                          <TrendingUp className="h-4 w-4 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 mr-1" />
                        )}
                        {Math.abs(stats.ordersGrowth)}%
                      </div>
                    )}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Total Products */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Package className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Toplam Ürün
                  </dt>
                  <dd className="text-2xl font-semibold text-gray-900">
                    {stats?.totalProducts}
                  </dd>
                  <dd className="text-xs text-gray-500 mt-1">
                    {stats?.activeProducts} aktif, {stats?.lowStockProducts} düşük stok
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Total Users */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Toplam Kullanıcı
                  </dt>
                  <dd className="text-2xl font-semibold text-gray-900">
                    {stats?.totalUsers}
                  </dd>
                  <dd className="text-xs text-gray-500 mt-1">
                    {stats?.activeUsers} aktif kullanıcı
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white shadow rounded-lg">
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
                    ₺{order.totalAmount.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString('tr-TR')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <h3 className="text-sm font-medium text-gray-500">Bugün</h3>
            <div className="mt-2 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">
                {stats?.todayOrders} Sipariş
              </p>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              ₺{stats?.todayRevenue.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} gelir
            </p>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <h3 className="text-sm font-medium text-gray-500">Bekleyen Siparişler</h3>
            <div className="mt-2 flex items-baseline">
              <p className="text-2xl font-semibold text-yellow-600">
                {stats?.pendingOrders}
              </p>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              İşlem bekliyor
            </p>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <h3 className="text-sm font-medium text-gray-500">İşlemdeki Siparişler</h3>
            <div className="mt-2 flex items-baseline">
              <p className="text-2xl font-semibold text-blue-600">
                {stats?.processingOrders}
              </p>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Hazırlanıyor
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
