/**
 * Activity Tab
 * Simplified activity view based on Stitch screens
 */

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppColors, BorderRadius, FontSize, FontWeight, Spacing } from '@/constants/theme';
import { useAppContext } from '@/context/AppContext';

export default function ActivityScreen() {
    const { settlements, currencySymbol } = useAppContext();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Activity</Text>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <Text style={styles.sectionTitle}>Recent Settlements</Text>

                {settlements.map((settlement, index) => (
                    <Animated.View
                        key={settlement.id}
                        entering={FadeInDown.delay(index * 100).duration(500)}
                        style={styles.activityCard}
                    >
                        <View style={styles.activityIcon}>
                            <MaterialIcons name="autorenew" size={24} color={AppColors.accent} />
                        </View>
                        <View style={styles.activityInfo}>
                            <Text style={styles.activityTitle}>
                                {settlement.fromMember} paid {settlement.toMember}
                            </Text>
                            <Text style={styles.activitySubtitle}>{settlement.reason}</Text>
                        </View>
                        <Text style={styles.activityAmount}>{currencySymbol}{settlement.amount}</Text>
                    </Animated.View>
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
        marginTop: Spacing.md,
    },
    activityCard: {
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
    activityIcon: {
        width: 44,
        height: 44,
        borderRadius: BorderRadius.full,
        backgroundColor: AppColors.primaryLight,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Spacing.md,
    },
    activityInfo: {
        flex: 1,
    },
    activityTitle: {
        fontSize: FontSize.md,
        fontWeight: FontWeight.semiBold,
        color: AppColors.textPrimary,
        marginBottom: 4,
    },
    activitySubtitle: {
        fontSize: FontSize.sm,
        color: AppColors.textSecondary,
    },
    activityAmount: {
        fontSize: FontSize.md,
        fontWeight: FontWeight.bold,
        color: AppColors.textPrimary,
    },
});
