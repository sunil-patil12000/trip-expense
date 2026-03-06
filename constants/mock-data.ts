/**
 * Mock data for the Trip Expense Manager app.
 * All data structures matching the Stitch screen designs.
 */

export interface Trip {
    id: string;
    name: string;
    dateRange: string;
    memberCount: number;
    yourBalance: number;
    totalGroup: number;
    emoji: string;
    memberIds?: string[];
}

export interface Expense {
    id: string;
    title: string;
    paidBy: string;
    amount: number;
    time: string;
    date: string;
    category: string;
    categoryIcon: string;
}

export interface Member {
    id: string;
    name: string;
    role: string;
    avatar: string;
    balance: number;
    recentExpenses: MemberExpense[];
}

export interface MemberExpense {
    id: string;
    title: string;
    subtitle: string;
    amount: number;
    isCredit: boolean;
}

export interface Settlement {
    id: string;
    fromMember: string;
    toMember: string;
    amount: number;
    reason: string;
    status: 'pending' | 'completed';
    fromAvatar: string;
    toAvatar: string;
}

export interface InsightCategory {
    id: string;
    name: string;
    subtitle: string;
    planned: number;
    actual: number;
    status: 'over' | 'under' | 'on-track';
}

export const TRIPS: Trip[] = [
    {
        id: '1',
        name: 'Euro Summer 2024',
        dateRange: 'Jul 15 - Aug 5',
        memberCount: 4,
        yourBalance: 245.0,
        totalGroup: 2450.0,
        emoji: '🏖️',
        memberIds: ['1', '2', '3', '4'],
    },
    {
        id: '2',
        name: 'Paris Getaway',
        dateRange: 'Sep 12 - Sep 18',
        memberCount: 2,
        yourBalance: -120.5,
        totalGroup: 840.0,
        emoji: '🗼',
        memberIds: ['1', '3'],
    },
    {
        id: '3',
        name: 'Japan Expedition',
        dateRange: 'Oct 01 - Oct 15',
        memberCount: 6,
        yourBalance: 0,
        totalGroup: 5120.0,
        emoji: '🗾',
        memberIds: ['1', '2', '4'],
    },
    {
        id: '4',
        name: 'Italy Road Trip',
        dateRange: 'Nov 01 - Nov 12',
        memberCount: 4,
        yourBalance: 180.0,
        totalGroup: 3200.0,
        emoji: '🍕',
        memberIds: ['2', '3', '4'],
    },
];

export const EXPENSES: Expense[] = [
    {
        id: '1',
        title: 'Dinner at Trattoria',
        paidBy: 'Marco',
        amount: 124.0,
        time: '8:45 PM',
        date: 'Today',
        category: 'Food & Dining',
        categoryIcon: '🍽️',
    },
    {
        id: '2',
        title: 'Gas Station - ENI',
        paidBy: 'You',
        amount: 65.2,
        time: '2:15 PM',
        date: 'Today',
        category: 'Fuel',
        categoryIcon: '⛽',
    },
    {
        id: '3',
        title: 'Hotel Roma Central',
        paidBy: 'Elena',
        amount: 450.0,
        time: '11:30 AM',
        date: 'Yesterday',
        category: 'Accommodation',
        categoryIcon: '🏨',
    },
    {
        id: '4',
        title: 'Colosseum Tickets',
        paidBy: 'You',
        amount: 96.0,
        time: '9:00 AM',
        date: 'Yesterday',
        category: 'Entertainment',
        categoryIcon: '🎭',
    },
    {
        id: '5',
        title: 'Le Meurice Dinner',
        paidBy: 'Alex',
        amount: 185.0,
        time: '8:30 PM',
        date: 'Oct 24',
        category: 'Client Entertainment',
        categoryIcon: '🍷',
    },
    {
        id: '6',
        title: 'Uber to CDG Airport',
        paidBy: 'Sarah',
        amount: 64.2,
        time: '10:00 AM',
        date: 'Oct 24',
        category: 'Transport',
        categoryIcon: '🚗',
    },
    {
        id: '7',
        title: 'Grand Hyatt Paris',
        paidBy: 'Alex',
        amount: 1420.0,
        time: '2:00 PM',
        date: 'Oct 23',
        category: 'Accommodation',
        categoryIcon: '🏨',
    },
    {
        id: '8',
        title: 'Corporate Gifts',
        paidBy: 'You',
        amount: 312.8,
        time: '4:15 PM',
        date: 'Oct 23',
        category: 'Shopping',
        categoryIcon: '🎁',
    },
];

