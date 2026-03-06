import {
    Expense,
    EXPENSES,
    INSIGHT_CATEGORIES,
    InsightCategory,
    Member,
    MEMBERS,
    Settlement,
    SETTLEMENTS,
    Trip,
    TRIPS
} from '@/constants/mock-data';
import React, { createContext, ReactNode, useContext, useState } from 'react';

interface AppContextType {
    trips: Trip[];
    expenses: Expense[];
    members: Member[];
    settlements: Settlement[];
    insightCategories: InsightCategory[];
    currencySymbol: string;
    addTrip: (trip: Trip) => void;
    addExpense: (expense: Expense) => void;
    addMember: (member: Member) => void;
    addMemberToTrip: (tripId: string, memberId: string) => void;
    settleDebt: (settlementId: string) => void;
    settlePartialDebt: (settlementId: string, amount: number) => void;
    setCurrencySymbol: (symbol: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
    const [trips, setTrips] = useState<Trip[]>(TRIPS);
    const [expenses, setExpenses] = useState<Expense[]>(EXPENSES);
    const [members, setMembers] = useState<Member[]>(MEMBERS);
    const [settlements, setSettlements] = useState<Settlement[]>(SETTLEMENTS);
    const [insightCategories, setInsightCategories] = useState<InsightCategory[]>(INSIGHT_CATEGORIES);
    const [currencySymbol, setCurrencySymbol] = useState<string>('$');

    const addTrip = (trip: Trip) => {
        setTrips(prev => [trip, ...prev]);
    };

    const addExpense = (expense: Expense) => {
        // Also recalculate simple total for groups for demo purposes
        setExpenses(prev => [expense, ...prev]);

        // In a real app we would update members, trips balances, insights etc.
        setTrips(prev => prev.map(trip => {
            // Just applying broadly since we don't have tripId on expense in mock data right now
            // Real app would check tripId
            return {
                ...trip,
                totalGroup: trip.totalGroup + expense.amount,
                yourBalance: expense.paidBy === 'You' ? trip.yourBalance + expense.amount : trip.yourBalance - (expense.amount / trip.memberCount)
            };
        }));
    };

    const addMember = (member: Member) => {
        setMembers(prev => [member, ...prev]);
    };

    const addMemberToTrip = (tripId: string, memberId: string) => {
        setTrips(prev => prev.map(trip => {
            if (trip.id === tripId) {
                const updatedIds = trip.memberIds ? [...trip.memberIds, memberId] : [memberId];
                const uniqueIds = Array.from(new Set(updatedIds));
                return { ...trip, memberIds: uniqueIds, memberCount: uniqueIds.length };
            }
            return trip;
        }));
    };

    const settleDebt = (settlementId: string) => {
        setSettlements(prev => prev.filter(s => s.id !== settlementId));
    };

    const settlePartialDebt = (settlementId: string, amountToSettle: number) => {
        setSettlements(prev => {
            const index = prev.findIndex(s => s.id === settlementId);
            if (index === -1) return prev;

            const item = prev[index];
            if (amountToSettle >= item.amount) {
                // If settled fully or more, remove it
                return prev.filter(s => s.id !== settlementId);
            } else {
                // Partially settle it
                const newArr = [...prev];
                newArr[index] = { ...item, amount: item.amount - amountToSettle };
                return newArr;
            }
        });
    };

    return (
        <AppContext.Provider
            value={{
                trips,
                expenses,
                members,
                settlements,
                insightCategories,
                currencySymbol,
                addTrip,
                addExpense,
                addMember,
                addMemberToTrip,
                settleDebt,
                settlePartialDebt,
                setCurrencySymbol,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
}
