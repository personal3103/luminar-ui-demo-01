import { ArrowLeft, Server, Clock, Zap } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export default function ScenarioDetail() {
  useParams(); // id unused in mock
  
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
