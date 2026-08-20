# Kekikbahçe Düğün Salonu Uygulaması - Proje Notları

## Dosya konumu
- Ana uygulama: /home/ubuntu/wedding_app/kekikbahce-dugun-salonu.html
- Görseller: /home/ubuntu/wedding_app/images/ (acilis.jpg, giris1.webp, giris2.webp, giris3.webp, hava.jpg, kroki_hava.jpg, sahne.jpg, cift.jpg, masalar.jpg, dekor.jpg, isik.jpg)

## Özellikler
1. Ana sayfa: Hero görseli, salon tanıtımı, galeri, hakkımızda, iletişim + Google Maps iframe (Bornova, İzmir), özellik kartları
2. Paketler sayfası: Bahçe (₺120), Yıldız (₺180, öne çıkan), Kraliyet (₺260) paketleri
3. Takvim: aylık görünüm, ay değiştirme, dolu/boş gösterimi, dolu tarihe tıklama → detay modalı (güncelleme + iptal), boş tarihe tıklama → rezervasyon formu
4. Rezervasyon formu: gelin/damat adı, telefon, saat, tür, misafir, paket, notlar; Tamam → kroki sayfası
5. Kroki planlayıcı: Sahne, dans pisti, DJ, kasa&bufet, giriş sabit öğeleri; araç kutusundan yuvarlak (misafir, 10 kişi) ve uzun dikdörtgen (aile, 8 kişi) masa seçip tıklamayla yerleştirme; sürükle-bırak (mouse+touch); Temizle ve Kaydet butonları; Kaydet → localStorage'a kayıt, takvime dönüş, tarih dolu görünür

