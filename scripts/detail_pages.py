import os

base_dir = r'c:\Users\trand\Downloads\Lumina\resrouces\client\src'
pages_dir = os.path.join(base_dir, 'pages')

# 1. Flashcard Detail Page
flashcard_detail_tsx = '''import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Repeat, ShieldAlert, CheckCircle2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export default function FlashcardDetail() {
  const { id } = useParams();
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20 pt-4">
      <Link to="/app/toolkit" className="inline-flex items-center gap-2 text-text-secondary hover:text-white transition-colors">
        <ArrowLeft size={16} /> Back to Toolkit
      </Link>
      
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight">Pushback on Scope Creep</h1>
          <p className="text-text-secondary mt-2">Master the art of saying "no" to product managers without causing friction.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8">
        {/* 3D Flip Card */}
        <div className="perspective-1000 w-full h-[500px]" onClick={() => setIsFlipped(!isFlipped)}>
          <motion.div 
            animate={{ rotateY: isFlipped ? 180 : 0 }} 
            transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
            className="w-full h-full relative preserve-3d cursor-pointer"
          >
            {/* Front */}
            <div className="absolute inset-0 backface-hidden bg-surface rounded-3xl border border-border shadow-2xl overflow-hidden flex flex-col">
               <div className="h-48 bg-[url('https://images.unsplash.com/photo-1507925922837-326f12a52b34?q=80&w=600&auto=format&fit=crop')] bg-cover mix-blend-luminosity opacity-40"></div>
               <div className="p-8 flex-1 flex flex-col justify-center text-center space-y-4">
                  <h2 className="text-2xl font-bold text-white">The Situation</h2>
                  <p className="text-text-secondary">PM asks to add "just one small button" 2 days before the sprint ends.</p>
                  <div className="mt-4 text-xs font-mono text-primary animate-pulse">CLICK TO REVEAL TACTIC</div>
               </div>
            </div>
            {/* Back */}
            <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl border border-primary/30 shadow-[0_0_30px_rgba(139,92,246,0.15)] p-8 flex flex-col justify-center rotate-y-180">
               <h3 className="text-primary font-bold mb-4 flex items-center gap-2"><CheckCircle2 size={20} /> The Tactical Response</h3>
               <p className="text-xl text-white font-medium italic leading-relaxed">"I love that idea. If we include this button now, we will need to drop feature X to hit the deadline, or extend the sprint by 3 days. Which trade-off do you prefer?"</p>
               <div className="mt-8 space-y-4">
                  <div className="bg-background/50 p-4 rounded-xl border border-border">
                    <div className="text-xs text-status-success font-bold mb-1">WHY IT WORKS</div>
                    <div className="text-sm text-text-secondary">You aren't saying no. You are presenting the engineering reality as a business trade-off, forcing the PM to own the decision.</div>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>

        {/* Right Info Column */}
        <div className="space-y-6">
           <div className="bg-surface p-6 rounded-2xl border border-border shadow-lg">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2"><ShieldAlert size={16} className="text-status-danger" /> Common Anti-patterns</h3>
              <ul className="space-y-4">
                 <li className="flex gap-3">
                   <span className="text-status-danger font-bold">✕</span>
                   <span className="text-sm text-text-secondary">"We can't do that, it's too late." <span className="block text-xs mt-1 text-status-danger/70">(Hostile, inflexible)</span></span>
                 </li>
                 <li className="flex gap-3">
                   <span className="text-status-danger font-bold">✕</span>
                   <span className="text-sm text-text-secondary">"I guess I can work the weekend to get it done." <span className="block text-xs mt-1 text-status-danger/70">(Martyrdom, burns you out)</span></span>
                 </li>
              </ul>
           </div>
           
           <div className="bg-card-active p-6 rounded-2xl border border-border shadow-lg flex flex-col justify-center items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary"><Repeat size={24} /></div>
              <h3 className="font-bold text-white">Ready to practice?</h3>
              <p className="text-sm text-text-secondary">Take this flashcard into the Sandbox and try variations against our AI Product Manager.</p>
              <Link to="/app/roleplay" className="w-full py-3 mt-2 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl hover:opacity-90 transition-opacity">
                Start Simulation
              </Link>
           </div>
        </div>
      </div>
    </div>
  );
}
'''
with open(os.path.join(pages_dir, 'FlashcardDetail.tsx'), 'w', encoding='utf-8') as f:
    f.write(flashcard_detail_tsx)

