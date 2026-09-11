import React from "react";
import { motion } from "framer-motion";
import { LEFT_NAV_ITEMS, RIGHT_NAV_ITEMS } from "./navItems";
import type { NavItemConfig } from "./navItems";
import {
  dockedRailLeftVariants,
  dockedRailRightVariants,
  dockedIconItemVariants,
} from "../motion/variants";
import { cn } from "../../lib/utils";

interface DockedSideRailsProps {
  isActive: boolean;
  activeTabId: string;
  onSelectTab: (tab: NavItemConfig) => void;
}

export const DockedSideRails: React.FC<DockedSideRailsProps> = ({
  isActive,
  activeTabId,
  onSelectTab,
}) => {
  return (
    <>
      {/* Left Docked Rail (Dashboard, Scenarios, Roleplay) */}
      <motion.aside
        variants={dockedRailLeftVariants}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
        className="fixed left-4 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-center gap-3 p-2 rounded-2xl bg-zinc-950/70 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 my-1 animate-pulse" />
        {LEFT_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isSelected = item.id === activeTabId;
          return (
            <motion.button
              key={item.id}
              variants={dockedIconItemVariants}
              onClick={() => onSelectTab(item)}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.92 }}
              className={cn(
                "relative group flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-300 focus:outline-none",
                isSelected
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_15px_rgba(56,189,248,0.35)]"
                  : "bg-white/5 text-zinc-400 hover:text-zinc-100 hover:bg-white/10 border border-transparent"
              )}
              title={item.label}
            >
              <Icon className="w-5 h-5" />
              {/* Tooltip */}
              <span className="pointer-events-none absolute left-full ml-3 px-2.5 py-1 rounded-lg bg-zinc-900/90 text-xs font-medium text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-white/10 shadow-lg">
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </motion.aside>

      {/* Right Docked Rail (Toolkit, History Logs, Team Overview) */}
      <motion.aside
        variants={dockedRailRightVariants}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
        className="fixed right-4 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-center gap-3 p-2 rounded-2xl bg-zinc-950/70 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-purple-400 my-1 animate-pulse" />
        {RIGHT_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isSelected = item.id === activeTabId;
          return (
            <motion.button
              key={item.id}
              variants={dockedIconItemVariants}
              onClick={() => onSelectTab(item)}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.92 }}
              className={cn(
                "relative group flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-300 focus:outline-none",
                isSelected
                  ? "bg-purple-500/20 text-purple-300 border border-purple-400/50 shadow-[0_0_15px_rgba(168,85,247,0.35)]"
                  : "bg-white/5 text-zinc-400 hover:text-zinc-100 hover:bg-white/10 border border-transparent"
              )}
              title={item.label}
            >
              <Icon className="w-5 h-5" />
              {/* Tooltip */}
              <span className="pointer-events-none absolute right-full mr-3 px-2.5 py-1 rounded-lg bg-zinc-900/90 text-xs font-medium text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-white/10 shadow-lg">
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </motion.aside>
    </>
  );
};

export default DockedSideRails;
