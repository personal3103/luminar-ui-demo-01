import os

base_dir = r'c:\Users\trand\Downloads\Lumina\resrouces\client\src'
pages_dir = os.path.join(base_dir, 'pages')

landing_tsx = """import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Zap, Activity, Users, Server, Brain } from "lucide-react";
import AmbientCanvas from "../components/AmbientCanvas";

export default function LandingPage() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <div className="relative min-h-screen text-zinc-50 overflow-hidden font-inter selection:bg-indigo-500/30">
      <AmbientCanvas />
      
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 h-16 border-b border-white/10 bg-zinc-950/50 backdrop-blur-md z-50 flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center font-black">L</div>
          <span className="font-bold tracking-tight text-lg">Luminar Tact Engine</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/#features" className="text-sm font-medium text-zinc-400 hover:text-zinc-50 transition-colors hidden sm:block">Features</Link>
          <Link to="/#metrics" className="text-sm font-medium text-zinc-400 hover:text-zinc-50 transition-colors hidden sm:block">Metrics</Link>
          {isLoggedIn ? (
            <div className="flex gap-2">
              <Link to="/app/dashboard" className="px-4 py-2 text-sm font-medium text-zinc-950 bg-zinc-50 hover:bg-zinc-200 rounded-md transition-colors">Dashboard</Link>
              <button 
                onClick={() => { localStorage.removeItem("isLoggedIn"); window.location.reload(); }}
                className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-md transition-colors border border-transparent hover:border-rose-500/20"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="px-4 py-2 text-sm font-medium text-zinc-950 bg-zinc-50 hover:bg-zinc-200 rounded-md transition-colors">
              Login to Console
            </Link>
          )}
        </div>
      </nav>

      <main className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto space-y-32">
        
        {/* Hero */}
        <section className="text-center space-y-8 max-w-4xl mx-auto pt-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold uppercase tracking-wider mb-6">
              <Zap size={12} /> Luminar AI v2.0 Live
            </span>
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-zinc-50 mb-6">
              Engineer communication, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">mastered by AI.</span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Luminar is an intensive roleplay environment that trains software engineers to de-escalate conflicts, push back on scope creep, and communicate effectively under pressure.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }} className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to={isLoggedIn ? "/app/dashboard" : "/login"} className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-zinc-50 text-zinc-950 hover:bg-zinc-200 font-semibold rounded-lg transition-colors">
              Launch Simulator <ArrowRight size={16} />
            </Link>
            <button className="px-6 py-3 bg-zinc-900/50 backdrop-blur-sm text-zinc-50 hover:bg-zinc-800 border border-white/10 rounded-lg transition-colors font-medium">
              View Scenarios
            </button>
          </motion.div>
        </section>

        {/* Features Bento Grid */}
        <section id="features" className="space-y-12 pt-10">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Core Training Modules</h2>
            <p className="text-zinc-400">Everything you need to transform your engineering culture from hostile to collaborative.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="md:col-span-2 glass rounded-2xl p-8 flex flex-col justify-between group overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <Brain className="text-indigo-400 mb-6" size={32} />
                <h3 className="text-2xl font-bold mb-2">Hostile AI Personas</h3>
                <p className="text-zinc-400">Practice negotiating with aggressive PMs, panicked CTOs, and uncooperative peers. The AI dynamically adapts its hostility based on your tone.</p>
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="glass rounded-2xl p-8 flex flex-col justify-between group">
              <Activity className="text-cyan-400 mb-6" size={32} />
              <div>
                <h3 className="text-xl font-bold mb-2">Real-time Telemetry</h3>
                <p className="text-zinc-400 text-sm">Measure WPM, empathy scores, and defensive triggers live.</p>
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="glass rounded-2xl p-8 flex flex-col justify-between group">
              <Shield className="text-emerald-400 mb-6" size={32} />
              <div>
                <h3 className="text-xl font-bold mb-2">Blameless Post-Mortems</h3>
                <p className="text-zinc-400 text-sm">Line-by-line AI critique of your negotiation attempts.</p>
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="md:col-span-2 glass rounded-2xl p-8 flex flex-col justify-between group overflow-hidden relative">
              <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
                <Server size={120} />
              </div>
              <div className="relative z-10">
                <Users className="text-purple-400 mb-6" size={32} />
                <h3 className="text-2xl font-bold mb-2">Manager Oversight (B2B)</h3>
                <p className="text-zinc-400">Identify communication bottlenecks across your entire engineering organization. Assign specific tactical scenarios to team members struggling with scope pushback.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="glass max-w-3xl mx-auto rounded-3xl p-12 bg-gradient-to-b from-zinc-900/80 to-zinc-950/80 relative overflow-hidden">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none" />
             <h2 className="text-4xl font-bold tracking-tight mb-6 relative z-10">Stop failing system design interviews because of soft skills.</h2>
             <p className="text-zinc-400 mb-8 relative z-10 max-w-xl mx-auto">Join 10,000+ senior engineers upgrading their communication stack.</p>
             <Link to="/login" className="relative z-10 inline-flex items-center gap-2 px-8 py-4 bg-zinc-50 text-zinc-950 hover:bg-zinc-200 font-bold rounded-lg transition-colors">
               Start Free Trial
             </Link>
          </motion.div>
        </section>
        
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-zinc-950 py-12 px-6 text-center text-zinc-500 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>&copy; 2026 Luminar Tact Engine. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-zinc-300">Privacy</a>
            <a href="#" className="hover:text-zinc-300">Terms</a>
            <a href="#" className="hover:text-zinc-300">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
"""
with open(os.path.join(pages_dir, 'LandingPage.tsx'), 'w', encoding='utf-8') as f:
    f.write(landing_tsx)

print("Rewritten LandingPage to strict React + Tailwind components with Bento Grid.")