# 2. Engineer Profile Detail (B2B Manager detail)
engineer_profile_tsx = '''import { motion } from "framer-motion";
import { ArrowLeft, ShieldAlert, Clock, TrendingUp, Activity } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export default function EngineerProfile() {
  const { id } = useParams();
  
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20 pt-4">
      <Link to="/app/b2b" className="inline-flex items-center gap-2 text-text-secondary hover:text-white transition-colors">
        <ArrowLeft size={16} /> Back to Manager Hub
      </Link>
      
      <div className="bg-surface rounded-3xl border border-border p-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row gap-8 items-center">
         <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-[80px]" />
         <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/40 to-secondary/40 border-4 border-background overflow-hidden relative z-10 shadow-2xl">
            <img src="https://i.pravatar.cc/150?img=11" className="w-full h-full object-cover" />
         </div>
         <div className="relative z-10 flex-1 text-center md:text-left">
            <h1 className="text-4xl font-bold text-white tracking-tight">Nguyen Van A</h1>
            <p className="text-secondary font-mono mt-1">Senior Frontend Engineer</p>
            <div className="flex flex-wrap gap-4 mt-4 justify-center md:justify-start">
               <span className="px-3 py-1 bg-background border border-border rounded-lg text-sm text-text-secondary flex items-center gap-2"><Clock size={14} /> 24 Sessions</span>
               <span className="px-3 py-1 bg-status-success/10 border border-status-success/30 rounded-lg text-sm text-status-success flex items-center gap-2 font-bold"><TrendingUp size={14} /> Score: 82</span>
               <span className="px-3 py-1 bg-status-warning/10 border border-status-warning/30 rounded-lg text-sm text-status-warning flex items-center gap-2"><ShieldAlert size={14} /> Bottleneck: Over-apologizing</span>
            </div>
         </div>
         <div className="relative z-10 hidden md:block">
            <button className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-colors shadow-lg">Assign Scenario</button>
         </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="md:col-span-2 space-y-6">
            <h3 className="font-bold text-white text-lg">Recent Simulation History</h3>
            {[1, 2, 3].map((_, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="bg-surface p-6 rounded-2xl border border-border shadow-md flex items-center justify-between">
                 <div>
                    <div className="font-bold text-white">Incident Response: Database Outage</div>
                    <div className="text-xs text-text-secondary mt-1">Roleplayed with CTO Persona • 2 days ago</div>
                 </div>
                 <div className="text-right">
                    <div className="text-2xl font-bold text-status-success">88</div>
                    <div className="text-xs text-text-secondary">Tact Score</div>
                 </div>
              </motion.div>
            ))}
         </div>
         
         <div className="space-y-6">
            <div className="bg-card-active p-6 rounded-2xl border border-border shadow-lg flex flex-col items-center justify-center text-center min-h-[300px]">
               <Activity size={48} className="text-primary/50 mb-4" />
               <h3 className="font-bold text-white mb-2">Growth Radar</h3>
               <p className="text-sm text-text-secondary mb-4">Detailed metric breakdown visualization will appear here.</p>
               <div className="w-full h-2 bg-background rounded-full overflow-hidden mb-2">
                 <div className="h-full bg-primary w-[82%]"></div>
               </div>
               <div className="w-full flex justify-between text-xs text-text-secondary">
                 <span>Empathy</span>
                 <span>82%</span>
               </div>
               <div className="w-full h-2 bg-background rounded-full overflow-hidden mt-4 mb-2">
                 <div className="h-full bg-secondary w-[65%]"></div>
               </div>
               <div className="w-full flex justify-between text-xs text-text-secondary">
                 <span>Assertiveness</span>
                 <span>65%</span>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
'''
with open(os.path.join(pages_dir, 'EngineerProfile.tsx'), 'w', encoding='utf-8') as f:
    f.write(engineer_profile_tsx)

