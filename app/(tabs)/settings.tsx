/**
 * Settings Tab
 */

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
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

export default function SettingsScreen() {
    const { currencySymbol, setCurrencySymbol } = useAppContext();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Settings</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Animated.View entering={FadeInDown.duration(500)}>
                    <View style={styles.profileSection}>
                        <View style={styles.profileAvatar}>
                            <Text style={styles.avatarText}>YOU</Text>
                        </View>
                        <View>
                            <Text style={styles.profileName}>My Account</Text>
                            <Text style={styles.profileEmail}>user@example.com</Text>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Preferences</Text>

                        <TouchableOpacity style={styles.settingItem}>
                            <View style={styles.settingIcon}>
                                <MaterialIcons name="notifications" size={20} color={AppColors.accent} />
                            </View>
                            <Text style={styles.settingText}>Notifications</Text>
                            <MaterialIcons name="chevron-right" size={20} color={AppColors.textTertiary} />
                        </TouchableOpacity>

                        <View style={styles.divider} />

                        <TouchableOpacity
                            style={styles.settingItem}
                            onPress={() => {
                                const mapping: Record<string, { lang: string, next: string }> = {
                                    '$': { lang: 'USD / EN', next: '€' },
                                    '€': { lang: 'EUR / ES', next: '£' },
                                    '£': { lang: 'GBP / EN', next: '¥' },
                                    '¥': { lang: 'JPY / JP', next: '₹' },
                                    '₹': { lang: 'INR / HI', next: '$' },
                                };
                                const current = mapping[currencySymbol];
                                setCurrencySymbol(current ? current.next : '$');
                            }}
                        >
                            <View style={styles.settingIcon}>
                                <MaterialIcons name="language" size={20} color={AppColors.success} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.settingText}>Currency & Language</Text>
                                <Text style={{ fontSize: 12, color: AppColors.textTertiary }}>
                                    {
                                        currencySymbol === '$' ? 'USD / EN' :
                                            currencySymbol === '€' ? 'EUR / ES' :
                                                currencySymbol === '£' ? 'GBP / EN' :
                                                    currencySymbol === '¥' ? 'JPY / JP' :
                                                        currencySymbol === '₹' ? 'INR / HI' : 'USD / EN'
                                    }
                                </Text>
                            </View>
                            <MaterialIcons name="chevron-right" size={20} color={AppColors.textTertiary} />
                        </TouchableOpacity>
                    </View>
                </Animated.View>
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
        padding: Spacing.xl,
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: AppColors.surface,
        padding: Spacing.lg,
        borderRadius: BorderRadius.xl,
        marginBottom: Spacing.xl,
        shadowColor: AppColors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 3,
    },
    profileAvatar: {
        width: 60,
        height: 60,
        borderRadius: BorderRadius.full,
        backgroundColor: AppColors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Spacing.lg,
    },
    avatarText: {
        fontSize: FontSize.lg,
        fontWeight: FontWeight.bold,
        color: AppColors.white,
    },
    profileName: {
        fontSize: FontSize.lg,
        fontWeight: FontWeight.bold,
        color: AppColors.textPrimary,
        marginBottom: 4,
    },
    profileEmail: {
        fontSize: FontSize.md,
        color: AppColors.textSecondary,
    },
    section: {
        backgroundColor: AppColors.surface,
        borderRadius: BorderRadius.xl,
        paddingVertical: Spacing.sm,
        shadowColor: AppColors.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: FontSize.sm,
        fontWeight: FontWeight.semiBold,
        color: AppColors.textSecondary,
        textTransform: 'uppercase',
        letterSpacing: 1,
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.sm,
        marginTop: Spacing.sm,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Spacing.lg,
    },
    settingIcon: {
        width: 32,
        height: 32,
        borderRadius: BorderRadius.md,
        backgroundColor: AppColors.primaryLight,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Spacing.md,
    },
    settingText: {
        flex: 1,
        fontSize: FontSize.md,
        color: AppColors.textPrimary,
        fontWeight: FontWeight.medium,
    },
    divider: {
        height: 1,
        backgroundColor: AppColors.border,
        marginHorizontal: Spacing.lg,
    },
});
