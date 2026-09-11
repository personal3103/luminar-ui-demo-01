import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Pricing() {
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.2 } } };
  const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };

  return (
    <div className="max-w-6xl mx-auto space-y-16 py-12 pb-24">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 blur-[100px] rounded-full -z-10" />
        <h1 className="text-5xl font-extrabold text-white tracking-tight mb-6">Invest in your impact</h1>
        <p className="text-text-secondary max-w-xl mx-auto text-lg">Debug your words and deploy impact. Choose the plan that fits your career or your entire engineering team.</p>
      </motion.div>
      
      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
         <motion.div variants={item} whileHover={{ scale: 1.03 }} className="bg-surface p-10 rounded-3xl border border-border shadow-xl">
            <h3 className="text-xl font-bold text-white">Developer</h3>
            <div className="mt-6 text-5xl font-bold text-white">$0</div>
            <p className="text-sm text-text-secondary mt-4">3 simulations per month.</p>
            <ul className="mt-8 space-y-3 text-sm text-text-secondary">
               <li className="flex gap-2">✓ Basic AI Personas</li>
               <li className="flex gap-2">✓ Post-Mortem Reviews</li>
            </ul>
            <button className="mt-10 w-full py-3 bg-card-active text-white rounded-xl hover:bg-border transition-colors font-semibold">Start Free</button>
         </motion.div>
         
         <motion.div variants={item} whileHover={{ scale: 1.05 }} className="bg-card-active p-10 rounded-3xl border border-primary/50 shadow-[0_0_40px_rgba(139,92,246,0.15)] relative transform md:-translate-y-4">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">RECOMMENDED</div>
            <h3 className="text-2xl font-bold text-primary">Tech Lead (Pro)</h3>
            <div className="mt-6 text-5xl font-bold text-white">$12<span className="text-lg text-text-secondary font-normal">/mo</span></div>
            <p className="text-sm text-text-primary mt-4">Unlimited simulations & Tact Dashboard.</p>
            <ul className="mt-8 space-y-3 text-sm text-text-primary">
               <li className="flex gap-2 text-status-success">✓ Unlimited Simulations</li>
               <li className="flex gap-2 text-status-success">✓ Advanced Analytics Dashboard</li>
               <li className="flex gap-2 text-status-success">✓ Custom Scenario Builder</li>
            </ul>
            <Link to="/app/pricing/pro" className="mt-10 w-full py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:opacity-90 font-bold shadow-[0_0_20px_rgba(139,92,246,0.4)] inline-block text-center">Upgrade to Pro</Link>
         </motion.div>
         
         <motion.div variants={item} whileHover={{ scale: 1.03 }} className="bg-surface p-10 rounded-3xl border border-border shadow-xl">
            <h3 className="text-xl font-bold text-white">Enterprise</h3>
            <div className="mt-6 text-5xl font-bold text-white">$25<span className="text-lg text-text-secondary font-normal">/seat</span></div>
            <p className="text-sm text-text-secondary mt-4">Custom scenarios & Manager Hub.</p>
            <ul className="mt-8 space-y-3 text-sm text-text-secondary">
               <li className="flex gap-2">✓ Everything in Pro</li>
               <li className="flex gap-2">✓ B2B Manager Hub</li>
               <li className="flex gap-2">✓ SSO & Team Billing</li>
            </ul>
            <button className="mt-10 w-full py-3 bg-card-active text-white rounded-xl hover:bg-border transition-colors font-semibold">Contact Sales</button>
         </motion.div>
      </motion.div>
    </div>
  );
}
