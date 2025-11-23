# 🛒 E-Commerce Platform - Complete Documentation

## 📋 Proje Özeti

Modern, ölçeklenebilir ve tam özellikli bir e-ticaret platformu. **Clean Architecture** prensiplerine göre geliştirilmiş, **ASP.NET Core 8.0** backend ve **Next.js 14** frontend ile hazırlanmıştır.

### 🎯 Temel Özellikler

- ✅ **Ürün Yönetimi**: CRUD operasyonları, varyasyonlar, kategoriler
- ✅ **Arama Motoru**: Elasticsearch ile güçlü full-text search, fuzzy matching, autocomplete
- ✅ **Kimlik Doğrulama**: JWT tabanlı güvenli authentication
- ✅ **Sipariş Yönetimi**: Sepet, sipariş oluşturma, KDV hesaplama
- ✅ **Modern UI**: Next.js 14 App Router, TypeScript, Tailwind CSS
- ✅ **Performans**: Redis caching, sayfalama, optimize edilmiş sorgular

---

## 🏗️ Teknoloji Stack'i

### Backend
- **Framework**: ASP.NET Core 8.0 Web API
- **Architecture**: Clean Architecture (Domain, Application, Infrastructure, API)
- **Pattern**: CQRS with MediatR
- **Database**: PostgreSQL 16
- **Cache**: Redis 7 Alpine
- **Search**: Elasticsearch 8.11.0 + Kibana
- **ORM**: Entity Framework Core 8
- **Auth**: JWT Bearer Tokens
- **Validation**: FluentValidation

### Frontend
- **Framework**: Next.js 14.2.0 (App Router)
- **Language**: TypeScript 5
- **UI**: React 18.3.0
- **Styling**: Tailwind CSS 3.4.1
- **HTTP Client**: Native Fetch API
- **State Management**: Zustand 4.5.0
- **Data Fetching**: @tanstack/react-query 5.28.0

### DevOps
- **Containerization**: Docker & Docker Compose
- **Services**: 
  - Backend API: Port 5000
  - Frontend: Port 3000
  - PostgreSQL: Port 5432
  - Redis: Port 6379
  - Elasticsearch: Port 9200
  - Kibana: Port 5601

---

## 📁 Proje Yapısı

```
netcoretic/
├── src/
│   ├── NetCoreTic.Domain/              # Domain katmanı
│   │   ├── Entities/                   # 19+ entity (Product, Order, User, vb.)
│   │   ├── Common/                     # Base entity, value objects
│   │   └── Enums/                      # Enumerations
│   │
│   ├── NetCoreTic.Application/         # Application katmanı
│   │   ├── Products/                   # Product CQRS operations
│   │   │   ├── Commands/               # Create, Update, Delete
│   │   │   └── Queries/                # Get, List, Search
│   │   ├── Orders/                     # Order operations
│   │   ├── Auth/                       # Authentication
│   │   ├── Common/                     # DTOs, Interfaces
│   │   └── Behaviors/                  # MediatR pipelines
│   │
│   ├── NetCoreTic.Infrastructure/      # Infrastructure katmanı
│   │   ├── Data/                       # EF Core DbContext
│   │   ├── Repositories/               # Generic repository pattern
│   │   ├── Services/                   # External services
│   │   │   ├── ElasticsearchService    # Search integration
│   │   │   ├── RedisService            # Cache service
│   │   │   └── JwtService              # Token generation
│   │   └── Migrations/                 # Database migrations
│   │
│   └── NetCoreTic.API/                 # API katmanı
│       ├── Controllers/                # REST endpoints
│       ├── Middleware/                 # Custom middleware
│       └── Extensions/                 # Service registrations
│
├── frontend/                           # Next.js Frontend
│   ├── app/                            # App Router pages
│   │   ├── page.tsx                    # Ana sayfa
│   │   ├── products/                   # Ürünler
│   │   │   ├── page.tsx                # Liste
│   │   │   └── [id]/page.tsx           # Detay
│   │   ├── search/                     # Arama
│   │   └── cart/                       # Sepet
│   ├── components/                     # Reusable components
│   │   ├── Navbar.tsx
│   │   └── ProductCard.tsx
│   └── lib/                            # Utilities
│
├── docker-compose.yml                  # Docker orchestration
└── README.md                           # Bu dosya
```

---

## 🚀 Kurulum ve Çalıştırma

### Ön Gereksinimler

