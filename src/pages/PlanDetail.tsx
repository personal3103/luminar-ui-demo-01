import { motion } from "framer-motion";
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
