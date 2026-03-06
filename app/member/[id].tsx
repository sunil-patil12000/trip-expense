/**
 * Member Profile Screen
 * Matches Stitch "Member Profile" design.
 */

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useLocalSearchParams, useRouter } from 'expo-router';
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

import { AppColors, BorderRadius, FontSize, FontWeight, Spacing } from '@/constants/theme';
import { useAppContext } from '@/context/AppContext';

export default function MemberProfileScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const { members, currencySymbol } = useAppContext();
    const member = members.find((m) => m.id === id) || members[0];

    const balanceColor =
        member.balance > 0
            ? AppColors.success
            : member.balance < 0
                ? AppColors.danger
                : AppColors.textPrimary;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.8}>
                    <MaterialIcons name="arrow-back" size={24} color={AppColors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Member Profile</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Animated.View entering={FadeInDown.duration(500)} style={styles.profileCard}>
                    <View style={styles.avatarLarge}>
                        <Text style={styles.avatarTextLarge}>{member.avatar}</Text>
                    </View>
                    <Text style={styles.memberName}>{member.name}</Text>
                    <Text style={styles.memberRole}>{member.role}</Text>

                    <View style={styles.balanceContainer}>
                        <Text style={styles.balanceLabel}>Available Balance</Text>
                        <Text style={[styles.balanceAmount, { color: balanceColor }]}>
                            {member.balance > 0 ? '+' : ''}{currencySymbol}{Math.abs(member.balance).toFixed(2)}
                        </Text>
                    </View>
                </Animated.View>

                <Text style={styles.sectionTitle}>Recent Expenses</Text>

                <View style={styles.expensesList}>
                    {member.recentExpenses.map((expense, index) => (
                        <Animated.View
                            key={expense.id}
                            entering={FadeInDown.delay(index * 100).duration(400)}
                            style={styles.expenseItem}
                        >
                            <View style={styles.expenseIcon}>
                                <MaterialIcons
                                    name={expense.isCredit ? "account-balance-wallet" : "receipt"}
                                    size={20}
                                    color={expense.isCredit ? AppColors.success : AppColors.primary}
                                />
                            </View>
                            <View style={styles.expenseInfo}>
                                <Text style={styles.expenseTitle}>{expense.title}</Text>
                                <Text style={styles.expenseSubtitle}>{expense.subtitle}</Text>
                            </View>
                            <Text
                                style={[
                                    styles.expenseAmount,
                                    { color: expense.isCredit ? AppColors.success : AppColors.textPrimary }
                                ]}
                            >
                                {expense.isCredit ? '+' : '-'}{currencySymbol}{expense.amount.toFixed(2)}
                            </Text>
                        </Animated.View>
                    ))}
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
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Spacing.xl,
        paddingTop: Spacing.md,
        paddingBottom: Spacing.sm,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: BorderRadius.full,
        backgroundColor: AppColors.surface,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: AppColors.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 2,
    },
    headerTitle: {
        fontSize: FontSize.lg,
        fontWeight: FontWeight.semiBold,
        color: AppColors.textPrimary,
    },
    content: {
        padding: Spacing.xl,
    },
    profileCard: {
        backgroundColor: AppColors.surface,
        borderRadius: BorderRadius.xl,
        padding: Spacing.xxl,
        alignItems: 'center',
        shadowColor: AppColors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 4,
        marginBottom: Spacing.xxl,
    },
    avatarLarge: {
        width: 80,
        height: 80,
        borderRadius: BorderRadius.full,
        backgroundColor: AppColors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Spacing.lg,
    },
    avatarTextLarge: {
        fontSize: FontSize.xxxl,
        fontWeight: FontWeight.bold,
        color: AppColors.white,
    },
    memberName: {
        fontSize: FontSize.xxxl,
        fontWeight: FontWeight.bold,
        color: AppColors.textPrimary,
        marginBottom: Spacing.xs,
    },
    memberRole: {
        fontSize: FontSize.md,
        color: AppColors.textSecondary,
        marginBottom: Spacing.xl,
    },
    balanceContainer: {
        alignItems: 'center',
        backgroundColor: AppColors.surfaceAlt,
        paddingHorizontal: Spacing.xxl,
        paddingVertical: Spacing.lg,
        borderRadius: BorderRadius.lg,
        width: '100%',
    },
    balanceLabel: {
        fontSize: FontSize.sm,
        color: AppColors.textSecondary,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: Spacing.xs,
    },
    balanceAmount: {
        fontSize: FontSize.xxxl,
        fontWeight: FontWeight.extraBold,
    },
    sectionTitle: {
        fontSize: FontSize.md,
        fontWeight: FontWeight.bold,
        color: AppColors.textPrimary,
        marginBottom: Spacing.lg,
    },
    expensesList: {
        gap: Spacing.md,
    },
    expenseItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: AppColors.surface,
        padding: Spacing.lg,
        borderRadius: BorderRadius.xl,
        shadowColor: AppColors.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 1,
    },
    expenseIcon: {
        width: 44,
        height: 44,
        borderRadius: BorderRadius.md,
        backgroundColor: AppColors.surfaceAlt,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Spacing.md,
    },
    expenseInfo: {
        flex: 1,
    },
    expenseTitle: {
        fontSize: FontSize.md,
        fontWeight: FontWeight.semiBold,
        color: AppColors.textPrimary,
        marginBottom: 4,
    },
    expenseSubtitle: {
        fontSize: FontSize.sm,
        color: AppColors.textSecondary,
    },
    expenseAmount: {
        fontSize: FontSize.lg,
        fontWeight: FontWeight.bold,
    },
});
