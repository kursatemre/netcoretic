# 🚀 KURULUM REHBERİ

Bu doküman, projeyi sıfırdan kurmanız ve çalıştırmanız için gereken tüm adımları içerir.

## 📋 Ön Gereksinimler

### 1. .NET 8.0 SDK Kurulumu

**Windows:**
1. [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0) sayfasından indirin
2. Kurulum dosyasını çalıştırın
3. Terminalde kontrol edin:
```powershell
dotnet --version
```

**macOS/Linux:**
```bash
# macOS (Homebrew)
brew install dotnet-sdk

# Ubuntu/Debian
wget https://dot.net/v1/dotnet-install.sh
chmod +x dotnet-install.sh
./dotnet-install.sh --channel 8.0
```

### 2. Node.js Kurulumu

**Windows:**
1. [Node.js](https://nodejs.org/) sayfasından LTS versiyonunu indirin
2. Kurulum dosyasını çalıştırın
3. Terminalde kontrol edin:
```powershell
node --version
npm --version
```

### 3. Docker Desktop Kurulumu

**Windows:**
1. [Docker Desktop](https://www.docker.com/products/docker-desktop) indirin
2. Kurulum tamamlandıktan sonra WSL 2 backend'i etkinleştirin
3. Docker'ı başlatın ve kontrol edin:
```powershell
docker --version
docker-compose --version
```

### 4. VS Code Kurulumu

1. [Visual Studio Code](https://code.visualstudio.com/) indirin ve kurun
2. Projeyi VS Code ile açın:
```powershell
cd c:\Users\emre5\netcoretic\netcoretic
code .
```
3. VS Code açıldığında önerilen eklentileri yükleyin (sağ altta popup çıkacak)

## 🔧 Proje Kurulumu

### Adım 1: Projeyi Derleyin

```powershell
# Solution'ı restore edin
dotnet restore

# Projeyi derleyin
dotnet build
```

### Adım 2: Docker Compose ile Servisleri Başlatın

```powershell
# Docker Compose ile tüm servisleri başlatın
docker-compose up -d

# Servislerin durumunu kontrol edin
docker-compose ps

# Logları görüntüleyin
docker-compose logs -f
```

Bu komut şunları başlatacaktır:
- ✅ PostgreSQL (localhost:5432)
- ✅ Redis (localhost:6379)
- ✅ Backend API (localhost:5000)
- ✅ Elasticsearch (localhost:9200)
- ✅ Kibana (localhost:5601)

### Adım 3: Veritabanı Migration'larını Uygulayın

**Önemli:** İlk kez çalıştırıyorsanız, veritabanı migration'larını oluşturmanız ve uygulamanız gerekir.

```powershell
# Infrastructure klasörüne gidin
cd src\Infrastructure

# Migration oluşturun
dotnet ef migrations add InitialCreate --startup-project ..\API

# Migration'ı uygulayın
dotnet ef database update --startup-project ..\API

# Ana dizine geri dönün
cd ..\..
```

### Adım 4: Backend API'yi Test Edin

API otomatik olarak Docker Compose ile başladı, ancak manuel olarak çalıştırmak isterseniz:

```powershell
cd src\API
dotnet run
```

**Test edin:**
- Swagger UI: http://localhost:5000/swagger
- API Health: http://localhost:5000/api/health

### Adım 5: Frontend'i Kurun ve Başlatın

```powershell
# Frontend klasörüne gidin
cd frontend

# Bağımlılıkları yükleyin
npm install

# Development server'ı başlatın
npm run dev
```

**Test edin:**
- Frontend: http://localhost:3000

## 🎯 VS Code ile Geliştirme

### Debug Yapılandırması

1. VS Code'da `F5` tuşuna basın veya "Run and Debug" panelini açın
2. ".NET Core Launch (web)" yapılandırmasını seçin
3. Breakpoint'ler koyabilir ve debug edebilirsiniz

### Önerilen VS Code Eklentileri

Proje açıldığında VS Code otomatik olarak şu eklentileri önerecektir:

- **C# Dev Kit** - C# geliştirme için
- **Docker** - Docker desteği
- **PostgreSQL** - Veritabanı yönetimi
- **Tailwind CSS IntelliSense** - CSS autocomplete
- **ESLint** - JavaScript/TypeScript linting
- **Prettier** - Code formatting

"Install All" butonuna tıklayarak tümünü yükleyebilirsiniz.

## 🗃️ Veritabanı Yönetimi

### pgAdmin ile PostgreSQL'e Bağlanma

1. [pgAdmin](https://www.pgadmin.org/download/) indirin ve kurun
2. Yeni server bağlantısı oluşturun:
   - Host: `localhost`
   - Port: `5432`
   - Database: `ecommerce_db`
   - Username: `postgres`
   - Password: `Admin123!`

### VS Code PostgreSQL Extension ile

1. VS Code'da PostgreSQL extension'ı yükleyin
2. Sol panel'de database ikonuna tıklayın
3. "New Connection" yapın ve yukarıdaki bilgileri girin

## 🐳 Docker Komutları

### Temel Komutlar

```powershell
# Servisleri başlat
docker-compose up -d

# Servisleri durdur
docker-compose down

# Servisleri ve volume'leri sil
docker-compose down -v

# Logları görüntüle
docker-compose logs -f

# Belirli bir servisin loglarını görüntüle
docker-compose logs -f api

# Servis durumunu kontrol et
docker-compose ps

# Belirli bir servisi yeniden başlat
docker-compose restart api
```

### Container'a Bağlanma

```powershell
# API container'ına bash ile bağlan
docker exec -it ecommerce_api /bin/bash

# PostgreSQL container'ına bağlan
docker exec -it ecommerce_postgres psql -U postgres -d ecommerce_db
```

## 🧪 Test Çalıştırma

```powershell
# Tüm testleri çalıştır
dotnet test

# Test coverage raporu
dotnet test /p:CollectCoverage=true
```

## 🔍 Sorun Giderme

### Problem: "dotnet komutu bulunamadı"
**Çözüm:** 
- .NET SDK'nın yüklü olduğundan emin olun
- Sistem değişkenlerinizi kontrol edin
- Terminal'i yeniden başlatın

### Problem: "Docker daemon çalışmıyor"
**Çözüm:**
- Docker Desktop'ı başlatın
- WSL 2 backend'in aktif olduğundan emin olun

### Problem: "Port 5432 zaten kullanımda"
**Çözüm:**
- Başka bir PostgreSQL instance'ı kapatın veya
- `docker-compose.yml` dosyasında portu değiştirin

### Problem: Frontend'de "API bağlantı hatası"
**Çözüm:**
- Backend API'nin çalıştığından emin olun (http://localhost:5000/swagger)
- `frontend/.env.local` dosyasında API URL'ini kontrol edin
- CORS ayarlarını kontrol edin

## 📝 Sonraki Adımlar

✅ Projeyi başarıyla kurdunuz!

**Şimdi şunları yapabilirsiniz:**

1. **Kod İnceleme:** `src/` klasöründeki katmanları inceleyin
2. **API Test:** Swagger UI üzerinden endpoint'leri test edin
3. **Frontend Geliştirme:** `frontend/` klasöründe component'ler oluşturun
4. **Veritabanı:** Seed data ekleyin ve migration'lar oluşturun

## 🎓 Öğrenme Kaynakları

- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [CQRS Pattern](https://martinfowler.com/bliki/CQRS.html)
- [Entity Framework Core](https://docs.microsoft.com/en-us/ef/core/)
- [Next.js Docs](https://nextjs.org/docs)

## 💬 Destek

Sorun yaşarsanız:
1. README.md dosyasını okuyun
2. GitHub Issues sayfasını kontrol edin
3. Yeni bir issue açın

---

Başarılar! 🚀
