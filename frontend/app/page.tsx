import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen p-8 md:p-24">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">
          🛍️ E-Commerce Platform
        </h1>
        <p className="text-gray-600 mb-8">
          Modern, ölçeklenebilir e-ticaret platformu - Clean Architecture ile geliştirildi
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link 
            href="/products"
            className="p-6 border border-gray-300 rounded-lg hover:border-blue-500 hover:shadow-lg transition-all"
          >
            <h2 className="text-2xl font-semibold mb-2">📦 Ürünler</h2>
            <p className="text-gray-600">Tüm ürünleri görüntüle ve filtrele</p>
          </Link>

          <Link 
            href="/search"
            className="p-6 border border-gray-300 rounded-lg hover:border-blue-500 hover:shadow-lg transition-all"
          >
            <h2 className="text-2xl font-semibold mb-2">🔍 Ara</h2>
            <p className="text-gray-600">Elasticsearch ile güçlü arama</p>
          </Link>

          <Link 
            href="/cart"
            className="p-6 border border-gray-300 rounded-lg hover:border-blue-500 hover:shadow-lg transition-all"
          >
            <h2 className="text-2xl font-semibold mb-2">🛒 Sepet</h2>
            <p className="text-gray-600">Alışveriş sepetini görüntüle</p>
          </Link>

          <a 
            href="http://localhost:5000/swagger"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 border border-gray-300 rounded-lg hover:border-blue-500 hover:shadow-lg transition-all"
          >
            <h2 className="text-2xl font-semibold mb-2">📚 API Docs</h2>
            <p className="text-gray-600">Swagger API dokümantasyonu</p>
          </a>
        </div>

        <div className="mt-12 p-6 bg-blue-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">✨ Proje Özellikleri</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div>
              <li className="mb-1">✅ Clean Architecture</li>
              <li className="mb-1">✅ CQRS Pattern (MediatR)</li>
              <li className="mb-1">✅ EF Core + PostgreSQL</li>
              <li className="mb-1">✅ Redis Cache</li>
              <li className="mb-1">✅ JWT Authentication</li>
            </div>
            <div>
              <li className="mb-1">✅ Elasticsearch Search</li>
              <li className="mb-1">✅ Product Variations</li>
              <li className="mb-1">✅ Order Management</li>
              <li className="mb-1">✅ Docker Compose</li>
              <li className="mb-1">✅ Next.js 14 + TypeScript</li>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
