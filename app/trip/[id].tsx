/**
 * Trip Details Screen
 * Matches Stitch "Modern Details (V3)", "Settlements", "Expense Breakdown", and "Member List" screens.
 * Combines them into a sub-tabbed interface.
 */

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppColors, BorderRadius, FontSize, FontWeight, Spacing } from '@/constants/theme';
import { useAppContext } from '@/context/AppContext';

export default function TripDetailsScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();
    const { trips, expenses, members, settlements, insightCategories, currencySymbol } = useAppContext();
    const trip = trips.find((t) => t.id === id) || trips[0];
    const tripMembers = trip?.memberIds ? members.filter(m => trip.memberIds!.includes(m.id)) : members;

    const [activeTab, setActiveTab] = useState('Expenses');
    const tabs = ['Expenses', 'Members', 'Settlements', 'Insights'];

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.8}>
                    <MaterialIcons name="arrow-back" size={24} color={AppColors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{trip.name}</Text>
                <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/add-expense')} activeOpacity={0.8}>
                    <MaterialIcons name="add" size={24} color={AppColors.primary} />
                </TouchableOpacity>
            </View>

            {/* Trip Info Card */}
            <Animated.View entering={FadeInDown.duration(500)} style={styles.infoCard}>
                <View style={styles.infoHeader}>
                    <View style={styles.infoEmoji}>
                        <Text style={styles.infoEmojiText}>{trip.emoji}</Text>
                    </View>
                    <View>
                        <Text style={styles.infoMembers}>{trip.memberCount} Members</Text>
                        <Text style={styles.infoDate}>{trip.dateRange}</Text>
                    </View>
                </View>
                <View style={styles.divider} />
                <View style={[styles.balanceContainer, { backgroundColor: AppColors.surface }]}>
                    <Text style={styles.balanceLabel}>Total Trip Cost</Text>
                    <Text style={[styles.balanceTotal, { color: AppColors.textPrimary }]}>
                        {currencySymbol}{trip.totalGroup.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </Text>
                </View>
            </Animated.View>

            {/* Tabs */}
            <View style={styles.tabsContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsScroll}>
                    {tabs.map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            style={[styles.tab, activeTab === tab && styles.tabActive]}
                            onPress={() => setActiveTab(tab)}
                            activeOpacity={0.8}
                        >
                            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Content based on tab */}
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>

                {/* EXPENSES TAB */}
                {activeTab === 'Expenses' && (
                    <Animated.View entering={FadeIn.duration(400)}>
                        <View style={styles.timelineContainer}>
                            <View style={styles.timelineBar} />

                            {['Today', 'Yesterday', 'Oct 24', 'Oct 23'].map((dateString) => {
                                const dayExpenses = expenses.filter(e => e.date === dateString);
                                if (dayExpenses.length === 0) return null;

                                return (
                                    <View key={dateString} style={styles.dateGroup}>
                                        <View style={styles.dateHeader}>
                                            <View style={styles.dateIndicator} />
                                            <Text style={styles.dateTitle}>{dateString}</Text>
                                        </View>

                                        {dayExpenses.map((expense, idx) => (
                                            <Animated.View
                                                key={expense.id}
                                                entering={FadeInDown.delay(idx * 50).duration(400)}
                                                style={styles.expenseItem}
                                            >
                                                <View style={[styles.expenseIcon, { backgroundColor: AppColors.surfaceAlt }]}>
                                                    <Text style={styles.expenseIconText}>{expense.categoryIcon}</Text>
                                                </View>
                                                <View style={styles.expenseInfo}>
                                                    <Text style={styles.expenseTitle}>{expense.title}</Text>
                                                    <Text style={styles.expenseSubtitle}>Paid by {expense.paidBy}</Text>
                                                </View>
                                                <View style={styles.expenseAmounts}>
                                                    <Text style={styles.expenseAmount}>{currencySymbol}{expense.amount.toFixed(2)}</Text>
                                                    <Text style={styles.expenseTime}>{expense.time}</Text>
                                                </View>
                                            </Animated.View>
                                        ))}
                                    </View>
                                );
                            })}
                        </View>
                    </Animated.View>
                )}

                {/* MEMBERS TAB */}
                {activeTab === 'Members' && (
                    <Animated.View entering={FadeIn.duration(400)} style={styles.insightsContent}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.md }}>
                            <Text style={[styles.sectionTitle, { marginBottom: 0 }]}>Trip Members</Text>
                            <TouchableOpacity onPress={() => router.push(`/add-trip-member?tripId=${id}`)} activeOpacity={0.8}>
                                <Text style={{ color: AppColors.primary, fontWeight: 'bold' }}>+ Add</Text>
                            </TouchableOpacity>
                        </View>
                        {tripMembers.map((member, idx) => {
                            const avatarColor = ['#1152d4', '#6C63FF', '#EC4899', '#10B981'][idx % 4];
                            const balanceColor = member.balance > 0 ? AppColors.success : member.balance < 0 ? AppColors.danger : AppColors.textSecondary;

                            return (
                                <Animated.View
                                    key={member.id}
                                    entering={FadeInDown.delay(idx * 50).duration(400)}
                                >
                                    <TouchableOpacity
                                        style={styles.cardItem}
                                        onPress={() => router.push(`/member/${member.id}`)}
                                        activeOpacity={0.7}
                                    >
                                        <View style={[styles.avatar, { backgroundColor: avatarColor }]}>
                                            <Text style={styles.avatarText}>{member.avatar}</Text>
                                        </View>
                                        <View style={styles.memberInfo}>
                                            <Text style={styles.memberName}>{member.name}</Text>
                                            <Text style={styles.memberRole}>{member.role}</Text>
                                        </View>
                                        <View style={styles.expenseAmounts}>
                                            <Text style={[styles.expenseAmount, { color: balanceColor }]}>
                                                {member.balance > 0 ? '+' : ''}{currencySymbol}{Math.abs(member.balance).toFixed(2)}
                                            </Text>
                                            <Text style={styles.expenseTime}>Balance</Text>
                                        </View>
                                    </TouchableOpacity>
                                </Animated.View>
                            );
                        })}
                    </Animated.View>
                )}

                {/* SETTLEMENTS TAB */}
                {activeTab === 'Settlements' && (
                    <Animated.View entering={FadeIn.duration(400)} style={styles.insightsContent}>
                        <View style={styles.settlementSummary}>
                            <Text style={styles.settleSummaryTitle}>Total Group Debt</Text>
                            <Text style={styles.settleSummaryAmount}>$4,500.00</Text>
                            <Text style={styles.settleYourBalance}>Your Balance: <Text style={{ color: AppColors.success }}>+$65.00</Text></Text>
                        </View>

                        <Text style={styles.sectionTitle}>Simplified Debts</Text>
                        {settlements.map((settlement, idx) => (
                            <Animated.View
                                key={settlement.id}
                                entering={FadeInDown.delay(idx * 50).duration(400)}
                            >
                                <View style={styles.cardItem}>
                                    <View style={styles.settleAvatars}>
                                        <View style={[styles.avatarSmall, { backgroundColor: '#F97316', zIndex: 2 }]}><Text style={styles.avatarTextSmall}>{settlement.fromAvatar}</Text></View>
                                        <View style={[styles.avatarSmall, { backgroundColor: '#3B82F6', marginLeft: -12, zIndex: 1 }]}><Text style={styles.avatarTextSmall}>{settlement.toAvatar}</Text></View>
                                    </View>
                                    <View style={styles.memberInfo}>
                                        <Text style={styles.expenseTitle}>
                                            <Text style={{ fontWeight: 'bold' }}>{settlement.fromMember}</Text> owes <Text style={{ fontWeight: 'bold' }}>{settlement.toMember}</Text>
                                        </Text>
                                        <Text style={styles.expenseSubtitle}>{settlement.reason}</Text>
                                    </View>
                                    <View style={styles.expenseAmounts}>
                                        <Text style={styles.expenseAmount}>{currencySymbol}{settlement.amount.toFixed(2)}</Text>
                                        <TouchableOpacity style={styles.smallButton} onPress={() => router.push(`/settle-debt?id=${settlement.id}`)}>
                                            <Text style={styles.smallButtonText}>Settle</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Animated.View>
                        ))}
                    </Animated.View>
                )}

                {/* INSIGHTS/BREAKDOWN TAB */}
                {activeTab === 'Insights' && (
                    <Animated.View entering={FadeIn.duration(400)} style={styles.insightsContent}>

                        <View style={styles.breakdownSummary}>
                            <Text style={styles.balanceLabel}>Total Spending</Text>
                            <Text style={styles.balanceTotal}>{currencySymbol}{trip.totalGroup.toLocaleString()}</Text>

                            <View style={styles.progressContainer}>
                                <View style={[styles.progressBar, { width: '70%', backgroundColor: AppColors.categoryHotel }]} />
                                <View style={[styles.progressBar, { width: '20%', backgroundColor: AppColors.categoryFood }]} />
                                <View style={[styles.progressBar, { width: '10%', backgroundColor: AppColors.categoryTransport }]} />
                            </View>
                            <Text style={styles.expenseSubtitle}>Top Spent: Leisure (70% of budget)</Text>
                        </View>

                        <Text style={styles.sectionTitle}>Planned vs. Actual</Text>
                        {insightCategories.map((cat, idx) => {
                            const statusColor = cat.status === 'over' ? AppColors.danger : cat.status === 'under' ? AppColors.success : AppColors.textSecondary;
                            const statusSymbol = cat.status === 'over' ? '+' : cat.status === 'under' ? '-' : '';
                            const diff = Math.abs(cat.actual - cat.planned);
                            const statusText = cat.status === 'on-track' ? 'On track' : `${statusSymbol}$${diff} ${cat.status}`;

                            return (
                                <Animated.View
                                    key={cat.id}
                                    entering={FadeInDown.delay(idx * 50).duration(400)}
                                >
                                    <View style={styles.cardItem}>
                                        <View style={styles.memberInfo}>
                                            <Text style={styles.expenseTitle}>{cat.name}</Text>
                                            <Text style={styles.expenseSubtitle}>{cat.subtitle}</Text>
                                        </View>
                                        <View style={styles.expenseAmounts}>
                                            <Text style={styles.expenseAmount}>${cat.actual} <Text style={{ color: AppColors.textTertiary, fontSize: FontSize.sm, fontWeight: 'normal' }}>/ ${cat.planned}</Text></Text>
                                            <Text style={[styles.expenseTime, { color: statusColor, fontWeight: '600' }]}>{statusText}</Text>
                                        </View>
                                    </View>
                                </Animated.View>
                            );
                        })}
                    </Animated.View>
                )}

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
        paddingHorizontal: Spacing.lg,
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
        fontSize: FontSize.xl,
        fontWeight: FontWeight.bold,
        color: AppColors.textPrimary,
    },
    actionButton: {
        width: 40,
        height: 40,
        borderRadius: BorderRadius.full,
        backgroundColor: AppColors.primaryLight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoCard: {
        backgroundColor: AppColors.surface,
        marginHorizontal: Spacing.xl,
        marginTop: Spacing.md,
        borderRadius: BorderRadius.xl,
        padding: Spacing.lg,
        shadowColor: AppColors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 4,
    },
    infoHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    infoEmoji: {
        width: 48,
        height: 48,
        borderRadius: BorderRadius.md,
        backgroundColor: AppColors.primaryLight,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Spacing.md,
    },
    infoEmojiText: {
        fontSize: 24,
    },
    infoMembers: {
        fontSize: FontSize.md,
        fontWeight: FontWeight.bold,
        color: AppColors.textPrimary,
        marginBottom: 4,
    },
    infoDate: {
        fontSize: FontSize.sm,
        color: AppColors.textSecondary,
    },
    divider: {
        height: 1,
        backgroundColor: AppColors.border,
        marginBottom: Spacing.md,
    },
    balanceContainer: {
        alignItems: 'center',
    },
    balanceLabel: {
        fontSize: FontSize.sm,
        color: AppColors.textSecondary,
        marginBottom: 4,
    },
    balanceTotal: {
        fontSize: FontSize.xxl,
        fontWeight: FontWeight.extraBold,
        color: AppColors.primary,
    },
    tabsContainer: {
        marginTop: Spacing.lg,
        paddingBottom: Spacing.sm,
    },
    tabsScroll: {
        paddingHorizontal: Spacing.xl,
        gap: Spacing.sm,
    },
    tab: {
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.full,
        backgroundColor: AppColors.surface,
    },
    tabActive: {
        backgroundColor: AppColors.primary,
    },
    tabText: {
        fontSize: FontSize.md,
        fontWeight: FontWeight.semiBold,
        color: AppColors.textSecondary,
    },
    tabTextActive: {
        color: AppColors.white,
    },
    content: {
        paddingHorizontal: Spacing.xl,
        paddingBottom: Spacing.xxxl,
        paddingTop: Spacing.md,
    },

    // Timeline styles
    timelineContainer: {
        position: 'relative',
        marginTop: Spacing.sm,
    },
    timelineBar: {
        position: 'absolute',
        left: 20,
        top: 10,
        bottom: 0,
        width: 2,
        backgroundColor: AppColors.border,
    },
    dateGroup: {
        marginBottom: Spacing.xl,
    },
    dateHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    dateIndicator: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: AppColors.primary,
        marginLeft: 15,
        marginRight: Spacing.lg,
        borderWidth: 2,
        borderColor: AppColors.background,
    },
    dateTitle: {
        fontSize: FontSize.md,
        fontWeight: FontWeight.bold,
        color: AppColors.textPrimary,
    },
    expenseItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: AppColors.surface,
        padding: Spacing.md,
        borderRadius: BorderRadius.lg,
        marginBottom: Spacing.sm,
        marginLeft: Spacing.xxxl,
        shadowColor: AppColors.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 1,
    },
    expenseIcon: {
        width: 40,
        height: 40,
        borderRadius: BorderRadius.md,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Spacing.md,
    },
    expenseIconText: {
        fontSize: 20,
    },
    expenseInfo: {
        flex: 1,
    },
    expenseTitle: {
        fontSize: FontSize.sm,
        fontWeight: '600',
        color: AppColors.textPrimary,
        marginBottom: 2,
    },
    expenseSubtitle: {
        fontSize: FontSize.xs,
        color: AppColors.textSecondary,
    },
    expenseAmounts: {
        alignItems: 'flex-end',
    },
    expenseAmount: {
        fontSize: FontSize.md,
        fontWeight: 'bold',
        color: AppColors.textPrimary,
        marginBottom: 4,
    },
    expenseTime: {
        fontSize: FontSize.xs,
        color: AppColors.textTertiary,
    },

    // Common cards
    insightsContent: {
        gap: Spacing.md,
    },
    sectionTitle: {
        fontSize: FontSize.md,
        fontWeight: 'bold',
        color: AppColors.textSecondary,
        marginTop: Spacing.md,
        marginBottom: Spacing.xs,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    cardItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: AppColors.surface,
        padding: Spacing.md,
        borderRadius: BorderRadius.xl,
        marginBottom: Spacing.xs,
        shadowColor: AppColors.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 1,
    },

    // Member Specific
    memberInfo: {
        flex: 1,
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: BorderRadius.full,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Spacing.md,
    },
    avatarText: {
        fontSize: FontSize.md,
        fontWeight: 'bold',
        color: AppColors.white,
    },
    memberName: {
        fontSize: FontSize.md,
        fontWeight: '600',
        color: AppColors.textPrimary,
        marginBottom: 2,
    },
    memberRole: {
        fontSize: FontSize.sm,
        color: AppColors.textSecondary,
    },

    // Settlement Specific
    settlementSummary: {
        backgroundColor: AppColors.surface,
        padding: Spacing.xl,
        borderRadius: BorderRadius.xl,
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    settleSummaryTitle: {
        fontSize: FontSize.sm,
        color: AppColors.textSecondary,
        marginBottom: Spacing.xs,
    },
    settleSummaryAmount: {
        fontSize: FontSize.xxxl,
        fontWeight: '900',
        color: AppColors.danger,
        marginBottom: Spacing.sm,
    },
    settleYourBalance: {
        fontSize: FontSize.md,
        fontWeight: '600',
        color: AppColors.textPrimary,
    },
    settleAvatars: {
        flexDirection: 'row',
        marginRight: Spacing.md,
        width: 60,
    },
    avatarSmall: {
        width: 36,
        height: 36,
        borderRadius: BorderRadius.full,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: AppColors.surface,
    },
    avatarTextSmall: {
        fontSize: FontSize.xs,
        fontWeight: 'bold',
        color: AppColors.white,
    },
    smallButton: {
        backgroundColor: AppColors.primaryLight,
        paddingHorizontal: Spacing.sm,
        paddingVertical: 4,
        borderRadius: BorderRadius.sm,
    },
    smallButtonText: {
        fontSize: FontSize.xs,
        fontWeight: 'bold',
        color: AppColors.primary,
    },

    // Breakdown specific
    breakdownSummary: {
        backgroundColor: AppColors.surface,
        padding: Spacing.xl,
        borderRadius: BorderRadius.xl,
        alignItems: 'center',
        marginBottom: Spacing.sm,
    },
    progressContainer: {
        flexDirection: 'row',
        height: 8,
        width: '100%',
        backgroundColor: AppColors.surfaceAlt,
        borderRadius: BorderRadius.full,
        overflow: 'hidden',
        marginVertical: Spacing.lg,
    },
    progressBar: {
        height: '100%',
    },
});
