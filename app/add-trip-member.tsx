import { AppColors, BorderRadius, FontSize, FontWeight, Spacing } from '@/constants/theme';
import { useAppContext } from '@/context/AppContext';
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
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddTripMemberScreen() {
    const router = useRouter();
    const { tripId } = useLocalSearchParams();
    const { members, trips, addMemberToTrip } = useAppContext();

    const trip = trips.find(t => t.id === tripId);
    if (!trip) return null;

    const availableMembers = members.filter(m => !(trip.memberIds || []).includes(m.id));

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.closeButton} onPress={() => router.back()} activeOpacity={0.8}>
                    <MaterialIcons name="close" size={24} color={AppColors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Add to Trip</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.sectionTitle}>Select Existing Member</Text>

                {availableMembers.length === 0 ? (
                    <Text style={{ color: AppColors.textTertiary, marginVertical: Spacing.md }}>All friends are already in this trip!</Text>
                ) : (
                    availableMembers.map((member, idx) => {
                        const avatarColor = ['#1152d4', '#6C63FF', '#EC4899', '#10B981'][idx % 4];
                        return (
                            <TouchableOpacity
                                key={member.id}
                                style={styles.memberCard}
                                onPress={() => {
                                    addMemberToTrip(tripId as string, member.id);
                                    router.back();
                                }}
                            >
                                <View style={[styles.avatar, { backgroundColor: avatarColor }]}>
                                    <Text style={styles.avatarText}>{member.avatar}</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.memberName}>{member.name}</Text>
                                    <Text style={styles.memberRole}>{member.role}</Text>
                                </View>
                                <MaterialIcons name="add-circle-outline" size={24} color={AppColors.primary} />
                            </TouchableOpacity>
                        );
                    })
                )}

                <TouchableOpacity
                    style={styles.createNewButton}
                    onPress={() => router.push('/add-member')}
                >
                    <MaterialIcons name="person-add" size={24} color={AppColors.primary} />
                    <Text style={styles.createNewText}>Create New Friend</Text>
                </TouchableOpacity>
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
    content: {
        padding: Spacing.xl,
    },
    sectionTitle: {
        fontSize: FontSize.md,
        fontWeight: 'bold',
        color: AppColors.textSecondary,
        marginBottom: Spacing.lg,
    },
    memberCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: AppColors.surface,
        padding: Spacing.md,
        borderRadius: BorderRadius.xl,
        marginBottom: Spacing.sm,
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
        fontSize: FontSize.lg,
        fontWeight: 'bold',
        color: '#FFF',
    },
    memberName: {
        fontSize: FontSize.md,
        fontWeight: 'bold',
        color: AppColors.textPrimary,
    },
    memberRole: {
        fontSize: FontSize.sm,
        color: AppColors.textSecondary,
    },
    createNewButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: Spacing.lg,
        marginTop: Spacing.xl,
        borderWidth: 2,
        borderColor: AppColors.primaryLight,
        borderStyle: 'dashed',
        borderRadius: BorderRadius.xl,
    },
    createNewText: {
        fontSize: FontSize.md,
        fontWeight: 'bold',
        color: AppColors.primary,
        marginLeft: Spacing.sm,
    }
});
