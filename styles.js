import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const COLORS = {
  pink: '#FF8FAB',
  pink2: '#FFB3C6',
  pink3: '#FFE4EE',
  pink4: '#FFF0F7',
  purple: '#C77DFF',
  purp2: '#E0AAFF',
  purp3: '#F3E8FF',
  yellow: '#FFD166',
  yell2: '#FFF3CC',
  mint: '#A8E6CF',
  mint2: '#E8F8F0',
  blue: '#74C0FC',
  blue2: '#E7F5FF',
  text: '#5C3D6B',
  muted: '#9A7AAA',      // biraz koyulaştırıldı — okunabilirlik için
  border: '#F0C4E4',
  card: '#FFFAFD',
  bg: '#FFF0F7',
  white: '#FFFFFF',
};

const styles = StyleSheet.create({

  // ── Genel ─────────────────────────────────────────────────────────────────
  screen: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scroll: {
    paddingHorizontal: 14,
    paddingBottom: 20,
    alignItems: 'center',
  },

  // ── Topbar ────────────────────────────────────────────────────────────────
  topbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 8,
    marginTop: 8,
    gap: 4,
  },
  topStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 4,
  },
  topStatText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.text,
  },

  // ── Tab Bar ───────────────────────────────────────────────────────────────
  tabBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.pink3,
    borderRadius: 14,
    padding: 3,
    marginBottom: 10,
    width: '100%',
    gap: 3,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 6,
    borderRadius: 11,
    alignItems: 'center',
  },
  tabBtnActive: {
    backgroundColor: COLORS.white,
    shadowColor: COLORS.pink,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  tabText: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.muted,
  },
  tabTextActive: {
    color: COLORS.pink,
  },

  // ── Scene / Ortam ─────────────────────────────────────────────────────────
  scene: {
    width: '100%',
    height: 380, // Daha büyük ve ferah alan
    borderRadius: 24,
    borderWidth: 2,
    borderColor: 'rgba(255, 143, 171, 0.2)',
    overflow: 'visible', // Pet'in büyümesine izin ver
    marginBottom: 6,
    position: 'relative',
    marginTop: 6,
    backgroundColor: '#FFFFFF',
  },
  sceneFloor: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 52,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  sceneDeco: {
    position: 'absolute',
    bottom: 52,
    fontSize: 20,
  },
  sceneDecoLeft: { left: 14 },
  sceneDecoRight: { right: 14 },
  sceneDecoTopLeft: { left: 14, top: 14 },
  sceneDecoTopRight: { right: 14, top: 14 },

  petStage: {
    position: 'absolute',
    width: 140,
    height: 140,
    top: '48%',
    left: '50%',
    transform: [{ translateX: -70 }, { translateY: -70 }],
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  topHUD: {
    position: 'absolute',
    top: 15,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 25,
  },
  petHat: {
    fontSize: 28,
    lineHeight: 30,
    marginBottom: -6,
    minHeight: 30,
    textAlign: 'center',
  },
  petNameBadge: {
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 3,
    marginBottom: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  petNameText: {
    fontSize: 11,
    fontWeight: '900',
    color: COLORS.text,
  },
  petMoodText: {
    fontSize: 9,
    color: COLORS.muted,
    marginTop: 2,
    fontWeight: '700',
  },

  // ── Uyku Overlay ──────────────────────────────────────────────────────────
  sleepOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10,5,30,.82)',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    zIndex: 8,
  },
  sleepText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#B0A0D0',
  },

  // ── Banyo Overlay ─────────────────────────────────────────────────────────
  bathOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    zIndex: 8,
  },
  bathTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  bathDoneBtn: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 6,
    marginTop: 4,
  },
  bathDoneText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#3A9DDB',
  },

  // ── Banyo ────────────────────────────────────────────────────────────────
  bathtub: {
    marginTop: 20,
    alignItems: 'center',
  },
  bathtubContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  bathtubBody: {
    width: 120,
    height: 60,
    backgroundColor: '#E8F4F8',
    borderWidth: 3,
    borderColor: '#B0E0FF',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  bathtubEmoji: {
    fontSize: 40,
  },
  tap: {
    position: 'absolute',
    top: -25,
    right: -10,
  },
  tapEmoji: {
    fontSize: 30,
  },
  waterFlow: {
    position: 'absolute',
    top: -20,
    alignItems: 'center',
  },
  waterEmoji: {
    fontSize: 20,
    color: '#4DABF7',
  },
  bathProgressBar: {
    marginTop: 15,
    alignItems: 'center',
    width: 200,
  },
  bathProgressBg: {
    width: '100%',
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  bathProgressFill: {
    height: '100%',
    backgroundColor: '#4DABF7',
    borderRadius: 4,
  },
  bathProgressText: {
    fontSize: 12,
    color: '#2C3E50',
    marginTop: 5,
    fontWeight: '600',
  },

  // ── Mutfak Overlay ────────────────────────────────────────────────────────
  kitchenOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 18,
    zIndex: 8,
    alignItems: 'center',
  },

  // ── Oyun Overlay ──────────────────────────────────────────────────────────
  gameOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 18,
    zIndex: 5, // PetStage'den (10) daha düşük, SceneFloor'dan yüksek
    overflow: 'hidden',
  },
  gameDecoContainer: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
    opacity: 0.3,
  },
  gameDecoEmoji: {
    fontSize: 32,
  },
  gameActionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 2,
    borderColor: '#12CBC4',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#12CBC4',
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  gameActionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#12CBC4',
    marginTop: 8,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  kitchenPetZone: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kitchenFoodBar: {
    paddingHorizontal: 12,
    position: 'absolute',
    top: '62%', // Masanın üstüne denk gelmesi için
    width: '100%',
    zIndex: 30,
  },
  kitchenFoodTitle: {
    fontSize: 13,
    fontWeight: '900',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
    backgroundColor: 'rgba(255,255,255,0.85)',
    alignSelf: 'center',
    paddingHorizontal: 14,
    borderRadius: 12,
    paddingVertical: 4,
  },
  kitchenFoodScroll: {
    flexDirection: 'row',
    gap: 6,
    paddingBottom: 4,
  },
  foodItem: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 70,
    height: 90,
  },
  foodItemEmpty: {
    borderColor: '#E0E0E0',
    opacity: 0.5,
  },
  foodEmoji: {
    fontSize: 50, // Masanın üstünde büyük görünsün
  },
  foodName: {
    fontSize: 10,
    fontWeight: '900',
    color: '#FFF',
    marginTop: 4,
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  foodStock: {
    fontSize: 10,
    color: '#FFD166',
    fontWeight: '900',
  },
  kitchenCloseBtn: {
    position: 'absolute',
    top: 8,
    right: 10,
    backgroundColor: 'rgba(255,255,255,.8)',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  kitchenCloseText: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.text,
  },

  // ── Bars ──────────────────────────────────────────────────────────────────
  barsCard: {
    width: '100%',
    backgroundColor: COLORS.card,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 14,
    padding: 8,
    marginBottom: 6,
    marginTop: 0, // Üstte boşluk bırakma
  },
  barsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    width: '48%',
  },
  barLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: COLORS.text,
    width: 62,
  },
  barBg: {
    flex: 1,
    height: 6,
    backgroundColor: COLORS.pink3,
    borderRadius: 3,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 3,
  },
  barVal: {
    fontSize: 9,
    color: COLORS.muted,
    width: 14,
    textAlign: 'right',
    fontWeight: '600',
  },

  // ── Aksiyon Butonları ─────────────────────────────────────────────────────
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    width: '100%',
    marginBottom: 6,
    paddingHorizontal: 2,
  },
  actionBtn: {
    flex: 1,
    minWidth: '30%', // Butonları biraz daha genişlettik (3'lü veya 2'li sıra için)
    height: 70, // Daha belirgin butonlar
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  actionBtnDisabled: {
    opacity: 0.35,
  },
  actionBtnGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
  },
  actionBtnText: {
    fontSize: 12, // Daha okunabilir
    fontWeight: '900',
    color: COLORS.white,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.15)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },

  // ─── Olay Banner ───────────────────────────────────────────────────────────
  eventContainerStable: {
    minHeight: 70,
    marginBottom: 8,
    justifyContent: 'center',
  },
  eventBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 16,
    borderWidth: 2,
    backgroundColor: '#FFF0FA',
  },
  eventIcon: {
    fontSize: 24,
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  eventDesc: {
    fontSize: 12,
    color: '#666',
  },
  eventBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  eventBtnText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.white,
  },

  // ─── Bedroom / Lamp ────────────────────────────────────────────────────────
  lampBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255,255,255,0.4)',
    padding: 12,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.5)',
    zIndex: 2000, // Karanlık perdenin üstünde
  },
  lampEmoji: {
    fontSize: 28,
  },
  lightOffOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,10,0.88)',
    zIndex: 1500, // Pet'in üstünde ama butonların altında
    borderRadius: 20,
  },

  // ── Mağaza ────────────────────────────────────────────────────────────────
  shopSectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.text,
    marginTop: 10,
    marginBottom: 6,
    width: '100%',
  },
  shopGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    width: '100%',
    marginBottom: 4,
  },
  shopItem: {
    backgroundColor: COLORS.card,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 13,
    padding: 7,
    alignItems: 'center',
    width: (width - 28 - 24) / 3,
  },
  shopItemOwned: {
    borderColor: '#C77DFF',
    backgroundColor: '#F3E8FF',
  },
  shopItemEquipped: {
    borderColor: '#FF8FAB',
    backgroundColor: '#FFE4EE',
  },
  shopItemEmoji: {
    fontSize: 20,
    marginBottom: 2,
  },
  shopItemName: {
    fontSize: 8,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
  },
  shopItemPrice: {
    fontSize: 8,
    color: COLORS.muted,
    marginTop: 1,
    fontWeight: '600',
  },
  shopItemTag: {
    fontSize: 7,
    fontWeight: '800',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
    marginTop: 2,
    overflow: 'hidden',
  },
  tagOwned: { backgroundColor: '#E0AAFF', color: '#5C3D6B' },
  tagEquipped: { backgroundColor: '#FF8FAB', color: '#FFFFFF' },
  // ── Mutfak & Banyo Etkileşim ──────────────────────────────────────────────
  kitchenPetZone: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  kitchenTable: {
    position: 'absolute',
    bottom: 0,
    width: '100%', 
    height: 150,
    backgroundColor: '#D4A574',
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    borderWidth: 5,
    borderColor: '#A67C52',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 15,
    alignSelf: 'center',
    zIndex: 20,
  },
  interactionItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  interactionEmoji: {
    fontSize: 54,
  },
  interactionLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    marginTop: 10,
  },

  // ── Görevler ──────────────────────────────────────────────────────────────
  questCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 13,
    padding: 10,
    marginBottom: 6,
    width: '100%',
  },
  questHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  questTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.text,
  },
  questReward: {
    fontSize: 9,
    fontWeight: '700',
    backgroundColor: COLORS.yell2,
    color: '#8B6914',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    overflow: 'hidden',
  },
  questProgBg: {
    height: 5,
    backgroundColor: COLORS.pink3,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  questProgFill: {
    height: '100%',
    borderRadius: 3,
  },
  questFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questDesc: {
    fontSize: 8,
    color: COLORS.muted,
    fontWeight: '600',
  },
  questClaimBtn: {
    backgroundColor: COLORS.mint,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  questClaimText: {
    fontSize: 8,
    fontWeight: '800',
    color: '#1a6b45',
  },
  questDoneText: {
    fontSize: 8,
    color: COLORS.muted,
  },

  // ── Evrim ─────────────────────────────────────────────────────────────────
  evoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: COLORS.card,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 13,
    padding: 10,
    marginBottom: 6,
    width: '100%',
  },
  evoItemCurrent: {
    borderColor: '#C77DFF',
    backgroundColor: '#F3E8FF',
  },
  evoItemLocked: {
    opacity: 0.45,
  },
  evoEmoji: {
    fontSize: 28,
    width: 36,
    textAlign: 'center',
  },
  evoInfo: {
    flex: 1,
  },
  evoName: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.text,
  },
  evoReq: {
    fontSize: 9,
    color: COLORS.muted,
    fontWeight: '600',
  },
  evoBadge: {
    fontSize: 8,
    fontWeight: '800',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 5,
    overflow: 'hidden',
  },
  evoBadgeCurrent: { backgroundColor: '#C77DFF', color: '#FFFFFF' },
  evoBadgeOpen: { backgroundColor: '#A8E6CF', color: '#1a6b45' },
  evoBadgeLocked: { backgroundColor: '#FFE4EE', color: '#B08EBF' },

  // ── Intro Ekranı ──────────────────────────────────────────────────────────
  introScreen: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FFF0F7',
    zIndex: 50,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 28,
    gap: 14,
  },
  introTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.text,
    textAlign: 'center',
    lineHeight: 32,
  },
  introSub: {
    fontSize: 12,
    color: COLORS.muted,
    textAlign: 'center',
    fontWeight: '600',
  },
  introInput: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
  },
  introPetRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
    justifyContent: 'center',
    width: '100%',
  },
  petChoice: {
    width: 80,
    height: 80,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  petChoiceSelected: {
    borderColor: COLORS.pink,
    backgroundColor: COLORS.pink3,
  },
  petChoiceEmoji: {
    fontSize: 32,
    textAlign: 'center',
    lineHeight: 32,
  },
  petChoiceLabel: {
    fontSize: 8,
    fontWeight: '800',
    color: COLORS.text,
  },
  introBtn: {
    width: '100%',
    paddingVertical: 13,
    borderRadius: 16,
    alignItems: 'center',
  },
  introBtnText: {
    fontSize: 15,
    fontWeight: '900',
    color: COLORS.white,
  },

  // ── Toast ─────────────────────────────────────────────────────────────────
  toast: {
    position: 'absolute',
    top: 60, // iPhone çentiği/adası altına çekildi
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 143, 171, 0.95)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  toastText: {
    fontSize: 14,
    fontWeight: '900',
    color: COLORS.white,
    textAlign: 'center',
  },

  // ── Konuşma Balonu ────────────────────────────────────────────────────────
  bubble: {
    position: 'absolute',
    top: -44,
    alignSelf: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    zIndex: 3000, // PetSVG ve overlay'in üstünde
  },
  bubbleText: {
    fontSize: 9,
    fontWeight: '700',
    color: COLORS.text,
    whiteSpace: 'nowrap',
  },

  // ── Başarımlar (Achievements) ─────────────────────────────────────────────
  achieveCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 13,
    padding: 10,
    marginBottom: 6,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  achieveCardLocked: {
    opacity: 0.55,
  },
  achieveIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.pink3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  achieveIconWrapLocked: {
    backgroundColor: '#EAEAEA',
  },
  achieveEmoji: {
    fontSize: 22,
  },
  achieveInfo: {
    flex: 1,
  },
  achieveTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.text,
  },
  achieveDesc: {
    fontSize: 9,
    color: COLORS.muted,
    fontWeight: '600',
  },
  achieveReward: {
    fontSize: 8,
    fontWeight: '700',
    color: '#8B6914',
    marginTop: 2,
  },
  achieveBadge: {
    backgroundColor: COLORS.mint,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  achieveBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#1a6b45',
  },
});

export default styles;
