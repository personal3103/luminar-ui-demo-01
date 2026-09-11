import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, Bell, Mic, Globe, Shield, Save, Check } from "lucide-react";

export const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [saved, setSaved] = useState(false);

  const tabs = [
    { id: "general", label: "General & Account", icon: Settings },
    { id: "audio", label: "Audio & Voice AI", icon: Mic },
    { id: "notifications", label: "Incident Alerts", icon: Bell },
    { id: "integrations", label: "Tools & Integrations", icon: Globe },
    { id: "security", label: "Security & API Keys", icon: Shield },
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16 pt-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">System Settings</h1>
          <p className="text-zinc-400 mt-1 text-sm sm:text-base">
            Configure telemetry, microphone calibration, and crisis simulation parameters.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-mono font-bold tracking-wider transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] cursor-pointer self-start sm:self-auto"
        >
          {saved ? (
            <>
              <Check size={14} className="text-white" />
              <span>SAVED TO CLOUD</span>
            </>
          ) : (
            <>
              <Save size={14} />
              <span>SAVE CHANGES</span>
            </>
          )}
        </button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Left Vertical Tab Selector */}
        <div className="w-full md:w-64 space-y-1.5 shrink-0 bg-zinc-950/60 p-2 rounded-2xl border border-white/10">
          {tabs.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl font-mono text-xs font-semibold transition-all flex items-center gap-3 cursor-pointer ${
                  active 
                    ? "bg-cyan-950/60 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.2)]" 
                    : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200 border border-transparent"
                }`}
              >
                <tab.icon size={16} className={active ? "text-cyan-400" : "text-zinc-500"} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
        
        {/* Right Tab Content */}
        <div className="flex-1 w-full min-h-[460px] relative">
          <AnimatePresence mode="wait">
            {/* General Tab */}
            {activeTab === "general" && (
              <motion.div 
                key="gen" 
                initial={{ opacity: 0, y: 12 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0 }} 
                className="bg-zinc-950/70 p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl space-y-6"
              >
                <div className="border-b border-white/10 pb-4">
                  <h3 className="text-lg font-bold text-white tracking-tight">Engineer Profile Details</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">Used across AI simulation transcripts and team review reports.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase mb-2">First Name</label>
                    <input 
                      type="text" 
                      defaultValue="Alex" 
                      className="w-full bg-zinc-900/90 border border-white/15 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none transition-colors" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase mb-2">Last Name</label>
                    <input 
                      type="text" 
                      defaultValue="Dev" 
                      className="w-full bg-zinc-900/90 border border-white/15 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none transition-colors" 
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-mono text-zinc-400 uppercase mb-2">Engineering Title</label>
                    <input 
                      type="text" 
                      defaultValue="Lead Systems Architect & Incident Commander" 
                      className="w-full bg-zinc-900/90 border border-white/15 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none transition-colors" 
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-mono text-zinc-400 uppercase mb-2">Work Email</label>
                    <input 
                      type="email" 
                      defaultValue="alex.dev@luminar.tech" 
                      className="w-full bg-zinc-900/90 border border-white/15 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none transition-colors" 
                    />
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Audio & Voice Tab */}
            {activeTab === "audio" && (
              <motion.div 
                key="aud" 
                initial={{ opacity: 0, y: 12 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0 }} 
                className="bg-zinc-950/70 p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl space-y-6"
              >
                <div className="border-b border-white/10 pb-4">
                  <h3 className="text-lg font-bold text-white tracking-tight">Audio & Neural Voice Calibration</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">Configure live voice input for real-time AI roleplay conversations.</p>
                </div>

                <div className="p-6 bg-zinc-900/80 rounded-2xl border border-cyan-500/30 text-center space-y-4">
                  <Mic size={40} className="mx-auto text-cyan-400 animate-pulse" />
                  <div>
                    <div className="text-white font-bold text-sm">Input Stream: "Default High-Definition Array"</div>
                    <div className="text-xs font-mono text-emerald-400 mt-1">LATENCY: 12ms // NOISE GATE: ACTIVE</div>
                  </div>

                  <div className="flex justify-center items-end gap-1.5 h-12 py-2">
                    {[35, 65, 45, 85, 100, 75, 55, 90, 60, 40, 70, 95, 50].map((h, i) => (
                      <motion.div 
                        key={i} 
                        animate={{ height: [`${h * 0.3}%`, `${h}%`, `${h * 0.4}%`] }} 
                        transition={{ repeat: Infinity, duration: 0.8 + (i % 3) * 0.2, ease: "easeInOut" }} 
                        className="w-1.5 bg-gradient-to-t from-cyan-500 to-blue-400 rounded-full" 
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <label className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-900/50 border border-white/10 cursor-pointer">
                    <div>
                      <div className="text-xs font-bold text-white">Adaptive Noise Suppression</div>
                      <div className="text-[11px] text-zinc-400">Filters keyboard clatter and office background noise</div>
                    </div>
                    <input type="checkbox" defaultChecked className="accent-cyan-500 w-4 h-4 cursor-pointer" />
                  </label>
                  <label className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-900/50 border border-white/10 cursor-pointer">
                    <div>
                      <div className="text-xs font-bold text-white">Sub-vocal Speech Synthesis Feedback</div>
                      <div className="text-[11px] text-zinc-400">Hear AI persona vocal cadence in real-time</div>
                    </div>
                    <input type="checkbox" defaultChecked className="accent-cyan-500 w-4 h-4 cursor-pointer" />
                  </label>
                </div>
              </motion.div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <motion.div 
                key="notif" 
                initial={{ opacity: 0, y: 12 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0 }} 
                className="bg-zinc-950/70 p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl space-y-6"
              >
                <div className="border-b border-white/10 pb-4">
                  <h3 className="text-lg font-bold text-white tracking-tight">Incident Simulation Alerts</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">Choose how and when Luminar sends mock emergency drills.</p>
                </div>

                <div className="space-y-3">
                  {[
                    { title: "Surprise Incident Drills", desc: "Receive simulated P0 emergency calls during practice windows.", def: true },
                    { title: "Weekly Tactician Scorecard", desc: "Summary of de-escalation ratings and communication progress.", def: true },
                    { title: "Postmortem Peer Review Alerts", desc: "Notifies when team members evaluate your negotiation transcript.", def: false },
                    { title: "Browser Audio Pager Beep", desc: "Plays cybernetic HUD alert tone when scenario timer starts.", def: true },
                  ].map((n, i) => (
                    <label key={i} className="flex items-center justify-between p-4 rounded-xl bg-zinc-900/50 border border-white/10 cursor-pointer hover:border-cyan-500/30 transition-colors">
                      <div>
                        <div className="text-xs font-bold text-white">{n.title}</div>
                        <div className="text-[11px] text-zinc-400 mt-0.5">{n.desc}</div>
                      </div>
                      <input type="checkbox" defaultChecked={n.def} className="accent-cyan-500 w-4 h-4 cursor-pointer" />
                    </label>
                  ))}
                </div>
              </motion.div>
            )}
            
            {/* Integrations Tab */}
            {activeTab === "integrations" && (
              <motion.div 
                key="int" 
                initial={{ opacity: 0, y: 12 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0 }} 
                className="bg-zinc-950/70 p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl space-y-6"
              >
                <div className="border-b border-white/10 pb-4">
                  <h3 className="text-lg font-bold text-white tracking-tight">Connected DevOps & Tooling</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">Integrate realistic telemetry, incident channels, and ticketing.</p>
                </div>

                <div className="space-y-3.5">
                  {[
                    { name: "Slack", status: "Connected", desc: "Simulate war room channels and bot alerts in #incident-response.", color: "text-emerald-400" },
                    { name: "GitHub", status: "Connected", desc: "Pulls recent PR diffs for realistic code review pushback drills.", color: "text-purple-400" },
                    { name: "Jira / Linear", status: "Connect", desc: "Link scenario outcomes and action items to real backlog tickets.", color: "text-blue-400" },
                    { name: "PagerDuty", status: "Connect", desc: "Replicate realistic on-call alert escalation chains.", color: "text-rose-400" },
                  ].map((app, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10 flex items-center justify-between">
                      <div className="flex gap-3.5 items-center">
                        <div className={`w-10 h-10 rounded-xl bg-zinc-950 border border-white/10 flex items-center justify-center font-black text-base ${app.color}`}>
                          {app.name[0]}
                        </div>
                        <div>
                          <div className="font-bold text-white text-xs sm:text-sm">{app.name}</div>
                          <div className="text-[11px] text-zinc-400 mt-0.5">{app.desc}</div>
                        </div>
                      </div>
                      <button className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold border transition-all cursor-pointer ${
                        app.status === 'Connected' 
                          ? 'bg-emerald-950/50 text-emerald-300 border-emerald-500/40' 
                          : 'bg-zinc-800 text-zinc-300 border-white/10 hover:border-cyan-500/40 hover:text-white'
                      }`}>
                        {app.status}
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <motion.div 
                key="sec" 
                initial={{ opacity: 0, y: 12 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0 }} 
                className="bg-zinc-950/70 p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl space-y-6"
              >
                <div className="border-b border-white/10 pb-4">
                  <h3 className="text-lg font-bold text-white tracking-tight">Security & Encryption</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">Manage session tokens, zero-knowledge keys, and AI sandbox isolation.</p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-mono text-cyan-300 font-bold">ACTIVE API TOKEN</div>
                      <div className="text-[11px] font-mono text-zinc-400 mt-0.5">lum_live_9842a******************3f</div>
                    </div>
                    <button className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/15 text-xs font-mono text-zinc-300 hover:text-white">
                      ROLL TOKEN
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-900/50 border border-white/10 space-y-2">
                    <div className="text-xs font-bold text-white">Local Simulation Privacy Shield</div>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      All roleplay audio and transcripts are encrypted end-to-end. Training on proprietary code is disabled by default.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
