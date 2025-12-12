# 📱 Twilio Sign-In - Supabase OTP Authentication

React Native (Expo) tabanlı mobil uygulama - Telefon numarası ile SMS OTP (One-Time Password) doğrulaması yaparak güvenli kullanıcı girişi sağlar.

## 📋 İçindekiler

- [Özellikler](#-özellikler)
- [Ekran Görüntüleri](#-ekran-görüntüleri)
- [Teknolojiler](#-teknolojiler)
- [Gereksinimler](#-gereksinimler)
- [Kurulum](#-kurulum)
- [Yapılandırma](#-yapılandırma)
- [Kullanım](#-kullanım)
- [Proje Yapısı](#-proje-yapısı)
- [Özellik Detayları](#-özellik-detayları)
- [Sorun Giderme](#-sorun-giderme)
- [Katkıda Bulunma](#-katkıda-bulunma)
- [Lisans](#-lisans)

## ✨ Özellikler

- 🔐 **Telefon Numarası ile Giriş**: Kullanıcılar telefon numaraları ile kayıt olabilir veya giriş yapabilir
- 📲 **SMS OTP Doğrulaması**: Güvenli 6 haneli tek kullanımlık şifre (OTP) ile doğrulama
- 💾 **Otomatik Session Yönetimi**: AsyncStorage ile oturum bilgilerinin kalıcı saklanması
- 🔄 **Otomatik Token Yenileme**: Süresi dolan token'ların otomatik olarak yenilenmesi
- ⏱️ **OTP Yeniden Gönderme**: 60 saniyelik geri sayım ile OTP yeniden gönderme özelliği
- 🎨 **Modern UI/UX**: Kullanıcı dostu ve sezgisel arayüz tasarımı
- 📱 **Cross-Platform**: iOS, Android ve Web desteği (Expo)
- 🔒 **Güvenli Kimlik Doğrulama**: Supabase Authentication ile güvenli kimlik doğrulama
- 👤 **Kullanıcı Yönetimi**: Otomatik kullanıcı kaydı ve veritabanı entegrasyonu

## 🖼️ Ekran Görüntüleri

> **Not**: Ekran görüntüleri eklenecek

## 🛠️ Teknolojiler

### Frontend
- **React Native** (0.79.4) - Cross-platform mobil uygulama framework'ü
- **Expo** (~53.0.12) - React Native geliştirme platformu
- **TypeScript** (5.8.3) - Tip güvenli JavaScript
- **React Navigation** (7.x) - Navigasyon yönetimi
  - `@react-navigation/native`
  - `@react-navigation/native-stack`

### Backend & Authentication
- **Supabase** (2.50.0) - Backend as a Service
  - Authentication (Phone OTP)
  - Database (PostgreSQL)
  - Real-time subscriptions

### Storage & State
- **AsyncStorage** (2.2.0) - Yerel veri saklama
- **React Hooks** - State yönetimi

### UI Components
- **Expo Vector Icons** - Ionicons icon seti
- **React Native Safe Area Context** - Güvenli alan yönetimi

## 📦 Gereksinimler

- **Node.js** (v18 veya üzeri)
- **npm** veya **yarn** paket yöneticisi
- **Expo CLI** (global olarak yüklü olmalı)
- **Supabase Hesabı** (ücretsiz tier yeterli)
- **SMS Provider** (Twilio veya Supabase'in desteklediği başka bir provider)

## 🚀 Kurulum

### 1. Projeyi Klonlayın

```bash
git clone https://github.com/kullaniciadi/twilio-siginin.git
cd twilio-siginin
```

### 2. Bağımlılıkları Yükleyin

```bash
npm install
# veya
yarn install
```

### 3. Environment Variables Ayarlayın

Proje kök dizininde `.env` dosyası oluşturun:

```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Örnek:**
```env
EXPO_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

> ⚠️ **Önemli**: `.env` dosyasını asla Git'e commit etmeyin! Bu dosya zaten `.gitignore` içinde olmalı.

### 4. Supabase Projesini Yapılandırın

#### 4.1 Supabase Projesi Oluşturma

1. [Supabase](https://supabase.com) hesabı oluşturun
2. Yeni bir proje oluşturun
3. Proje URL'inizi ve Anon Key'inizi kopyalayın

#### 4.2 Authentication Ayarları

1. Supabase Dashboard → **Authentication** → **Providers**
2. **Phone** provider'ını etkinleştirin
3. SMS ayarlarını yapılandırın:
   - **Twilio** kullanıyorsanız:
     - Twilio Account SID
     - Twilio Auth Token
     - Twilio Phone Number
   - Veya Supabase'in varsayılan SMS provider'ını kullanın

#### 4.3 Veritabanı Tablosu Oluşturma

Supabase SQL Editor'de aşağıdaki SQL'i çalıştırın:

```sql
-- Users tablosu oluştur
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS (Row Level Security) politikaları
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Kullanıcılar sadece kendi verilerini görebilir
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

-- Kullanıcılar kendi verilerini güncelleyebilir
CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);
```

### 5. Uygulamayı Başlatın

```bash
npm start
# veya
expo start
```

Ardından:
- **iOS Simulator** için: `i` tuşuna basın
- **Android Emulator** için: `a` tuşuna basın
- **Web** için: `w` tuşuna basın
- **Fiziksel cihaz** için: Expo Go uygulamasını kullanın ve QR kodu tarayın

## ⚙️ Yapılandırma

### Ülke Kodu Değiştirme

Varsayılan olarak `+90` (Türkiye) kodu kullanılmaktadır. Farklı bir ülke kodu kullanmak için:

`screens/PhoneNumberScreen.tsx` dosyasında:

```typescript
const fullNumber = `+90${phoneNumber}`; // Türkiye için
// veya
const fullNumber = `+1${phoneNumber}`; // ABD için
```

### Renk Teması Özelleştirme

`constants/colors.ts` dosyasından renkleri özelleştirebilirsiniz:

```typescript
export const Colors = {
  primary: '#4A90E2',      // Ana renk
  secondary: '#F5A623',    // İkincil renk
  background: '#F7F9FC',   // Arka plan
  // ... diğer renkler
};
```

## 📱 Kullanım

### İlk Kullanım

1. Uygulamayı açın
2. Telefon numaranızı girin (10 haneli, ülke kodu otomatik eklenir)
3. "Continue" butonuna tıklayın
4. Telefonunuza gelen 6 haneli OTP kodunu girin
5. "Verify" butonuna tıklayın
6. Başarılı doğrulama sonrası ana ekrana yönlendirilirsiniz

### OTP Yeniden Gönderme

- OTP almadıysanız veya kodunuzu kaybettiyseniz
- 60 saniye bekleyin
- "Resend OTP" butonuna tıklayın
- Yeni bir OTP kodu gönderilecektir

### Oturum Yönetimi

- Uygulama kapatıldığında oturum bilgileri AsyncStorage'da saklanır
- Uygulama tekrar açıldığında otomatik olarak giriş yapılmış olursunuz
- Çıkış yapmak için (ileride eklenecek) logout fonksiyonu kullanılabilir

## 📁 Proje Yapısı

```
twilio-siginin/
├── assets/                 # Görseller ve ikonlar
│   ├── icon.png
│   ├── splash-icon.png
│   └── ...
├── config/                 # Yapılandırma dosyaları
│   └── supabaseClient.ts  # Supabase client yapılandırması
├── constants/              # Sabitler
│   └── colors.ts          # Renk teması
├── navigation/             # Navigasyon yapılandırması
│   ├── StackNavigator.tsx # Auth stack (PhoneNumber, OTP)
│   └── HomeStack.tsx      # Authenticated stack (Home)
├── screens/                # Ekran bileşenleri
│   ├── PhoneNumberScreen.tsx  # Telefon numarası girişi
│   ├── OTPScreen.tsx         # OTP doğrulama
│   └── HomeScreen.tsx        # Ana ekran (giriş sonrası)
├── App.tsx                 # Ana uygulama bileşeni
├── index.ts                # Giriş noktası
├── app.json                # Expo yapılandırması
├── package.json            # Bağımlılıklar
├── tsconfig.json           # TypeScript yapılandırması
└── .gitignore             # Git ignore kuralları
```

## 🔍 Özellik Detayları

### Authentication Flow

1. **Phone Number Entry** (`PhoneNumberScreen`)
   - Kullanıcı telefon numarasını girer
   - Supabase'e `signInWithOtp` isteği gönderilir
   - SMS ile OTP kodu gönderilir

2. **OTP Verification** (`OTPScreen`)
   - Kullanıcı 6 haneli OTP kodunu girer
   - Supabase'e `verifyOtp` isteği gönderilir
   - Başarılı doğrulama sonrası session oluşturulur
   - Kullanıcı bilgileri `users` tablosuna kaydedilir

3. **Session Management** (`App.tsx`)
   - Uygulama açıldığında mevcut session kontrol edilir
   - Session varsa kullanıcı otomatik giriş yapar
   - `onAuthStateChange` listener ile auth durumu takip edilir

### State Management

- **Local State**: React Hooks (`useState`, `useEffect`)
- **Persistent Storage**: AsyncStorage (Supabase session)
- **Navigation State**: React Navigation

### Security

- Supabase Row Level Security (RLS) politikaları
- Secure token storage (AsyncStorage)
- Automatic token refresh
- Phone number validation

## 🐛 Sorun Giderme

### OTP Gelmiyor

1. Supabase Dashboard'da SMS provider ayarlarını kontrol edin
2. Twilio kredilerinizin yeterli olduğundan emin olun
3. Telefon numarası formatının doğru olduğundan emin olun (ülke kodu dahil)
4. Supabase logs'larını kontrol edin

### Session Kayboluyor

1. AsyncStorage izinlerini kontrol edin
2. `supabaseClient.ts` içinde `persistSession: true` olduğundan emin olun
3. Cihazın storage alanının yeterli olduğunu kontrol edin

### Build Hataları

1. `node_modules` klasörünü silin ve `npm install` yapın
2. Expo cache'i temizleyin: `expo start -c`
3. TypeScript hatalarını kontrol edin: `npx tsc --noEmit`

### Environment Variables Çalışmıyor

1. `.env` dosyasının proje kök dizininde olduğundan emin olun
2. Değişken isimlerinin `EXPO_PUBLIC_` ile başladığından emin olun
3. Uygulamayı yeniden başlatın (Expo cache'i temizleyin)

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Lütfen:

1. Bu repository'yi fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

### Kod Standartları

- TypeScript kullanın
- ESLint kurallarına uyun
- Anlamlı commit mesajları yazın
- Yeni özellikler için test ekleyin (ileride)

## 📄 Lisans

Bu proje [MIT Lisansı](LICENSE) altında lisanslanmıştır.

## 👤 Yazar

**Nedim**

- GitHub: [@kullaniciadi](https://github.com/phonsharks)

## 🙏 Teşekkürler

- [Supabase](https://supabase.com) - Backend infrastructure
- [Expo](https://expo.dev) - Development platform
- [React Navigation](https://reactnavigation.org) - Navigation library
- [React Native Community](https://github.com/react-native-community) - Awesome libraries



⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!

