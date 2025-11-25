'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Tags,
  FolderTree,
  LogOut,
  Menu,
  X,
  Store,
  Home
} from 'lucide-react';
import { useState } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Mağaza', href: '/admin/store', icon: Store },
  { name: 'Ürünler', href: '/admin/products', icon: Package },
  { name: 'Kategoriler', href: '/admin/categories', icon: FolderTree },
  { name: 'Markalar', href: '/admin/brands', icon: Tags },
  { name: 'Siparişler', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Kullanıcılar', href: '/admin/users', icon: Users },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? '' : 'pointer-events-none'}`}>
        <div
          className={`fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity ${
            sidebarOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setSidebarOpen(false)}
        />
        <div
          className={`fixed inset-y-0 left-0 flex w-72 flex-col bg-white shadow-xl transform transition-transform ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Mobile Header */}
          <div className="flex h-16 items-center justify-between px-6 bg-gradient-to-r from-[#F7A072] to-[#ff8c5a]">
            <h1 className="text-xl font-bold text-white">NetCoretic Admin</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-white hover:text-gray-100 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                    isActive
                      ? 'bg-[#F7A072] text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Footer */}
          <div className="border-t border-gray-200 p-4 space-y-2">
            <Link
              href="/"
              className="flex w-full items-center px-4 py-3 text-sm font-medium text-gray-700 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <Home className="mr-3 h-5 w-5 text-gray-500" />
              Siteye Dön
            </Link>
            <button className="flex w-full items-center px-4 py-3 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 transition-colors">
              <LogOut className="mr-3 h-5 w-5" />
              Çıkış Yap
            </button>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <div className="flex flex-col flex-1 min-h-0 bg-white shadow-lg">
          {/* Desktop Header */}
          <div className="flex h-20 items-center px-6 bg-gradient-to-r from-[#F7A072] to-[#ff8c5a]">
            <div>
              <h1 className="text-2xl font-bold text-white">NetCoretic</h1>
              <p className="text-xs text-white/80 mt-0.5">Admin Paneli</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-6 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all group ${
                    isActive
                      ? 'bg-[#F7A072] text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className={`mr-3 h-5 w-5 transition-colors ${
                    isActive ? 'text-white' : 'text-gray-500 group-hover:text-[#F7A072]'
                  }`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Footer */}
          <div className="border-t border-gray-200 p-4 space-y-2">
            <Link
              href="/"
              className="flex w-full items-center px-4 py-3 text-sm font-medium text-gray-700 rounded-xl hover:bg-gray-50 transition-colors group"
            >
              <Home className="mr-3 h-5 w-5 text-gray-500 group-hover:text-[#F7A072]" />
              Siteye Dön
            </Link>
            <button className="flex w-full items-center px-4 py-3 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 transition-colors">
              <LogOut className="mr-3 h-5 w-5" />
              Çıkış Yap
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:px-6 lg:px-8">
          <button
            type="button"
            className="lg:hidden -m-2.5 p-2.5 text-gray-700 hover:text-gray-900"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch items-center">
            <div className="flex flex-1">
              <h2 className="text-lg font-semibold text-gray-900">
                {navigation.find(item => item.href === pathname)?.name || 'Dashboard'}
              </h2>
            </div>
            <div className="flex items-center gap-x-4">
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#F7A072] to-[#ff8c5a] flex items-center justify-center text-white font-semibold text-sm">
                  A
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Admin User
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-6 min-h-screen">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
