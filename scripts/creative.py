import os

base_dir = r'c:\Users\trand\Downloads\Lumina\resrouces\client\src'
pages_dir = os.path.join(base_dir, 'pages')

# 1. Fix double animation in Layout and redefine App.tsx if needed
layout_path = os.path.join(base_dir, 'components', 'Layout.tsx')
with open(layout_path, 'r', encoding='utf-8') as f:
    layout = f.read()

# Fix layout outlet animation to be a simple fade, removing Y bouncing which causes layout shift double-animations
layout = layout.replace('''          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>''', '''          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>''')

with open(layout_path, 'w', encoding='utf-8') as f:
    f.write(layout)

# 2. PlanDetail (Pricing Pro) - Breaking the mold with asymmetrical split screen
plan_detail = '''import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Zap, Shield, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

export default function PlanDetail() {
  return (
    <div className="min-h-full flex flex-col md:flex-row gap-8 pb-10">
      <div className="w-full md:w-1/2 space-y-8 pr-0 md:pr-12 border-r-0 md:border-r border-border">
         <Link to="/app/pricing" className="inline-flex items-center gap-2 text-text-secondary hover:text-white transition-colors">
            <ArrowLeft size={16} /> Back to Pricing
         </Link>
         
         <div>
            <div className="inline-block px-3 py-1 bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider rounded-full mb-4 border border-primary/30">Most Popular</div>
            <h1 className="text-5xl font-extrabold text-white tracking-tight mb-4">Tech Lead (Pro)</h1>
            <p className="text-text-secondary text-lg leading-relaxed">Upgrade your communication arsenal. Get unlimited AI simulations, deep emotional telemetry, and custom scenario building for you and your direct reports.</p>
         </div>
         
         <div className="space-y-4 pt-4">
            <h3 className="font-bold text-white text-lg">What's included in Pro:</h3>
            {[
              "Unlimited AI Roleplay Sessions",
              "Advanced Emotion & Tone Telemetry",
              "B2B Manager Hub Access (Up to 5 seats)",
              "Custom Scenario Builder",
              "Exportable Post-Mortem PDFs",
              "Priority Support via Slack"
            ].map((feature, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex gap-3 items-center">
                 <CheckCircle2 size={18} className="text-primary" />
                 <span className="text-text-primary">{feature}</span>
              </motion.div>
            ))}
         </div>
      </div>
      
      <div className="w-full md:w-1/2 flex items-center justify-center">
         <div className="w-full max-w-md bg-surface p-8 rounded-3xl border border-primary/30 shadow-[0_0_50px_rgba(139,92,246,0.1)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="text-center mb-8">
               <div className="text-6xl font-black text-white">$12<span className="text-xl text-text-secondary font-medium">/mo</span></div>
               <p className="text-sm text-text-secondary mt-2">Billed annually ($144/year)</p>
            </div>
            
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
               <div>
                  <label className="block text-xs font-semibold text-text-secondary uppercase mb-2">Card Information</label>
                  <div className="relative">
                     <CreditCard size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
                     <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-background border border-border rounded-xl pl-12 pr-4 py-3 text-white focus:border-primary/50 focus:outline-none" />
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="MM/YY" className="bg-background border border-border rounded-xl px-4 py-3 text-white focus:border-primary/50 focus:outline-none" />
                  <input type="text" placeholder="CVC" className="bg-background border border-border rounded-xl px-4 py-3 text-white focus:border-primary/50 focus:outline-none" />
               </div>
               
               <div className="pt-4">
                  <button className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl hover:opacity-90 shadow-lg flex justify-center items-center gap-2 transition-transform active:scale-95">
                     <Zap size={18} /> Confirm Upgrade
                  </button>
               </div>
               
               <p className="text-xs text-text-secondary text-center flex items-center justify-center gap-1 mt-4">
                 <Shield size={12} /> Secure 256-bit SSL encryption
               </p>
            </form>
         </div>
      </div>
    </div>
  );
}
'''
with open(os.path.join(pages_dir, 'PlanDetail.tsx'), 'w', encoding='utf-8') as f:
    f.write(plan_detail)

