// ─── Seviye Sistemi ───────────────────────────────────────────────────────────
export const LEVELS = [
  { lv: 1, min: 0, title: 'Yeni Sahip 🌱' },
  { lv: 2, min: 80, title: 'İyi Bakıcı 🌿' },
  { lv: 3, min: 220, title: 'Pet Dostu 🌸' },
  { lv: 5, min: 500, title: 'Hayvan Ustası ⭐' },
  { lv: 10, min: 1000, title: 'Efsanevi Sahip 👑' },
];
export const getLv = (xp) => { for (let i = LEVELS.length - 1; i >= 0; i--) if (xp >= LEVELS[i].min) return LEVELS[i]; return LEVELS[0]; };
export const nextXP = (xp) => { for (const l of LEVELS) if (xp < l.min) return l.min; return LEVELS[LEVELS.length - 1].min + 1; };

// ─── Evrim ────────────────────────────────────────────────────────────────────
export const EVO = [
  { min: 0, emoji: '🥚', name: 'Yumurta' },
  { min: 80, emoji: '🐣', name: 'Yeni Doğan' },
  { min: 220, emoji: '🐱', name: 'Yavru' },
  { min: 500, emoji: '🐈', name: 'Genç Pet' },
  { min: 1000, emoji: '🌟', name: 'Efsane Pet' },
];
export const getEvo = (xp) => { for (let i = EVO.length - 1; i >= 0; i--) if (xp >= EVO[i].min) return EVO[i]; return EVO[0]; };

// ─── Evcil Hayvan Türleri ─────────────────────────────────────────────────────
export const PET_TYPES = {
  cat: { label: 'Kedi', emoji: '🐱', bodyColor: '#FFB3C6', earColor: '#FF8FAB', tummyColor: '#FFD6E0' },
  dog: { label: 'Köpek', emoji: '🐶', bodyColor: '#D4A574', earColor: '#C49060', tummyColor: '#E8C090' },
  bunny: { label: 'Tavşan', emoji: '🐰', bodyColor: '#E8D0F0', earColor: '#D4B0E0', tummyColor: '#F0E0F8' },
  hamster: { label: 'Hamster', emoji: '🐹', bodyColor: '#F0C080', earColor: '#E0A860', tummyColor: '#F8D8A0' },
};

// ─── Yiyecekler ───────────────────────────────────────────────────────────────
// Her yiyecek mağazadan satın alınır; stok tutulur.
export const FOODS = [
  { id: 'chicken', emoji: '🍗', name: 'Tavuk', price: 30, xp: 12, hunger: 3, happy: 1, fever: -1 },
  { id: 'fish', emoji: '🐟', name: 'Balık', price: 35, xp: 15, hunger: 3, happy: 2, fever: -1 },
  { id: 'meat', emoji: '🥩', name: 'Et', price: 40, xp: 14, hunger: 4, happy: 0, fever: 0 },
  { id: 'carrot', emoji: '🥕', name: 'Havuç', price: 15, xp: 8, hunger: 2, happy: 1, fever: -2 },
  { id: 'apple', emoji: '🍎', name: 'Elma', price: 15, xp: 8, hunger: 2, happy: 2, fever: -1 },
  { id: 'cookie', emoji: '🍪', name: 'Kurabiye', price: 20, xp: 6, hunger: 1, happy: 3, fever: 1 },
  { id: 'broc', emoji: '🥦', name: 'Brokoli', price: 20, xp: 10, hunger: 2, happy: 0, fever: -2 },
  { id: 'cake', emoji: '🍰', name: 'Pasta', price: 45, xp: 5, hunger: 1, happy: 4, fever: 1 },
  { id: 'milk', emoji: '🥛', name: 'Süt', price: 18, xp: 9, hunger: 2, happy: 2, fever: -1 },
  { id: 'sushi', emoji: '🍣', name: 'Sushi', price: 60, xp: 18, hunger: 4, happy: 2, fever: -1 },
  { id: 'egg', emoji: '🥚', name: 'Yumurta', price: 20, xp: 10, hunger: 3, happy: 1, fever: 0 },
  { id: 'straw', emoji: '🍓', name: 'Çilek', price: 22, xp: 7, hunger: 1, happy: 3, fever: -1 },
];