## Test sonuçları (tümü başarılı)
- Rezervasyon oluşturma: 15.08 Ayşe & Mehmet, 22.08 Zeynep & Ali → takvimde kırmızı etiket olarak göründü
- Form doldurma + paket seçimi + saat/tür/misafir seçimi çalışıyor
- Kroki: masa yerleştirme, sürükleme (offset kalibrasyon düzeltildi), aile masası ekleme çalışıyor
- Kaydet: localStorage "kekikbahce_reservations" ve "kekikbahce_kroki_<tarih>" anahtarlarına kayıt
- Detay modalı: dolu tarihe tıklanınca bilgiler doluyor, "DETAYLARI GÜNCELLE" + "Rezervasyonu İptal Et" butonu çıkıyor
- Takvim etiketi kısaltılmış: "Ayşe & Mehmet · 20:00" (hover'da tam isim)

## V2 Modern Tasarım (kullanıcı isteği sonrası)
- Renk paleti: lacivert mor (#1e1b3a) zemin + bordo (#c8102e) vurgu + altın (#e8c15c) aksan, glassmorphism kartlar
- Uygulama hissi: sticky üst bar (marka + boş tarih sayacı), alt navigasyon çubuğu (4 sekme: Ana Sayfa, Paketler, Takvim, Kroki), hero otomatik dönen görseller, yatay kaydırmalı galeri, istatistik şeridi
- Yeni görseller: images/hero1-8.jpg, paket_banner.webp, giris_kemer.jpg, giris_gece.jpg, giris_toren.jpg, lobi.jpg, balo.jpg, cift_gece.jpg, cift_portre.jpg, cift2.jpg, pasta.jpg, pasta2.jpg, havuz.jpg, havuz2.jpg
- Tüm işlevler (takvim, form, kroki sürükle-bırak, localStorage) korundu; JS fonksiyonları switchTab/HERO_IMAGES güncellendi

## Kullanıcının not ettiği bilgiler
- Salon: İzmir Kekikbahçe Düğün Salonu (Bucada da "Kekik Bahçe" ve "Kekik Kır Düğün Salonu" olarak geçiyor). Fotoğraflar Kekik Bahçe Kır Düğünü'nün internet fotoğrafları (Kekikbahce fiyatları - Kır Düğünü İzmir vb.)
- Telefon/adres bilgileri şablon olarak "0 (232) 000 00 00" verildi; kullanıcıdan gerçek bilgiler bekleniyor
- Kullanıcı ile HTML kodu üzerinden birlikte düzenlenecek (tek dosya teslim edilecek)

## V2 Test sonuçları (19.08.2026)
Yeni modern tasarım tarayıcıda test edildi ve tüm işlevler doğrulandı. Ana sayfa hero bölümü, otomatik dönen görseller, istatistik şeridi, yatay galeri, hakkımızda ve neden kartları düzgün render oluyor. Paketler sayfasındaki 3 kart, üst bar ve alt navigasyon çalışıyor. Takvimde 3 rezervasyon (Ayşe & Mehmet 15.08, Zeynep & Ali 22.08, Elif & Burak 23.08) bordo etiketlerle görünüyor; has-res sınıfı sayesinde etiketler hücreden taşmıyor. Form doldurma → kroki planlayıcı → masa ekleme/sürükleme → Kaydet akışı sorunsuz çalışıyor (localStorage kayıt doğrulandı). Üst bardaki boş tarih sayacı dinamik güncelleniyor (12 → 11 boş tarih).

## V3 Zarif Açık Tema (19.08.2026 - kullanıcı "çok kötü, daha güzel site" dedi)
Kullanıcı V2 koyu app temasından memnun kalmadı. Tek sayfalık (single-page) profesyonel düğün salonu web sitesi olarak baştan yazıldı: fildişi/krem zemin, altın aksan, Playfair Display + Cormorant Garamond + Jost fontları, full-screen hero (yeni13.jpg parallax), Hakkımızda (iki resimli grid), Özellikler, Masonry galeri (yeni1-yeni15.jpg), 3 paket kartı (Yıldız en popüler, çapraz ribbon), takvim (beyaz kart, bordo etiketler), kroki planlayıcı (açık tema, altın masalar), footer. Tüm işlevler korundu (takvim/form/kroki/localStorage). Yeni görseller: images/yeni1..yeni15.jpg (açık tonlu, beyaz-altın temalı).
Görsellerin kaynakları Pinterest/The Knot/Brides vb. (search_images üzerinden kopyalandı).

## V3 Test Sonuçları (19.08.2026, akşam)
- Ana sayfa hero, Hakkımızda, galeri, paketler: görsel olarak onaylandı (beyaz/altın zarif tema düzgün)
- Takvim bölümü açıldı: Ağustos 2026, 3 dolu tarih etiketi hücre içinde düzgün görünüyor
- Rezervasyon modalı: form dolduruldu, TAMAM basılınca takvime 25 Ağustos "Selin & Emre · 19:00" etiketi eklendi
- Kroki: rezervasyon bilgisi kartı açıldı, masa eklendi, sürükleme yeni konuma taşındı (%14.4, %71.4), saveKroki localStorage'a kaydetti
- Tüm akış V3'te çalışıyor. Teslimata hazır.

## Fotoğraflar Görünmüyor Sorunu Teşhisi (19.08.2026)
Sandbox tarayıcısında TÜM 14 görsel sorunsuz yükleniyor (HTTP 200, complete=true, naturalWidth>0). Dosyalar images/ klasöründe mevcut ve bozuk değil. Kullanıcı kendi bilgisayarında "fotoğraflar yok" diyor. Sebep: kullanıcı HTML dosyasını çift tıklayınca `file://` protokolüyle açıyor; görseller göreceli yol `images/...` ile çözüldüğü için klasör yapısı HTML+images yan yanaysa çalışması gerekir — ANCAK kullanıcı muhtemelen yalnızca HTML dosyasını indirdi, images klasörü olmadan. Çözüm: tüm görselleri base64 olarak HTML içine gömmek (data URI), böylece tek dosya her yerde çalışır. Görseller toplam ~7MB — 15 görsel; bazıları büyük (yeni14.png 1.7M, yeni15.jpg 1M) — küçük/orta boyuta indirgemek gerekebilir.

## Mobil Tam Ekran Kroki Revizyonu (19.08.2026 - kullanıcının son isteği)
Kullanıcı istedi: (1) takvimden boş tarihe tıklayınca form açılır, Devam/Tamam'a basınca kroki çıkar, yuvarlak/kare masa seçip oturma düzeni yapılır; (2) mobilde kroki çok küçük → tam ekran açılmalı, telefon yan çevrildiğinde tüm ekranı kaplamalı; (3) kaydedince not girme yeri olmalı; (4) masalar iç içe giriyor → çakışma kontrolü.

Yapılanlar (kekikbahce-dugun-salonu-tek-dosya.html):
- CSS: yeni tam ekran overlay (#krokiFullScreenOverlay) stilleri, .kfs-topbar/.kfs-floor-wrap/.kfs-floor, büyük masalar (#krokiFullScreenOverlay .placed-table 120px yuvarlak, 210x95 dikdörtgen), conflict sınıfı kırmızı vurgu.
- Mobil (max-width:980px): toolbox/kroki-actions/kroki-container/kroki-help gizlendi, "⛶ Krokiyi Tam Ekran Aç (Önerilen)" butonu gösteriliyor (.kroki-mobile-toggle).
- HTML: overlay bölümü footer'dan önce eklendi (kfsTitle, kfsSub, kfsToolRound, kfsToolRect, krokiFSFloor: krokiFS-stage, krokiFS-dance, KASA&BUFET, krokiFS-dj, krokiFS-entrance, hint).
- Yeni JS fonksiyonları yapılacak: openKrokiFullScreen(), closeKrokiFullScreen(), setTool güncelleme (kfs butonlarına selected ekleme), renderPlacedTables'in overlay içinde de çalışması (data-shape="rect" dikdörtgenler için), mousedown/touchstart krokiFSFloor üzerine, çakışma kontrolü (checkCollision → conflict sınıfı + uyarı), saveKroki sonrası not alma (prompt veya modal).

Mevcut değişkenler: placedTables[], tableCounter{round,rect}, toolMode, selectedEvent{date,gelin,damat,tur,saat}, setTool(type), showKrokiPage(), loadKroki(), renderPlacedTables(), saveKroki(), clearKroki(), removeTable(id), attachDragHandlers(el,t).
localStorage: kekikbahce_kroki_${date}, kekikbahce_reservations.

## Mobil Tam Ekran Kroki Test Sonuçları (19.08.2026, gece)
Tam akış tarayıcıda test edildi ve tüm adımlar başarılı: (1) 27 Ağustos boş tarihe tıklandı, form açıldı, Aylin & Kerem bilgileri girildi, submit ile kroki aşamasına geçildi; (2) openKrokiFullScreen() overlay'i açtı ve form submit anında mobil genişlikte otomatik açıldı; (3) yuvarlak masa eklendi, sürüklendi (16.5%, 71.5%), kaydedildi; (4) saveKroki() prompt ile not aldı ("Gelinin vegan menüsü...") ve localStorage kekikbahce_not_2026-08-27 olarak kaydetti; (5) overlay kapatıldı ve takvimde "Aylin & Kerem · 19:00" rozeti göründü; (6) çakışma kontrolü çalışıyor: üst üste 2 masa konulunca 2 elemente .conflict kırmızı vurgu geldi ve 1 uyarı alert'i tetiklendi; (7) masaüstünde (1280px) toolbox/actions/container görünür, toggle butonu gizli — doğru davranış.
Not: test sırasında form alanları gelinName/damatName/phone/eventTime/eventType/guestCount/pkgSelect/nots id'leri kullanıldı.
