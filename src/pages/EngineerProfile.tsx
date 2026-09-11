import { motion } from "framer-motion";
import { ArrowLeft, ShieldAlert, Clock, TrendingUp, Activity } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export default function EngineerProfile() {
  useParams(); // id unused in mock
  
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
