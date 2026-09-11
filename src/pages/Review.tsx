import { motion } from "framer-motion";
import { ArrowRight, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Review() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20 pt-4">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <div className="flex justify-between items-end"><h1 className="text-4xl font-bold text-white tracking-tight">Post-Mortem Review</h1><Link to="/app/review/1" className="px-4 py-2 bg-primary/20 text-primary border border-primary/30 rounded-lg hover:bg-primary/30 transition-colors">View Timeline Detail</Link></div>
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