# 3. Settings Page
settings_tsx = '''import { motion } from "framer-motion";
import { Settings, Bell, Mic, Globe } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 pt-4">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold text-white tracking-tight">Settings</h1>
        <p className="text-text-secondary mt-2">Manage your account, integrations, and telemetry preferences.</p>
      </motion.div>
      
      <div className="flex flex-col md:flex-row gap-8 mt-8">
         <div className="w-full md:w-64 space-y-2">
            <button className="w-full text-left px-4 py-3 bg-card-active text-primary font-bold rounded-xl border border-primary/20 flex items-center gap-3"><Settings size={18}/> General</button>
            <button className="w-full text-left px-4 py-3 hover:bg-surface text-text-secondary hover:text-white font-medium rounded-xl transition-colors flex items-center gap-3"><Mic size={18}/> Audio & Voice</button>
            <button className="w-full text-left px-4 py-3 hover:bg-surface text-text-secondary hover:text-white font-medium rounded-xl transition-colors flex items-center gap-3"><Bell size={18}/> Notifications</button>
            <button className="w-full text-left px-4 py-3 hover:bg-surface text-text-secondary hover:text-white font-medium rounded-xl transition-colors flex items-center gap-3"><Globe size={18}/> Integrations</button>
         </div>
         
         <div className="flex-1 space-y-8">
            <div className="bg-surface p-8 rounded-3xl border border-border shadow-xl space-y-6">
               <h3 className="text-xl font-bold text-white border-b border-border pb-4">Profile Information</h3>
               
               <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Display Name</label>
                    <input type="text" defaultValue="Alex Developer" className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Email Address</label>
                    <input type="email" defaultValue="alex@company.com" className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50 opacity-70" disabled />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Persona Preference</label>
                    <select className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50 appearance-none">
                       <option>Direct & Assertive</option>
                       <option>Empathetic & Calm</option>
                       <option>Analytical & Data-driven</option>
                    </select>
                  </div>
               </div>
               
               <div className="pt-4 flex justify-end">
                  <button className="px-6 py-2 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg transition-colors">Save Changes</button>
               </div>
            </div>
            
            <div className="bg-status-danger/5 p-8 rounded-3xl border border-status-danger/20 shadow-xl space-y-4">
               <h3 className="text-xl font-bold text-status-danger">Danger Zone</h3>
               <p className="text-sm text-text-secondary">Permanently delete your account and all simulation history. This action cannot be undone.</p>
               <button className="px-6 py-2 bg-status-danger text-white font-bold rounded-lg hover:bg-red-600 transition-colors">Delete Account</button>
            </div>
         </div>
      </div>
    </div>
  );
}
'''
with open(os.path.join(pages_dir, 'Settings.tsx'), 'w', encoding='utf-8') as f:
    f.write(settings_tsx)


