import os

base_dir = r'c:\Users\trand\Downloads\Lumina\resrouces\client\src'
os.makedirs(os.path.join(base_dir, 'components'), exist_ok=True)
os.makedirs(os.path.join(base_dir, 'pages'), exist_ok=True)

layout_tsx = '''import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, Mic, ShieldAlert, BookOpen, Activity, Users, CreditCard, LogOut } from "lucide-react";

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
    <div className="flex h-screen bg-[#0B0F19] text-slate-200 font-inter overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-[#151B2B] border-r border-[#263046] flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-[#263046]">
          <span className="text-[#A855F7] font-bold text-xl tracking-tight">Luminar</span>
          <span className="ml-2 text-[10px] bg-[#A855F7]/20 text-[#C084FC] px-2 py-0.5 rounded border border-[#A855F7]/30">TACT v2.4</span>
        </div>
        <div className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-1">
          {navItems.map((item) => {
            const active = location.pathname.startsWith(item.path);
            return (
              <Link key={item.name} to={item.path} className={lex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors }>
                <item.icon size={18} className={active ? 'text-[#C084FC]' : ''} />
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>
        <div className="p-4 border-t border-[#263046]">
           <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-[#1E2638] hover:text-slate-200 transition-colors">
              <LogOut size={18} />
              <span className="text-sm font-medium">Exit to Landing</span>
           </Link>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-[#0B0F19]/80 backdrop-blur-md border-b border-[#263046] flex items-center justify-between px-8 z-10">
          <div className="text-sm font-mono text-slate-400">
            SYSTEM STATUS: <span className="text-[#34D399] drop-shadow-[0_0_8px_#34D399]">ONLINE</span>
          </div>
          <div className="flex items-center gap-4">
             <div className="w-8 h-8 rounded-full bg-slate-700 ring-2 ring-[#A855F7]/50" />
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(168,85,247,0.05),transparent_50%)] pointer-events-none" />
          <Outlet />
        </main>
      </div>
    </div>
  );
}
'''

dashboard_tsx = '''import React from "react";
export default function Dashboard() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-white tracking-tight">Tact Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#151B2B] p-6 rounded-xl border border-[#263046]">
          <div className="text-sm text-slate-400 mb-2">Overall Tact Score</div>
          <div className="text-4xl font-bold text-[#A855F7]">86.4</div>
          <div className="text-xs text-[#34D399] mt-2">+4.2 from last week</div>
        </div>
        <div className="bg-[#151B2B] p-6 rounded-xl border border-[#263046]">
          <div className="text-sm text-slate-400 mb-2">Simulations Completed</div>
          <div className="text-4xl font-bold text-[#38BDF8]">12</div>
        </div>
        <div className="bg-[#151B2B] p-6 rounded-xl border border-[#263046]">
          <div className="text-sm text-slate-400 mb-2">Aggressive Alerts</div>
          <div className="text-4xl font-bold text-[#F43F5E]">2</div>
        </div>
      </div>
      <div className="bg-[#151B2B] h-96 rounded-xl border border-[#263046] flex items-center justify-center relative overflow-hidden">
         <div className="text-slate-500 font-mono text-sm">Radar Chart Placeholder (Assertiveness vs Cultural Tact vs Tech Clarity)</div>
      </div>
    </div>
  );
}
'''