// ─── Mağaza: Ten Renkleri ───────────────────────────────────────────────────
export const SHOP_SKINS = [
  { id: 'skin_pink', emoji: '🌸', name: 'Toz Pembe', price: 100, color: '#FFB3C6' },
  { id: 'skin_blue', emoji: '💎', name: 'Buz Mavisi', price: 150, color: '#A2D2FF' },
  { id: 'skin_green', emoji: '🌱', name: 'Nane Yeşili', price: 150, color: '#B9FBC0' },
  { id: 'skin_purple', emoji: '☔', name: 'Lavanta', price: 200, color: '#E0AAFF' },
  { id: 'skin_yellow', emoji: '☀️', name: 'Güneş Sarısı', price: 120, color: '#FDFFB6' },
  { id: 'skin_orange', emoji: '🍑', name: 'Şeftali', price: 180, color: '#FFD1A9' },
  { id: 'skin_white', emoji: '☁️', name: 'Bulut Beyazı', price: 300, color: '#F8F9FA' },
  { id: 'skin_black', emoji: '🌑', name: 'Gece Gezgini', price: 400, color: '#343A40' },
];

// ─── Mağaza: Göz Renkleri ──────────────────────────────────────────────────
export const SHOP_EYES = [
  { id: 'eye_black', emoji: '⚫', name: 'Derin Siyah', price: 50, color: '#1A1A1A' },
  { id: 'eye_blue', emoji: '🔵', name: 'Okyanus', price: 120, color: '#0077B6' },
  { id: 'eye_green', emoji: '🟢', name: 'Zümrüt', price: 120, color: '#2D6A4F' },
  { id: 'eye_purple', emoji: '🟣', name: 'Mistik', price: 180, color: '#5A189A' },
  { id: 'eye_red', emoji: '🔴', name: 'Ateş', price: 250, color: '#9B2226' },
  { id: 'eye_gold', emoji: '✨', name: 'Altın', price: 300, color: '#FFD700' },
];

// ─── Mağaza: Ortamlar ─────────────────────────────────────────────────────────
export const SHOP_ENVS = [
  { id: 'room', emoji: '🏠', name: 'Sıcak Oda', price: 150, bg: 'linear-gradient(180deg,#FFEDF3 0%,#FFF8FA 50%,#FFE4EE 100%)', floor: '#FFB3C6', d1: '🛋️', d2: '🪴', d3: '🖼️', d4: '🐈' },
  { id: 'garden', emoji: '🌷', name: 'Bahar Bahçesi', price: 280, bg: 'linear-gradient(180deg,#D4F1F9 0%,#E8FFF0 55%,#B8E994 100%)', floor: '#78B040', d1: '🌻', d2: '🌹', d3: '🦋', d4: '⛲' },
  { id: 'beach', emoji: '🏖', name: 'Sahil', price: 350, bg: 'linear-gradient(180deg,#82CCDD 0%,#60A3BC 45%,#FAD390 100%)', floor: '#F6B93B', d1: '🌊', d2: '🦀', d3: '🌴', d4: '🐚' },
  { id: 'snow', emoji: '❄️', name: 'Kış Ormanı', price: 320, bg: 'linear-gradient(180deg,#E3F2FD 0%,#F5F8FA 55%,#CFD8DC 100%)', floor: '#90A4AE', d1: '⛄', d2: '🎄', d3: '🦊', d4: '❄️' },
  { id: 'space', emoji: '🌙', name: 'Uzay', price: 600, bg: 'linear-gradient(180deg,#0C2461 0%,#1E3799 55%,#079992 100%)', floor: '#38ADA9', d1: '🪐', d2: '🚀', d3: '🛸', d4: '🌠' },
  { id: 'candy', emoji: '🍭', name: 'Şeker Dünyası', price: 400, bg: 'linear-gradient(180deg,#FFC1F3 0%,#FFE3FB 55%,#F8D0EB 100%)', floor: '#ED4C67', d1: '🍭', d2: '🍬', d3: '🍦', d4: '🍩' },
  { id: 'forest', emoji: '🌲', name: 'Sihirli Orman', price: 450, bg: 'linear-gradient(180deg,#38ADA9 0%,#78E08F 55%,#B8E994 100%)', floor: '#079992', d1: '🍄', d2: '🦔', d3: '🧚', d4: '🌿' },
  { id: 'castle', emoji: '🏰', name: 'Kale', price: 550, bg: 'linear-gradient(180deg,#6D214F 0%,#B33771 55%,#FC427B 100%)', floor: '#58B19F', d1: '⚔️', d2: '🛡️', d3: '🕯️', d4: '👑' },
  { id: 'cyber', emoji: '🏙️', name: 'Cyber Şehir', price: 750, bg: 'linear-gradient(180deg,#1B1464 0%,#0652DD 55%,#12CBC4 100%)', floor: '#006266', d1: '🛸', d2: '🤖', d3: '⚡', d4: '🌃' },
];

