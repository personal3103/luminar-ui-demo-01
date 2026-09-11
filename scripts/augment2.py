import os
base_dir = r'c:\Users\trand\Downloads\Lumina\resrouces\client\src\pages'

sandbox_tsx = '''import { motion } from "framer-motion";
import { AlertTriangle, Terminal, Cpu } from "lucide-react";

export default function Sandbox() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 pt-4">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-status-danger/10 border border-status-danger/30 flex items-center justify-center">
          <AlertTriangle className="text-status-danger animate-pulse" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Diagnostic Sandbox</h1>
          <p className="text-text-secondary">Simulate high-pressure engineering scenarios.</p>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ delay: 0.1 }}
        className="bg-surface border border-status-danger/40 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(244,63,94,0.1)] relative"
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop')] bg-cover opacity-5 mix-blend-screen" />
        
        <div className="bg-card-active px-6 py-4 border-b border-border flex justify-between items-center relative z-10">
           <div className="flex items-center gap-3">
             <Terminal size={18} className="text-status-danger" />
             <span className="text-sm font-mono text-status-danger font-bold tracking-wider">INCIDENT P0 - DATABASE UNREACHABLE</span>
           </div>
           <div className="flex items-center gap-2 bg-status-danger/10 px-3 py-1 rounded-md border border-status-danger/20">
             <span className="w-2 h-2 rounded-full bg-status-danger animate-ping" />
             <span className="text-lg font-mono text-white font-bold tracking-widest">01:29</span>
           </div>
        </div>

        <div className="p-8 space-y-8 relative z-10">
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="bg-background/80 backdrop-blur-sm p-5 rounded-xl border border-border inline-block max-w-[85%] shadow-lg">
             <div className="flex items-center gap-2 mb-2">
               <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center"><Cpu size={12} className="text-secondary" /></div>
               <span className="text-xs text-secondary font-bold">CTO (Slack)</span>
             </div>
             <p className="text-base text-text-primary leading-relaxed">The primary replica just dropped. Users are getting 500s. Who touched the migration script? Fix this NOW!</p>
          </motion.div>

          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="mt-8">
             <div className="text-xs text-text-secondary mb-3 uppercase tracking-widest font-semibold flex items-center gap-2">
                Your Response (Voice or Text)
             </div>
             <div className="relative group">
               <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-xl opacity-20 group-hover:opacity-40 transition duration-1000 blur-md"></div>
               <textarea className="relative w-full bg-background border border-border rounded-xl p-5 text-text-primary font-mono text-sm h-40 focus:outline-none focus:border-primary/50 transition-all shadow-inner" placeholder="> Type your response here..." />
             </div>
             <div className="flex justify-end mt-6">
                <button className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-xl font-bold text-sm shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all flex items-center gap-2">
                  Submit Response
                </button>
             </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
'''
with open(os.path.join(base_dir, 'Sandbox.tsx'), 'w', encoding='utf-8') as f:
    f.write(sandbox_tsx)

