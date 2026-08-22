# Firebase Kurulum Durumu

2026-08-22 tarihinde `kekikbahce-salon-2026` adlı bağımsız Firebase projesi oluşturuldu. Firebase Web uygulaması bu projeye kaydedildi; web istemci yapılandırması `firebase-sync.js` dosyasına eklendi. Proje Spark planındadır ve ücretli kaynak kullanılmamaktadır.

Firestore ekranı açıldı ve Google hesabı ile erişimin mevcut olduğu doğrulandı. Proje Spark planında, yani ücretsiz katmandadır. Cloud Firestore sayfasında `Create database` akışı kullanılabilir durumda. Firestore veritabanının ve e-posta/şifre oturum sağlayıcısının bu proje için etkinleştirilmesi, sonrasında kullanıcıya özel güvenlik kurallarının yayınlanması gerekiyor.

Firebase Console'da Firestore oluşturma düğmesi incelendi. Sayfanın dinamik menü davranışı nedeniyle veritabanı kurulumu komut satırı üzerinden de doğrulanacaktır.

Varsayılan Firestore veritabanı `eur3` Avrupa bölgesinde oluşturuldu. Firestore ilk oluşturulduğunda tüm istemci erişimi kapalıdır; projedeki `firestore.rules` dosyası, erişimi yalnızca oturum açmış kullanıcının kendi UID yoluyla sınırlar.

`firestore.rules` başarıyla derlenip Firebase projesine yayınlandı. Firebase Authentication yönetim ekranı da açıldı; e-posta/şifre sağlayıcısının etkinleştirilmesi için başlangıç akışı başlatıldı.

E-posta/şifre sağlayıcısının yapılandırma ekranına ulaşıldı. Bu sağlayıcı, web sayfasındaki e-posta ve şifre ile hesap oluşturma/giriş akışına karşılık gelir; e-posta bağlantısı ile parolasız giriş seçeneği etkinleştirilmeyecektir.

E-posta/şifre sağlayıcısı etkinleştirildi. Kayıt, giriş ve çıkış akışı Firebase Authentication üzerinde çalışmaya hazırdır.

Yerel statik sunucuda uygulama açıldı: giriş ekranı yüklendi, Firebase modülü isteğe bağlı hataya düşmedi ve boş veri durumunda panel sıfır rezervasyonla güvenli biçimde görüntülendi. Gerçek hesap oluşturma işlemi canlı ortamda işletme sahibinin seçtiği e-posta adresiyle yapılacaktır.

Giriş ve hesap oluşturma kipleri ayrıca doğrulandı: giriş kipinde yetkili adı alanı gizleniyor, hesap oluşturma kipinde alan açılıyor; başlık ve buton metinleri ilgili akışa göre değişiyor.

Firebase Authentication ayarlarında `Authorized domains` bölümü doğrulandı. Canlı GitHub Pages alan adı bu bölümden kontrol edilerek gerekirse yetkili alan adı listesine eklenecektir.

Varsayılan yetkili alan adları `localhost`, `kekikbahce-salon-2026.firebaseapp.com` ve `kekikbahce-salon-2026.web.app` olarak doğrulandı. Canlı sayfanın alan adı `boyleiyi620-hue.github.io` ekleme penceresine girildi; kaydın tamamlanması son kez doğrulanacaktır.

`boyleiyi620-hue.github.io` alan adı Firebase Authentication yetkili alan listesine **Custom** olarak başarıyla eklendi. Böylece canlı GitHub Pages sayfasındaki e-posta/şifre oturumu desteklenir.

Tarayıcıda Firestore dinleyicisinin kullanacağı `setCloudReservations` veri köprüsü tek rezervasyonlu örnek veriyle sınandı; sayfanın ortak rezervasyon durumu bu veriyi `count: 1` ile doğru biçimde aldı. Bu test yalnızca tarayıcı belleğinde çalıştı, Firestore'a test verisi yazılmadı.

GitHub'a `d328ec3` commit'i başarıyla aktarıldı. İlk canlı kontrol sırasında GitHub Pages henüz önceki derlemeyi sundu: sayfada `firebase-sync.js` modülü ve `#authGate` henüz yoktu. Bu beklenen yayın gecikmesi yeniden doğrulanacaktır.

GitHub Pages yayın işi `d328ec3` commit'i için başarıyla tamamlandı. Eski test PWA önbelleği kaldırıldıktan sonra canlı sayfada Firebase giriş ekranı, boş kullanıcıya özel rezervasyon durumu ve `firebase-sync.js` modülü doğrulandı.
