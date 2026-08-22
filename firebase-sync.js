import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";
import {
  doc,
  getFirestore,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBa6RW3WatkG2S4WioYSknArB_hE9KMBog",
  authDomain: "kekikbahce-salon-2026.firebaseapp.com",
  projectId: "kekikbahce-salon-2026",
  storageBucket: "kekikbahce-salon-2026.firebasestorage.app",
  messagingSenderId: "408618485327",
  appId: "1:408618485327:web:f60c6502f421219b814c3a",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const $ = selector => document.querySelector(selector);
const defaultSettings = {
  venue: "Kekik Bahçe Kır Düğün Salonu",
  manager: "Salon yöneticisi",
  phone: "0850 307 42 15",
  email: "bilgi@kekikbahce.com",
  address: "Kaynaklar Mahallesi, Buca / İzmir",
  capacity: "875 kişi",
  closingTime: "23:30",
};

let creatingAccount = false;
let unsubscribeReservations = null;
let unsubscribeSettings = null;

function formInputs() {
  const inputs = [...document.querySelectorAll(".settings-form input")];
  return {
    venue: $("#settingVenue"),
    manager: inputs[1],
    phone: inputs[2],
    email: inputs[3],
    address: document.querySelector(".settings-form textarea"),
    capacity: inputs[4],
    closingTime: inputs[5],
  };
}

function applySettings(settings = defaultSettings) {
  const fields = formInputs();
  Object.entries(fields).forEach(([key, input]) => {
    if (input && settings[key] !== undefined) input.value = settings[key];
  });
  const venueLabel = document.querySelector(".brand strong");
  if (venueLabel) venueLabel.textContent = settings.venue || defaultSettings.venue;
}

function readSettings() {
  return Object.fromEntries(
    Object.entries(formInputs()).map(([key, input]) => [key, input?.value.trim() || ""]),
  );
}

function setError(message = "") {
  const error = $("#authError");
  error.textContent = message;
  error.classList.toggle("visible", Boolean(message));
}

function firebaseErrorMessage(error) {
  const messages = {
    "auth/email-already-in-use": "Bu e-posta ile daha önce bir hesap oluşturulmuş.",
    "auth/invalid-email": "Geçerli bir e-posta adresi girin.",
    "auth/invalid-credential": "E-posta adresi veya şifre hatalı.",
    "auth/weak-password": "Şifreniz en az 6 karakter olmalıdır.",
    "auth/network-request-failed": "Bağlantı kurulamadı. İnternetinizi kontrol edip yeniden deneyin.",
    "auth/operation-not-allowed": "E-posta/şifre girişi Firebase'de henüz etkinleştirilmemiş.",
  };
  return messages[error?.code] || "İşlem tamamlanamadı. Lütfen tekrar deneyin.";
}

function updateAuthCopy() {
  $("#authTitle").textContent = creatingAccount ? "Yeni salon hesabı oluşturun" : "Salonunuza giriş yapın";
  $("#authDescription").textContent = creatingAccount
    ? "Rezervasyonlarınız ve salon ayarlarınız size özel güvenli alanda saklanır."
    : "Rezervasyonlarınız ve salon ayarlarınız her cihazda güvenle senkronize edilir.";
  $("#authNameField").hidden = !creatingAccount;
  $("#authPassword").autocomplete = creatingAccount ? "new-password" : "current-password";
  $("#authSubmit").textContent = creatingAccount ? "Hesap oluştur" : "Giriş yap";
  $("#authToggle").textContent = creatingAccount ? "Zaten hesabınız var mı? Giriş yapın" : "Hesabınız yok mu? Hesap oluşturun";
  setError();
}

function setSaving(active) {
  const button = $("#authSubmit");
  button.disabled = active;
  button.textContent = active ? "Lütfen bekleyin…" : creatingAccount ? "Hesap oluştur" : "Giriş yap";
}

function setSyncStatus(live) {
  const indicator = $("#syncIndicator");
  if (indicator) indicator.classList.toggle("live", live);
}

function injectAccountMenu(user) {
  $("#accountMenu")?.remove();
  const menu = document.createElement("div");
  menu.className = "account-menu";
  menu.id = "accountMenu";
  menu.innerHTML = `<span class="sync-indicator" id="syncIndicator"><i></i><span>Buluta bağlanıyor</span></span><span class="account-email">${user.email || ""}</span><button class="sign-out" id="signOutButton" type="button">Çıkış yap</button>`;
  document.querySelector(".top-actions")?.append(menu);
  $("#signOutButton").addEventListener("click", async () => {
    try {
      await signOut(auth);
    } catch {
      window.toast?.("Oturum kapatılamadı. Lütfen yeniden deneyin.");
    }
  });
}

function stopListeners() {
  unsubscribeReservations?.();
  unsubscribeSettings?.();
  unsubscribeReservations = null;
  unsubscribeSettings = null;
  setSyncStatus(false);
}

function startListeners(user) {
  const root = doc(db, "salons", user.uid);
  const reservationsRef = doc(root, "data", "reservations");
  const settingsRef = doc(root, "data", "settings");

  unsubscribeReservations = onSnapshot(
    reservationsRef,
    snapshot => {
      window.setCloudReservations?.(snapshot.data()?.items);
      setSyncStatus(true);
      const label = $("#syncIndicator span");
      if (label) label.textContent = "Anlık senkronize";
    },
    () => {
      setSyncStatus(false);
      const label = $("#syncIndicator span");
      if (label) label.textContent = "Senkronizasyon hatası";
      window.toast?.("Rezervasyonlar buluttan alınamadı.");
    },
  );

  unsubscribeSettings = onSnapshot(
    settingsRef,
    async snapshot => {
      if (snapshot.exists()) {
        applySettings({ ...defaultSettings, ...snapshot.data() });
      } else {
        applySettings(defaultSettings);
        await setDoc(settingsRef, { ...defaultSettings, updatedAt: serverTimestamp() });
      }
    },
    () => window.toast?.("Salon ayarları buluttan alınamadı."),
  );
}

window.firebaseSync = {
  async saveReservations(items) {
    const user = auth.currentUser;
    if (!user) throw new Error("Oturum bulunamadı");
    await setDoc(doc(db, "salons", user.uid, "data", "reservations"), {
      items,
      updatedAt: serverTimestamp(),
    });
  },
  async saveSettings() {
    const user = auth.currentUser;
    if (!user) throw new Error("Oturum bulunamadı");
    await setDoc(doc(db, "salons", user.uid, "data", "settings"), {
      ...readSettings(),
      updatedAt: serverTimestamp(),
    }, { merge: true });
  },
};

$("#authToggle").addEventListener("click", () => {
  creatingAccount = !creatingAccount;
  updateAuthCopy();
});

$("#authForm").addEventListener("submit", async event => {
  event.preventDefault();
  setError();
  setSaving(true);
  const email = $("#authEmail").value.trim();
  const password = $("#authPassword").value;
  try {
    if (creatingAccount) {
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      const name = $("#authName").value.trim();
      if (name) await updateProfile(credential.user, { displayName: name });
    } else {
      await signInWithEmailAndPassword(auth, email, password);
    }
  } catch (error) {
    setError(firebaseErrorMessage(error));
  } finally {
    setSaving(false);
  }
});

onAuthStateChanged(auth, user => {
  stopListeners();
  if (!user) {
    document.body.classList.remove("is-authenticated");
    $("#accountMenu")?.remove();
    window.setCloudReservations?.([]);
    return;
  }
  document.body.classList.add("is-authenticated");
  injectAccountMenu(user);
  startListeners(user);
});

updateAuthCopy();
