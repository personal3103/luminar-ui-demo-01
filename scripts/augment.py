import os

base_dir = r'c:\Users\trand\Downloads\Lumina\resrouces\client\src'

# Update index.css for less glaring colors
css_path = os.path.join(base_dir, 'index.css')
with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read()

# Replace dark mode colors
new_dark_colors = """  [data-theme="dark"], .dark, :root {
    --primary: #8B5CF6; /* softer purple */
    --primary-hover: #A78BFA;
    --primary-focus: #A78BFA;
    --secondary: #0EA5E9; /* softer blue */
    --background: #050505; /* deep dark */
    --surface: #0E0E12; /* slightly elevated */
    --card-active: #17171C;
    --border: #222228; /* very subtle */
    --brand-glow: rgba(139, 92, 246, 0.08);
    --text-primary: #E4E4E7; /* zinc 200 */
    --text-secondary: #A1A1AA; /* zinc 400 */
    --status-success: #10B981;
    --status-danger: #F43F5E;
    --status-warning: #F59E0B;
  }"""
  
# I'll just rewrite the whole CSS file for safety and simplicity
new_css = """@import "tailwindcss";

@theme {
  --color-primary: var(--primary);
  --color-primary-hover: var(--primary-hover);
  --color-primary-focus: var(--primary-focus);
  --color-secondary: var(--secondary);
  --color-background: var(--background);
  --color-surface: var(--surface);
  --color-card-active: var(--card-active);
  --color-border: var(--border);
  --color-brand-glow: var(--brand-glow);
  --color-text-primary: var(--text-primary);
  --color-text-secondary: var(--text-secondary);
  --color-status-success: var(--status-success);
  --color-status-danger: var(--status-danger);
  --color-status-warning: var(--status-warning);

  --font-inter: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}

@layer base {
  :root {
    --primary: #8B5CF6;
    --primary-hover: #A78BFA;
    --primary-focus: #A78BFA;
    --secondary: #0EA5E9;
    --background: #050505;
    --surface: #0E0E12;
    --card-active: #17171C;
    --border: #222228;
    --brand-glow: rgba(139, 92, 246, 0.08);
    --text-primary: #E4E4E7;
    --text-secondary: #A1A1AA;
    --status-success: #10B981;
    --status-danger: #F43F5E;
    --status-warning: #F59E0B;
  }

  html, body {
    margin: 0;
    padding: 0;
    overscroll-behavior: none;
    background-color: var(--background);
    color: var(--text-primary);
  }
}
"""
with open(css_path, 'w', encoding='utf-8') as f:
    f.write(new_css)

# Update layout
layout_tsx = '''import { Link, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, Mic, ShieldAlert, BookOpen, Activity, Users, CreditCard, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Layout() {
  const location = useLocation();
  const navItems = [
    { name: "Dashboard", path: "/app/dashboard", icon: LayoutDashboard },
    { name: "Sandbox", path: "/app/sandbox", icon: ShieldAlert },
    { name: "Roleplay Room", path: "/app/roleplay", icon: Mic },
    { name: "Toolkit", path: "/app/toolkit", icon: BookOpen },
    { name: "Post-Mortem", path: "/app/review", icon: Activity },
    { name: "B2B Manager", path: "/app/b2b", icon: Users },
    { name: "Pricing", path: "/app/pricing", icon: CreditCard },
  ];

  return (
    <div className="flex h-screen bg-background text-text-primary font-inter overflow-hidden">
      <motion.div 
        initial={{ x: -250 }} animate={{ x: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-64 bg-surface border-r border-border flex flex-col z-20"
      >
        <div className="h-16 flex items-center px-6 border-b border-border">
          <span className="text-primary font-bold text-xl tracking-tight">Luminar</span>
          <span className="ml-2 text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded border border-primary/20">TACT v2.4</span>
        </div>
        <div className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-1">
          {navItems.map((item, idx) => {
            const active = location.pathname.startsWith(item.path);
            return (
              <Link key={item.name} to={item.path}>
                <motion.div 
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${active ? 'bg-card-active text-primary border border-primary/20 shadow-[0_0_12px_rgba(139,92,246,0.08)]' : 'text-text-secondary hover:bg-card-active hover:text-text-primary'}`}
                >
                  <item.icon size={18} className={active ? 'text-primary' : ''} />
                  <span className="text-sm font-medium">{item.name}</span>
                </motion.div>
              </Link>
            );
          })}
        </div>
        <div className="p-4 border-t border-border">
           <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary hover:bg-card-active hover:text-text-primary transition-colors">
              <LogOut size={18} />
              <span className="text-sm font-medium">Exit to Landing</span>
           </Link>
        </div>
      </motion.div>
      
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-16 bg-surface/60 backdrop-blur-md border-b border-border flex items-center justify-between px-8 z-30">
          <div className="text-sm font-mono text-text-secondary">
            SYSTEM STATUS: <span className="text-status-success drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]">ONLINE</span>
          </div>
          <div className="flex items-center gap-4">
             <motion.img whileHover={{ scale: 1.1 }} alt="Profile" src="/logo.png" className="w-8 h-8 rounded-full ring-2 ring-primary/30 object-cover cursor-pointer" />
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-8 relative z-10 scroll-smooth">
          <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-[0.03] pointer-events-none mix-blend-screen" />
          <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.05),transparent_50%)] pointer-events-none" />
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
'''
with open(os.path.join(base_dir, 'components', 'Layout.tsx'), 'w', encoding='utf-8') as f:
    f.write(layout_tsx)

