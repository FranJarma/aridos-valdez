import { SIDEBAR_CONSTANTS } from "@/components/layout/sidebar/constants/sidebar.constants";

type ShapeHeaderData = {
  desktopSidebarWidth: number;
  isDesktopCollapsed: boolean;
  toggleDesktopCollapse: () => void;
  toggleMobileSidebar: () => void;
};

export function shapeHeaderData({
  desktopSidebarWidth,
  isDesktopCollapsed,
  toggleDesktopCollapse,
  toggleMobileSidebar,
}: ShapeHeaderData) {
  const appBarWidth = `calc(100% - ${desktopSidebarWidth}px)`;
  const appBarMarginLeft = `${desktopSidebarWidth}px`;

  const tooltipMessage = isDesktopCollapsed
    ? SIDEBAR_CONSTANTS.TOOLTIP.OPEN_SIDEBAR
    : SIDEBAR_CONSTANTS.TOOLTIP.CLOSE_SIDEBAR;

  return {
    appBarMarginLeft,
    appBarWidth,
    isSidebarCollapsed: isDesktopCollapsed,
    tooltipMessage,
    toggleDesktopSidebar: toggleDesktopCollapse,
    toggleMobileSidebar,
  };
}
