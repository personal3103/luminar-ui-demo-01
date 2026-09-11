import { motion } from "framer-motion";
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
