import os

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
      <div className="w-64 bg-[#151B2B] border-r border-[#263046] flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-[#263046]">
          <span className="text-[#A855F7] font-bold text-xl tracking-tight">Luminar</span>
          <span className="ml-2 text-[10px] bg-[#A855F7]/20 text-[#C084FC] px-2 py-0.5 rounded border border-[#A855F7]/30">TACT v2.4</span>
        </div>
        <div className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-1">
          {navItems.map((item) => {
            const active = location.pathname.startsWith(item.path);
            return (
              <Link key={item.name} to={item.path} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${active ? 'bg-[#1E2638] text-[#C084FC] border border-[#A855F7]/30 shadow-[0_0_12px_rgba(168,85,247,0.15)]' : 'text-slate-400 hover:bg-[#1E2638] hover:text-slate-200'}`}>
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
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-[#0B0F19]/80 backdrop-blur-md border-b border-[#263046] flex items-center justify-between px-8 z-10">
          <div className="text-sm font-mono text-slate-400">
            SYSTEM STATUS: <span className="text-[#34D399] drop-shadow-[0_0_8px_#34D399]">ONLINE</span>
          </div>
          <div className="flex items-center gap-4">
             <div className="w-8 h-8 rounded-full bg-slate-700 ring-2 ring-[#A855F7]/50" />
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-8 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(168,85,247,0.05),transparent_50%)] pointer-events-none" />
          <Outlet />
        </main>
      </div>
    </div>
  );
}
'''
with open(r'src\components\Layout.tsx', 'w', encoding='utf-8') as f:
    f.write(layout_tsx)