roleplay_tsx = '''import { motion } from "framer-motion";
import { Mic, PhoneOff, Settings2, Activity } from "lucide-react";

export default function Roleplay() {
  return (
    <div className="h-full flex flex-col max-w-6xl mx-auto space-y-6 pb-10 pt-2">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">AI Roleplay Room</h1>
          <p className="text-sm text-text-secondary mt-1">Real-time conversational practice with AI Personas.</p>
        </div>
        <div className="flex gap-3">
           <span className="px-4 py-1.5 bg-status-warning/10 text-status-warning rounded-full text-xs font-bold border border-status-warning/30 shadow-[0_0_15px_rgba(245,158,11,0.1)]">Medium Pressure</span>
           <span className="px-4 py-1.5 bg-secondary/10 text-secondary rounded-full text-xs font-bold border border-secondary/30 shadow-[0_0_15px_rgba(14,165,233,0.1)]">Tech Lead Persona</span>
        </div>
      </motion.div>
      
      <div className="flex-1 flex gap-6 min-h-[550px]">
        {/* Chat Area */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex-1 bg-surface rounded-2xl border border-border flex flex-col overflow-hidden relative shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?q=80&w=2121&auto=format&fit=crop')] bg-cover opacity-5 mix-blend-screen" />
          
          <div className="flex-1 p-8 overflow-y-auto space-y-6 relative z-10">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-card-active border border-border flex items-center justify-center flex-shrink-0 mt-1 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" className="w-full h-full object-cover" />
              </div>
              <div className="bg-card-active p-4 rounded-2xl rounded-tl-sm border border-border shadow-md max-w-[80%]">
                <p className="text-sm text-text-primary leading-relaxed">I reviewed your PR. Why did you introduce another abstraction layer? This seems like premature optimization and it's making the codebase harder to read.</p>
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex gap-4 flex-row-reverse">
              <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center flex-shrink-0 mt-1 overflow-hidden p-1">
                 <img src="/logo.png" className="w-full h-full object-cover rounded-full" />
              </div>
              <div className="bg-primary/10 p-4 rounded-2xl rounded-tr-sm border border-primary/20 shadow-md max-w-[80%]">
                <p className="text-sm text-white leading-relaxed">The abstraction decouples the database logic so we can easily mock it in our unit tests. I can walk you through the test coverage if you have a minute.</p>
              </div>
            </motion.div>
          </div>
          
          <div className="p-5 border-t border-border bg-background/90 backdrop-blur-md relative z-20">
            <div className="flex gap-4 items-center">
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="h-14 w-14 rounded-full bg-status-danger/10 border border-status-danger/50 flex items-center justify-center text-status-danger hover:bg-status-danger hover:text-white transition-all shadow-[0_0_20px_rgba(244,63,94,0.2)]">
                 <Mic size={24} />
              </motion.button>
              <input type="text" className="flex-1 bg-surface border border-border rounded-full px-6 py-4 text-sm text-text-primary focus:outline-none focus:border-primary/50 transition-all shadow-inner" placeholder="Hold Mic to speak, or type your reply..." />
              <motion.button whileHover={{ scale: 1.1 }} className="h-14 w-14 rounded-full bg-card-active border border-border flex items-center justify-center text-text-secondary hover:bg-status-danger hover:border-status-danger hover:text-white transition-all">
                 <PhoneOff size={20} />
              </motion.button>
            </div>
          </div>
        </motion.div>
        
        {/* Real-time metrics */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-80 space-y-6">
           <div className="bg-surface p-6 rounded-2xl border border-border shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10"><Activity size={64} /></div>
             <h3 className="text-xs font-mono text-text-secondary mb-6 tracking-widest flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-status-success animate-pulse" /> LIVE TELEMETRY
             </h3>
             <div className="space-y-6">
                <div>
                   <div className="flex justify-between text-xs mb-2 font-medium">
                     <span className="text-text-secondary">Pace (WPM)</span>
                     <span className="text-status-success">124 (Optimal)</span>
                   </div>
                   <div className="h-2 bg-background rounded-full overflow-hidden border border-border"><motion.div initial={{ width: 0 }} animate={{ width: '60%' }} transition={{ duration: 1, delay: 0.5 }} className="h-full bg-status-success rounded-full shadow-[0_0_10px_#10B981]"></motion.div></div>
                </div>
                <div>
                   <div className="flex justify-between text-xs mb-2 font-medium">
                     <span className="text-text-secondary">Tone Detection</span>
                     <span className="text-secondary">Assertive</span>
                   </div>
                   <div className="h-2 bg-background rounded-full overflow-hidden border border-border"><motion.div initial={{ width: 0 }} animate={{ width: '80%' }} transition={{ duration: 1, delay: 0.7 }} className="h-full bg-secondary rounded-full shadow-[0_0_10px_#0EA5E9]"></motion.div></div>
                </div>
                <div>
                   <div className="flex justify-between text-xs mb-2 font-medium">
                     <span className="text-text-secondary">Clarity Score</span>
                     <span className="text-primary">92/100</span>
                   </div>
                   <div className="h-2 bg-background rounded-full overflow-hidden border border-border"><motion.div initial={{ width: 0 }} animate={{ width: '92%' }} transition={{ duration: 1, delay: 0.9 }} className="h-full bg-primary rounded-full shadow-[0_0_10px_#8B5CF6]"></motion.div></div>
                </div>
             </div>
           </div>
           
           <div className="bg-surface p-6 rounded-2xl border border-border shadow-xl">
              <h3 className="text-xs font-mono text-text-secondary mb-4 tracking-widest">SUGGESTED TACTICS</h3>
              <ul className="space-y-3">
                 <li className="text-sm text-text-primary bg-card-active p-3 rounded-lg border border-border border-l-2 border-l-primary hover:bg-border transition-colors cursor-pointer">Acknowledge their concern first</li>
                 <li className="text-sm text-text-primary bg-card-active p-3 rounded-lg border border-border border-l-2 border-l-secondary hover:bg-border transition-colors cursor-pointer">Pivot to the testing benefits</li>
              </ul>
           </div>
        </motion.div>
      </div>
    </div>
  );
}
'''
with open(os.path.join(base_dir, 'Roleplay.tsx'), 'w', encoding='utf-8') as f:
    f.write(roleplay_tsx)

