import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CornerDownLeft, LogOut, Settings } from "lucide-react";
import type { NavItemConfig } from "./navItems";

interface HUDOverlayProps {
  isActive: boolean;
  activeTab?: NavItemConfig;
  onClose: () => void;
}

export const HUDOverlay: React.FC<HUDOverlayProps> = ({ isActive, activeTab, onClose }) => {
  const navigate = useNavigate();

  return (
    <>
      {/* Top HUD Header */}
      <header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-2.5 sm:px-6 sm:py-3 pointer-events-none">
        {/* Brand & Subsystem Label - Clickable to return to Landing Page */}
        <button
          onClick={() => navigate("/")}
          className="group flex items-center gap-3 pointer-events-auto text-left focus:outline-none cursor-pointer transition-all"
          title="Return to Landing Page"
        >
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-cyan-950/40 border border-cyan-500/30 group-hover:border-cyan-400 group-hover:shadow-[0_0_18px_rgba(56,189,248,0.45)] transition-all p-1">
            <img
              src="./logo.png"
              alt="Luminar Logo"
              className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(56,189,248,0.5)] group-hover:scale-110 transition-transform"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs sm:text-sm font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                LUMINAR
              </span>
              <span className="text-[9px] font-mono text-cyan-400 px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30">
                SPATIAL v2.4
              </span>
            </div>
            <div className="text-[9px] font-mono text-zinc-500 group-hover:text-zinc-400 uppercase tracking-wider transition-colors">
              {isActive ? `VIEW // ${activeTab?.tag || "MODULE"}` : "ORBITAL HUD // STANDBY"}
            </div>
          </div>
        </button>

        {/* Right Top Status & Close Action */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {isActive ? (
            <motion.button
              initial={{ opacity: 0, scale: 0.85, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: -4 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={onClose}
              className="group flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white text-[10px] font-mono font-bold tracking-wider border border-rose-300/50 shadow-[0_0_14px_rgba(244,63,94,0.4)] hover:shadow-[0_0_18px_rgba(244,63,94,0.6)] transition-all cursor-pointer select-none"
              title="Return to 3D Orbit (ESC)"
            >
              <CornerDownLeft className="w-3 h-3 text-white group-hover:-translate-x-0.5 transition-transform" />
              <span>EXIT VIEW</span>
              <kbd className="px-1 py-0.2 text-[8px] bg-black/35 rounded text-rose-100 border border-white/20 font-sans font-semibold">
                ESC
              </kbd>
            </motion.button>
          ) : (
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-zinc-950/60 backdrop-blur-md border border-white/10 text-[11px] font-mono text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>QUANTUM CORE // ACTIVE</span>
            </div>
          )}
        </div>
      </header>

      {/* Subtle Background Center Reticle Rings (Visible in Idle State) */}
      {!isActive && (
        <div className="pointer-events-none fixed inset-0 z-[1] hidden md:flex items-center justify-center">
          <div
            className="w-[480px] h-[480px] rounded-full border border-cyan-500/10 pointer-events-none absolute animate-spin"
            style={{ animationDuration: "75s" }}
          />
          <div
            className="w-[340px] h-[340px] rounded-full border border-dashed border-purple-500/15 pointer-events-none absolute animate-spin"
            style={{ animationDuration: "50s", animationDirection: "reverse" }}
          />
        </div>
      )}

      {/* Bottom Telemetry Footer */}
      <footer className="fixed bottom-14 sm:bottom-0 left-0 right-0 z-20 flex justify-between items-end sm:items-center p-4 sm:p-6 text-[10px] font-mono text-zinc-500 pointer-events-none">
        {/* Bottom Left: User Login Avatar / Profile + Settings + Logout */}
        <div className="pointer-events-auto flex items-center gap-3">
          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-zinc-950/80 backdrop-blur-xl border border-white/10 hover:border-cyan-500/40 shadow-lg transition-all">
            {/* Clickable User Avatar & Info -> Goes to Profile */}
            <button
              onClick={() => navigate("/app/profile")}
              className="flex items-center gap-2.5 group/user text-left focus:outline-none cursor-pointer pr-1"
              title="View Personal Profile (Alex Dev)"
            >
              <div className="relative">
                <img
                  src="https://i.pravatar.cc/150?img=11"
                  alt="Alex Dev"
                  className="w-7 h-7 rounded-lg object-cover border border-cyan-500/30 group-hover/user:border-cyan-400 shadow-[0_0_10px_rgba(56,189,248,0.25)] group-hover/user:scale-105 transition-all"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-zinc-950 animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-zinc-200 group-hover/user:text-cyan-300 tracking-tight leading-none transition-colors">
                  Alex Dev
                </span>
                <span className="text-[9px] font-mono text-emerald-400/90 leading-tight mt-0.5">
                  PROFILE // LEVEL 4
                </span>
              </div>
            </button>

            <div className="w-px h-4 bg-white/10 mx-0.5" />

            {/* Quick Settings Button */}
            <button
              onClick={() => navigate("/app/settings")}
              className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-zinc-400 hover:text-cyan-300 hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/30 transition-all focus:outline-none cursor-pointer"
              title="Open System Settings & Preferences"
            >
              <Settings className="w-3.5 h-3.5 text-zinc-400 hover:text-cyan-400" />
              <span className="hidden sm:inline text-[10px] font-mono">SETTINGS</span>
            </button>

            <div className="w-px h-4 bg-white/10 mx-0.5" />

            {/* Logout Button */}
            <button
              onClick={() => {
                localStorage.removeItem("isLoggedIn");
                navigate("/");
              }}
              className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-zinc-400 hover:text-rose-300 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/30 transition-all focus:outline-none cursor-pointer"
              title="Logout & Return to Landing Page"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-400" />
              <span className="text-[10px] font-mono tracking-wider">LOGOUT</span>
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-4 text-zinc-600 pl-2">
            <span>COORDINATES: [0.00, 0.00, 5.50]</span>
            <span>LATENCY: 12ms</span>
          </div>
        </div>

        {/* Bottom Right: Spatial Engine Status */}
        <div className="hidden sm:flex items-center gap-3 ml-auto">
          <span className="text-zinc-600">SPATIAL UI ENGINE</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/60" />
        </div>
      </footer>
    </>
  );
};

export default HUDOverlay;
