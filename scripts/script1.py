import os

base_dir = r'c:\Users\trand\Downloads\Lumina\resrouces\client\src'

# 1. Update index.css with scroll animation classes
css_path = os.path.join(base_dir, 'index.css')
with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read()

if '.scroll-animate' not in css:
    css += """
/* Landing Page Scroll Animations */
.scroll-animate {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.scroll-animate.is-visible {
  opacity: 1;
  transform: translateY(0);
}
.scroll-delay-1 { transition-delay: 0.1s; }
.scroll-delay-2 { transition-delay: 0.2s; }
.scroll-delay-3 { transition-delay: 0.3s; }
"""
    with open(css_path, 'w', encoding='utf-8') as f:
        f.write(css)


# 2. Update Login.tsx to set auth state
login_path = os.path.join(base_dir, 'pages', 'Login.tsx')
with open(login_path, 'r', encoding='utf-8') as f:
    login = f.read()

login = login.replace('onSubmit={(e) => e.preventDefault()}', '''onSubmit={(e) => {
          e.preventDefault();
          localStorage.setItem("isLoggedIn", "true");
          window.location.href = "/app/dashboard";
        }}''')
login = login.replace('<Link to="/app/dashboard" className="w-full flex items-center', '<button type="submit" className="w-full flex items-center')
login = login.replace('</Link>\n        </form>', '</button>\n        </form>')

with open(login_path, 'w', encoding='utf-8') as f:
    f.write(login)


# 3. Update Layout.tsx (Logout)
layout_path = os.path.join(base_dir, 'components', 'Layout.tsx')
with open(layout_path, 'r', encoding='utf-8') as f:
    layout = f.read()

layout = layout.replace('''<Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary hover:bg-card-active hover:text-text-primary transition-colors">
              <LogOut size={18} />
              <span className="text-sm font-medium">Exit to Landing</span>
           </Link>''', '''<button onClick={() => { localStorage.removeItem("isLoggedIn"); window.location.href = "/"; }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary hover:bg-status-danger/10 hover:text-status-danger transition-colors">
              <LogOut size={18} />
              <span className="text-sm font-medium">Logout</span>
           </button>''')
with open(layout_path, 'w', encoding='utf-8') as f:
    f.write(layout)