# 4. Scenario Detail Page (Sandbox Detail)
scenario_detail_tsx = '''import { motion } from "framer-motion";
import { ArrowLeft, Server, AlertCircle, Clock, Zap } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export default function ScenarioDetail() {
  const { id } = useParams();
  
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20 pt-4">
      <Link to="/app/sandbox" className="inline-flex items-center gap-2 text-text-secondary hover:text-white transition-colors">
        <ArrowLeft size={16} /> Back to Scenarios
      </Link>
      
      <div className="relative bg-surface rounded-3xl border border-border overflow-hidden shadow-2xl">
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop')] bg-cover opacity-10 mix-blend-screen" />
         <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/80 to-transparent" />
         
         <div className="relative z-10 p-10 md:p-14 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
               <span className="px-3 py-1 bg-status-danger/20 border border-status-danger/40 text-status-danger text-xs font-bold uppercase rounded-full tracking-wider animate-pulse">Severity: P0</span>
               <span className="px-3 py-1 bg-background border border-border text-text-secondary text-xs font-bold uppercase rounded-full tracking-wider flex items-center gap-1"><Clock size={12}/> 5 Min Limit</span>
            </div>
            
            <h1 className="text-5xl font-extrabold text-white tracking-tight">Database Migration Failure</h1>
            <p className="text-lg text-text-secondary max-w-2xl leading-relaxed">
              A junior engineer accidentally dropped a critical production table during a routine migration. The site is returning 500s. The CTO is furiously pinging you on Slack demanding an explanation.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
               <div className="bg-background/80 backdrop-blur-md p-6 rounded-2xl border border-border">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2"><Zap size={16} className="text-secondary"/> Core Objectives</h3>
                  <ul className="space-y-3 text-sm text-text-secondary">
                     <li className="flex gap-2 items-start"><span className="text-primary font-bold">1.</span> De-escalate the CTO's panic.</li>
                     <li className="flex gap-2 items-start"><span className="text-primary font-bold">2.</span> Protect the junior engineer from immediate blame.</li>
                     <li className="flex gap-2 items-start"><span className="text-primary font-bold">3.</span> Communicate a clear, realistic rollback timeline.</li>
                  </ul>
               </div>
               
               <div className="bg-background/80 backdrop-blur-md p-6 rounded-2xl border border-border">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2"><Server size={16} className="text-primary"/> AI Persona Config</h3>
                  <div className="space-y-4">
                     <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-text-secondary">Hostility Level</span>
                          <span className="text-status-danger font-bold">90%</span>
                        </div>
                        <div className="h-1.5 bg-surface rounded-full overflow-hidden"><div className="h-full bg-status-danger w-[90%]"></div></div>
                     </div>
                     <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-text-secondary">Technical Knowledge</span>
                          <span className="text-secondary font-bold">High</span>
                        </div>
                        <div className="h-1.5 bg-surface rounded-full overflow-hidden"><div className="h-full bg-secondary w-[80%]"></div></div>
                     </div>
                  </div>
               </div>
            </div>
            
            <div className="pt-8">
               <Link to="/app/roleplay" className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-status-danger to-primary text-white font-bold rounded-xl hover:opacity-90 transition-opacity shadow-[0_0_30px_rgba(244,63,94,0.3)] text-lg">
                  Launch Simulator
               </Link>
            </div>
         </div>
      </div>
    </div>
  );
}
'''
with open(os.path.join(pages_dir, 'ScenarioDetail.tsx'), 'w', encoding='utf-8') as f:
    f.write(scenario_detail_tsx)


# 5. Update Router in App.tsx
app_path = os.path.join(base_dir, 'App.tsx')
with open(app_path, 'r', encoding='utf-8') as f:
    app_code = f.read()

imports = '''import FlashcardDetail from './pages/FlashcardDetail';
import EngineerProfile from './pages/EngineerProfile';
import SettingsPage from './pages/Settings';
import ScenarioDetail from './pages/ScenarioDetail';
'''
app_code = app_code.replace("import Login from './pages/Login';", "import Login from './pages/Login';\n" + imports)

routes = '''          <Route path="pricing" element={<Pricing />} />
          <Route path="toolkit/:id" element={<FlashcardDetail />} />
          <Route path="b2b/:id" element={<EngineerProfile />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="sandbox/:id" element={<ScenarioDetail />} />'''
app_code = app_code.replace('<Route path="pricing" element={<Pricing />} />', routes)

with open(app_path, 'w', encoding='utf-8') as f:
    f.write(app_code)


# 6. Update Layout.tsx Sidebar to include Settings
layout_path = os.path.join(base_dir, 'components', 'Layout.tsx')
with open(layout_path, 'r', encoding='utf-8') as f:
    layout = f.read()

layout = layout.replace('import { LayoutDashboard', 'import { LayoutDashboard, Settings as SettingsIcon')
layout = layout.replace('{ name: "Pricing", path: "/app/pricing", icon: CreditCard },', '{ name: "Pricing", path: "/app/pricing", icon: CreditCard },\n    { name: "Settings", path: "/app/settings", icon: SettingsIcon },')

with open(layout_path, 'w', encoding='utf-8') as f:
    f.write(layout)


# 7. Add CSS for 3D flip card
css_path = os.path.join(base_dir, 'index.css')
with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read()

if '.perspective-1000' not in css:
    css += """
/* 3D Flip Card */
.perspective-1000 { perspective: 1000px; }
.preserve-3d { transform-style: preserve-3d; }
.backface-hidden { backface-visibility: hidden; }
.rotate-y-180 { transform: rotateY(180deg); }
"""
    with open(css_path, 'w', encoding='utf-8') as f:
        f.write(css)

print("Generated new detail pages and updated routing!")