sandbox_tsx = '''import React from "react";
export default function Sandbox() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
        <span className="w-3 h-3 rounded-full bg-[#F43F5E] animate-ping" />
        Diagnostic Sandbox
      </h1>
      <div className="bg-[#151B2B] border border-[#F43F5E]/50 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(244,63,94,0.1)]">
        <div className="bg-[#1E2638] px-4 py-2 border-b border-[#263046] flex justify-between items-center">
           <span className="text-xs font-mono text-[#F43F5E]">INCIDENT P0 - DATABASE DOWN</span>
           <span className="text-lg font-mono text-white font-bold tracking-widest">01:29</span>
        </div>
        <div className="p-6 space-y-6">
          <div className="bg-[#0B0F19] p-4 rounded-lg border border-[#263046] inline-block max-w-[80%]">
             <div className="text-xs text-[#38BDF8] font-bold mb-1">CTO (Slack)</div>
             <p className="text-sm text-slate-200">The primary replica just dropped. Users are getting 500s. Who touched the migration script? Fix this NOW!</p>
          </div>
          <div className="mt-8">
             <div className="text-xs text-slate-400 mb-2 uppercase tracking-wider font-semibold">Your Response (Voice or Text)</div>
             <textarea className="w-full bg-[#0B0F19] border border-[#A855F7]/50 rounded-lg p-4 text-slate-200 font-mono text-sm h-32 focus:outline-none focus:ring-2 focus:ring-[#A855F7]/50 transition-all" placeholder="> Type your response here..." />
             <div className="flex justify-end mt-4">
                <button className="bg-[#A855F7] hover:bg-[#C084FC] text-white px-6 py-2 rounded-lg font-bold text-sm shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all">Submit Response</button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
'''

roleplay_tsx = '''import React from "react";
import { Mic, PhoneOff, Settings2 } from "lucide-react";

export default function Roleplay() {
  return (
    <div className="h-full flex flex-col max-w-5xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white tracking-tight">AI Roleplay Room</h1>
        <div className="flex gap-2">
           <span className="px-3 py-1 bg-[#F59E0B]/20 text-[#F59E0B] rounded-full text-xs font-bold border border-[#F59E0B]/30">Medium Pressure</span>
           <span className="px-3 py-1 bg-[#34D399]/20 text-[#34D399] rounded-full text-xs font-bold border border-[#34D399]/30">Tech Lead Persona</span>
        </div>
      </div>
      
      <div className="flex-1 flex gap-6 min-h-[500px]">
        {/* Chat Area */}
        <div className="flex-1 bg-[#151B2B] rounded-xl border border-[#263046] flex flex-col overflow-hidden">
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-slate-700 flex-shrink-0 mt-1" />
              <div className="bg-[#1E2638] p-3 rounded-lg rounded-tl-none border border-[#263046]">
                <p className="text-sm text-slate-200">I reviewed your PR. Why did you introduce another abstraction layer? This seems like premature optimization.</p>
              </div>
            </div>
            <div className="flex gap-4 flex-row-reverse">
              <div className="w-8 h-8 rounded-full bg-[#A855F7]/20 border border-[#A855F7]/50 flex-shrink-0 mt-1" />
              <div className="bg-[#A855F7]/10 p-3 rounded-lg rounded-tr-none border border-[#A855F7]/30">
                <p className="text-sm text-[#E9DDFF]">The abstraction decouples the database logic so we can easily mock it in our unit tests.</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 border-t border-[#263046] bg-[#0B0F19]">
            <div className="flex gap-4">
              <button className="h-12 w-12 rounded-full bg-[#F43F5E]/10 border border-[#F43F5E]/50 flex items-center justify-center text-[#F43F5E] hover:bg-[#F43F5E] hover:text-white transition-all shadow-[0_0_15px_rgba(244,63,94,0.2)]">
                 <Mic size={20} />
              </button>
              <input type="text" className="flex-1 bg-[#1E2638] border border-[#263046] rounded-full px-6 text-sm text-slate-200 focus:outline-none focus:border-[#A855F7]/50" placeholder="Or type your reply..." />
              <button className="h-12 w-12 rounded-full bg-[#263046] flex items-center justify-center text-slate-400 hover:bg-[#F43F5E] hover:text-white transition-all">
                 <PhoneOff size={18} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Real-time metrics */}
        <div className="w-80 space-y-4">
           <div className="bg-[#151B2B] p-5 rounded-xl border border-[#263046]">
             <h3 className="text-xs font-mono text-slate-400 mb-4">LIVE CADENCE</h3>
             <div className="space-y-4">
                <div>
                   <div className="flex justify-between text-xs mb-1">
                     <span className="text-slate-300">Pace (WPM)</span>
                     <span className="text-[#34D399]">124 (Optimal)</span>
                   </div>
                   <div className="h-1.5 bg-[#1E2638] rounded-full"><div className="h-full w-[60%] bg-[#34D399] rounded-full shadow-[0_0_5px_#34D399]"></div></div>
                </div>
                <div>
                   <div className="flex justify-between text-xs mb-1">
                     <span className="text-slate-300">Tone</span>
                     <span className="text-[#38BDF8]">Assertive</span>
                   </div>
                   <div className="h-1.5 bg-[#1E2638] rounded-full"><div className="h-full w-[80%] bg-[#38BDF8] rounded-full shadow-[0_0_5px_#38BDF8]"></div></div>
                </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
'''

