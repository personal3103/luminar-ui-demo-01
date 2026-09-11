import { motion } from "framer-motion";
import { Mic, PhoneOff, Activity } from "lucide-react";

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
                 <img src="./logo.png" className="w-full h-full object-cover rounded-full" />
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