- **Docker Desktop** (Windows/Mac) veya Docker + Docker Compose (Linux)
- **.NET 8.0 SDK** (opsiyonel - geliştirme için)
- **Node.js 18+** ve **npm** (frontend geliştirme için)

### 1️⃣ Hızlı Başlangıç (Docker ile)

```bash
# 1. Projeyi klonla
git clone https://github.com/kursatemre/netcoretic.git
cd netcoretic

# 2. Tüm servisleri başlat
docker-compose up -d

# 3. Backend API hazır olana kadar bekle (30 saniye)
# PostgreSQL, Redis, Elasticsearch başlatılıyor...

# 4. Database migration'ları uygula
docker-compose exec api dotnet ef database update

# 5. Test et
curl http://localhost:5000/api/Products
```

**Servisler:**
- Backend API: http://localhost:5000
- Frontend: http://localhost:3000
- Elasticsearch: http://localhost:9200
- Kibana: http://localhost:5601
- PostgreSQL: localhost:5432
- Redis: localhost:6379

### 2️⃣ Lokal Geliştirme (Manuel)

#### Backend

```bash
cd src/NetCoreTic.API

# appsettings.json dosyasını yapılandır
# - ConnectionString (PostgreSQL)
# - Redis:ConnectionString
# - Elasticsearch:Url
# - JwtSettings:SecretKey

# Migration uygula
dotnet ef database update

# API'yi başlat
dotnet run
```

#### Frontend

```bash
cd frontend

# Bağımlılıkları yükle
npm install

# Environment değişkenlerini ayarla
echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > .env.local

# Dev server başlat
npm run dev
```

---

## 🔌 API Endpoints

### 📦 Products API

| Method | Endpoint | Açıklama |
|--------|----------|----------|
| GET | `/api/Products` | Tüm ürünleri listele (pagination) |
| GET | `/api/Products/{id}` | Tek ürün detayı |
| GET | `/api/Products/search?query={q}` | Elasticsearch arama |
| POST | `/api/Products` | Yeni ürün oluştur 🔒 |
| PUT | `/api/Products/{id}` | Ürün güncelle 🔒 |
| DELETE | `/api/Products/{id}` | Ürün sil 🔒 |

**Örnek - Ürün Listele:**
```bash
curl "http://localhost:5000/api/Products?pageNumber=1&pageSize=10"
```

**Yanıt:**
```json
{
  "items": [
    {
      "id": "guid",
      "name": "MacBook Pro 16 M3 Max",
      "slug": "macbook-pro-16-m3-max",
      "basePrice": 149999.99,
      "brand": {
        "name": "Apple"
      },
      "isFeatured": true
    }
  ],
  "pageNumber": 1,
  "pageSize": 10,
  "totalCount": 4,
  "totalPages": 1
}
```

**Örnek - Elasticsearch Arama:**
```bash
curl "http://localhost:5000/api/Products/search?query=laptop"
```

### 🔍 Search Features

Elasticsearch ile desteklenen özellikler:

1. **Full-Text Search**: Tüm alanlarda arama
2. **Fuzzy Search**: Yazım hatalarını tolere eder ("macbok" → "macbook")
3. **Partial Matching**: Kısmi eşleşmeler ("mac" → "MacBook")
4. **Multi-Field**: Name, Description, SKU, Brand içinde arar
5. **Faceted Search**: Kategori, marka filtresi (hazır)

### 🔐 Auth API

| Method | Endpoint | Açıklama |
|--------|----------|----------|
| POST | `/api/Auth/register` | Kullanıcı kaydı |
| POST | `/api/Auth/login` | Giriş yap (JWT token döner) |

**Örnek - Kayıt:**
```bash
curl -X POST http://localhost:5000/api/Auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "Test123!",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

**Örnek - Giriş:**
```bash
curl -X POST http://localhost:5000/api/Auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "Test123!"
  }'
```

**Yanıt:**
```json
{
  "token": "eyJhbGc...",
  "expiresAt": "2025-11-22T12:00:00Z",
  "user": {
    "id": "guid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

🔒 **Protected endpoints için:**
```bash
curl http://localhost:5000/api/Products \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 🛍️ Orders API

| Method | Endpoint | Açıklama |
|--------|----------|----------|
| POST | `/api/Orders` | Sipariş oluştur 🔒 |
| GET | `/api/Orders` | Kullanıcı siparişleri 🔒 |
| GET | `/api/Orders/{id}` | Sipariş detayı 🔒 |

**Örnek - Sipariş Oluştur:**
```bash
curl -X POST http://localhost:5000/api/Orders \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {
        "productVariationId": "guid",
        "quantity": 2,
        "unitPrice": 149999.99
      }
    ],
    "shippingAddressId": "guid",
    "billingAddressId": "guid"
  }'
