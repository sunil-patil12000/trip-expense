/**
 * Create Trip Modal
 * Matches Stitch "Create Trip" screen.
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

import { AppColors, BorderRadius, FontSize, FontWeight, Spacing } from '@/constants/theme';
import { useAppContext } from '@/context/AppContext';

const EMOJIS = ['🏖️', '🗼', '🗾', '🍕', '🗽', '🏔️', '🏕️', '⛷️', '🏄‍♂️', '🚗'];

export default function CreateTripScreen() {
    const router = useRouter();
    const { addTrip } = useAppContext();
    const [tripName, setTripName] = useState('');
    const [selectedEmoji, setSelectedEmoji] = useState(EMOJIS[0]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.closeButton} onPress={() => router.back()} activeOpacity={0.8}>
                    <MaterialIcons name="close" size={24} color={AppColors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>New Trip</Text>
                <View style={{ width: 40 }} />
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.content}>
                    <Animated.View entering={FadeInUp.duration(400)}>

                        {/* Emoji Selector */}
                        <View style={styles.emojiSelectorContainer}>
                            <View style={styles.selectedEmojiBox}>
                                <Text style={styles.selectedEmojiText}>{selectedEmoji}</Text>
                            </View>

                            <Text style={styles.sectionLabel}>Choose Icon</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.emojiList}>
                                {EMOJIS.map((emoji) => (
                                    <TouchableOpacity
                                        key={emoji}
                                        style={[
                                            styles.emojiOption,
                                            selectedEmoji === emoji && styles.emojiOptionSelected
                                        ]}
                                        onPress={() => setSelectedEmoji(emoji)}
                                    >
                                        <Text style={styles.emojiOptionText}>{emoji}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>

                        {/* Trip Name input */}
                        <Text style={styles.inputLabel}>Trip Name</Text>
                        <View style={styles.inputContainer}>
                            <MaterialIcons name="flight-takeoff" size={20} color={AppColors.textTertiary} />
                            <TextInput
                                style={styles.textInput}
                                placeholder="e.g. Summer in Italy"
                                value={tripName}
                                onChangeText={setTripName}
                                placeholderTextColor={AppColors.textTertiary}
                            />
                        </View>

                        {/* Date input (dummy) */}
                        <Text style={styles.inputLabel}>Dates</Text>
                        <TouchableOpacity style={styles.inputContainer} activeOpacity={0.8}>
                            <MaterialIcons name="date-range" size={20} color={AppColors.textTertiary} />
                            <Text style={styles.textInputPlaceholder}>Select dates</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.createButton,
                                !tripName.trim() && styles.createButtonDisabled
                            ]}
                            activeOpacity={0.8}
                            onPress={() => {
                                if (tripName.trim()) {
                                    addTrip({
                                        id: Date.now().toString(),
                                        name: tripName.trim(),
                                        emoji: selectedEmoji,
                                        dateRange: 'Just now',
                                        totalGroup: 0,
                                        yourBalance: 0,
                                        memberCount: 1,
                                    });
                                    router.back();
                                }
                            }}
                        >
                            <Text style={styles.createButtonText}>Create Trip</Text>
                        </TouchableOpacity>

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
        shadowColor: AppColors.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 2,
    },
    headerTitle: {
        fontSize: FontSize.lg,
        fontWeight: FontWeight.bold,
        color: AppColors.textPrimary,
    },
    content: {
        padding: Spacing.xl,
    },
    emojiSelectorContainer: {
        alignItems: 'center',
        marginBottom: Spacing.xxl,
    },
    selectedEmojiBox: {
        width: 80,
        height: 80,
        borderRadius: BorderRadius.xl,
        backgroundColor: AppColors.surface,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: AppColors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 4,
        marginBottom: Spacing.lg,
    },
    selectedEmojiText: {
        fontSize: 40,
    },
    sectionLabel: {
        fontSize: FontSize.sm,
        fontWeight: FontWeight.semiBold,
        color: AppColors.textSecondary,
        marginBottom: Spacing.md,
        alignSelf: 'flex-start',
    },
    emojiList: {
        gap: Spacing.sm,
        paddingBottom: Spacing.sm,
    },
    emojiOption: {
        width: 48,
        height: 48,
        borderRadius: BorderRadius.md,
        backgroundColor: AppColors.surface,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'transparent',
    },
    emojiOptionSelected: {
        borderColor: AppColors.primary,
        backgroundColor: AppColors.primaryLight,
    },
    emojiOptionText: {
        fontSize: 24,
    },
    inputLabel: {
        fontSize: FontSize.sm,
        fontWeight: FontWeight.bold,
        color: AppColors.textPrimary,
        marginBottom: Spacing.sm,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: AppColors.surface,
        borderRadius: BorderRadius.xl,
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.md,
        marginBottom: Spacing.xl,
        shadowColor: AppColors.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 1,
    },
    textInput: {
        flex: 1,
        fontSize: FontSize.md,
        color: AppColors.textPrimary,
        marginLeft: Spacing.md,
    },
    textInputPlaceholder: {
        flex: 1,
        fontSize: FontSize.md,
        color: AppColors.textTertiary,
        marginLeft: Spacing.md,
    },
    createButton: {
        backgroundColor: AppColors.primary,
        paddingVertical: Spacing.lg,
        borderRadius: BorderRadius.xl,
        alignItems: 'center',
        marginTop: Spacing.xxl,
        shadowColor: AppColors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    createButtonDisabled: {
        backgroundColor: AppColors.textTertiary,
        shadowOpacity: 0,
    },
    createButtonText: {
        fontSize: FontSize.lg,
        fontWeight: FontWeight.bold,
        color: AppColors.white,
    },
});
