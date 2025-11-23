# 🛍️ Kusursuz E-Ticaret Platformu

Profesyonel, ölçeklenebilir ve modern bir e-ticaret platformu. Clean Architecture prensiplerine uygun, mikroservis mimarisine hazır yapıda geliştirilmiştir.

## 🎯 Proje Özellikleri

### Backend (ASP.NET Core 8.0)
- ✅ **Clean Architecture** - Domain, Application, Infrastructure, API katmanları
- ✅ **CQRS Pattern** - MediatR ile komut/sorgu ayrımı
- ✅ **Repository Pattern & Unit of Work**
- ✅ **Entity Framework Core** - Code First yaklaşımı
- ✅ **PostgreSQL** - Güçlü ve açık kaynaklı veritabanı
- ✅ **Redis Cache** - Performans optimizasyonu
- ✅ **Elasticsearch** - Full-text search, autocomplete, faceted search
- ✅ **FluentValidation** - Güçlü validation katmanı
- ✅ **JWT Authentication** - Güvenli kimlik doğrulama
- ✅ **Swagger/OpenAPI** - API dokümantasyonu

### Öne Çıkan Modüller
- ✅ **Product CRUD** - Gelişmiş filtreleme, pagination, sorting
- ✅ **Sınırsız Varyasyon Sistemi** - Her ürüne sınırsız özellik (renk, beden, hafıza vb.)
- ✅ **Dinamik Stok Yönetimi** - Varyasyon bazlı stok takibi
- ✅ **Order Management** - Sipariş oluşturma, durum takibi, otomatik vergi hesaplama
- ✅ **Elasticsearch Integration** - Full-text search, fuzzy matching, autocomplete
- 💳 **Ödeme Adaptörleri** - Iyzico ve diğer ödeme sistemleri için hazır altyapı
- 🚚 **Kargo Adaptörleri** - Yurtiçi Kargo, MNG vb. için genişletilebilir yapı

### Frontend (Next.js 14)
- ✅ **Next.js 14** - App Router ile modern React
- ✅ **TypeScript** - Tip güvenliği
- ✅ **Tailwind CSS** - Modern ve responsive tasarım
- ✅ **Product Listing** - Pagination ve filtering
- ✅ **Product Detail** - Varyasyon desteği
- ✅ **Search Page** - Elasticsearch entegrasyonu
- ✅ **Shopping Cart** - LocalStorage ile sepet yönetimi
- ✅ **Axios** - API client with interceptors

### DevOps & Cloud
- 🐳 **Docker & Docker Compose** - Konteynerizasyon
- 🔄 **GitHub Actions** - CI/CD pipeline
- ☁️ **Azure/AWS Ready** - Cloud deployment hazır
- 📊 **Elasticsearch + Kibana** - Log ve analytics

## 📁 Proje Yapısı

```
netcoretic/
├── src/
│   ├── Domain/              # İş mantığı, Entity'ler, Interface'ler
│   │   ├── Entities/        # Product, Order, User vb.
│   │   ├── Enums/           # OrderStatus, PaymentStatus vb.
│   │   ├── Interfaces/      # IRepository, IUnitOfWork
│   │   └── ValueObjects/
│   │
│   ├── Application/         # CQRS, DTOs, Validators
│   │   ├── Commands/        # CreateProductCommand vb.
│   │   ├── Queries/         # GetProductByIdQuery vb.
│   │   ├── DTOs/            # Data Transfer Objects
│   │   └── Validators/      # FluentValidation rules
│   │
│   ├── Infrastructure/      # Dış bağımlılıklar
│   │   ├── Data/            # EF Core DbContext
│   │   ├── Repositories/    # Repository implementations
│   │   ├── Adapters/        # Ödeme/Kargo adaptörleri
│   │   │   ├── Payment/     # Iyzico, PayPal vb.
│   │   │   └── Shipping/    # Yurtiçi, MNG vb.
│   │   └── Services/        # External services
│   │
│   └── API/                 # RESTful API
│       ├── Controllers/     # API endpoints
│       ├── Middleware/      # Exception handling vb.
│       └── Program.cs       # DI configuration
│
├── frontend/                # Next.js Frontend
│   ├── app/                 # Next.js 14 App Router
│   ├── components/          # React components
│   ├── lib/                 # Utilities, API client
│   └── types/               # TypeScript types
│
├── tests/                   # Test projesi (TODO)
├── docker-compose.yml       # Multi-container setup
├── Dockerfile               # Backend Docker image
└── .github/workflows/       # CI/CD pipelines
```

