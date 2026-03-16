import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import styles, { COLORS } from '../styles';
import { QUESTS, EVO, getEvo, ACHIEVEMENTS } from '../constants';

// ────────────────────────────────────────────────────────────────────────────
// QuestsTab
// ────────────────────────────────────────────────────────────────────────────
export const QuestsTab = ({ state, setState, onToast }) => {
  const claimQuest = (quest) => {
    setState(prev => ({
      ...prev,
      xp: prev.xp + quest.reward.xp,
      coin: prev.coin + quest.reward.coin,
      questClaimed: { ...prev.questClaimed, [quest.id]: true },
    }));
    onToast(`+${quest.reward.xp} XP & 🪙${quest.reward.coin}!`);
  };

  return (
    <View style={{ width: '100%' }}>
      {QUESTS.map(q => {
        const current = Math.min(state[q.key] ?? 0, q.goal);
        const pct = Math.round((current / q.goal) * 100);
        const done = current >= q.goal;
        const claimed = state.questClaimed[q.id];

        return (
          <View key={q.id} style={styles.questCard}>
            <View style={styles.questHeader}>
              <Text style={styles.questTitle}>{q.title}</Text>
              <Text style={styles.questReward}>+{q.reward.xp} XP 🪙{q.reward.coin}</Text>
            </View>
            <View style={styles.questProgBg}>
              <LinearGradient
                colors={[COLORS.pink, COLORS.purple]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.questProgFill, { width: `${pct}%` }]}
              />
            </View>
            <View style={styles.questFooter}>
              <Text style={styles.questDesc}>{q.desc} ({current}/{q.goal})</Text>
              {done && !claimed && (
                <TouchableOpacity style={styles.questClaimBtn} onPress={() => claimQuest(q)}>
                  <Text style={styles.questClaimText}>Ödül Al!</Text>
                </TouchableOpacity>
              )}
              {claimed && <Text style={styles.questDoneText}>Tamamlandı ✓</Text>}
            </View>
          </View>
        );
      })}
    </View>
  );
};

// ────────────────────────────────────────────────────────────────────────────
// EvoTab
// ────────────────────────────────────────────────────────────────────────────
export const EvoTab = ({ state }) => {
  const currentEvo = getEvo(state.xp);

  return (
    <View style={{ width: '100%' }}>
      {EVO.map(stage => {
        const unlocked = state.xp >= stage.min;
        const current = currentEvo === stage;

        return (
          <View
            key={stage.name}
            style={[
              styles.evoItem,
              current && styles.evoItemCurrent,
              !unlocked && styles.evoItemLocked,
            ]}
          >
            <Text style={styles.evoEmoji}>{stage.emoji}</Text>
            <View style={styles.evoInfo}>
              <Text style={styles.evoName}>{stage.name}</Text>
              <Text style={styles.evoReq}>
                {unlocked ? 'Açıldı! 🎉' : `Gerekli: ${stage.min} XP`}
              </Text>
            </View>
            {current
              ? <Text style={[styles.evoBadge, styles.evoBadgeCurrent]}>Şu an</Text>
              : unlocked
                ? <Text style={[styles.evoBadge, styles.evoBadgeOpen]}>✓ Açık</Text>
                : <Text style={[styles.evoBadge, styles.evoBadgeLocked]}>🔒 {stage.min} XP</Text>
            }
          </View>
        );
      })}
    </View>
  );
};

// ────────────────────────────────────────────────────────────────────────────
// AchieveTab
// ────────────────────────────────────────────────────────────────────────────
export const AchieveTab = ({ state, setState, onToast }) => {
  const claimAchievement = (ach) => {
    setState(prev => ({
      ...prev,
      xp: prev.xp + (ach.rewardXp || 0),
      coin: prev.coin + (ach.rewardCoin || 0),
      claimedAchievements: [...(prev.claimedAchievements || []), ach.id],
    }));
    onToast(`🏆 +${ach.rewardXp} XP & 🪙${ach.rewardCoin} Alındı!`);
  };

  return (
    <View style={{ width: '100%' }}>
      {ACHIEVEMENTS.map(ach => {
        const unlocked = state.unlockedAchievements?.includes(ach.id) || false;
        const claimed = state.claimedAchievements?.includes(ach.id) || false;

        return (
          <View
            key={ach.id}
            style={[
              styles.achieveCard, 
              !unlocked && styles.achieveCardLocked,
              claimed && { borderColor: COLORS.mint, opacity: 0.85 }
            ]}
          >
            <View style={[styles.achieveIconWrap, !unlocked && styles.achieveIconWrapLocked]}>
              <Text style={styles.achieveEmoji}>{unlocked ? ach.icon : '🔒'}</Text>
            </View>
            <View style={styles.achieveInfo}>
              <Text style={styles.achieveTitle}>{ach.title}</Text>
              <Text style={styles.achieveDesc}>{ach.desc}</Text>
              {!claimed && (
                <Text style={styles.achieveReward}>Ödül: +{ach.rewardXp} XP 🪙{ach.rewardCoin}</Text>
              )}
            </View>

            {unlocked && !claimed && (
              <TouchableOpacity 
                style={[styles.questClaimBtn, { paddingHorizontal: 10, paddingVertical: 6 }]} 
                onPress={() => claimAchievement(ach)}
              >
                <Text style={styles.questClaimText}>Ödülü Al!</Text>
              </TouchableOpacity>
            )}

            {claimed && (
              <View style={[styles.achieveBadge, { backgroundColor: COLORS.mint2 }]}>
                <Text style={[styles.achieveBadgeText, { color: COLORS.mint }]}>Alındı ✓</Text>
              </View>
            )}

            {unlocked && !claimed && (
              <View style={styles.achieveBadge}>
                <Text style={styles.achieveBadgeText}>Hazır!</Text>
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
};
