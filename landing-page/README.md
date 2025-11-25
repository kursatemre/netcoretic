# 🛍️ Shopify Tarzı E-Ticaret Landing Page

Modern, dönüşüm odaklı ve tamamen responsive bir e-ticaret landing page tasarımı.

## 📋 Özellikler

- ✅ **Modern & Minimalist Tasarım** - Temiz, premium görünüm
- ✅ **Tam Responsive** - Mobil, tablet ve desktop uyumlu
- ✅ **Sticky Header** - Scroll sırasında sabit kalan navigasyon
- ✅ **Ürün Kartları** - Hover efektleri ile interaktif kartlar
- ✅ **Newsletter Formu** - E-posta toplama sistemi
- ✅ **Scroll to Top** - Yukarı çıkma butonu
- ✅ **Sepete Ekleme Animasyonu** - Kullanıcı geri bildirimi
- ✅ **SEO Friendly** - Semantik HTML5 yapısı

## 🎨 Renk Paleti

```css
Ana Renkler:
- Koyu: #333333
- Beyaz: #FFFFFF
- Vurgu (CTA): #F7A072
- Açık Gri: #F9F9F9
```

## 📂 Dosya Yapısı

```
landing-page/
├── index.html          # Ana HTML dosyası
├── style.css           # Tüm stiller ve responsive tasarım
├── script.js           # JavaScript fonksiyonları
├── README.md           # Bu dosya
└── images/             # Ürün görselleri (placeholder)
    ├── hero-bg.jpg
    ├── product-1.jpg
    ├── product-2.jpg
    ├── product-3.jpg
    └── product-4.jpg
```

## 🚀 Kullanım

1. **Dosyaları İndirin:**
   ```bash
   # Tüm dosyaları bir klasöre kopyalayın
   ```

2. **Görselleri Ekleyin:**
   - `images/` klasörüne ürün görsellerinizi ekleyin
   - `hero-bg.jpg` için bir hero görseli
   - `product-1.jpg` ile `product-4.jpg` arası ürün görselleri

3. **Tarayıcıda Açın:**
   - `index.html` dosyasını çift tıklayarak açın
   - Veya bir web sunucusu kullanın

## 🎯 Bileşenler

### Header (Sabit Başlık)
- **Duyuru Çubuğu:** Ücretsiz kargo gibi promosyonlar
- **Logo & Navigasyon:** Sticky header ile her zaman görünür
- **İkonlar:** Arama, hesap, sepet

### Hero Section
- Tam genişlik görsel alanı
- Çarpıcı başlık ve CTA butonu
- Overlay efekti

### Trust Factors
- 4 sütunlu güven faktörleri
- İkonlar ile görsel destek
- Responsive grid yapısı

### Featured Products
- 4 sütunlu ürün kartları
- Hover efektleri
- "Çok Satan", "Yeni", "%30 İndirim" rozetleri
- Quick view butonu
- Rating sistemi

### Collection Banners
- 3 farklı koleksiyon (Kadın, Erkek, Aksesuar)
- Gradient arka planlar
- Hover animasyonları

### Newsletter
- E-posta toplama formu
- %10 indirim teşviki
- Koyu arka plan ile vurgu

### Footer
- 4 sütunlu bilgi alanı
- Sosyal medya ikonları
- Ödeme logoları
- İletişim bilgileri

## 📱 Responsive Breakpoints

```css
Desktop: > 768px (4 sütun)
Tablet:  ≤ 768px (2 sütun)
Mobile:  ≤ 480px (1 sütun)
```

## 🔧 Özelleştirme

### Renkleri Değiştirme
`style.css` dosyasında `:root` değişkenlerini düzenleyin:

```css
:root {
    --primary-color: #333333;
    --accent-color: #F7A072;
    /* Diğer değişkenler... */
}
```

### Font Değiştirme
`index.html` head bölümünde Google Fonts linkini değiştirin:

```html
<link href="https://fonts.googleapis.com/css2?family=YourFont&display=swap" rel="stylesheet">
```

### İçerik Güncelleme
`index.html` dosyasında ilgili bölümleri düzenleyin:
- Ürün isimleri ve fiyatları
- Hero başlık ve alt metin
- Footer bilgileri

## 💡 JavaScript Özellikleri

- **Sticky Header:** Scroll sırasında shadow efekti
- **Scroll to Top:** 500px sonra görünür
- **Add to Cart:** Sepet sayacı ve bildirim
- **Newsletter:** Form gönderimi
- **Smooth Scroll:** Anchor linkler için
- **Lazy Load:** Görsel yükleme optimizasyonu

## 🌐 Tarayıcı Desteği

- ✅ Chrome (son 2 versiyon)
- ✅ Firefox (son 2 versiyon)
- ✅ Safari (son 2 versiyon)
- ✅ Edge (son 2 versiyon)
- ✅ Mobil tarayıcılar

## 📊 Performans

- Minimal CSS (tek dosya)
- Vanilla JavaScript (framework yok)
- Lazy loading görseller
- Optimize edilmiş animasyonlar

## 🎓 Öğrenme Kaynakları

Bu proje şunları içerir:
- CSS Grid & Flexbox
- CSS Variables
- Intersection Observer API
- Event Listeners
- Responsive Design
- CSS Animations

## 📝 Lisans

Bu proje eğitim amaçlıdır. Ticari veya kişisel projelerinizde özgürce kullanabilirsiniz.

## 🤝 Katkıda Bulunma

İyileştirme önerileri için:
1. Proje özelliklerini inceleyin
2. Değişikliklerinizi yapın
3. Test edin
4. Paylaşın

## 📞 İletişim

Sorularınız için:
- E-posta: info@markamiz.com
- Web: www.markamiz.com

---

⭐ Beğendiyseniz yıldız vermeyi unutmayın!

**Geliştirici Notları:**
- Placeholder görselleri gerçek ürün görselleri ile değiştirin
- SSL sertifikası ile canlıya alın
- Google Analytics ekleyin
- Meta tags'leri SEO için optimize edin
