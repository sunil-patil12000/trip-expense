/**
 * Welcome Screen - Simplified Modern Welcome
 * Matches Stitch screen: "Simplified Modern Welcome Screen"
 * App name: Splitsy - Trip Expense Manager
 */

import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, {
    FadeInDown,
    FadeInUp,
} from 'react-native-reanimated';

import { AppColors, BorderRadius, FontSize, FontWeight, Spacing } from '@/constants/theme';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[AppColors.primary, AppColors.primaryDark, '#0a2d6e']}
                style={styles.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                {/* Decorative circles */}
                <View style={styles.decorCircle1} />
                <View style={styles.decorCircle2} />
                <View style={styles.decorCircle3} />

                {/* Logo area */}
                <Animated.View entering={FadeInDown.delay(200).duration(800)} style={styles.logoContainer}>
                    <View style={styles.logoIcon}>
                        <Text style={styles.logoEmoji}>✈️</Text>
                    </View>
                    <Text style={styles.logoText}>Splitsy</Text>
                </Animated.View>

                {/* Main content */}
                <Animated.View entering={FadeInUp.delay(400).duration(800)} style={styles.contentContainer}>
                    <Text style={styles.title}>
                        Manage Trip{'\n'}Expenses Easily{'\n'}With Friends
                    </Text>
                    <Text style={styles.subtitle}>
                        Split bills, track budgets, and focus on the adventure.
                    </Text>
                </Animated.View>

                {/* Buttons */}
                <Animated.View entering={FadeInUp.delay(600).duration(800)} style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.primaryButton}
                        onPress={() => router.replace('/(tabs)')}
                        activeOpacity={0.85}
                    >
                        <Text style={styles.primaryButtonText}>Get Started</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.secondaryButton}
                        onPress={() => router.replace('/(tabs)')}
                        activeOpacity={0.85}
                    >
                        <Text style={styles.secondaryButtonText}>
                            Already have an account? <Text style={styles.linkText}>Sign In</Text>
                        </Text>
                    </TouchableOpacity>
                </Animated.View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
        paddingHorizontal: Spacing.xxl,
        justifyContent: 'center',
        overflow: 'hidden',
    },
    decorCircle1: {
        position: 'absolute',
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: 'rgba(255,255,255,0.05)',
        top: -80,
        right: -60,
    },
    decorCircle2: {
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: 'rgba(255,255,255,0.03)',
        bottom: 120,
        left: -50,
    },
    decorCircle3: {
        position: 'absolute',
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: 'rgba(255,255,255,0.04)',
        top: '40%',
        right: -30,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 48,
    },
    logoIcon: {
        width: 48,
        height: 48,
        borderRadius: BorderRadius.lg,
        backgroundColor: 'rgba(255,255,255,0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Spacing.md,
    },
    logoEmoji: {
        fontSize: 24,
    },
    logoText: {
        fontSize: FontSize.xl,
        fontWeight: FontWeight.bold,
        color: AppColors.white,
        letterSpacing: 0.5,
    },
    contentContainer: {
        marginBottom: 48,
    },
    title: {
        fontSize: FontSize.xxxl,
        fontWeight: FontWeight.extraBold,
        color: AppColors.white,
        lineHeight: 42,
        marginBottom: Spacing.lg,
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: FontSize.lg,
        color: 'rgba(255,255,255,0.75)',
        lineHeight: 26,
    },
    buttonContainer: {
        gap: Spacing.lg,
    },
    primaryButton: {
        backgroundColor: AppColors.white,
        paddingVertical: Spacing.lg + 2,
        borderRadius: BorderRadius.xl,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 6,
    },
    primaryButtonText: {
        fontSize: FontSize.lg,
        fontWeight: FontWeight.bold,
        color: AppColors.primary,
    },
    secondaryButton: {
        paddingVertical: Spacing.md,
        alignItems: 'center',
    },
    secondaryButtonText: {
        fontSize: FontSize.md,
        color: 'rgba(255,255,255,0.7)',
    },
    linkText: {
        color: AppColors.white,
        fontWeight: FontWeight.semiBold,
        textDecorationLine: 'underline',
    },
});
