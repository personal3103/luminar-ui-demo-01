import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SceneBackground } from "./3d/SceneBackground";
import { SplitNavigation } from "./hud/SplitNavigation";
import { DockedSideRails } from "./hud/DockedSideRails";
import { HUDOverlay } from "./hud/HUDOverlay";
import { ContentPanel } from "./panels/ContentPanel";
import { MobileNav } from "./hud/MobileNav";
import { ALL_NAV_ITEMS } from "./hud/navItems";
import type { NavItemConfig } from "./hud/navItems";
import { dimOverlayVariants } from "./motion/variants";

export const SpatialDashboardLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active tab from URL path if applicable
  const currentTabFromUrl = ALL_NAV_ITEMS.find((item) => location.pathname.startsWith(item.path));
  const [activeTab, setActiveTab] = useState<NavItemConfig | null>(currentTabFromUrl || null);
  const [slideDirection, setSlideDirection] = useState<number>(1);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Sync activeTab if location changes externally
  useEffect(() => {
    const matched = ALL_NAV_ITEMS.find((item) => location.pathname.startsWith(item.path));
    if (matched) {
      if (activeTab && activeTab.id !== matched.id) {
        const prevIndex = ALL_NAV_ITEMS.findIndex((i) => i.id === activeTab.id);
        const nextIndex = ALL_NAV_ITEMS.findIndex((i) => i.id === matched.id);
        setSlideDirection(nextIndex > prevIndex ? 1 : -1);
      }
      setActiveTab(matched);
    }
  }, [location.pathname]);

  // Mobile viewport detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle Tab Selection with Directional Transition
  const handleSelectTab = useCallback(
    (nextTab: NavItemConfig) => {
      if (activeTab) {
        const prevIndex = ALL_NAV_ITEMS.findIndex((i) => i.id === activeTab.id);
        const nextIndex = ALL_NAV_ITEMS.findIndex((i) => i.id === nextTab.id);
        setSlideDirection(nextIndex >= prevIndex ? 1 : -1);
      } else {
        setSlideDirection(1);
      }
      setActiveTab(nextTab);
      navigate(nextTab.path);
    },
    [activeTab, navigate]
  );

  // Close Panel / Return to Idle State
  const handleClosePanel = useCallback(() => {
    setActiveTab(null);
    navigate("/app");
  }, [navigate]);

  // ESC key listener to close panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeTab) {
        handleClosePanel();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeTab, handleClosePanel]);

  const isPanelOpen = Boolean(activeTab);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#05070d] text-zinc-100 font-sans select-none">
      {/* 1. 3D Background Layer (R3F Canvas on Desktop, Lightweight CSS mesh on Mobile) */}
      {!isMobile ? (
        <SceneBackground dimmed={isPanelOpen} />
      ) : (
        <div className="fixed inset-0 bg-[#05070d] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-950/20 via-zinc-950 to-black z-0 pointer-events-none" />
      )}

      {/* 2. Dim Overlay when Content Panel is Active */}
      <motion.div
        variants={dimOverlayVariants}
        initial="idle"
        animate={isPanelOpen ? "active" : "idle"}
        onClick={handleClosePanel}
        className="fixed inset-0 z-10 bg-black/60 backdrop-blur-md"
      />

      {/* 3. Top & Center HUD Telemetry Elements */}
      <HUDOverlay
        isActive={isPanelOpen}
        activeTab={activeTab || undefined}
        onClose={handleClosePanel}
      />

      {/* 4. Idle State: Split Navigation (Left & Right Text Lists) */}
      <SplitNavigation isActive={isPanelOpen} onSelectTab={handleSelectTab} />

      {/* 5. Active State: Minimalist Docked Side Icon Rails */}
      <DockedSideRails
        isActive={isPanelOpen}
        activeTabId={activeTab?.id || ""}
        onSelectTab={handleSelectTab}
      />

      {/* 6. Active State: Glassmorphic Main Content Panel */}
      <AnimatePresence mode="wait">
        {isPanelOpen && activeTab && (
          <ContentPanel
            key="content-panel"
            activeTab={activeTab}
            slideDirection={slideDirection}
            onClose={handleClosePanel}
          >
            <Outlet />
          </ContentPanel>
        )}
      </AnimatePresence>

      {/* 7. Mobile Bottom Navigation */}
      <MobileNav activeTabId={activeTab?.id} onSelectTab={handleSelectTab} />
    </div>
  );
};

export default SpatialDashboardLayout;
