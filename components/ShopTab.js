import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

import styles, { COLORS } from '../styles';
import {
  SHOP_SKINS, SHOP_EYES,
  SHOP_ENVS, SHOP_DECS, FOODS,
} from '../constants';

/**
 * ShopTab — Mağaza.
 */
const ShopTab = ({ state, setState, onToast }) => {
  const buyOrEquip = (item, category) => {
    const ownedKey  = { skin: 'ownedSkins', eye: 'ownedEyes', env: 'ownedEnv', dec: 'ownedDec' }[category];
    const equipKey  = { skin: 'skinColor',  eye: 'eyeColor',  env: 'envActive',dec: 'eqDec'    }[category];
    const owned     = state[ownedKey]?.includes(item.id);
    const equipped  = state[equipKey] === item.id;

    if (equipped) {
      setState(prev => ({ ...prev, [equipKey]: '' }));
      return;
    }
    if (owned) {
      if (category === 'skin' || category === 'eye') {
        setState(prev => ({ ...prev, [equipKey]: item.color }));
      } else {
        setState(prev => ({ ...prev, [equipKey]: item.id }));
      }
      onToast(`${item.emoji} seçildi!`);
      return;
    }
    if (state.coin < item.price) { onToast('Yeterli coin yok! 🪙'); return; }

    setState(prev => ({
      ...prev,
      coin:       prev.coin - item.price,
      [ownedKey]: [...(prev[ownedKey] ?? []), item.id],
      [equipKey]: (category === 'skin' || category === 'eye') ? item.color : item.id,
    }));
    onToast(`${item.emoji} satın alındı!`);
  };

  const buyFood = (food) => {
    if (state.coin < food.price) { onToast('Yeterli coin yok! 🪙'); return; }
    setState(prev => ({
      ...prev,
      coin:      prev.coin - food.price,
      foodStock: { ...prev.foodStock, [food.id]: (prev.foodStock[food.id] ?? 0) + 3 },
    }));
    onToast(`${food.emoji} x3 satın alındı!`);
  };

  const ShopSection = ({ title, items, category }) => (
    <>
      <Text style={styles.shopSectionTitle}>{title}</Text>
      <View style={styles.shopGrid}>
        {items.map(item => {
          const ownedKey = { skin: 'ownedSkins', eye: 'ownedEyes', env: 'ownedEnv', dec: 'ownedDec' }[category];
          const equipKey = { skin: 'skinColor',  eye: 'eyeColor',  env: 'envActive',dec: 'eqDec'    }[category];
          const owned    = state[ownedKey]?.includes(item.id);
          const equipped = (category === 'skin' || category === 'eye')
            ? state[equipKey] === item.color
            : state[equipKey] === item.id;

          return (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.shopItem,
                equipped ? styles.shopItemEquipped : owned ? styles.shopItemOwned : null,
              ]}
              onPress={() => buyOrEquip(item, category)}
              activeOpacity={0.8}
            >
              <Text style={styles.shopItemEmoji}>{item.emoji}</Text>
              <Text style={styles.shopItemName}>{item.name}</Text>
              {equipped
                ? <Text style={[styles.shopItemTag, styles.tagEquipped]}>Aktif</Text>
                : owned
                  ? <Text style={[styles.shopItemTag, styles.tagOwned]}>Sahip</Text>
                  : <Text style={styles.shopItemPrice}>🪙 {item.price}</Text>
              }
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%' }}>

      <ShopSection title="🎨 Ten Rengi"                items={SHOP_SKINS}    category="skin" />
      <ShopSection title="👁️ Göz Rengi"               items={SHOP_EYES}     category="eye" />
      <ShopSection title="🏠 Ortamlar"                  items={SHOP_ENVS}     category="env" />

      {/* ── Yiyecek Marketi ─────────────────────────────────────────────── */}
      <Text style={styles.shopSectionTitle}>🍽️ Yiyecek Marketi</Text>
      <Text style={{ fontSize: 9, color: COLORS.muted, marginBottom: 6, fontWeight: '600' }}>
        Her satın alımda 3 adet stoklanır. Mutfaktan yedirebilirsin.
      </Text>
      <View style={styles.shopGrid}>
        {FOODS.map(food => {
          const stock = state.foodStock[food.id] ?? 0;
          return (
            <TouchableOpacity
              key={food.id}
              style={[styles.shopItem, stock > 0 && styles.shopItemOwned]}
              onPress={() => buyFood(food)}
              activeOpacity={0.8}
            >
              <Text style={styles.shopItemEmoji}>{food.emoji}</Text>
              <Text style={styles.shopItemName}>{food.name}</Text>
              {stock > 0
                ? <Text style={[styles.shopItemTag, styles.tagOwned]}>x{stock}</Text>
                : <Text style={styles.shopItemPrice}>🪙 {food.price}</Text>
              }
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={{ height: 24 }} />
    </ScrollView>
  );
};

export default ShopTab;