# 3. Enhance Settings with deep state/UI
settings_tsx = '''import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, Bell, Mic, Globe, CheckCircle2, ShieldAlert } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("audio");
  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "audio", label: "Audio & Voice", icon: Mic },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "integrations", label: "Integrations", icon: Globe },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20 pt-4">
      <div>
        <h1 className="text-4xl font-bold text-white tracking-tight">Preferences</h1>
        <p className="text-text-secondary mt-2">Tailor the Luminar environment to your workflow.</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-10 mt-8 items-start">
         <div className="w-full md:w-64 space-y-2 sticky top-0">
            {tabs.map(tab => {
              const active = activeTab === tab.id;
              return (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-4 py-3 font-medium rounded-xl transition-all flex items-center gap-3 ${active ? 'bg-card-active text-primary border border-primary/20 shadow-md' : 'text-text-secondary hover:bg-surface hover:text-white'}`}
                >
                   <tab.icon size={18} className={active ? "text-primary" : "text-text-secondary"} /> {tab.label}
                </button>
              );
            })}
         </div>
         
         <div className="flex-1 w-full min-h-[500px] relative">
            <AnimatePresence mode="wait">
               {activeTab === "general" && (
                 <motion.div key="gen" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-surface p-8 rounded-3xl border border-border shadow-xl space-y-6">
                    <h3 className="text-xl font-bold text-white border-b border-border pb-4">Profile Information</h3>
                    <div className="grid grid-cols-2 gap-6">
                       <div className="col-span-2 md:col-span-1">
                         <label className="block text-xs font-semibold text-text-secondary uppercase mb-2">First Name</label>
                         <input type="text" defaultValue="Alex" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-white" />
                       </div>
                       <div className="col-span-2 md:col-span-1">
                         <label className="block text-xs font-semibold text-text-secondary uppercase mb-2">Last Name</label>
                         <input type="text" defaultValue="Developer" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-white" />
                       </div>
                    </div>
                 </motion.div>
               )}
               
               {activeTab === "audio" && (
                 <motion.div key="aud" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                    <div className="bg-surface p-8 rounded-3xl border border-border shadow-xl">
                       <h3 className="text-xl font-bold text-white mb-6">Microphone Calibration</h3>
                       <div className="p-6 bg-background rounded-2xl border border-primary/30 relative overflow-hidden text-center">
                          <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                          <Mic size={48} className="mx-auto text-primary mb-4 opacity-80" />
                          <div className="text-white font-bold mb-2">Testing Input: "MacBook Pro Microphone"</div>
                          <div className="flex justify-center gap-1 mt-4 h-6 items-end">
                             {[30, 60, 40, 80, 100, 70, 50, 90, 40, 20].map((h, i) => (
                               <motion.div key={i} animate={{ height: `${h}%` }} transition={{ repeat: Infinity, repeatType: "mirror", duration: Math.random() * 0.5 + 0.3 }} className="w-2 bg-primary rounded-t-sm" />
                             ))}
                          </div>
                       </div>
                    </div>
                 </motion.div>
               )}
               
               {activeTab === "integrations" && (
                 <motion.div key="int" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
                    {[
                      { name: "Slack", status: "Connected", desc: "Send summary reports to #eng-managers.", color: "text-secondary" },
                      { name: "Jira", status: "Connect", desc: "Link incidents directly to JQL issues.", color: "text-primary" },
                      { name: "GitHub", status: "Connect", desc: "Pull PR context into AI scenarios.", color: "text-white" },
                    ].map((app, i) => (
                      <div key={i} className="bg-surface p-6 rounded-2xl border border-border flex items-center justify-between">
                         <div className="flex gap-4 items-center">
                           <div className={`w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center font-bold text-xl ${app.color}`}>{app.name[0]}</div>
                           <div>
                              <div className="font-bold text-white">{app.name}</div>
                              <div className="text-xs text-text-secondary mt-1">{app.desc}</div>
                           </div>
                         </div>
                         <button className={`px-4 py-2 rounded-lg text-sm font-bold border ${app.status === 'Connected' ? 'bg-status-success/10 text-status-success border-status-success/30' : 'bg-card-active text-white border-border hover:bg-border'}`}>
                           {app.status}
                         </button>
                      </div>
                    ))}
                 </motion.div>
               )}
            </AnimatePresence>
         </div>
      </div>
    </div>
  );
}
'''
with open(os.path.join(pages_dir, 'Settings.tsx'), 'w', encoding='utf-8') as f:
    f.write(settings_tsx)

