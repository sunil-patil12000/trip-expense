import { AppColors, BorderRadius, FontSize, FontWeight, Spacing } from '@/constants/theme';
import { useAppContext } from '@/context/AppContext';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddMemberScreen() {
    const router = useRouter();
    const { addMember } = useAppContext();
    const [name, setName] = useState('');
    const [role, setRole] = useState('Friend');

    const handleSave = () => {
        if (name.trim()) {
            addMember({
                id: Date.now().toString(),
                name: name.trim(),
                role: role.trim() || 'Friend',
                avatar: name.substring(0, 2).toUpperCase(),
                balance: 0,
                recentExpenses: []
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
                <Text style={styles.headerTitle}>Add Friend</Text>
                <TouchableOpacity style={styles.saveButton} onPress={handleSave} activeOpacity={0.8}>
                    <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <View style={styles.content}>
                    <Text style={styles.inputLabel}>Name</Text>
                    <View style={styles.inputContainer}>
                        <MaterialIcons name="person" size={20} color={AppColors.textTertiary} />
                        <TextInput
                            style={styles.textInput}
                            placeholder="e.g. John Doe"
                            value={name}
                            onChangeText={setName}
                            placeholderTextColor={AppColors.textTertiary}
                            autoFocus
                        />
                    </View>

                    <Text style={styles.inputLabel}>Role or Relationship</Text>
                    <View style={styles.inputContainer}>
                        <MaterialIcons name="label" size={20} color={AppColors.textTertiary} />
                        <TextInput
                            style={styles.textInput}
                            placeholder="e.g. Friend, Brother, Roommate"
                            value={role}
                            onChangeText={setRole}
                            placeholderTextColor={AppColors.textTertiary}
                        />
                    </View>
                </View>
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
    keyboardView: {
        flex: 1,
    },
    content: {
        padding: Spacing.xl,
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
});