export const BEDROOM_ENV = { id: 'bedroom', emoji: '🛌', name: 'Yatak Odası', bg: 'linear-gradient(180deg, #FFFFFF 0%, #FFFDF0 100%)', floor: '#FFF9C4', d1: '🧸', d2: '🛏️', d3: '🖼️', d4: '💡' };

// ─── Mağaza: Zemin Dekorasyonları ─────────────────────────────────────────────
export const SHOP_DECS = [];

// ─── Görevler ─────────────────────────────────────────────────────────────────
export const QUESTS = [
  { id: 'q1', title: 'Günlük Yemek', desc: '3 kez yedir', goal: 3, key: 'fed', reward: { xp: 80, coin: 120 } },
  { id: 'q2', title: 'Oyun Zamanı', desc: '2 kez oyna', goal: 2, key: 'played', reward: { xp: 100, coin: 150 } },
  { id: 'q3', title: 'Banyo Vakti', desc: '2 kez banyo yap', goal: 2, key: 'bathed', reward: { xp: 70, coin: 100 } },
  { id: 'q4', title: 'Sağlıklı Yaşam', desc: '1 kez ilaç ver', goal: 1, key: 'medded', reward: { xp: 50, coin: 80 } },
  { id: 'q5', title: 'Sevgi Dokunuşu', desc: '5 kez dokun', goal: 5, key: 'tapped', reward: { xp: 60, coin: 90 } },
  { id: 'q6', title: 'Şef Pet', desc: '5 farklı yemek ye', goal: 5, key: 'uniqueFoods', reward: { xp: 150, coin: 250 } },
  { id: 'q7', title: 'Uyku Ustası', desc: '3 kez uyut', goal: 3, key: 'slept', reward: { xp: 80, coin: 120 } },
  { id: 'q8', title: 'Tutumlu Sahip', desc: '500 coin biriktir', goal: 500, key: 'coin', reward: { xp: 150, coin: 200 } },
  { id: 'q9', title: 'Sosyal Pet', desc: '10 kez dokun', goal: 10, key: 'tapped', reward: { xp: 100, coin: 140 } },
  { id: 'q10', title: 'Banyo Maratonu', desc: '5 kez yıka', goal: 5, key: 'bathed', reward: { xp: 250, coin: 350 } },
  { id: 'q11', title: 'Marifetli', desc: '3 kez banyo yap', goal: 3, key: 'bathed', reward: { xp: 120, coin: 180 } },
  { id: 'q12', title: 'Beslenme Uzmanı', desc: '8 farklı yemek ye', goal: 8, key: 'uniqueFoods', reward: { xp: 300, coin: 450 } },
  { id: 'q13', title: 'Bitmek Bilmez Enerji', desc: '5 kez uyut', goal: 5, key: 'slept', reward: { xp: 150, coin: 250 } },
  { id: 'q14', title: 'Tık Tık!', desc: '15 kez dokun', goal: 15, key: 'tapped', reward: { xp: 80, coin: 120 } },
  { id: 'q15', title: 'Mutfak Ustası', desc: '10 kez yemek yedir', goal: 10, key: 'fed', reward: { xp: 200, coin: 300 } },
  { id: 'q16', title: 'Oyun Bağımlısı', desc: '5 kez oyna', goal: 5, key: 'played', reward: { xp: 250, coin: 400 } },
];

