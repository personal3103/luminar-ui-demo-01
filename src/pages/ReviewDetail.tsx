import { motion } from "framer-motion";
import { ArrowLeft, BarChart3, Clock, AlertTriangle } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export default function ReviewDetail() {
  useParams(); // id unused // mock id
  
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
