/**
 * Friends Tab - Member List
 * Matches Stitch screen: "Member List - Modern v3"
 */

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Member } from '@/constants/mock-data';
import { AppColors, BorderRadius, FontSize, FontWeight, Spacing } from '@/constants/theme';
import { useAppContext } from '@/context/AppContext';

const AVATAR_COLORS = ['#1152d4', '#6C63FF', '#EC4899', '#10B981', '#F97316', '#8B5CF6'];

function MemberCard({ member, index, onPress }: { member: Member; index: number; onPress: () => void }) {
  const avatarColor = AVATAR_COLORS[index % AVATAR_COLORS.length];
  const balanceColor =
    member.balance > 0
      ? AppColors.success
      : member.balance < 0
        ? AppColors.danger
        : AppColors.textSecondary;

  return (
    <Animated.View entering={FadeInDown.delay(index * 80).duration(500)}>
      <TouchableOpacity style={styles.memberCard} onPress={onPress} activeOpacity={0.7}>
        <View style={[styles.avatar, { backgroundColor: avatarColor }]}>
          <Text style={styles.avatarText}>{member.avatar}</Text>
        </View>
        <View style={styles.memberInfo}>
          <Text style={styles.memberName}>{member.name}</Text>
          <Text style={styles.memberRole}>{member.role}</Text>
        </View>
        <View style={styles.memberBalance}>
          <Text style={[styles.balanceAmount, { color: balanceColor }]}>
            {member.balance > 0 ? '+' : ''}${Math.abs(member.balance).toFixed(2)}
          </Text>
          <MaterialIcons name="chevron-right" size={18} color={AppColors.textTertiary} />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function FriendsScreen() {
  const router = useRouter();
  const { members } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Friends</Text>
        <TouchableOpacity style={styles.addButton} activeOpacity={0.8} onPress={() => router.push('/add-member')}>
          <MaterialIcons name="person-add" size={22} color={AppColors.primary} />
        </TouchableOpacity>
      </View>

      {/* Search bar */}
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={20} color={AppColors.textTertiary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search friends..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={AppColors.textTertiary}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <MaterialIcons name="close" size={20} color={AppColors.textTertiary} />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.sectionTitle}>
          All Members ({filteredMembers.length})
        </Text>

        {filteredMembers.map((member, index) => (
          <MemberCard
            key={member.id}
            member={member}
            index={index}
            onPress={() => router.push(`/member/${member.id}`)}
          />
        ))}
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
    backgroundColor: AppColors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.surfaceAlt,
    marginHorizontal: Spacing.xl,
    marginBottom: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.xl,
    gap: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: FontSize.md,
    color: AppColors.textPrimary,
  },
  searchPlaceholder: {
    fontSize: FontSize.md,
    color: AppColors.textTertiary,
  },
  scrollContent: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xxxl,
  },
  sectionTitle: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semiBold,
    color: AppColors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: Spacing.lg,
  },
  memberCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.sm,
    shadowColor: AppColors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  avatarText: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: AppColors.white,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semiBold,
    color: AppColors.textPrimary,
    marginBottom: 2,
  },
  memberRole: {
    fontSize: FontSize.sm,
    color: AppColors.textSecondary,
  },
  memberBalance: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  balanceAmount: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
  },
});
