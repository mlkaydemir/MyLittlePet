import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  Animated, ImageBackground, PanResponder, Dimensions, StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';

import styles, { COLORS } from '../styles';
import PetSVG from './PetSVG';
import {
  SHOP_SKINS, SHOP_EYES,
  SHOP_ENVS, SHOP_DECS, FOODS,
  BUBBLES, EVENTS, BEDROOM_ENV
} from '../constants';

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

// ── Renkleri gradyan dizisine çevir ──────────────────────────────────────────
function bgColors(env) {
  if (!env) return ['#FFE4EE', '#FFF0F7'];
  const bg = env.bg;
  const stops = bg.match(/#[0-9A-Fa-f]{6}/g) || ['#FFE4EE', '#FFF0F7'];
  return stops.length >= 2 ? [stops[0], stops[stops.length - 1]] : [stops[0], stops[0]];
}

const HomeTab = ({ state, setState, onToast }) => {
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleText, setBubbleText] = useState('');
  const [showBath, setShowBath] = useState(false);
  const [showKitchen, setShowKitchen] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [isFeeding, setIsFeeding] = useState(false);
  const [isBathActive, setIsBathActive] = useState(false);
  const [bathProgress, setBathProgress] = useState(0);
  const bubbleTimer = useRef(null);
  const bounceAnim = useRef(new Animated.Value(1)).current;
  const [mouthOpen, setMouthOpen] = useState(false);

  // Bath animation
  useEffect(() => {
    let interval;
    if (isBathActive && showBath) {
      interval = setInterval(() => {
        if (bathProgress >= 100) {
          setIsBathActive(false);
          setBathProgress(0);
          setState(prevState => ({
            ...prevState,
            clean: clamp(prevState.clean + 4, 0, 10),
            happy: clamp(prevState.happy + 1, 0, 10),
            xp: prevState.xp + 10,
            coin: prevState.coin + 2,
            bathed: prevState.bathed + 1,
          }));
          onToast(`+10 XP 🧼 ${state.petName} tertemiz!`);
          maybeEvent();
        } else {
          setBathProgress(prev => prev + 5);
        }
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isBathActive, showBath, bathProgress]);
  const spongePos = useRef(new Animated.ValueXY()).current;
  const [draggingFood, setDraggingFood] = useState(null);
  const [isSpongeDragging, setIsSpongeDragging] = useState(false);

  const resetFood = () => {
    setDraggingFood(null);
  };

  const feedFood = (food) => {
    if (state.hunger >= 10) { onToast('Zaten tokum! 😋'); return; }
    if ((state.foodStock[food.id] ?? 0) <= 0) { onToast('Stok bitti! Mağazadan al 🛍️'); return; }
    setIsFeeding(true);
    setTimeout(() => setIsFeeding(false), 1500);
    setState(prev => ({
      ...prev,
      hunger: clamp(prev.hunger + food.hunger, 0, 10),
      happy: clamp(prev.happy + food.happy, 0, 10),
      fever: clamp(prev.fever + food.fever, -10, 10),
      xp: prev.xp + food.xp,
      fed: prev.fed + 1,
      foodStock: { ...prev.foodStock, [food.id]: (prev.foodStock[food.id] ?? 0) - 1 },
    }));
    setBubbleText(`+${food.xp} XP! 🍽️`);
    setShowBubble(true);
    bubbleTimer.current = setTimeout(() => setShowBubble(false), 2000);
    bounce();
    maybeEvent();
  };

  // Ses Efektleri - Kaldırıldı
  const playSound = (type) => {
    // Boş fonksiyon - ses yok
  };

  const env = (state.envActive === 'bedroom' ? BEDROOM_ENV : SHOP_ENVS.find(e => e.id === state.envActive)) || SHOP_ENVS[0];

  // ── Yüz modu ────────────────────────────────────────────────────────────
  const getFace = () => {
    if (state.sleeping && !state.lightOn) return 'sleep'; // Sadece ışık kapalıyken gözlerini yumsun
    if (isFeeding) return 'happy';
    if (state.activeEvent?.id === 'sick') return 'sick';
    const avg = (state.health + state.happy + state.hunger + state.clean + state.energy) / 5;
    if (state.energy <= 2 && !state.lightOn) return 'sleep';
    if (avg >= 7.5) return 'happy';
    if (avg < 4) return 'sad';
    return 'normal';
  };

  const bounce = () => {
    Animated.sequence([
      Animated.timing(bounceAnim, { toValue: 1.15, duration: 120, useNativeDriver: true }),
      Animated.spring(bounceAnim, { toValue: 1, friction: 4, useNativeDriver: true }),
    ]).start();
  };

  const petTap = () => {
    if (state.sleeping) { onToast(`${state.petName} uyuyor... 😴`); return; }
    playSound('tap');
    setState(prev => ({ ...prev, tapped: prev.tapped + 1, happy: clamp(prev.happy + 1, 0, 10) }));
    const text = BUBBLES[Math.floor(Math.random() * BUBBLES.length)];
    setBubbleText(text);
    setShowBubble(true);
    bounce();
    clearTimeout(bubbleTimer.current);
    bubbleTimer.current = setTimeout(() => setShowBubble(false), 2400);
  };

  const doAction = (type) => {
    if (state.sleeping && type !== 'meds') { onToast(`${state.petName} uyuyor! 😴`); return; }
    if (state.activeEvent?.id === 'sick' && type !== 'meds') { onToast('Önce iyileştir! 🤒'); return; }
    if (state.rainActive && type === 'play') { onToast('Yağmur yağıyor! ☔'); return; }

    playSound('tap');
    const map = {
      play: { xp: 15, coin: 3, msg: '+15 XP 🎾', dh: 0, dhp: 3, dhu: -1, dcl: -1, den: -2, dfe: 0, key: 'played' },
      meds: { xp: 12, coin: 1, msg: '+12 XP 💊', dh: 3, dhp: 0, dhu: 0, dcl: 0, den: 2, dfe: -3, key: 'medded' },
    };
    const a = map[type];
    if (type === 'meds' && state.coin < 15) { onToast('Yeterli coin yok! (15 🪙 gerekli) 🛍️'); return; }

    setState(prev => {
      const next = {
        ...prev,
        xp: prev.xp + a.xp,
        coin: type === 'meds' ? prev.coin - 15 : prev.coin + a.coin,
        health: clamp(prev.health + a.dh, 0, 10),
        happy: clamp(prev.happy + a.dhp, 0, 10),
        hunger: clamp(prev.hunger + a.dhu, 0, 10),
        clean: clamp(prev.clean + a.dcl, 0, 10),
        energy: clamp(prev.energy + a.den, 0, 10),
        fever: clamp(prev.fever + a.dfe, 0, 10),
        [a.key]: prev[a.key] + 1,
      };
      if (type === 'meds' && prev.activeEvent?.id === 'sick') next.activeEvent = null;
      return next;
    });
    bounce();
    onToast(a.msg);
    maybeEvent();
  };

  const toggleSleep = () => {
    playSound('tap');
    setState(prev => {
      if (prev.sleeping) {
        onToast(`${prev.petName} uyandı! ☀️ +8 XP`);
        return { 
          ...prev, 
          sleeping: false, 
          lightOn: true,
          energy: clamp(prev.energy + 2, 0, 10), 
          xp: prev.xp + 8,
          envActive: prev.prevEnv || 'room' 
        };
      }
      onToast(`${prev.petName} uyuyor... 🌙`);
      // Diğer odaları kapat
      setShowKitchen(false);
      setShowBath(false);
      setShowGame(false);
      return { 
        ...prev, 
        sleeping: true, 
        lightOn: true, // Uykuya her zaman aydınlık başla (lamba açık)
        slept: prev.slept + 1, 
        energy: clamp(prev.energy + 3, 0, 10),
        prevEnv: prev.envActive, 
        envActive: 'bedroom' 
      };
    });
  };

  const toggleLamp = () => {
    playSound('tap');
    setState(prev => ({ ...prev, lightOn: !prev.lightOn }));
    onToast(state.lightOn ? 'Işık kapatıldı 🌑' : 'Işık açıldı 💡');
  };

  const openBath = () => {
    if (state.sleeping && !state.lightOn) { onToast('Petiniz uyuyor! 😴 Lambayı açmalısın.'); return; }
    playSound('tap');
    setShowKitchen(false);
    setShowGame(false);
    setBathProgress(0);
    setIsBathActive(false);
    setShowBath(true);
    if (state.sleeping) {
      setState(p => ({ ...p, sleeping: false, lightOn: true, envActive: p.prevEnv || 'room' }));
    }
    onToast('Banyo zamanı! 🛁');
  };
  const endBath = () => {
    playSound('tap');
    setShowBath(false);
    setState(prev => ({
      ...prev,
      clean: clamp(prev.clean + 4, 0, 10),
      happy: clamp(prev.happy + 1, 0, 10),
      xp: prev.xp + 10,
      coin: prev.coin + 2,
      bathed: prev.bathed + 1,
    }));
    bounce();
    onToast(`+10 XP 🧼 ${state.petName} tertemiz!`);
    maybeEvent();
  };

  const openKitchen = () => {
    if (state.sleeping && !state.lightOn) { onToast('Petiniz uyuyor! 😴 Lambayı açmalısın.'); return; }
    playSound('tap');
    setShowBath(false);
    setShowGame(false);
    setShowKitchen(true);
    if (state.sleeping) {
      setState(p => ({ ...p, sleeping: false, lightOn: true, envActive: p.prevEnv || 'room' }));
    }
  };

  const openMiniGame = () => {
    if (state.sleeping && !state.lightOn) { onToast('Petiniz uyuyor! 😴 Lambayı açmalısın.'); return; }
    playSound('tap');
    setShowBath(false);
    setShowKitchen(false);
    setShowGame(true);
    if (state.sleeping) {
      setState(p => ({ ...p, sleeping: false, lightOn: true, envActive: p.prevEnv || 'room' }));
    }
    onToast('Oyun Zamanı! 🎮');
  };

  const playInGame = () => {
    if (state.happy >= 10) { onToast('Zaten çok mutluyum! ✨'); return; }
    // Simple reward logic for clicking in game mode
    const rewards = [
      { xp: 25, coin: 10, msg: 'Harika! +25 XP, +10 🪙' },
      { xp: 15, coin: 5, msg: 'İyi! +15 XP, +5 🪙' },
      { xp: 30, coin: 15, msg: 'Mükemmel! +30 XP, +15 🪙' },
      { xp: 10, coin: 3, msg: 'Teşekkürler! +10 XP, +3 🪙' }
    ];
    const reward = rewards[Math.floor(Math.random() * rewards.length)];
    
    setState(prev => ({
      ...prev,
      xp: prev.xp + reward.xp,
      coin: prev.coin + reward.coin,
      happy: clamp(prev.happy + 2, 0, 10),
      played: prev.played + 1
    }));
    
    bounce();
    onToast(`🎮 ${reward.msg}`);
    maybeEvent();
  };
  const maybeEvent = () => {
    if (!state.activeEvent && Math.random() < 0.17) {
      const evList = EVENTS;
      const ev = evList[Math.floor(Math.random() * evList.length)];
      setState(prev => ({
        ...prev,
        activeEvent: ev,
        rainActive: ev.id === 'rain' ? true : prev.rainActive,
      }));
    }
  };

  const resolveEvent = () => {
    playSound('tap');
    const ev = state.activeEvent;
    if (!ev) return;

    let toastMsg = '';
    setState(prev => {
      let next = { ...prev, activeEvent: null, rainActive: false };
      switch (ev.action) {
        case 'heal': 
          next.health = clamp(prev.health + 3, 0, 10); 
          next.fever = 0; 
          toastMsg = 'İyileşti! 💚';
          break;
        case 'gift': 
          next.coin = prev.coin + 50; 
          toastMsg = '+50 coin! 🎁';
          break;
        case 'rain': 
          next.rainActive = false; 
          toastMsg = 'Yağmur dindi! ☀️';
          break;
        case 'birthday': 
          next.coin = prev.coin + 80; 
          toastMsg = 'Mutlu Yıllar! 🎂';
          break;
        case 'hug': 
          next.happy = clamp(prev.happy + 3, 0, 10); 
          toastMsg = 'Sevgi paylaştıkça güzel! ❤️';
          break;
        case 'treat': 
          next.xp = prev.xp + 30; 
          toastMsg = 'Leziz! 😋';
          break;
      }
      return next;
    });
    if (toastMsg) onToast(toastMsg);
  };

  const avgStat = Math.round((state.health + state.happy + state.hunger + state.clean + state.energy) / 5);
  const moods = ['Çok Kötü 💔', 'Kötü 😞', 'Eh 😐', 'İyi 🌸', 'Mutlu ✨', 'Aşırı Mutlu 💕'];
  const moodText = moods[Math.min(Math.floor(avgStat / 2), 5)];

  const bars = [
    { label: '❤️ Sağlık', val: state.health, color: COLORS.pink },
    { label: '😊 Mutluluk', val: state.happy, color: COLORS.purple },
    { label: '🍖 Açlık', val: state.hunger, color: COLORS.yellow },
    { label: '🧼 Temizlik', val: state.clean, color: COLORS.blue },
    { label: '⚡ Enerji', val: state.energy, color: COLORS.mint },
    { label: '🌡️ Ateş', val: state.fever, color: '#FF6B6B' },
  ];

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 14, paddingBottom: 6 }}
        style={{ flex: 1 }}
      >
        {/* ── Stable Event Banner Container ── */}
        <View style={styles.eventContainerStable}>
          {state.activeEvent && (
            <View style={[styles.eventBanner, { backgroundColor: state.activeEvent.bgColor, borderColor: state.activeEvent.borderColor }]}>
              <Text style={styles.eventIcon}>{state.activeEvent.icon}</Text>
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.eventTitle}>{state.activeEvent.title}</Text>
                <Text style={styles.eventDesc}>{state.activeEvent.desc}</Text>
              </View>
              <TouchableOpacity
                style={[styles.eventBtn, { backgroundColor: state.activeEvent.borderColor }]}
                onPress={resolveEvent}
                activeOpacity={0.8}
              >
                <Text style={styles.eventBtnText}>{state.activeEvent.btnText}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* ── Sahne / Ortam ────────────────────────────────────────────────── */}
        <View style={styles.scene}>
          <LinearGradient colors={bgColors(env)} style={{ ...styles.scene, margin: 0, borderWidth: 0 }} />

          {/* Deko */}
          {!showBath && !showKitchen && !showGame && (
            <>
              <Text style={[styles.sceneDeco, styles.sceneDecoLeft]}>
                {env.d1 ?? '🛋️'}
              </Text>
              <Text style={[styles.sceneDeco, styles.sceneDecoRight]}>
                {env.d2 ?? '🪴'}
              </Text>
              <Text style={[styles.sceneDeco, styles.sceneDecoTopLeft]}>
                {env.d3 ?? '🖼️'}
              </Text>
              <Text style={[styles.sceneDeco, styles.sceneDecoTopRight]}>
                {env.d4 ?? '✨'}
              </Text>
            </>
          )}

          {/* Zemin (Floor) */}
          <View style={[styles.sceneFloor, { backgroundColor: env.floor }]} />

          {/* Uyku overlay - Metin kaldırıldı */}
          {state.sleeping && (
            <TouchableOpacity style={styles.sleepOverlay} onPress={toggleSleep} activeOpacity={0.9}>
              <Animated.Text style={{ fontSize: 44 }}>😴</Animated.Text>
            </TouchableOpacity>
          )}

          {/* Sınırlı Karanlık Efekti (Sadece Scene içinde) */}
          {state.sleeping && !state.lightOn && (
            <View pointerEvents="none" style={styles.lightOffOverlay} />
          )}

          {/* Lamba Butonu (Üstte Kalmalı) */}
          {state.sleeping && (
            <TouchableOpacity 
              style={styles.lampBtn} 
              onPress={toggleLamp}
              activeOpacity={0.7}
            >
              <Text style={styles.lampEmoji}>{state.lightOn ? '💡' : '🌑'}</Text>
            </TouchableOpacity>
          )}

          {/* TOP HUD (Name & Mood) - Always Visible */}
          <View style={styles.topHUD}>
            <View style={styles.petNameBadge}>
              <Text style={styles.petNameText}>{state.petName}</Text>
            </View>
            <Text style={styles.petMoodText}>{moodText}</Text>
          </View>

          {/* CENTRALIZED PET STAGE */}
          <View style={styles.petStage}>
            <TouchableOpacity onPress={petTap} activeOpacity={0.85} disabled={showBath || showKitchen || showGame}>
              <Animated.View style={{ transform: [{ scale: bounceAnim }], position: 'relative', alignItems: 'center' }}>
                {showBubble && (
                  <View style={styles.bubble}>
                    <Text style={styles.bubbleText}>{bubbleText}</Text>
                  </View>
                )}
                
                <View style={{ marginBottom: 0, zIndex: 1 }}>
                  <PetSVG
                    petType={state.petType}
                    face={state.sleeping && !state.lightOn ? 'sleep' : (showBath ? 'happy' : (showGame ? 'happy' : getFace()))}
                    skinColor={state.skinColor}
                    eyeColor={state.eyeColor}
                    showBubbles={showBath && isBathActive}
                    xp={state.xp}
                    mouthOpen={mouthOpen}
                  />
                </View>

                {showBath && isBathActive && (
                  <View style={{ position: 'absolute', top: -20, left: 0, right: 0, alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.blue }}>Temizleniyor...</Text>
                  </View>
                )}

                {showGame && (
                  <TouchableOpacity 
                    style={{ position: 'absolute', bottom: -75, alignItems: 'center' }}
                    onPress={playInGame}
                  >
                    <View style={styles.gameActionButton}>
                      <Text style={{ fontSize: 24 }}>🕹️</Text>
                    </View>
                    <Text style={styles.gameActionTitle}>Oynamak için dokun!</Text>
                  </TouchableOpacity>
                )}
              </Animated.View>
            </TouchableOpacity>
          </View>

          {/* Banyo Kontrolleri */}
          {showBath && (
            <View style={[styles.bathOverlay, { backgroundColor: 'transparent' }]}>
              <TouchableOpacity 
                style={{ position: 'absolute', bottom: 60, alignItems: 'center' }}
                onPress={() => setIsBathActive(true)}
              >
                <View style={styles.tap}>
                  <Text style={styles.tapEmoji}>🧽</Text>
                </View>
                <Text style={styles.bathTitle}>Temizlemek için dokun!</Text>
                
                {isBathActive && (
                  <View style={styles.bathProgressBar}>
                    <View style={styles.bathProgressBg}>
                      <View style={[styles.bathProgressFill, { width: `${bathProgress}%` }]} />
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          )}

          {/* Mutfak Overlay (Yemekler Masada) */}
          {showKitchen && (
            <View style={styles.kitchenOverlay}>
              <View style={styles.kitchenTable} />
              
              <View style={styles.kitchenFoodBar}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.kitchenFoodScroll}>
                  {FOODS.map(f => {
                    const stock = state.foodStock[f.id] ?? 0;
                    const empty = stock <= 0;
                    return (
                      <TouchableOpacity
                        key={f.id}
                        style={[styles.foodItem, empty && styles.foodItemEmpty]}
                        onPress={() => {
                          if (empty) return;
                          feedFood(f);
                        }}
                        disabled={empty || isFeeding}
                      >
                        <Text style={styles.foodEmoji}>{f.emoji}</Text>
                        <Text style={styles.foodName}>{f.name}</Text>
                        <Text style={styles.foodStock}>x{stock}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
            </View>
          )}

          {/* Oyun Overlay */}
          {showGame && (
            <View style={styles.gameOverlay}>
              <LinearGradient 
                colors={['#1B1464', '#0652DD', '#12CBC4']} 
                style={StyleSheet.absoluteFill} 
              />
              <View style={styles.gameDecoContainer}>
                <Text style={styles.gameDecoEmoji}>👾</Text>
                <Text style={styles.gameDecoEmoji}>🚀</Text>
                <Text style={styles.gameDecoEmoji}>✨</Text>
              </View>
            </View>
          )}
        </View>

        {/* ── Barlar / Status (EN ALT) ──────────────────────────────────────── */}
        <View style={[styles.barsCard, { marginTop: 0, marginBottom: 10 }]}>
          <View style={styles.barsGrid}>
            {bars.map(b => (
              <View key={b.label} style={styles.barRow}>
                <Text style={styles.barLabel}>{b.label}</Text>
                <View style={styles.barBg}>
                  <View style={[styles.barFill, { width: `${b.val * 10}%`, backgroundColor: b.color }]} />
                </View>
                <Text style={styles.barVal}>{b.val}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* ── Action Buttons (SABİT EN ALT) ────────────────────────────────── */}
      <View style={[styles.actionsGrid, { paddingBottom: 12, paddingHorizontal: 14, paddingTop: 6 }]}>
        {[
          { label: '🎮  Oyun', color: ['#FF8FAB', '#FF6B9D'], onPress: openMiniGame, disabled: false },
          { label: '🛁  Banyo', color: ['#74C0FC', '#3A9DDB'], onPress: openBath, disabled: false },
          { label: '💊  İlaç', color: ['#63E6BE', '#15A97A'], onPress: () => doAction('meds'), disabled: false },
          { label: '🍽️  Mutfak', color: ['#FFD166', '#F9A825'], onPress: openKitchen, disabled: false },
          {
            label: state.sleeping ? '☀️  Uyan' : '😴  Uyut',
            color: state.sleeping ? ['#FFD166', '#F9A825'] : ['#FF8FAB', '#C77DFF'],
            onPress: toggleSleep,
            disabled: false,
          },
        ].map((btn, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.actionBtn, btn.disabled && styles.actionBtnDisabled, { height: 60 }]}
            onPress={btn.onPress}
            disabled={btn.disabled}
            activeOpacity={0.8}
          >
            <LinearGradient colors={btn.color} style={styles.actionBtnGradient}>
              <Text style={styles.actionBtnText}>{btn.label}</Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default HomeTab;
