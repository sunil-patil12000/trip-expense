/**
 * Dashboard / My Trips Screen
 * Matches Stitch screen: "Modern Dashboard (V2)"
 * Shows list of ongoing trips with balance info.
 */

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Trip } from '@/constants/mock-data';
import { AppColors, BorderRadius, FontSize, FontWeight, Spacing } from '@/constants/theme';
import { useAppContext } from '@/context/AppContext';

const TripCard = ({ trip, index, onPress }: { trip: Trip; index: number; onPress: () => void }) => {
  const { currencySymbol } = useAppContext();
  const balanceColor = trip.yourBalance >= 0 ? AppColors.success : AppColors.danger;
  const balancePrefix = trip.yourBalance >= 0 ? '+' : '';

  return (
    <Animated.View entering={FadeInDown.delay(index * 100).duration(500)}>
      <TouchableOpacity style={styles.tripCard} onPress={onPress} activeOpacity={0.7}>
        <View style={styles.tripCardHeader}>
          <View style={styles.tripEmoji}>
            <Text style={styles.tripEmojiText}>{trip.emoji}</Text>
          </View>
          <View style={styles.tripInfo}>
            <Text style={styles.tripName}>{trip.name}</Text>
            <Text style={styles.tripDate}>
              {trip.dateRange} • {trip.memberCount} People
            </Text>
          </View>
          <MaterialIcons name="chevron-right" size={20} color={AppColors.textTertiary} />
        </View>

        <View style={styles.tripCardFooter}>
          <View style={styles.balanceItem}>
            <Text style={styles.balanceLabel}>Your Balance</Text>
            <Text style={[styles.balanceValue, { color: balanceColor }]}>
              {balancePrefix}{currencySymbol}{Math.abs(trip.yourBalance).toFixed(2)}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.balanceItem}>
            <Text style={styles.balanceLabel}>Total Group</Text>
            <Text style={styles.totalValue}>
              {currencySymbol}{trip.totalGroup.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function DashboardScreen() {
  const router = useRouter();
  const { trips } = useAppContext();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>My Trips</Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push('/create-trip')}
          activeOpacity={0.8}
        >
          <MaterialIcons name="add" size={24} color={AppColors.white} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Section label */}
        <Text style={styles.sectionTitle}>Ongoing Adventures</Text>

        {/* Trip cards */}
        {trips.map((trip, index) => (
          <TripCard
            key={trip.id}
            trip={trip}
            index={index}
            onPress={() => router.push(`/trip/${trip.id}`)}
          />
        ))}

        {/* Footer message */}
        <View style={styles.footerMessage}>
          <Text style={styles.footerEmoji}>🌍</Text>
          <Text style={styles.footerText}>More memories coming soon</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  headerTitle: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: AppColors.textPrimary,
    letterSpacing: -0.5,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.full,
    backgroundColor: AppColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: AppColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  scrollContent: {
    padding: Spacing.xl,
    paddingTop: Spacing.sm,
  },
  sectionTitle: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semiBold,
    color: AppColors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: Spacing.lg,
  },
  tripCard: {
    backgroundColor: AppColors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    shadowColor: AppColors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  tripCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  tripEmoji: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.lg,
    backgroundColor: AppColors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  tripEmojiText: {
    fontSize: 24,
  },
  tripInfo: {
    flex: 1,
  },
  tripName: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semiBold,
    color: AppColors.textPrimary,
    marginBottom: 2,
  },
  tripDate: {
    fontSize: FontSize.sm,
    color: AppColors.textSecondary,
  },
  tripCardFooter: {
    flexDirection: 'row',
    backgroundColor: AppColors.surfaceAlt,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
  },
  balanceItem: {
    flex: 1,
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: FontSize.xs,
    color: AppColors.textSecondary,
    marginBottom: 4,
  },
  balanceValue: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
  },
  totalValue: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: AppColors.textPrimary,
  },
  divider: {
    width: 1,
    backgroundColor: AppColors.border,
    marginHorizontal: Spacing.md,
  },
  footerMessage: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
    gap: Spacing.sm,
  },
  footerEmoji: {
    fontSize: 32,
  },
  footerText: {
    fontSize: FontSize.sm,
    color: AppColors.textTertiary,
    fontWeight: FontWeight.medium,
  },
});