toolkit_tsx = '''import React from "react";
export default function Toolkit() {
  const cards = [
    { title: "Pushback on Scope Creep", desc: "How to say no to new features without saying no." },
    { title: "Defending Tech Debt", desc: "Explaining refactoring value to non-technical stakeholders." },
    { title: "Incident Apology", desc: "Taking accountability without self-flagellation." },
  ];
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-white tracking-tight">Survival Toolkit</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map(c => (
           <div key={c.title} className="bg-[#151B2B] p-6 rounded-xl border border-[#263046] hover:border-[#38BDF8]/50 hover:shadow-[0_0_20px_rgba(56,189,248,0.15)] transition-all cursor-pointer group">
              <h3 className="font-bold text-[#E9DDFF] text-lg mb-2 group-hover:text-[#38BDF8]">{c.title}</h3>
              <p className="text-sm text-slate-400">{c.desc}</p>
           </div>
        ))}
      </div>
    </div>
  );
}
'''

review_tsx = '''import React from "react";
export default function Review() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-white tracking-tight">Post-Mortem Review</h1>
      <div className="bg-[#151B2B] p-6 rounded-xl border border-[#263046]">
         <div className="flex items-center gap-4 mb-6">
            <div className="text-center">
              <div className="text-sm text-slate-400 line-through">Score 42</div>
              <div className="text-xs text-[#F43F5E]">Defensive</div>
            </div>
            <div className="text-[#38BDF8] px-4">→</div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#34D399] drop-shadow-[0_0_8px_#34D399]">Score 88</div>
              <div className="text-xs text-[#34D399]">Staff Architect</div>
            </div>
         </div>
         
         <div className="space-y-4">
            <div className="p-4 bg-[#F43F5E]/10 border border-[#F43F5E]/30 rounded-lg">
               <div className="text-xs text-[#F43F5E] font-bold mb-1">ORIGINAL (AGGRESSIVE)</div>
               <div className="text-sm text-slate-300">"Why did you merge this without testing? It broke the whole server."</div>
            </div>
            <div className="p-4 bg-[#A855F7]/15 border border-[#A855F7]/40 rounded-lg shadow-[0_0_15px_rgba(168,85,247,0.1)]">
               <div className="text-xs text-[#C084FC] font-bold mb-1">SUGGESTED REWRITE (ASSERTIVE)</div>
               <div className="text-sm text-white font-medium">"Let's review the CI pipeline that allowed this to merge so we can add safeguards against this failure pattern."</div>
            </div>
         </div>
      </div>
    </div>
  );
}
'''

b2b_tsx = '''import React from "react";
export default function B2BManager() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-white tracking-tight">B2B Manager Hub</h1>
      <div className="bg-[#151B2B] rounded-xl border border-[#263046] overflow-hidden">
        <table className="w-full text-left text-sm">
           <thead className="bg-[#1E2638] text-slate-400">
             <tr>
               <th className="px-6 py-4 font-semibold">Engineer</th>
               <th className="px-6 py-4 font-semibold">Total Sessions</th>
               <th className="px-6 py-4 font-semibold">Avg Tact Score</th>
               <th className="px-6 py-4 font-semibold">Primary Bottleneck</th>
             </tr>
           </thead>
           <tbody className="divide-y divide-[#263046] text-slate-200">
             <tr className="hover:bg-[#1E2638]/50">
                <td className="px-6 py-4 flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-slate-700" />
                   Nguyen Van A
                </td>
                <td className="px-6 py-4">24</td>
                <td className="px-6 py-4"><span className="text-[#34D399] font-bold">82</span></td>
                <td className="px-6 py-4"><span className="px-2 py-1 bg-[#F59E0B]/10 text-[#F59E0B] rounded border border-[#F59E0B]/20 text-xs">Over-apologizing</span></td>
             </tr>
           </tbody>
        </table>
      </div>
    </div>
  );
}
'''

