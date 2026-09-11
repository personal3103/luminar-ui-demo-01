import React from "react";
import { motion } from "framer-motion";
import { LEFT_NAV_ITEMS, RIGHT_NAV_ITEMS } from "./navItems";
import type { NavItemConfig } from "./navItems";
import {
  splitNavContainerVariants,
  splitNavLeftItemVariants,
  splitNavRightItemVariants,
} from "../motion/variants";

interface SplitNavigationProps {
  isActive: boolean;
  onSelectTab: (tab: NavItemConfig) => void;
}

export const SplitNavigation: React.FC<SplitNavigationProps> = ({ isActive, onSelectTab }) => {
  return (
    <motion.div
      variants={splitNavContainerVariants}
      initial="idle"
      animate={isActive ? "active" : "idle"}
      className="pointer-events-none fixed inset-0 z-10 hidden md:flex justify-between items-center px-8 lg:px-16"
    >
      {/* Left Side Navigation (Dashboard, Scenarios, Roleplay) */}
      <div className="flex flex-col space-y-8 pointer-events-auto">
        <div className="text-[10px] font-mono tracking-[0.25em] text-cyan-400/60 uppercase pl-1 border-l-2 border-cyan-500/40">
          PRIMARY // NODES
        </div>
        <div className="flex flex-col space-y-6">
          {LEFT_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.id}
                variants={splitNavLeftItemVariants}
                onClick={() => onSelectTab(item)}
                className="group relative flex items-center gap-4 text-left focus:outline-none"
                whileHover={{ x: 8 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-900/60 border border-white/10 group-hover:border-cyan-400/50 group-hover:bg-cyan-500/10 group-hover:shadow-[0_0_20px_rgba(56,189,248,0.25)] transition-all duration-300">
                  <Icon className="w-5 h-5 text-zinc-400 group-hover:text-cyan-300 transition-colors" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-zinc-500 group-hover:text-cyan-400 transition-colors">
                      {item.code}
                    </span>
                    <span className="text-xl lg:text-2xl font-bold tracking-tight text-zinc-300 group-hover:text-white transition-colors">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500/80 group-hover:text-cyan-300/80 transition-colors">
                    {item.tag}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Right Side Navigation (Toolkit, History Logs, Team Overview) */}
      <div className="flex flex-col space-y-8 items-end text-right pointer-events-auto">
        <div className="text-[10px] font-mono tracking-[0.25em] text-purple-400/60 uppercase pr-1 border-r-2 border-purple-500/40">
          OPERATIONAL // STACKS
        </div>
        <div className="flex flex-col space-y-6 items-end">
          {RIGHT_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.id}
                variants={splitNavRightItemVariants}
                onClick={() => onSelectTab(item)}
                className="group relative flex items-center flex-row-reverse gap-4 text-right focus:outline-none"
                whileHover={{ x: -8 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-900/60 border border-white/10 group-hover:border-purple-400/50 group-hover:bg-purple-500/10 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.25)] transition-all duration-300">
                  <Icon className="w-5 h-5 text-zinc-400 group-hover:text-purple-300 transition-colors" />
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-2 flex-row-reverse">
                    <span className="text-[11px] font-mono text-zinc-500 group-hover:text-purple-400 transition-colors">
                      {item.code}
                    </span>
                    <span className="text-xl lg:text-2xl font-bold tracking-tight text-zinc-300 group-hover:text-white transition-colors">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500/80 group-hover:text-purple-300/80 transition-colors">
                    {item.tag}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default SplitNavigation;
