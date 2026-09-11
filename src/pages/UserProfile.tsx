import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Award, 
  TrendingUp, 
  Clock, 
  Zap, 
  Settings, 
  Activity, 
  Cpu, 
  CheckCircle2, 
  Sparkles, 
  ExternalLink 
} from "lucide-react";

export const UserProfile: React.FC = () => {
  const competencies = [
    { name: "Incident De-escalation", score: 98, level: "Elite", color: "from-cyan-400 to-blue-500" },
    { name: "Scope Creep Pushback", score: 94, level: "Advanced", color: "from-purple-400 to-indigo-500" },
    { name: "Technical Debt Defense", score: 91, level: "Advanced", color: "from-emerald-400 to-teal-500" },
    { name: "Cross-functional Alignment", score: 89, level: "Proficient", color: "from-amber-400 to-orange-500" },
    { name: "Blameless Postmortems", score: 96, level: "Elite", color: "from-rose-400 to-pink-500" },
  ];

  const badges = [
    { title: "Zero-Downtime Veteran", desc: "Resolved 20+ live P0 incidents without escalation", icon: "🛡️" },
    { title: "Executive Persuader", desc: "Successfully defended 4 architectural refactoring sprints", icon: "💎" },
    { title: "Rollback Speedster", desc: "Average mitigation reaction time under 3 minutes", icon: "⚡" },
    { title: "Anti-Pattern Hunter", desc: "Identified and avoided 100+ communication pitfalls", icon: "🎯" },
  ];

  const recentDrills = [
    { title: "Database Migration Failure", role: "CTO Persona", score: 94, date: "Yesterday" },
    { title: "Scope Creep on Checkout Flow", role: "VP Product Persona", score: 92, date: "3 days ago" },
    { title: "Microservice Network Partition", role: "Principal SRE Persona", score: 96, date: "1 week ago" },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16 pt-2">
      {/* Profile Header Card */}
      <div className="relative rounded-3xl bg-zinc-950/80 border border-cyan-500/30 p-6 sm:p-8 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(6,182,212,0.15)]">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-500/15 via-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8">
          {/* Avatar with Status Beacon */}
          <div className="relative shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-cyan-400/60 shadow-[0_0_25px_rgba(56,189,248,0.35)] p-1 bg-zinc-900">
              <img
                src="https://i.pravatar.cc/150?img=11"
                alt="Alex Dev"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 border-2 border-zinc-950 shadow-[0_0_10px_#34d399] animate-pulse" />
          </div>

          {/* User Details */}
          <div className="flex-1 text-center md:text-left space-y-3">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Alex Dev</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-semibold">
                LEAD ARCHITECT
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs font-mono font-semibold flex items-center gap-1">
                <ShieldCheck size={12} /> CLEARANCE: L4
              </span>
            </div>

            <p className="text-sm text-zinc-400 leading-relaxed max-w-xl">
              Specialist in high-stress technical communication, crisis command, and cross-functional engineering alignment.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs font-mono text-zinc-500 pt-1">
              <span className="flex items-center gap-1 text-zinc-300">
                <Cpu size={14} className="text-cyan-400" /> ID: USR-9842-AX
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 size={14} /> AUTHENTICATED
              </span>
              <span>•</span>
              <span className="text-zinc-400">ORGANIZATION: LUMINAR CORE</span>
            </div>
          </div>

          {/* Action Button */}
          <div className="shrink-0 flex sm:flex-col gap-2.5 w-full sm:w-auto">
            <Link
              to="/app/settings"
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-xs font-mono text-zinc-300 hover:text-white border border-white/10 hover:border-cyan-500/40 transition-all shadow-md"
            >
              <Settings size={14} />
              <span>EDIT PREFERENCES</span>
            </Link>
            <Link
              to="/app/roleplay"
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-mono font-bold tracking-wider transition-all shadow-[0_0_15px_rgba(6,182,212,0.35)]"
            >
              <Sparkles size={14} />
              <span>START DRILL</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "TACTICAL QUOTIENT", val: "94 / 100", sub: "+4 this quarter", icon: TrendingUp, color: "text-cyan-400" },
          { label: "SCENARIOS MASTERED", val: "48 / 50", sub: "96% completion", icon: Award, color: "text-purple-400" },
          { label: "AVG RESOLUTION TIME", val: "4.2 min", sub: "35% faster than baseline", icon: Clock, color: "text-emerald-400" },
          { label: "AI SIMULATION WIN RATE", val: "96.8%", sub: "Top 1% across org", icon: Zap, color: "text-amber-400" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="p-5 rounded-2xl bg-zinc-950/70 border border-white/10 flex flex-col justify-between space-y-2 shadow-lg hover:border-cyan-500/30 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-semibold tracking-wider text-zinc-400">{stat.label}</span>
              <stat.icon size={16} className={stat.color} />
            </div>
            <div className="text-xl sm:text-2xl font-black text-white tracking-tight">{stat.val}</div>
            <div className="text-[11px] font-mono text-zinc-500">{stat.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* Tactical Competencies & Recent History */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Competency Matrix */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 sm:p-7 rounded-2xl bg-zinc-950/70 border border-white/10 shadow-lg space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Activity size={18} className="text-cyan-400" />
                <h3 className="font-bold text-white text-base tracking-tight">Tactical Competency Radar</h3>
              </div>
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">AI EVALUATED</span>
            </div>

            <div className="space-y-4">
              {competencies.map((comp, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-zinc-200">{comp.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-zinc-400">{comp.level}</span>
                      <span className="font-mono font-bold text-cyan-300">{comp.score}%</span>
                    </div>
                  </div>
                  <div className="w-full h-2 rounded-full bg-zinc-900 border border-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${comp.score}%` }}
                      transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                      className={`h-full bg-gradient-to-r ${comp.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Badges & Commendations */}
          <div className="p-6 sm:p-7 rounded-2xl bg-zinc-950/70 border border-white/10 shadow-lg space-y-4">
            <div className="flex items-center gap-2 border-b border-white/10 pb-4">
              <Award size={18} className="text-purple-400" />
              <h3 className="font-bold text-white text-base tracking-tight">Badges & Commendations</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {badges.map((b, i) => (
                <div key={i} className="p-4 rounded-xl bg-zinc-900/50 border border-white/5 flex items-start gap-3.5 hover:border-purple-500/30 transition-colors">
                  <span className="text-2xl">{b.icon}</span>
                  <div>
                    <h4 className="text-xs font-bold text-white tracking-tight">{b.title}</h4>
                    <p className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Recent Drills & Quick Actions */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-950/70 border border-white/10 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-bold text-white text-sm">Recent Roleplay Drills</h3>
              <Link to="/app/review" className="text-[10px] font-mono text-cyan-400 hover:underline flex items-center gap-1">
                VIEW ALL <ExternalLink size={10} />
              </Link>
            </div>

            <div className="space-y-3">
              {recentDrills.map((drill, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-zinc-900/60 border border-white/5 flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-semibold text-white">{drill.title}</h5>
                    <p className="text-[10px] text-zinc-400 mt-0.5">{drill.role} • {drill.date}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-black text-emerald-400 font-mono">{drill.score}</span>
                    <div className="text-[9px] font-mono text-zinc-500">SCORE</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Launchpad */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-950/40 via-zinc-950 to-purple-950/30 border border-cyan-500/30 shadow-lg space-y-4">
            <h4 className="font-bold text-white text-sm">Ready for your daily practice?</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Test your responses against adaptive AI counterparts in real-time crisis scenarios.
            </p>
            <Link
              to="/app/sandbox"
              className="w-full py-2.5 px-4 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <span>EXPLORE SCENARIOS</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