pricing_tsx = '''import React from "react";
export default function Pricing() {
  return (
    <div className="max-w-5xl mx-auto space-y-12 py-10">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white tracking-tight mb-4">Invest in your communication</h1>
        <p className="text-slate-400 max-w-xl mx-auto">Debug your words and deploy impact. Choose the plan that fits your career or your entire engineering team.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="bg-[#151B2B] p-8 rounded-2xl border border-[#263046]">
            <h3 className="text-xl font-bold text-white">Developer</h3>
            <div className="mt-4 text-3xl font-bold text-white"></div>
            <p className="text-sm text-slate-400 mt-2">3 simulations per month.</p>
            <button className="mt-8 w-full py-2 bg-[#1E2638] text-white rounded-lg hover:bg-[#263046] border border-[#263046]">Start Free</button>
         </div>
         <div className="bg-[#1E2638] p-8 rounded-2xl border border-[#A855F7] shadow-[0_0_30px_rgba(168,85,247,0.15)] relative">
            <div className="absolute top-0 right-8 -translate-y-1/2 bg-[#A855F7] text-white text-xs font-bold px-3 py-1 rounded-full">RECOMMENDED</div>
            <h3 className="text-xl font-bold text-[#C084FC]">Tech Lead (Pro)</h3>
            <div className="mt-4 text-3xl font-bold text-white"><span className="text-base text-slate-400 font-normal">/mo</span></div>
            <p className="text-sm text-slate-400 mt-2">Unlimited simulations & Tact Dashboard.</p>
            <button className="mt-8 w-full py-2 bg-gradient-to-r from-[#7C3AED] to-[#A855F7] text-white rounded-lg hover:opacity-90 font-bold">Upgrade Pro</button>
         </div>
         <div className="bg-[#151B2B] p-8 rounded-2xl border border-[#263046]">
            <h3 className="text-xl font-bold text-white">Enterprise</h3>
            <div className="mt-4 text-3xl font-bold text-white"><span className="text-base text-slate-400 font-normal">/seat</span></div>
            <p className="text-sm text-slate-400 mt-2">Custom scenarios & Manager Hub.</p>
            <button className="mt-8 w-full py-2 bg-[#1E2638] text-white rounded-lg hover:bg-[#263046] border border-[#263046]">Contact Sales</button>
         </div>
      </div>
    </div>
  );
}
'''

app_main_tsx = '''import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Sandbox from './pages/Sandbox';
import Roleplay from './pages/Roleplay';
import Toolkit from './pages/Toolkit';
import Review from './pages/Review';
import B2BManager from './pages/B2BManager';
import Pricing from './pages/Pricing';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<Layout />}>
           <Route path="dashboard" element={<Dashboard />} />
           <Route path="sandbox" element={<Sandbox />} />
           <Route path="roleplay" element={<Roleplay />} />
           <Route path="toolkit" element={<Toolkit />} />
           <Route path="review" element={<Review />} />
           <Route path="b2b" element={<B2BManager />} />
           <Route path="pricing" element={<Pricing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
'''

files = {
  'components/Layout.tsx': layout_tsx,
  'pages/Dashboard.tsx': dashboard_tsx,
  'pages/Sandbox.tsx': sandbox_tsx,
  'pages/Roleplay.tsx': roleplay_tsx,
  'pages/Toolkit.tsx': toolkit_tsx,
  'pages/Review.tsx': review_tsx,
  'pages/B2BManager.tsx': b2b_tsx,
  'pages/Pricing.tsx': pricing_tsx,
  'App.tsx': app_main_tsx
}

for path, content in files.items():
    with open(os.path.join(base_dir, path), 'w', encoding='utf-8') as f:
        f.write(content)

print("Scaffolded all pages successfully")
