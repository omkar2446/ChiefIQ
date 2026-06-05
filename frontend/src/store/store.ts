import { create } from 'zustand';

interface AppState {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  dashboardData: any;
  setDashboardData: (data: any) => void;
  risks: any[];
  setRisks: (risks: any[]) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeTab: 'dashboard',
  setActiveTab: (tab) => set({ activeTab: tab }),
  dashboardData: null,
  setDashboardData: (data) => set({ dashboardData: data }),
  risks: [],
  setRisks: (risks) => set({ risks: risks }),
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
}));