# 4. Review Detail (Deep Post-Mortem Analytics)
review_detail_tsx = '''import { motion } from "framer-motion";
import { ArrowLeft, PlayCircle, BarChart3, Clock, AlertTriangle } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export default function ReviewDetail() {
  const { id } = useParams(); // mock id
  
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20 pt-4">
      <Link to="/app/review" className="inline-flex items-center gap-2 text-text-secondary hover:text-white transition-colors">
        <ArrowLeft size={16} /> Back to Log
      </Link>
      
      <div className="bg-surface p-8 rounded-3xl border border-border shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
         
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10 border-b border-border pb-8">
            <div>
               <div className="flex items-center gap-3 mb-3">
                 <span className="px-3 py-1 bg-background border border-border rounded-full text-xs font-mono text-text-secondary flex items-center gap-2"><Clock size={12}/> Duration: 14m 22s</span>
                 <span className="px-3 py-1 bg-status-danger/10 border border-status-danger/30 rounded-full text-xs font-mono text-status-danger flex items-center gap-2"><AlertTriangle size={12}/> Conflict: High</span>
               </div>
               <h1 className="text-3xl font-extrabold text-white">Post-Mortem: DB Migration Incident</h1>
            </div>
            <div className="text-right bg-background p-4 rounded-2xl border border-primary/20">
               <div className="text-sm text-text-secondary uppercase tracking-widest font-bold">Tact Score</div>
               <div className="text-5xl font-black text-primary">68<span className="text-2xl text-text-secondary">/100</span></div>
            </div>
         </div>
         
         <div className="pt-8 relative z-10">
            <h3 className="text-lg font-bold text-white mb-6">Timeline Analysis</h3>
            <div className="space-y-8 relative">
               {/* Vertical line */}
               <div className="absolute left-6 top-0 bottom-0 w-px bg-border -z-10" />
               
               {[
                 { time: "00:45", speaker: "AI (CTO)", type: "aggression", text: "Why wasn't this tested on staging? The board is furious.", critique: null },
                 { time: "01:12", speaker: "You", type: "defensive", text: "I told the junior dev to test it, but he skipped it. It's not my fault he ignored the docs.", critique: "Thrown under the bus. Defensive. Escalates tension." },
                 { time: "02:30", speaker: "AI (CTO)", type: "anger", text: "I don't care whose fault it is, I want it fixed. Are you managing your team or not?", critique: null },
                 { time: "02:55", speaker: "You", type: "constructive", text: "You're right, fixing it is the priority. I am rolling back the transaction now. ETA is 5 minutes. We will conduct a blameless post-mortem after.", critique: "Excellent pivot. Took ownership of the solution, provided clear ETA." }
               ].map((turn, i) => (
                 <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex gap-6">
                    <div className="w-12 pt-2 text-xs font-mono text-text-secondary text-right">{turn.time}</div>
                    <div className="flex-1 space-y-3">
                       <div className={`p-5 rounded-2xl border shadow-md ${turn.speaker === 'You' ? 'bg-primary/5 border-primary/20' : 'bg-background border-border'}`}>
                          <div className="text-xs font-bold uppercase mb-2 opacity-70">{turn.speaker}</div>
                          <div className="text-white text-base leading-relaxed">"{turn.text}"</div>
                       </div>
                       {turn.critique && (
                         <div className={`ml-8 p-3 rounded-xl border text-sm flex gap-3 ${turn.type === 'defensive' ? 'bg-status-danger/10 border-status-danger/30 text-status-danger' : 'bg-status-success/10 border-status-success/30 text-status-success'}`}>
                            <BarChart3 size={16} className="mt-0.5 shrink-0" />
                            <div><span className="font-bold">AI Analysis:</span> {turn.critique}</div>
                         </div>
                       )}
                    </div>
                 </motion.div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}
'''
with open(os.path.join(pages_dir, 'ReviewDetail.tsx'), 'w', encoding='utf-8') as f:
    f.write(review_detail_tsx)