# Update Dashboard
dashboard_tsx = '''import { motion } from "framer-motion";

export default function Dashboard() {
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative w-full h-64 rounded-3xl overflow-hidden border border-border">
        <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent" />
        <div className="relative z-10 p-10 flex flex-col justify-center h-full">
           <h1 className="text-4xl font-bold text-white tracking-tight mb-2">Tact Dashboard</h1>
           <p className="text-text-secondary max-w-lg">Monitor your communication telemetry, review recent simulations, and optimize your technical leadership approach.</p>
        </div>
      </motion.div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div variants={item} className="bg-surface p-6 rounded-2xl border border-border relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/20 transition-all" />
          <div className="text-sm text-text-secondary mb-2">Overall Tact Score</div>
          <div className="text-5xl font-bold text-primary">86.4</div>
          <div className="text-xs text-status-success mt-3 font-mono flex items-center gap-1">↑ +4.2 from last week</div>
        </motion.div>
        <motion.div variants={item} className="bg-surface p-6 rounded-2xl border border-border relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-2xl group-hover:bg-secondary/20 transition-all" />
          <div className="text-sm text-text-secondary mb-2">Simulations Completed</div>
          <div className="text-5xl font-bold text-secondary">12</div>
          <div className="text-xs text-text-secondary mt-3 font-mono">Top scenario: Incident Response</div>
        </motion.div>
        <motion.div variants={item} className="bg-surface p-6 rounded-2xl border border-border relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-status-danger/5 rounded-full blur-2xl group-hover:bg-status-danger/20 transition-all" />
          <div className="text-sm text-text-secondary mb-2">Aggressive Alerts</div>
          <div className="text-5xl font-bold text-status-danger">2</div>
          <div className="text-xs text-text-secondary mt-3 font-mono">Action required to improve</div>
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-surface h-[400px] rounded-3xl border border-border flex items-center justify-center relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-screen" />
         <div className="text-text-secondary font-mono text-sm z-10 p-4 bg-background/80 backdrop-blur rounded border border-border">Radar Chart Placeholder (Assertiveness vs Cultural Tact vs Tech Clarity)</div>
      </motion.div>
    </div>
  );
}
'''
with open(os.path.join(base_dir, 'pages', 'Dashboard.tsx'), 'w', encoding='utf-8') as f:
    f.write(dashboard_tsx)

# Update Toolkit
toolkit_tsx = '''import { motion } from "framer-motion";

export default function Toolkit() {
  const cards = [
    { title: "Pushback on Scope Creep", desc: "How to say no to new features without saying no.", img: "https://images.unsplash.com/photo-1507925922837-326f12a52b34?q=80&w=600&auto=format&fit=crop" },
    { title: "Defending Tech Debt", desc: "Explaining refactoring value to non-technical stakeholders.", img: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=600&auto=format&fit=crop" },
    { title: "Incident Apology", desc: "Taking accountability without self-flagellation.", img: "https://images.unsplash.com/photo-1525770041010-2a1533388e1f?q=80&w=600&auto=format&fit=crop" },
    { title: "Architectural Shift", desc: "Proposing a major rewrite safely.", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop" },
    { title: "Mentoring Juniors", desc: "Giving feedback without destroying confidence.", img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop" },
    { title: "Cross-team Conflict", desc: "Resolving API contract disputes.", img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-white tracking-tight mb-4">Survival Toolkit</h1>
        <p className="text-text-secondary max-w-2xl mx-auto">Tactical communication templates and flashcards to help you navigate the hardest conversations in software engineering.</p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((c, i) => (
           <motion.div 
             key={c.title} 
             initial={{ opacity: 0, y: 50 }} 
             whileInView={{ opacity: 1, y: 0 }} 
             viewport={{ once: true, margin: "-50px" }}
             transition={{ delay: i * 0.1, duration: 0.5 }}
             whileHover={{ y: -8, scale: 1.02 }}
             className="bg-surface rounded-2xl border border-border overflow-hidden cursor-pointer group flex flex-col shadow-lg"
           >
              <div className="h-48 overflow-hidden relative">
                 <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-500" />
                 <img src={c.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0" />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                 <h3 className="font-bold text-white text-xl mb-2 group-hover:text-secondary transition-colors">{c.title}</h3>
                 <p className="text-sm text-text-secondary flex-1">{c.desc}</p>
                 <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs font-semibold text-primary">
                    <span>VIEW FLASHCARD</span>
                    <span className="group-hover:translate-x-2 transition-transform">→</span>
                 </div>
              </div>
           </motion.div>
        ))}
      </div>
    </div>
  );
}
'''
with open(os.path.join(base_dir, 'pages', 'Toolkit.tsx'), 'w', encoding='utf-8') as f:
    f.write(toolkit_tsx)

# Update Pricing
pricing_tsx = '''import { motion } from "framer-motion";

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
            <button className="mt-10 w-full py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:opacity-90 font-bold shadow-[0_0_20px_rgba(139,92,246,0.4)]">Upgrade to Pro</button>
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
'''
with open(os.path.join(base_dir, 'pages', 'Pricing.tsx'), 'w', encoding='utf-8') as f:
    f.write(pricing_tsx)

print("Updated styling, Layout, Dashboard, Toolkit, and Pricing with Framer Motion")
