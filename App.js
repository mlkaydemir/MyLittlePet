import React, { useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import styles, { COLORS } from './styles';
import { FOODS, PET_TYPES, getLv, getEvo, ACHIEVEMENTS } from './constants';
import PetSVG from './components/PetSVG';
import HomeTab from './components/HomeTab';
import ShopTab from './components/ShopTab';
import { QuestsTab, EvoTab, AchieveTab } from './components/QuestsEvoTab';

// ── Başlangıç state ───────────────────────────────────────────────────────────
const initialState = () => ({
  // kimlik
  petName: 'Pamuk',
  petType: 'cat',

  // kaynaklar
  xp: 0,
  coin: 1000,
  streak: 1,

  // statlar (0–10)
  health: 7,
  happy: 6,
  hunger: 5,
  clean: 8,
  energy: 7,
  fever: 1,

  // sayaçlar (görevler için)
  fed: 0,
  played: 0,
  cleaned: 0,
  medded: 0,
  tapped: 0,
  bathed: 0,
  slept: 0,
  uniqueFoods: 0,
  eatenFoods: [],

  // giysi/ortam
  eqHat: 'bow',
  eqNck: '',
  envActive: 'room',
  prevEnv: 'room',
  eqDec: '',
  skinColor: '',
  eyeColor: '',
  ownedHats: [], // Eski kalsın ama boş olsun
  ownedEnv: ['room'],
  ownedSkins: [],
  ownedEyes: [],

  // yiyecek stoku: { [foodId]: count }
  foodStock: {},

  // görev
  questClaimed: {},

  // olay
  activeEvent: null,
  rainActive: false,

  // başarımlar
  unlockedAchievements: [],
  claimedAchievements: [],

  // uyku
  sleeping: false,
  lightOn: true,
  lastQuestRefresh: new Date().toDateString(),
});

// ────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [started, setStarted] = useState(false);
  const [petName, setPetName] = useState('');
  const [selectedType, setSelectedType] = useState('cat');
  const [gameState, setGameState] = useState(initialState());
  const [activeTab, setActiveTab] = useState('home');
  const [toastMsg, setToastMsg] = useState('');
  const toastAnim = useRef(new Animated.Value(0)).current;

  // ── Toast ─────────────────────────────────────────────────────────────────
  const showToast = (msg) => {
    setToastMsg(msg);
    Animated.sequence([
      Animated.timing(toastAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
      Animated.delay(1400),
      Animated.timing(toastAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start();
  };

  // ── Stat düşüşü (her 35 saniyede bir) ────────────────────────────────────
  useEffect(() => {
    if (!started) return;
    const interval = setInterval(() => {
      setGameState(prev => {
        if (prev.sleeping) return prev;
        const next = {
          ...prev,
          hunger: Math.max(prev.hunger - 1, 0),
          energy: Math.max(prev.energy - 1, 0),
          happy: Math.max(prev.happy - 1, 0),
        };
        if (next.hunger <= 2) next.health = Math.max(prev.health - 1, 0);
        return next;
      });
    }, 35000);
    return () => clearInterval(interval);
  }, [started]);

  // ── Günlük Görev Yenileme ────────────────────────────────────────────────
  useEffect(() => {
    if (!started) return;
    const interval = setInterval(() => {
      const today = new Date().toDateString();
      if (today !== gameState.lastQuestRefresh) {
        setGameState(prev => ({
          ...prev,
          lastQuestRefresh: today,
          questClaimed: {},
          // Sayacları da sıfırlamak gerekirse buraya eklenebilir
          // fed: 0, played: 0, vb. (Eğer görevlerin her gün sıfırdan başlanması isteniyorsa)
          fed: 0, played: 0, cleaned: 0, medded: 0, tapped: 0, bathed: 0, slept: 0,
        }));
        showToast('Yeni bir gün başladı! Görevler yenilendi! 📋✨');
      }
    }, 60000); // Dakikada bir kontrol
    return () => clearInterval(interval);
  }, [started, gameState.lastQuestRefresh]);

  // ── Başarımlar Kontrolü (Sadece Kilit Açar) ───────────────────────────────
  useEffect(() => {
    if (!started) return;
    const newUnlocks = ACHIEVEMENTS.filter(ach =>
      !gameState.unlockedAchievements.includes(ach.id) && ach.condition(gameState)
    );

    if (newUnlocks.length > 0) {
      setGameState(prev => {
        const actuallyNew = newUnlocks.filter(ach => !prev.unlockedAchievements.includes(ach.id));
        if (actuallyNew.length === 0) return prev;

        return {
          ...prev,
          unlockedAchievements: [...prev.unlockedAchievements, ...actuallyNew.map(a => a.id)],
        };
      });
      // Animasyon & Toast
      showToast(`🏆 Başarım Açıldı: ${newUnlocks[0].title}!`);
    }
  }, [
    gameState.bathed, gameState.fed, gameState.played,
    gameState.uniqueFoods, gameState.xp, gameState.coin,
    started, gameState.unlockedAchievements
  ]);

  // ── Oyunu başlat ──────────────────────────────────────────────────────────
  const startGame = () => {
    const name = petName.trim() || 'Pamuk';
    setGameState(prev => ({ ...prev, petName: name, petType: selectedType }));
    setStarted(true);
    setTimeout(() => showToast(`Hoş geldin, ${name}! 🥚✨`), 300);
  };

  // ── Topbar verileri ───────────────────────────────────────────────────────
  const lv = getLv(gameState.xp);
  const evo = getEvo(gameState.xp);

  const TABS = [
    { key: 'home', label: '🏠 Ana' },
    { key: 'shop', label: '🛍️ Mağaza' },
    { key: 'quests', label: '📋 Görev' },
    { key: 'evo', label: '🌟 Evrim' },
    { key: 'achieve', label: '🏆 Başarı' },
  ];

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />

      {/* ── Intro Ekranı ──────────────────────────────────────────────────── */}
      {!started && (
        <View style={styles.introScreen}>
          <Animated.Text style={{ fontSize: 72 }}>🥚</Animated.Text>
          <Text style={styles.introTitle}>MyLittlePet'e{'\n'}Hoş Geldin!</Text>
          <Text style={styles.introSub}>Evcil hayvanına bir isim ver ve türünü seç</Text>

          <TextInput
            style={styles.introInput}
            placeholder="Adını yaz... (örn: Pamuk)"
            placeholderTextColor={COLORS.muted}
            value={petName}
            onChangeText={setPetName}
            maxLength={12}
          />

          <View style={styles.introPetRow}>
            {Object.entries(PET_TYPES).map(([key, pt]) => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.petChoice,
                  selectedType === key && styles.petChoiceSelected,
                ]}
                onPress={() => setSelectedType(key)}
                activeOpacity={0.85}
              >
                <View style={styles.introPetEmojiContainer}>
                  <Text style={styles.petChoiceEmoji}>{pt.emoji}</Text>
                </View>
                <Text style={styles.petChoiceLabel}>{pt.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.introBtn} onPress={startGame} activeOpacity={0.85}>
            <LinearGradient
              colors={[COLORS.pink, COLORS.purple]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.introBtn, { margin: 0 }]}
            >
              <Text style={styles.introBtnText}>Yumurtayı Kuluçkaya Yatır! 🥚✨</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}

      {/* ── Oyun ─────────────────────────────────────────────────────────── */}
      {started && (
        <>
          {/* Toast */}
          <Animated.View style={[styles.toast, { opacity: toastAnim }]}>
            <Text style={styles.toastText}>{toastMsg}</Text>
          </Animated.View>

          <View style={{ flex: 1 }}>
            {/* ── Topbar ────────────────────────────────────────────────── */}
            <View style={[styles.topbar, { paddingHorizontal: 14 }]}>
              <View style={styles.topStat}><Text style={styles.topStatText}>⭐ {gameState.xp} XP</Text></View>
              <View style={styles.topStat}><Text style={styles.topStatText}>🪙 {gameState.coin}</Text></View>
              <View style={styles.topStat}><Text style={styles.topStatText}>🔥 {gameState.streak} gün</Text></View>
              <View style={styles.topStat}><Text style={styles.topStatText}>Lv.{lv.lv}</Text></View>
            </View>

            {/* ── Tabs ──────────────────────────────────────────────────── */}
            <View style={[styles.tabBar, { paddingHorizontal: 14 }]}>
              {TABS.map(t => (
                <TouchableOpacity
                  key={t.key}
                  style={[styles.tabBtn, activeTab === t.key && styles.tabBtnActive]}
                  onPress={() => setActiveTab(t.key)}
                >
                  <Text style={[styles.tabText, activeTab === t.key && styles.tabTextActive]}>
                    {t.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* ── Tab İçerikleri ────────────────────────────────────────── */}
            <View style={{ flex: 1 }}>
              {activeTab === 'home' && (
                <HomeTab
                  state={gameState}
                  setState={setGameState}
                  onToast={showToast}
                />
              )}
              {activeTab === 'shop' && (
                <ScrollView contentContainerStyle={styles.scroll}>
                  <ShopTab
                    state={gameState}
                    setState={setGameState}
                    onToast={showToast}
                  />
                </ScrollView>
              )}
              {activeTab === 'quests' && (
                <ScrollView contentContainerStyle={styles.scroll}>
                  <QuestsTab
                    state={gameState}
                    setState={setGameState}
                    onToast={showToast}
                  />
                </ScrollView>
              )}
              {activeTab === 'evo' && (
                <ScrollView contentContainerStyle={styles.scroll}>
                  <EvoTab state={gameState} />
                </ScrollView>
              )}
              {activeTab === 'achieve' && (
                <ScrollView contentContainerStyle={styles.scroll}>
                  <AchieveTab
                    state={gameState}
                    setState={setGameState}
                    onToast={showToast}
                  />
                </ScrollView>
              )}
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