# 4. Update Dashboard.tsx (Fix double animation + Add more components)
dashboard_tsx = '''import { motion } from "framer-motion";
import { Activity, Code, Server, Users, GitMerge, AlertCircle, CheckCircle2 } from "lucide-react";

export default function Dashboard() {
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  // Changed initial state to avoid double flashing. Relying mostly on whileInView or just simple fade
  const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="relative w-full h-64 rounded-3xl overflow-hidden border border-border">
        <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="relative z-10 p-10 flex flex-col justify-center h-full">
           <div className="flex items-center gap-3 mb-4">
             <div className="px-3 py-1 bg-primary/20 border border-primary/30 rounded-full text-primary text-xs font-bold uppercase tracking-wider flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Live Telemetry
             </div>
           </div>
           <h1 className="text-4xl font-bold text-white tracking-tight mb-2">Tact Dashboard</h1>
           <p className="text-text-secondary max-w-lg">Monitor your communication telemetry, review recent simulations, and optimize your technical leadership approach.</p>
        </div>
      </motion.div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div variants={item} className="col-span-1 md:col-span-2 bg-surface p-6 rounded-2xl border border-border relative overflow-hidden group shadow-lg">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/20 transition-all" />
          <div className="flex justify-between items-start">
             <div>
               <div className="text-sm text-text-secondary mb-2">Overall Tact Score</div>
               <div className="text-6xl font-bold text-white">86.4</div>
             </div>
             <Activity className="text-primary opacity-50" size={48} />
          </div>
          <div className="mt-6 flex items-center gap-4">
             <div className="h-2 flex-1 bg-background rounded-full overflow-hidden border border-border">
                <motion.div initial={{ width: 0 }} animate={{ width: "86.4%" }} transition={{ duration: 1, delay: 0.5 }} className="h-full bg-primary shadow-[0_0_10px_#8B5CF6]" />
             </div>
             <div className="text-xs text-status-success font-mono flex items-center gap-1">↑ +4.2%</div>
          </div>
        </motion.div>

        <motion.div variants={item} className="bg-surface p-6 rounded-2xl border border-border relative overflow-hidden group shadow-lg">
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-2xl group-hover:bg-secondary/20 transition-all" />
          <div className="text-sm text-text-secondary mb-2">Simulations</div>
          <div className="text-4xl font-bold text-secondary">12</div>
          <div className="text-xs text-text-secondary mt-4 flex items-center gap-2"><Server size={14}/> Top: Incidents</div>
        </motion.div>

        <motion.div variants={item} className="bg-surface p-6 rounded-2xl border border-border relative overflow-hidden group shadow-lg">
          <div className="absolute top-0 right-0 w-32 h-32 bg-status-danger/5 rounded-full blur-2xl group-hover:bg-status-danger/20 transition-all" />
          <div className="text-sm text-text-secondary mb-2">Aggressive Alerts</div>
          <div className="text-4xl font-bold text-status-danger">2</div>
          <div className="text-xs text-text-secondary mt-4 flex items-center gap-2"><AlertCircle size={14}/> Action required</div>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="md:col-span-2 bg-surface h-[400px] rounded-3xl border border-border flex items-center justify-center relative overflow-hidden shadow-lg">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-5 mix-blend-screen" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-0" />
            
            {/* Fake Radar Chart UI */}
            <div className="relative z-10 w-64 h-64 border-[0.5px] border-primary/30 rounded-full flex items-center justify-center">
               <div className="w-48 h-48 border-[0.5px] border-secondary/30 rounded-full flex items-center justify-center">
                  <div className="w-32 h-32 border-[0.5px] border-tertiary/30 rounded-full bg-primary/5 backdrop-blur-sm" />
               </div>
               {/* Polygon overlay */}
               <svg className="absolute inset-0 w-full h-full animate-[spin_60s_linear_infinite] opacity-50" viewBox="0 0 100 100">
                  <polygon points="50,10 90,40 70,90 30,90 10,40" fill="rgba(139, 92, 246, 0.2)" stroke="#8B5CF6" strokeWidth="0.5" />
               </svg>
               <div className="absolute top-0 -translate-y-4 text-xs font-mono text-primary">Assertiveness</div>
               <div className="absolute bottom-0 translate-y-4 text-xs font-mono text-secondary">Tech Clarity</div>
               <div className="absolute left-0 -translate-x-6 text-xs font-mono text-status-warning">Empathy</div>
            </div>
         </motion.div>
         
         <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="md:col-span-1 bg-surface rounded-3xl border border-border p-6 shadow-lg flex flex-col">
            <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2"><GitMerge size={16} className="text-secondary" /> Activity Feed</h3>
            <div className="space-y-6 flex-1 overflow-y-auto pr-2">
               {[
                 { action: "Completed Simulation", target: "P0 Database Down", time: "2h ago", icon: CheckCircle2, color: "text-status-success" },
                 { action: "Triggered Alert", target: "Defensive Tone", time: "5h ago", icon: AlertCircle, color: "text-status-danger" },
                 { action: "Unlocked Badge", target: "De-escalator I", time: "1d ago", icon: Users, color: "text-primary" },
                 { action: "Reviewed Flashcard", target: "Pushback Scope", time: "2d ago", icon: Code, color: "text-secondary" },
               ].map((feed, i) => (
                 <div key={i} className="flex gap-4 items-start">
                    <div className={`mt-1 ${feed.color}`}><feed.icon size={16} /></div>
                    <div>
                       <div className="text-sm text-text-primary font-medium">{feed.action}</div>
                       <div className="text-xs text-text-secondary mt-1">{feed.target} <span className="opacity-50">· {feed.time}</span></div>
                    </div>
                 </div>
               ))}
            </div>
            <button className="w-full mt-4 py-2 border border-border rounded-lg text-xs text-text-secondary hover:bg-card-active transition-colors">View All History</button>
         </motion.div>
      </div>
    </div>
  );
}
'''
with open(os.path.join(base_dir, 'pages', 'Dashboard.tsx'), 'w', encoding='utf-8') as f:
    f.write(dashboard_tsx)

print("Updated CSS, Login, Layout, Dashboard")