review_tsx = '''import { motion } from "framer-motion";
import { ArrowRight, BarChart3 } from "lucide-react";

export default function Review() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20 pt-4">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <h1 className="text-4xl font-bold text-white tracking-tight">Post-Mortem Review</h1>
        <p className="text-text-secondary mt-2">Analysis of your latest communication simulation.</p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="md:col-span-1 bg-surface p-6 rounded-3xl border border-border shadow-xl flex flex-col justify-center relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-status-success/5 rounded-bl-[100px]" />
           <div className="text-center space-y-6 relative z-10">
              <div>
                <div className="text-sm text-text-secondary font-medium uppercase tracking-wider mb-2">Original Score</div>
                <div className="text-4xl font-bold text-text-secondary line-through decoration-status-danger/50">42</div>
                <div className="text-xs text-status-danger mt-1 font-semibold">Defensive</div>
              </div>
              <div className="flex justify-center text-border"><ArrowRight size={24} className="rotate-90 md:rotate-0" /></div>
              <div>
                <div className="text-sm text-primary font-medium uppercase tracking-wider mb-2">Refined Score</div>
                <div className="text-6xl font-extrabold text-status-success drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]">88</div>
                <div className="text-sm text-status-success mt-2 font-bold bg-status-success/10 inline-block px-3 py-1 rounded-full border border-status-success/20">Staff Architect</div>
              </div>
           </div>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="md:col-span-2 bg-surface p-8 rounded-3xl border border-border shadow-xl">
           <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><BarChart3 size={20} className="text-primary" /> Tact Diff Analysis</h3>
           <div className="space-y-6">
              <div className="p-5 bg-status-danger/5 border border-status-danger/20 rounded-2xl relative overflow-hidden group">
                 <div className="absolute left-0 top-0 bottom-0 w-1 bg-status-danger" />
                 <div className="text-xs text-status-danger font-bold mb-2 tracking-wider flex justify-between">
                   <span>YOUR ORIGINAL RESPONSE (AGGRESSIVE)</span>
                 </div>
                 <div className="text-base text-text-secondary font-mono italic">"Why did you merge this without testing? It broke the whole server."</div>
                 <div className="mt-4 text-sm text-status-danger/80">Critique: Assigns blame directly, uses absolute terms ("whole server"), escalates conflict.</div>
              </div>
              
              <div className="p-5 bg-primary/5 border border-primary/20 rounded-2xl relative overflow-hidden shadow-[0_0_20px_rgba(139,92,246,0.05)]">
                 <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
                 <div className="text-xs text-primary font-bold mb-2 tracking-wider flex justify-between">
                   <span>AI SUGGESTED REWRITE (ASSERTIVE & COLLABORATIVE)</span>
                   <span className="bg-primary/20 text-primary px-2 py-0.5 rounded text-[10px]">OPTIMAL</span>
                 </div>
                 <div className="text-base text-white font-medium">"Let's review the CI pipeline that allowed this to merge so we can add safeguards against this failure pattern."</div>
                 <div className="mt-4 text-sm text-primary/80">Why it works: Focuses on the system ("CI pipeline") rather than the person. Proposes a forward-looking solution.</div>
              </div>
           </div>
        </motion.div>
      </div>
    </div>
  );
}
'''
with open(os.path.join(base_dir, 'Review.tsx'), 'w', encoding='utf-8') as f:
    f.write(review_tsx)

