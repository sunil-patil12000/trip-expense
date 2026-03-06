/**
 * Add Expense Modal
 * Matches Stitch "Add Expense" screen.
 */

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EXPENSE_CATEGORIES } from '@/constants/mock-data';
import { AppColors, BorderRadius, FontSize, FontWeight, Spacing } from '@/constants/theme';
import { useAppContext } from '@/context/AppContext';

export default function AddExpenseScreen() {
    const router = useRouter();
    const { addExpense, currencySymbol } = useAppContext();
    const [amount, setAmount] = useState('0');
    const [description, setDescription] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(EXPENSE_CATEGORIES[0].id);

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
            const category = EXPENSE_CATEGORIES.find(c => c.id === selectedCategory) || EXPENSE_CATEGORIES[0];
            addExpense({
                id: Date.now().toString(),
                title: description || category.name,
                category: category.name,
                categoryIcon: category.icon,
                amount: parsedAmount,
                paidBy: 'You',
                date: 'Today',
                time: 'Just now'
            });
            router.back();
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.closeButton} onPress={() => router.back()} activeOpacity={0.8}>
                    <MaterialIcons name="close" size={24} color={AppColors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Add Expense</Text>
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
                        {/* Amount Input area */}
                        <View style={styles.amountContainer}>
                            <Text style={styles.currencySymbol}>{currencySymbol}</Text>
                            <Text style={styles.amountText}>{amount}</Text>
                        </View>

                        {/* Description Input */}
                        <View style={styles.inputContainer}>
                            <MaterialIcons name="edit" size={20} color={AppColors.textTertiary} />
                            <TextInput
                                style={styles.textInput}
                                placeholder="What was this for?"
                                value={description}
                                onChangeText={setDescription}
                                placeholderTextColor={AppColors.textTertiary}
                            />
                        </View>

                        {/* Category selection */}
                        <Text style={styles.sectionTitle}>Category</Text>
                        <View style={styles.categoriesGrid}>
                            {EXPENSE_CATEGORIES.map((cat) => (
                                <TouchableOpacity
                                    key={cat.id}
                                    style={[
                                        styles.categoryItem,
                                        selectedCategory === cat.id && { backgroundColor: `${cat.color}20`, borderColor: cat.color }
                                    ]}
                                    onPress={() => setSelectedCategory(cat.id)}
                                    activeOpacity={0.7}
                                >
                                    <Text style={styles.categoryIcon}>{cat.icon}</Text>
                                    <Text style={[
                                        styles.categoryText,
                                        selectedCategory === cat.id && { color: cat.color, fontWeight: FontWeight.bold }
                                    ]}>
                                        {cat.name}
                                    </Text>
                                </TouchableOpacity>
                            ))}
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
        fontWeight: FontWeight.bold,
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
        fontWeight: FontWeight.bold,
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
        fontWeight: FontWeight.bold,
        color: AppColors.textTertiary,
        marginRight: Spacing.xs,
        marginTop: 8,
    },
    amountText: {
        fontSize: FontSize.display,
        fontWeight: FontWeight.extraBold,
        color: AppColors.textPrimary,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: AppColors.surface,
        borderRadius: BorderRadius.xl,
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.md,
        marginBottom: Spacing.xxl,
        shadowColor: AppColors.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 2,
    },
    textInput: {
        flex: 1,
        fontSize: FontSize.md,
        color: AppColors.textPrimary,
        marginLeft: Spacing.md,
    },
    sectionTitle: {
        fontSize: FontSize.md,
        fontWeight: FontWeight.bold,
        color: AppColors.textPrimary,
        marginBottom: Spacing.lg,
    },
    categoriesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Spacing.sm,
        marginBottom: Spacing.xxxl,
    },
    categoryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: AppColors.surface,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.full,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    categoryIcon: {
        fontSize: 16,
        marginRight: Spacing.sm,
    },
    categoryText: {
        fontSize: FontSize.sm,
        fontWeight: FontWeight.medium,
        color: AppColors.textSecondary,
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
        fontWeight: FontWeight.bold,
        color: AppColors.textPrimary,
    },
});