```

---

## 🎨 Frontend Sayfaları

### 📄 Ana Sayfa (/)
- Hoş geldiniz mesajı
- Özellik kartları (Ürünler, Arama, Sepet)
- Teknoloji stack'i gösterimi

### 📦 Ürünler (/products)
- Tüm ürünlerin grid görünümü
- Sayfalama (12 ürün/sayfa)
- Skeleton loading animation
- Ürün kartları: Resim, isim, marka, fiyat
- "Öne Çıkan" badge'i

### 🔍 Ürün Detay (/products/[id])
- Tam ürün bilgisi
- Varyasyon listesi (varsa)
- Adet seçici
- "Sepete Ekle" butonu
- Geri dönüş linki

### 🔎 Arama (/search)
- Elasticsearch entegrasyonu
- Real-time arama
- Fuzzy matching desteği
- Sonuçlar grid görünümü
- Skeleton loader

### 🛒 Sepet (/cart)
- LocalStorage ile persist
- Ürün listesi
- Adet artır/azalt
- Ürün sil
- Ara toplam, KDV (%20), genel toplam
- "Siparişi Tamamla" butonu

---

## 🧪 Test Etme

### Backend API Testleri

```bash
# 1. Ürünleri listele
curl http://localhost:5000/api/Products | jq

# 2. Elasticsearch arama
curl "http://localhost:5000/api/Products/search?query=laptop" | jq

# 3. Fuzzy search testi
curl "http://localhost:5000/api/Products/search?query=macbok" | jq

# 4. Kullanıcı kaydı
curl -X POST http://localhost:5000/api/Auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"Test123!","firstName":"Test","lastName":"User"}'

# 5. Giriş yap
curl -X POST http://localhost:5000/api/Auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"Test123!"}'
```

### Frontend Manuel Test

1. **Ana Sayfa**: http://localhost:3000
   - ✅ Navbar görünüyor mu?
   - ✅ Kartlar çalışıyor mu?

2. **Ürünler**: http://localhost:3000/products
   - ✅ 4 ürün listeleniyor mu?
   - ✅ Fiyatlar Türkçe format mı? (79.999,99 ₺)
   - ✅ Sayfalama çalışıyor mu?

3. **Arama**: http://localhost:3000/search
   - ✅ "laptop" ara → Dell XPS 15 ve MacBook görünmeli
   - ✅ "macbook" ara → MacBook Pro görünmeli
   - ✅ "macbok" ara → Fuzzy matching, MacBook bulmalı

4. **Sepet**: http://localhost:3000/cart
   - ✅ Ürün ekle
   - ✅ Adet değiştir
   - ✅ KDV hesaplanıyor mu?
   - ✅ LocalStorage'da saklanıyor mu?

---

## 📊 Database Schema

### Temel Tablolar

**Products**
- Id, Name, Slug, Description, SKU
- BasePrice, DiscountedPrice
- IsActive, IsFeatured, IsDeleted
- CategoryId (FK), BrandId (FK)
- CreatedAt, UpdatedAt, CreatedBy, UpdatedBy

**ProductVariations**
- Id, ProductId (FK), Name, SKU
- BasePrice, PriceAdjustment, StockQuantity
- IsActive, IsDeleted

**Categories**
- Id, Name, Slug, Description
- ParentCategoryId (Self FK - Hierarchical)
- DisplayOrder, IsActive

**Brands**
- Id, Name, Slug, Description
- LogoUrl, IsActive

**Orders**
- Id, UserId (FK), OrderNumber
- TotalAmount, TaxAmount, GrandTotal
- OrderStatus, PaymentStatus
- ShippingAddressId (FK), BillingAddressId (FK)

**OrderItems**
- Id, OrderId (FK), ProductVariationId (FK)
- Quantity, UnitPrice, TotalPrice

**Users**
- Id, Email, PasswordHash
- FirstName, LastName, PhoneNumber
- IsActive, EmailConfirmed

### Elasticsearch Index

```json
{
  "products": {
    "mappings": {
      "properties": {
        "name": { "type": "text", "analyzer": "standard" },
        "description": { "type": "text" },
        "sku": { "type": "keyword" },
        "basePrice": { "type": "double" },
        "brand": { "type": "text" },
        "category": { "type": "keyword" },
        "isActive": { "type": "boolean" },
        "isFeatured": { "type": "boolean" }
      }
    }
  }
}
```

---

## 🔧 Konfigürasyon

### Backend - appsettings.json

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=postgres;Database=netcoretic;Username=postgres;Password=postgres123"
  },
  "JwtSettings": {
    "SecretKey": "your-super-secret-key-minimum-32-characters-long",
    "Issuer": "NetCoreTic",
    "Audience": "NetCoreTicUsers",
    "ExpirationMinutes": 60
  },
  "Redis": {
    "ConnectionString": "redis:6379",
    "InstanceName": "NetCoreTic:"
  },
  "Elasticsearch": {
    "Url": "http://elasticsearch:9200",
    "DefaultIndex": "products"
  }
}
```