// ─── Rastgele Olaylar ─────────────────────────────────────────────────────────
export const EVENTS = [
  { id: 'sick', icon: '🤒', title: 'Hastalandı!', desc: 'Hemen ilaç ver!', btnText: 'İlaç Ver', bgColor: '#FFE4E4', borderColor: '#FF8FAB', action: 'heal' },
  { id: 'gift', icon: '🎁', title: 'Hediye buldu!', desc: '+50 coin!', btnText: 'Al!', bgColor: '#FFF3CC', borderColor: '#FFD166', action: 'gift' },
  { id: 'rain', icon: '☔', title: 'Yağmur yağıyor!', desc: 'Dışarı çıkamaz.', btnText: 'Tamam', bgColor: '#E7F5FF', borderColor: '#74C0FC', action: 'rain' },
  { id: 'bday', icon: '🎂', title: 'Doğum Günü!', desc: '+80 coin hediye!', btnText: 'Kutla!', bgColor: '#FFE4EE', borderColor: '#FF8FAB', action: 'birthday' },
  { id: 'lonely', icon: '😢', title: 'Yalnız hissediyor', desc: 'Oyna veya dokun.', btnText: 'Sarıl!', bgColor: '#F3E8FF', borderColor: '#C77DFF', action: 'hug' },
  { id: 'treat', icon: '🍪', title: 'Sürpriz ikram!', desc: '+30 XP bonus!', btnText: 'Yiyin!', bgColor: '#FFF3CC', borderColor: '#FFD166', action: 'treat' },
];

// ─── Konuşma Balonları ────────────────────────────────────────────────────────
export const BUBBLES = [
  'Seni seviyorum! 💕',
  'Oynamak istiyorum! 🎾',
  'Acıktım... 🍖',
  'Çok mutluyum! ✨',
  'Seninle olmak güzel 🌸',
  'Uykum geldi 😴',
  'Mrrr~ 🐱',
  'Sarıl bana! 🤗',
  'Bugün çok güzel! ☀️',
  'Sen en iyisin! 💖',
  'Banyo istemiyorum 😤',
  'Bir şeyler yemek istiyorum! 😋',
];

// ─── Başarımlar (Achievements) ────────────────────────────────────────────────
export const ACHIEVEMENTS = [
  { id: 'a1', icon: '🛁', title: 'İlk Banyo', desc: 'Petini ilk kez yıkadın', rewardXp: 50, rewardCoin: 20, condition: (state) => state.bathed >= 1 },
  { id: 'a2', icon: '🧼', title: 'Temizlik Ustası', desc: 'Petini 10 kez yıkadın', rewardXp: 150, rewardCoin: 50, condition: (state) => state.bathed >= 10 },
  { id: 'a3', icon: '🍽️', title: 'Gurme Pet', desc: '10 farklı yemek yedi', rewardXp: 200, rewardCoin: 100, condition: (state) => state.uniqueFoods >= 10 },
  { id: 'a4', icon: '🏃‍♂️', title: 'Oyuncu', desc: 'Petinle 20 kez oynadın', rewardXp: 150, rewardCoin: 50, condition: (state) => state.played >= 20 },
  { id: 'a5', icon: '💰', title: 'Zengin Müşteri', desc: '1000 Altına ulaştın', rewardXp: 100, rewardCoin: 0, condition: (state) => state.coin >= 1000 },
  { id: 'a6', icon: '👑', title: 'Efsanevi', desc: 'Level 10\'a ulaştın', rewardXp: 500, rewardCoin: 200, condition: (state) => getLv(state.xp).lv >= 10 },
  { id: 'a7', icon: '💎', title: 'Elmas Sahibi', desc: '5000 Altına ulaştın', rewardXp: 1000, rewardCoin: 0, condition: (state) => state.coin >= 5000 },
  { id: 'a8', icon: '🧴', title: 'Hijyen Kralı', desc: '50 kez yıkadın', rewardXp: 500, rewardCoin: 500, condition: (state) => state.bathed >= 50 },
  { id: 'a9', icon: '🍱', title: 'Zengin Menü', desc: 'Tüm yemekleri denedi', rewardXp: 800, rewardCoin: 800, condition: (state) => state.uniqueFoods >= 12 },
  { id: 'a10', icon: '🏅', title: 'Sadık Dost', desc: 'Lv.5\'e ulaştın', rewardXp: 200, rewardCoin: 100, condition: (state) => getLv(state.xp).lv >= 5 },
];