export const MEMBERS: Member[] = [
    {
        id: '1',
        name: 'Alex Rivera',
        role: 'Senior Product Lead',
        avatar: 'AR',
        balance: 2919.5,
        recentExpenses: [
            { id: '1', title: 'Delta Airlines', subtitle: 'Business Class · Today', amount: 840.0, isCredit: false },
            { id: '2', title: 'The Ritz-Carlton', subtitle: '2 Nights · 2 days ago', amount: 1240.5, isCredit: false },
            { id: '3', title: 'Top-up Wallet', subtitle: 'Bank Transfer · 4 days ago', amount: 5000.0, isCredit: true },
        ],
    },
    {
        id: '2',
        name: 'Marco Bianchi',
        role: 'Travel Enthusiast',
        avatar: 'MB',
        balance: -320.0,
        recentExpenses: [
            { id: '1', title: 'Trattoria Dinner', subtitle: 'Food · Today', amount: 124.0, isCredit: false },
            { id: '2', title: 'Museum Entry', subtitle: 'Entertainment · Yesterday', amount: 45.0, isCredit: false },
        ],
    },
    {
        id: '3',
        name: 'Elena Santos',
        role: 'Trip Organizer',
        avatar: 'ES',
        balance: 560.0,
        recentExpenses: [
            { id: '1', title: 'Hotel Roma', subtitle: 'Accommodation · Yesterday', amount: 450.0, isCredit: false },
            { id: '2', title: 'Train Tickets', subtitle: 'Transport · 3 days ago', amount: 89.0, isCredit: false },
        ],
    },
    {
        id: '4',
        name: 'Sarah Chen',
        role: 'Budget Keeper',
        avatar: 'SC',
        balance: 125.0,
        recentExpenses: [
            { id: '1', title: 'Uber Ride', subtitle: 'Transport · Today', amount: 64.2, isCredit: false },
            { id: '2', title: 'Group Lunch', subtitle: 'Food · 2 days ago', amount: 78.0, isCredit: false },
        ],
    },
];

export const SETTLEMENTS: Settlement[] = [
    {
        id: '1',
        fromMember: 'Marco',
        toMember: 'Alex',
        amount: 500,
        reason: 'Paying back for Dinner & Cab',
        status: 'pending',
        fromAvatar: 'MB',
        toAvatar: 'AR',
    },
    {
        id: '2',
        fromMember: 'Sarah',
        toMember: 'Elena',
        amount: 1200,
        reason: 'Fuel contribution',
        status: 'pending',
        fromAvatar: 'SC',
        toAvatar: 'ES',
    },
    {
        id: '3',
        fromMember: 'Marco',
        toMember: 'Elena',
        amount: 2800,
        reason: 'Airbnb booking share',
        status: 'pending',
        fromAvatar: 'MB',
        toAvatar: 'ES',
    },
];

export const INSIGHT_CATEGORIES: InsightCategory[] = [
    {
        id: '1',
        name: 'Flights',
        subtitle: 'Business Class',
        planned: 1100,
        actual: 1200,
        status: 'over',
    },
    {
        id: '2',
        name: 'Accommodation',
        subtitle: 'Luxury Resorts',
        planned: 1000,
        actual: 850,
        status: 'under',
    },
    {
        id: '3',
        name: 'Food & Dining',
        subtitle: 'Local Cuisine',
        planned: 500,
        actual: 432,
        status: 'on-track',
    },
];

export const EXPENSE_CATEGORIES = [
    { id: '1', name: 'Food & Dining', icon: '🍽️', color: '#F97316' },
    { id: '2', name: 'Transport', icon: '🚗', color: '#3B82F6' },
    { id: '3', name: 'Accommodation', icon: '🏨', color: '#8B5CF6' },
    { id: '4', name: 'Entertainment', icon: '🎭', color: '#EC4899' },
    { id: '5', name: 'Fuel', icon: '⛽', color: '#10B981' },
    { id: '6', name: 'Shopping', icon: '🛍️', color: '#F59E0B' },
    { id: '7', name: 'Health', icon: '💊', color: '#EF4444' },
    { id: '8', name: 'Other', icon: '📦', color: '#64748B' },
];
