import React from "react";
import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { contentPanelVariants, tabContentCircularVariants } from "../motion/variants";
import type { NavItemConfig } from "../hud/navItems";

interface ContentPanelProps {
  activeTab: NavItemConfig;
  slideDirection?: number;
  onClose?: () => void;
  children: ReactNode;
}

export const ContentPanel: React.FC<ContentPanelProps> = ({
  activeTab,
  children,
}) => {
  const Icon = activeTab.icon;
  const location = useLocation();

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center p-4 sm:p-6 lg:p-10 pointer-events-none">
      <motion.div
        variants={contentPanelVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="pointer-events-auto relative w-full max-w-6xl h-[86vh] max-h-[920px] rounded-2xl flex flex-col bg-zinc-950/90 backdrop-blur-3xl border border-cyan-400/40 ring-1 ring-white/20 shadow-[0_0_0_1px_rgba(56,189,248,0.35),0_30px_90px_rgba(0,0,0,0.95),0_0_60px_rgba(6,182,212,0.25),inset_0_1px_0_rgba(255,255,255,0.2)]"
        style={{ willChange: "clip-path, transform, opacity" }}
      >
        {/* Outer Deep Ambient Shadow & Cyber Glow Halo (Clear boundary separation from 3D background) */}
        <div className="absolute -inset-2 rounded-3xl bg-black/90 blur-2xl pointer-events-none -z-20" />
        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-b from-cyan-400/35 via-purple-500/20 to-cyan-500/35 blur-md opacity-85 pointer-events-none -z-10" />

        {/* Window Inner Container (macOS style window frame) */}
        <div className="relative w-full h-full flex flex-col rounded-2xl overflow-hidden">
          {/* macOS Window Top Bar */}
          <div className="h-12 border-b border-cyan-500/20 bg-zinc-900/60 px-4 flex items-center justify-between shrink-0 select-none backdrop-blur-md">
            {/* macOS Window Traffic Lights (Decorative HUD status dots) */}
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-400/40 shadow-[0_0_6px_rgba(244,63,94,0.4)]" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-400/40 shadow-[0_0_6px_rgba(245,158,11,0.4)]" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-400/40 shadow-[0_0_6px_rgba(16,185,129,0.4)]" />
            </div>

            {/* Window Center Title & Badge */}
            <div className="flex items-center gap-2 text-xs font-medium text-zinc-300">
              <Icon className="w-4 h-4 text-cyan-400" />
              <span className="font-semibold text-white tracking-tight">{activeTab.label}</span>
              <span className="text-zinc-600">/</span>
              <span className="text-[10px] font-mono text-cyan-300 px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30">
                {activeTab.tag}
              </span>
            </div>

            {/* Window Right Telemetry (Clean, no redundant close button) */}
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-cyan-950/40 border border-cyan-500/25 text-[10px] font-mono text-cyan-300">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="tracking-wider">HUD // ACTIVE</span>
              </span>
            </div>
          </div>

          {/* Dynamic Animated Content Area */}
          <div className="relative flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                variants={tabContentCircularVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 overflow-y-auto p-6 lg:p-8"
                style={{ willChange: "clip-path, opacity" }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContentPanel;