## 🚀 Hızlı Başlangıç

### Gereksinimler
- **.NET 8.0 SDK** - [İndir](https://dotnet.microsoft.com/download/dotnet/8.0)
- **Node.js 20+** - [İndir](https://nodejs.org/)
- **Docker Desktop** - [İndir](https://www.docker.com/products/docker-desktop)

### 1️⃣ Projeyi Klonlayın
```bash
git clone https://github.com/kursatemre/netcoretic.git
cd netcoretic
```

### 2️⃣ Docker ile Tüm Servisleri Başlatın
```bash
docker-compose up -d
```

Bu komut şunları başlatır:
- PostgreSQL (Port: 5432)
- Redis (Port: 6379)
- Backend API (Port: 5000)
- Elasticsearch (Port: 9200)
- Kibana (Port: 5601)

### 3️⃣ Frontend'i Başlatın (İsteğe Bağlı - Disk doluysa skip edilebilir)
```bash
cd frontend
npm install  # Node modules kurulumu için ~500MB disk gerekir
npm run dev
```

**Erişim URL'leri:**
- Backend API: http://localhost:5000
- Swagger UI: http://localhost:5000/swagger
- Frontend: http://localhost:3000 (npm install yapıldıysa)
- Kibana: http://localhost:5601
- Elasticsearch: http://localhost:9200

## 🔧 Manuel Kurulum (Docker olmadan)

### Backend
```bash
# Bağımlılıkları yükle
dotnet restore

# Veritabanı migration'ları uygula
cd src/Infrastructure
dotnet ef database update --startup-project ../API

# API'yi çalıştır
cd ../API
dotnet run
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 📊 Veritabanı Migrasyonu

```bash
# Yeni migration oluştur
cd src/Infrastructure
dotnet ef migrations add InitialCreate --startup-project ../API

# Migration'ı uygula
dotnet ef database update --startup-project ../API
```

## 🐳 Docker Komutları

```bash
# Tüm servisleri başlat
docker-compose up -d

# Logları görüntüle
docker-compose logs -f

# Servisleri durdur
docker-compose down

# Servisleri durdur ve volume'leri sil
docker-compose down -v
```

## 🌐 API Endpoints

### Ürünler
- `GET /api/products` - Tüm ürünleri listele
- `GET /api/products/{id}` - Ürün detayı
- `POST /api/products` - Yeni ürün oluştur
- `PUT /api/products/{id}` - Ürün güncelle
- `DELETE /api/products/{id}` - Ürün sil

### Kategoriler
- `GET /api/categories` - Tüm kategoriler
- `GET /api/categories/{id}` - Kategori detayı

### Siparişler
- `GET /api/orders` - Kullanıcının siparişleri
- `POST /api/orders` - Yeni sipariş oluştur

**Tüm endpoint'ler için:** http://localhost:5000/swagger

## 🔐 Güvenlik

- JWT Bearer Authentication (Ready to implement)
- Role-based Authorization
- CORS yapılandırması
- Input Validation (FluentValidation)
- SQL Injection koruması (EF Core)

## 📈 Performans Optimizasyonları

- Redis Cache kullanımı
- Database indexing
- Eager/Lazy loading optimizasyonu
- Response compression
- CDN desteği (Azure/AWS)

## 📚 Teknoloji Stack

### Backend
- ASP.NET Core 8.0
- Entity Framework Core 8.0
- PostgreSQL 16
- Redis 7
- MediatR (CQRS)
- FluentValidation
- Swagger/OpenAPI

### Frontend
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Axios

### DevOps
- Docker & Docker Compose
- GitHub Actions
- Elasticsearch & Kibana

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add some amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!