# 5. Overhaul Dashboard to Bento Box layout & remove aggressive initial bouncing
dashboard_tsx = '''import { motion } from "framer-motion";
import { Activity, Server, Users, AlertCircle, ArrowUpRight, Zap, Target } from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20">
      
      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
         
         {/* Hero Bento */}
         <div className="md:col-span-4 lg:col-span-4 row-span-2 bg-surface rounded-[2rem] p-8 border border-border relative overflow-hidden flex flex-col justify-between min-h-[360px] shadow-2xl group">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop')] bg-cover mix-blend-overlay opacity-10 group-hover:opacity-20 transition-opacity duration-700" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent" />
            
            <div className="relative z-10 flex items-start justify-between">
               <div className="px-4 py-1.5 bg-primary/20 border border-primary/30 rounded-full text-primary text-xs font-bold uppercase flex items-center gap-2 w-max">
                 <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Telemetry Active
               </div>
               <Link to="/app/sandbox" className="p-3 bg-white/5 hover:bg-white/10 rounded-full backdrop-blur-md border border-white/10 text-white transition-all"><ArrowUpRight size={20}/></Link>
            </div>
            
            <div className="relative z-10 mt-12">
               <h1 className="text-5xl font-black text-white tracking-tight mb-4">Command Center</h1>
               <p className="text-text-secondary max-w-md text-lg">Your communication metrics are stabilizing. Empathy scores are up 12% across your team this week.</p>
               <div className="mt-8 flex gap-4">
                  <Link to="/app/roleplay" className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]">Quick Session</Link>
                  <Link to="/app/review" className="px-6 py-3 bg-card-active border border-border text-white font-bold rounded-xl hover:bg-surface transition-colors">View Logs</Link>
               </div>
            </div>
         </div>

         {/* Score Bento */}
         <div className="md:col-span-2 lg:col-span-2 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-[2rem] p-8 border border-primary/20 flex flex-col justify-center items-center text-center relative overflow-hidden shadow-xl hover:border-primary/40 transition-colors">
            <div className="absolute w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(139,92,246,0.3)_360deg)] animate-[spin_4s_linear_infinite] opacity-50" />
            <div className="absolute inset-1 bg-surface rounded-[calc(2rem-4px)] z-0" />
            
            <div className="relative z-10">
               <Activity size={32} className="text-primary mx-auto mb-4" />
               <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-text-secondary drop-shadow-lg">86</div>
               <div className="text-sm font-bold uppercase tracking-widest text-text-secondary mt-2">Overall Tact</div>
               <div className="mt-4 px-3 py-1 bg-status-success/10 text-status-success text-xs font-bold rounded-full border border-status-success/20 inline-block">Top 15% Leader</div>
            </div>
         </div>

         {/* Stats Mini Bentos */}
         <div className="md:col-span-2 lg:col-span-2 bg-surface rounded-[2rem] p-6 border border-border flex flex-col justify-between shadow-lg">
            <div className="text-text-secondary flex justify-between items-center"><Target size={20} /> <span className="text-xs font-mono bg-background px-2 py-1 rounded">Past 30d</span></div>
            <div className="mt-6">
               <div className="text-4xl font-bold text-white">24</div>
               <div className="text-sm text-text-secondary mt-1">Simulations Run</div>
            </div>
         </div>
         
         <div className="md:col-span-2 lg:col-span-2 bg-surface rounded-[2rem] p-6 border border-border flex flex-col justify-between shadow-lg">
            <div className="text-status-danger flex justify-between items-center"><AlertCircle size={20} /> <span className="text-xs font-mono bg-background px-2 py-1 rounded text-text-secondary">Needs focus</span></div>
            <div className="mt-6">
               <div className="text-4xl font-bold text-white">3</div>
               <div className="text-sm text-text-secondary mt-1">Defensive Outbursts</div>
            </div>
         </div>

      </div>
    </div>
  );
}
'''
with open(os.path.join(pages_dir, 'Dashboard.tsx'), 'w', encoding='utf-8') as f:
    f.write(dashboard_tsx)


# 6. Update App.tsx to route to the new pages
app_path = os.path.join(base_dir, 'App.tsx')
with open(app_path, 'r', encoding='utf-8') as f:
    app = f.read()

app = app.replace("import SettingsPage from './pages/Settings';", "import SettingsPage from './pages/Settings';\nimport PlanDetail from './pages/PlanDetail';\nimport ReviewDetail from './pages/ReviewDetail';")
app = app.replace('<Route path="pricing" element={<Pricing />} />', '<Route path="pricing" element={<Pricing />} />\n          <Route path="pricing/pro" element={<PlanDetail />} />')
app = app.replace('<Route path="review" element={<Review />} />', '<Route path="review" element={<Review />} />\n          <Route path="review/:id" element={<ReviewDetail />} />')

with open(app_path, 'w', encoding='utf-8') as f:
    f.write(app)

# 7. Update Pricing to link to Pro detail, and Review to link to detail
pricing_path = os.path.join(pages_dir, 'Pricing.tsx')
with open(pricing_path, 'r', encoding='utf-8') as f:
    pricing = f.read()
pricing = pricing.replace('<button className="mt-10 w-full py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:opacity-90 font-bold shadow-[0_0_20px_rgba(139,92,246,0.4)]">Upgrade to Pro</button>', '<Link to="/app/pricing/pro" className="mt-10 w-full py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:opacity-90 font-bold shadow-[0_0_20px_rgba(139,92,246,0.4)] inline-block text-center">Upgrade to Pro</Link>')
with open(pricing_path, 'w', encoding='utf-8') as f:
    f.write(pricing)

print("Creative update complete: Bento grid, Double animation fixed, nested detail pages added.")
