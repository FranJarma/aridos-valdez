import { create } from "zustand";

type SidebarState = {
  closeMobileDrawer: () => void;
  isDesktopCollapsed: boolean;
  isMobileOpen: boolean;
  toggleDesktopCollapse: () => void;
  toggleMobileSidebar: () => void;
};

export const useSidebarStore = create<SidebarState>((set) => ({
  isDesktopCollapsed: false,
  isMobileOpen: false,
  closeMobileDrawer: () => set({ isMobileOpen: false }),
  toggleDesktopCollapse: () =>
    set((s) => ({ isDesktopCollapsed: !s.isDesktopCollapsed })),
  toggleMobileSidebar: () => set((s) => ({ isMobileOpen: !s.isMobileOpen })),
}));
