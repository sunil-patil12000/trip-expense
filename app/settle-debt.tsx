import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppColors, BorderRadius, FontSize, Spacing } from '@/constants/theme';
import { useAppContext } from '@/context/AppContext';

export default function SettleDebtScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const { settlements, settlePartialDebt, currencySymbol } = useAppContext();

    const settlement = settlements.find(s => s.id === id);
    const [amount, setAmount] = useState(settlement ? settlement.amount.toString() : '0');

    if (!settlement) {
        return null;
    }

    const handleAmountPress = (digit: string) => {
        if (amount === '0') {
            if (digit === '.') setAmount('0.');
            else setAmount(digit);
        } else {
            setAmount(amount + digit);
        }
    };

    const handleDelete = () => {
        if (amount.length > 1) {
            setAmount(amount.slice(0, -1));
        } else {
            setAmount('0');
        }
    };

    const handleSave = () => {
        const parsedAmount = parseFloat(amount || '0');
        if (parsedAmount > 0) {
            settlePartialDebt(settlement.id, parsedAmount);
            router.back();
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.closeButton} onPress={() => router.back()} activeOpacity={0.8}>
                    <MaterialIcons name="close" size={24} color={AppColors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Settle Debt</Text>
                <TouchableOpacity style={styles.saveButton} onPress={handleSave} activeOpacity={0.8}>
                    <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.content}>
                    <Animated.View entering={FadeInUp.duration(400)}>

                        <View style={{ alignItems: 'center', marginBottom: Spacing.xl }}>
                            <Text style={{ fontSize: FontSize.md, color: AppColors.textSecondary }}>Maximum amount to settle:</Text>
                            <Text style={{ fontSize: FontSize.lg, fontWeight: 'bold', color: AppColors.primary }}>{currencySymbol}{settlement.amount.toFixed(2)}</Text>
                        </View>

                        {/* Amount Input area */}
                        <View style={styles.amountContainer}>
                            <Text style={styles.currencySymbol}>{currencySymbol}</Text>
                            <Text style={styles.amountText}>{amount}</Text>
                        </View>

                        {/* Custom Keypad for amount */}
                        <View style={styles.keypadContainer}>
                            {[
                                ['1', '2', '3'],
                                ['4', '5', '6'],
                                ['7', '8', '9'],
                                ['.', '0', 'delete']
                            ].map((row, rowIdx) => (
                                <View key={`row-${rowIdx}`} style={styles.keypadRow}>
                                    {row.map((key) => (
                                        <TouchableOpacity
                                            key={key}
                                            style={styles.keypadButton}
                                            onPress={() => key === 'delete' ? handleDelete() : handleAmountPress(key)}
                                            activeOpacity={0.7}
                                        >
                                            {key === 'delete' ? (
                                                <MaterialIcons name="backspace" size={24} color={AppColors.textPrimary} />
                                            ) : (
                                                <Text style={styles.keypadText}>{key}</Text>
                                            )}
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            ))}
                        </View>
                    </Animated.View>
                </ScrollView>
            </KeyboardAvoidingView>
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
    closeButton: {
        width: 40,
        height: 40,
        borderRadius: BorderRadius.full,
        backgroundColor: AppColors.surface,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: FontSize.xl,
        fontWeight: 'bold',
        color: AppColors.textPrimary,
    },
    saveButton: {
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        backgroundColor: AppColors.primaryLight,
        borderRadius: BorderRadius.lg,
    },
    saveText: {
        fontSize: FontSize.md,
        fontWeight: 'bold',
        color: AppColors.primary,
    },
    content: {
        padding: Spacing.xl,
    },
    amountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: Spacing.xxl,
    },
    currencySymbol: {
        fontSize: FontSize.xxxl,
        fontWeight: 'bold',
        color: AppColors.textTertiary,
        marginRight: Spacing.xs,
        marginTop: 8,
    },
    amountText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: AppColors.textPrimary,
    },
    keypadContainer: {
        marginTop: Spacing.xl,
        gap: Spacing.md,
    },
    keypadRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: Spacing.md,
    },
    keypadButton: {
        flex: 1,
        height: 60,
        backgroundColor: AppColors.surface,
        borderRadius: BorderRadius.lg,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: AppColors.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 1,
    },
    keypadText: {
        fontSize: FontSize.xxl,
        fontWeight: 'bold',
        color: AppColors.textPrimary,
    },
});