b2b_tsx = '''import { motion } from "framer-motion";
import { Users, TrendingUp, AlertCircle } from "lucide-react";

export default function B2BManager() {
  const team = [
    { name: "Nguyen Van A", role: "Senior Frontend", sessions: 24, score: 82, bottleneck: "Over-apologizing", trend: "+4" },
    { name: "Tran Thi B", role: "Backend Engineer", sessions: 18, score: 65, bottleneck: "Defensive Tone", trend: "-2" },
    { name: "Le Van C", role: "DevOps Engineer", sessions: 32, score: 94, bottleneck: "None", trend: "+1" },
    { name: "Pham D", role: "Tech Lead", sessions: 12, score: 78, bottleneck: "Vague Delegation", trend: "+5" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20 pt-4">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight">Manager Hub</h1>
          <p className="text-text-secondary mt-2">Track communication bottlenecks across your engineering organization.</p>
        </div>
        <button className="bg-surface border border-border px-4 py-2 rounded-lg text-sm font-medium hover:bg-card-active transition-colors shadow-sm">
          Export Report
        </button>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
         {[
           { label: "Team Avg Score", value: "79.8", icon: TrendingUp, color: "text-status-success" },
           { label: "Active Engineers", value: "24", icon: Users, color: "text-secondary" },
           { label: "Critical Bottlenecks", value: "3", icon: AlertCircle, color: "text-status-danger" }
         ].map((stat, i) => (
           <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-surface p-6 rounded-2xl border border-border shadow-md flex items-center justify-between">
              <div>
                 <div className="text-sm text-text-secondary mb-1">{stat.label}</div>
                 <div className="text-3xl font-bold text-white">{stat.value}</div>
              </div>
              <div className={`p-4 rounded-full bg-background border border-border ${stat.color}`}>
                 <stat.icon size={24} />
              </div>
           </motion.div>
         ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-surface rounded-3xl border border-border overflow-hidden shadow-xl">
        <div className="p-6 border-b border-border bg-card-active">
          <h3 className="font-bold text-white text-lg">Engineering Roster</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
             <thead className="bg-background/50 text-text-secondary text-xs uppercase tracking-wider">
               <tr>
                 <th className="px-6 py-4 font-semibold">Engineer</th>
                 <th className="px-6 py-4 font-semibold">Total Sessions</th>
                 <th className="px-6 py-4 font-semibold">Avg Tact Score</th>
                 <th className="px-6 py-4 font-semibold">Primary Bottleneck</th>
                 <th className="px-6 py-4 font-semibold text-right">Trend</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-border text-text-primary">
               {team.map((member, i) => (
                 <motion.tr 
                   initial={{ opacity: 0, x: -20 }} 
                   animate={{ opacity: 1, x: 0 }} 
                   transition={{ delay: 0.5 + (i * 0.1) }}
                   key={member.name} 
                   className="hover:bg-card-active transition-colors group cursor-pointer"
                 >
                    <td className="px-6 py-5">
                       <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/40 to-secondary/40 border border-border overflow-hidden">
                           <img src={`https://i.pravatar.cc/150?u=${member.name}`} className="w-full h-full object-cover" />
                         </div>
                         <div>
                           <div className="font-bold text-white group-hover:text-primary transition-colors">{member.name}</div>
                           <div className="text-xs text-text-secondary">{member.role}</div>
                         </div>
                       </div>
                    </td>
                    <td className="px-6 py-5 font-mono text-text-secondary">{member.sessions}</td>
                    <td className="px-6 py-5">
                       <span className={`font-bold ${member.score >= 80 ? 'text-status-success' : member.score >= 70 ? 'text-status-warning' : 'text-status-danger'}`}>
                         {member.score}
                       </span>
                    </td>
                    <td className="px-6 py-5">
                       {member.bottleneck === 'None' ? (
                         <span className="text-text-secondary italic">None</span>
                       ) : (
                         <span className="px-3 py-1 bg-background text-text-secondary rounded-full border border-border text-xs inline-flex items-center gap-2">
                           <span className="w-1.5 h-1.5 rounded-full bg-status-warning"></span>
                           {member.bottleneck}
                         </span>
                       )}
                    </td>
                    <td className="px-6 py-5 text-right font-mono">
                       <span className={member.trend.startsWith('+') ? 'text-status-success' : 'text-status-danger'}>{member.trend}</span>
                    </td>
                 </motion.tr>
               ))}
             </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
'''
with open(os.path.join(base_dir, 'B2BManager.tsx'), 'w', encoding='utf-8') as f:
    f.write(b2b_tsx)

print("Augmented Sandbox, Roleplay, Review, B2BManager")
