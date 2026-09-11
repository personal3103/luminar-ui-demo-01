import React from "react";
import { motion } from "framer-motion";
import { ALL_NAV_ITEMS } from "./navItems";
import type { NavItemConfig } from "./navItems";
import { mobileBottomNavVariants } from "../motion/variants";
import { cn } from "../../lib/utils";

interface MobileNavProps {
  activeTabId?: string;
  onSelectTab: (tab: NavItemConfig) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ activeTabId, onSelectTab }) => {
  return (
    <motion.nav
      variants={mobileBottomNavVariants}
      initial="hidden"
      animate="visible"
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden flex items-center justify-around px-2 py-2.5 bg-zinc-950/90 backdrop-blur-xl border-t border-white/10 shadow-2xl"
    >
      {ALL_NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isSelected = item.id === activeTabId;
        return (
          <button
            key={item.id}
            onClick={() => onSelectTab(item)}
            className={cn(
              "flex flex-col items-center gap-1 px-2.5 py-1 rounded-xl transition-all duration-200 focus:outline-none",
              isSelected
                ? "text-cyan-300 bg-cyan-500/10 font-medium"
                : "text-zinc-400 hover:text-zinc-200"
            )}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] tracking-tight">{item.label}</span>
          </button>
        );
      })}
    </motion.nav>
  );
};

export default MobileNav;
