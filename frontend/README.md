# E-Commerce Frontend

Next.js 14 ile geliştirilmiş e-ticaret platformu arayüzü.

## Özellikler

- ✅ Ürün Listeleme (Pagination ile)
- ✅ Ürün Detay Sayfası
- ✅ Elasticsearch Entegre Arama
- ✅ Sepet Yönetimi (LocalStorage)
- ✅ Responsive Tasarım (Tailwind CSS)
- ✅ TypeScript

## Kurulum

```bash
cd frontend
npm install
```

## Çalıştırma

```bash
npm run dev
```

Uygulama http://localhost:3000 adresinde çalışacaktır.

## Sayfalar

- `/` - Ana sayfa
- `/products` - Tüm ürünler (pagination)
- `/products/[id]` - Ürün detay
- `/search` - Elasticsearch arama
- `/cart` - Sepet

## API Bağlantısı

`.env.local` dosyasında API URL'i ayarlanır:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Teknolojiler

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Axios
- Zustand (State Management)