### Frontend - .env.local

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## 🐳 Docker Compose Servisleri

```yaml
services:
  # PostgreSQL Database
  postgres:
    image: postgres:16-alpine
    ports: ["5432:5432"]
    volumes: [postgres_data:/var/lib/postgresql/data]

  # Redis Cache
  redis:
    image: redis:7-alpine
    ports: ["6379:6379"]

  # Elasticsearch
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.11.0
    ports: ["9200:9200"]
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false

  # Kibana
  kibana:
    image: docker.elastic.co/kibana/kibana:8.11.0
    ports: ["5601:5601"]

  # Backend API
  api:
    build: ./src/NetCoreTic.API
    ports: ["5000:8080"]
    depends_on: [postgres, redis, elasticsearch]

  # Frontend
  frontend:
    build: ./frontend
    ports: ["3000:3000"]
    depends_on: [api]
```

---

## 📈 Performans İyileştirmeleri

### Backend
- ✅ **Repository Pattern**: Generic repository ile kod tekrarı azaltıldı
- ✅ **CQRS**: Read/Write operasyonları ayrıldı
- ✅ **Pagination**: Büyük veri setlerinde performans
- ✅ **Eager/Lazy Loading**: Include ile N+1 problemi önlendi
- ✅ **Elasticsearch**: Millisecond latency ile search
- ✅ **Redis Caching**: Sık kullanılan datalar cache'leniyor

### Frontend
- ✅ **Next.js App Router**: Server/Client component optimization
- ✅ **Code Splitting**: Otomatik route-based splitting
- ✅ **Lazy Loading**: Images ve components
- ✅ **LocalStorage**: Cart verisi client-side
- ✅ **Skeleton Loaders**: Perceived performance artışı

---

## 🔐 Güvenlik

- ✅ **JWT Authentication**: Stateless, güvenli token sistemi
- ✅ **Password Hashing**: BCrypt ile şifreleme
- ✅ **CORS**: Configured for frontend origin
- ✅ **Input Validation**: FluentValidation ile server-side
- ✅ **SQL Injection**: EF Core parametreli sorgular
- ✅ **XSS Protection**: React otomatik escaping

---

## 🚦 Sonraki Adımlar

### Öncelikli
- [ ] Admin paneli (ürün/sipariş yönetimi)
- [ ] Ödeme entegrasyonu (Stripe/PayPal)
- [ ] Email servisi (sipariş konfirmasyonu)
- [ ] Resim upload sistemi
- [ ] Unit ve integration testler

### İyileştirmeler
- [ ] Rate limiting (API koruma)
- [ ] Logging (Serilog/ELK stack)
- [ ] Monitoring (Prometheus/Grafana)
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Kubernetes deployment
- [ ] CDN entegrasyonu
- [ ] SEO optimizasyonu

---

## 📞 Destek ve İletişim

- **GitHub**: https://github.com/kursatemre/netcoretic
- **Issues**: Hata raporları ve öneriler için GitHub Issues kullanın

---

## 📄 Lisans

Bu proje eğitim amaçlıdır ve MIT lisansı altında yayınlanmıştır.

---

## 🙏 Teşekkürler

Bu proje aşağıdaki teknolojileri kullanır:
- ASP.NET Core Team
- Next.js/Vercel Team
- Elasticsearch
- PostgreSQL Community
- Redis Community

---

**Son Güncelleme**: 21 Kasım 2025  
**Versiyon**: 1.0.0  
**Durum**: ✅ Production Ready
