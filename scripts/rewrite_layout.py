import os

base_dir = r'c:\Users\trand\Downloads\Lumina\resrouces\client\src'
components_dir = os.path.join(base_dir, 'components')
pages_dir = os.path.join(base_dir, 'pages')

# 1. Rewrite Layout.tsx
layout_tsx = """import { Outlet, Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Zap, BookOpen, Clock, Settings, LogOut, Command, Bell, Search, ChevronRight } from "lucide-react";
import { cn } from "../lib/utils";

export default function Layout() {
  const location = useLocation();

  const nav = [
    { name: "Dashboard", path: "/app/dashboard", icon: LayoutDashboard },
    { name: "Scenarios", path: "/app/sandbox", icon: Zap },
    { name: "Roleplay", path: "/app/roleplay", icon: Users },
    { name: "Toolkit", path: "/app/toolkit", icon: BookOpen },
    { name: "History Logs", path: "/app/review", icon: Clock },
    { name: "Team Overview", path: "/app/b2b", icon: Users },
  ];

  const breadcrumbs = location.pathname.split("/").filter(Boolean).slice(1);

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-50 overflow-hidden selection:bg-indigo-500/30 font-inter">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-zinc-950 flex flex-col hidden md:flex shrink-0">
        <div className="h-14 flex items-center px-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2 px-2">
            <div className="w-6 h-6 rounded bg-indigo-500 flex items-center justify-center font-bold text-xs text-white">L</div>
            <span className="font-semibold text-sm tracking-tight">Luminar</span>
            <span className="ml-2 px-1.5 py-0.5 rounded-md bg-zinc-800 text-[10px] font-mono text-zinc-400">v2.0</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
          
          <div className="space-y-1">
            <div className="px-3 mb-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Platform</div>
            {nav.map(item => (
              <Link 
                key={item.name} 
                to={item.path} 
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  location.pathname.startsWith(item.path) 
                    ? "bg-zinc-800/80 text-zinc-50" 
                    : "text-zinc-400 hover:bg-zinc-800/40 hover:text-zinc-200"
                )}
              >
                <item.icon size={16} />
                {item.name}
              </Link>
            ))}
          </div>

          <div className="space-y-1">
            <div className="px-3 mb-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Account</div>
            <Link 
              to="/app/settings" 
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                location.pathname.startsWith("/app/settings") 
                  ? "bg-zinc-800/80 text-zinc-50" 
                  : "text-zinc-400 hover:bg-zinc-800/40 hover:text-zinc-200"
              )}
            >
              <Settings size={16} />
              Preferences
            </Link>
          </div>
        </div>

        <div className="p-3 border-t border-white/10 shrink-0">
          <button 
            onClick={() => { localStorage.removeItem("isLoggedIn"); window.location.href = "/"; }} 
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:bg-zinc-800/40 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <img src="https://i.pravatar.cc/150?img=11" className="w-5 h-5 rounded-full grayscale group-hover:grayscale-0 transition-all" />
              <span>Alex Dev</span>
            </div>
            <LogOut size={14} className="opacity-0 group-hover:opacity-100 group-hover:text-rose-400 transition-all" />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 bg-zinc-950">
        
        {/* Top Header */}
        <header className="h-14 border-b border-white/10 bg-zinc-950/80 backdrop-blur-md flex items-center justify-between px-4 lg:px-6 shrink-0 z-10">
          <div className="flex items-center gap-2 text-sm text-zinc-400 capitalize">
             <span className="flex items-center gap-2 hover:text-zinc-200 cursor-pointer">Luminar <ChevronRight size={14} className="text-zinc-600"/></span>
             {breadcrumbs.map((crumb, i) => (
               <span key={crumb} className="flex items-center gap-2">
                 <span className={i === breadcrumbs.length - 1 ? "text-zinc-50 font-medium" : "hover:text-zinc-200 cursor-pointer"}>{crumb}</span>
                 {i < breadcrumbs.length - 1 && <ChevronRight size={14} className="text-zinc-600" />}
               </span>
             ))}
          </div>

          <div className="flex items-center gap-4">
            {/* Cmd+K Mock */}
            <button className="hidden md:flex items-center gap-4 px-3 py-1.5 bg-zinc-900 border border-white/10 rounded-md text-sm text-zinc-400 hover:border-white/20 hover:text-zinc-200 transition-colors">
              <div className="flex items-center gap-2"><Search size={14} /> Search workspace...</div>
              <div className="flex items-center gap-1 text-[10px] font-mono bg-zinc-800 px-1.5 py-0.5 rounded"><Command size={10} /> K</div>
            </button>

            <button className="relative p-2 text-zinc-400 hover:text-zinc-200 transition-colors rounded-lg hover:bg-zinc-800">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full animate-ping" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full" />
            </button>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
"""
with open(os.path.join(components_dir, 'Layout.tsx'), 'w', encoding='utf-8') as f:
    f.write(layout_tsx)

# 2. Rewrite Dashboard.tsx (Information Density, Toolbars, Filters)
dashboard_tsx = """import { Activity, Target, AlertCircle, Plus, Filter, Search, MoreHorizontal, ArrowRight, TrendingUp } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
         <div>
           <h1 className="text-2xl font-bold text-zinc-50 tracking-tight">Overview</h1>
           <p className="text-sm text-zinc-400 mt-1">Monitor your team's communication metrics and simulation history.</p>
         </div>
         <div className="flex items-center gap-2">
            <button className="px-3 py-2 bg-zinc-900 border border-white/10 text-sm font-medium rounded-lg text-zinc-300 hover:bg-zinc-800 hover:text-zinc-50 transition-colors flex items-center gap-2">
              <Filter size={14} /> Filter
            </button>
            <button className="px-3 py-2 bg-zinc-50 text-zinc-950 text-sm font-medium rounded-lg hover:bg-zinc-200 transition-colors flex items-center gap-2">
              <Plus size={14} /> New Scenario
            </button>
         </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <div className="bg-zinc-900/50 backdrop-blur-md border border-white/10 p-5 rounded-xl flex flex-col gap-4">
            <div className="flex justify-between items-center text-zinc-400 text-sm font-medium">
               <span className="flex items-center gap-2"><Activity size={16}/> Avg Tact Score</span>
               <span className="text-xs px-2 py-0.5 bg-zinc-800 rounded-md">Past 30d</span>
            </div>
            <div className="flex items-baseline gap-3">
               <span className="text-4xl font-bold text-zinc-50 tracking-tight">86.4</span>
               <span className="text-xs font-medium text-emerald-400 flex items-center"><TrendingUp size={12} className="mr-1"/> +4.2%</span>
            </div>
         </div>
         
         <div className="bg-zinc-900/50 backdrop-blur-md border border-white/10 p-5 rounded-xl flex flex-col gap-4">
            <div className="flex justify-between items-center text-zinc-400 text-sm font-medium">
               <span className="flex items-center gap-2"><Target size={16}/> Completed Sessions</span>
               <span className="text-xs px-2 py-0.5 bg-zinc-800 rounded-md">Past 30d</span>
            </div>
            <div className="flex items-baseline gap-3">
               <span className="text-4xl font-bold text-zinc-50 tracking-tight">24</span>
            </div>
         </div>
         
         <div className="bg-zinc-900/50 backdrop-blur-md border border-white/10 p-5 rounded-xl flex flex-col gap-4">
            <div className="flex justify-between items-center text-zinc-400 text-sm font-medium">
               <span className="flex items-center gap-2"><AlertCircle size={16}/> Hostile Escalations</span>
               <span className="text-xs px-2 py-0.5 bg-zinc-800 rounded-md text-rose-400/80">Needs Focus</span>
            </div>
            <div className="flex items-baseline gap-3">
               <span className="text-4xl font-bold text-rose-400 tracking-tight">3</span>
               <span className="text-xs font-medium text-zinc-500">incidents this week</span>
            </div>
         </div>
      </div>

      {/* Data Table Area */}
      <div className="bg-zinc-900/40 border border-white/10 rounded-xl overflow-hidden flex flex-col">
         <div className="p-4 border-b border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="font-semibold text-zinc-100">Recent Activity Logs</div>
            <div className="relative w-full sm:w-64">
               <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
               <input type="text" placeholder="Search logs..." className="w-full bg-zinc-950 border border-white/10 rounded-lg pl-9 pr-4 py-1.5 text-sm text-zinc-100 focus:outline-none focus:border-indigo-500/50 placeholder:text-zinc-600" />
            </div>
         </div>
         
         <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
               <thead className="bg-zinc-900/50 text-zinc-400 border-b border-white/10">
                  <tr>
                     <th className="px-4 py-3 font-medium">Scenario</th>
                     <th className="px-4 py-3 font-medium">Engineer</th>
                     <th className="px-4 py-3 font-medium">Status</th>
                     <th className="px-4 py-3 font-medium">Score</th>
                     <th className="px-4 py-3 font-medium">Date</th>
                     <th className="px-4 py-3 font-medium text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  {[
                    { id: "LOG-4091", name: "DB Migration Outage", user: "Alex Dev", status: "Completed", score: "88", date: "2 mins ago" },
                    { id: "LOG-4090", name: "PM Scope Pushback", user: "Sarah Lee", status: "In Progress", score: "--", date: "1 hour ago" },
                    { id: "LOG-4089", name: "Hostile PR Review", user: "Mike Chen", status: "Failed", score: "42", date: "Yesterday" },
                    { id: "LOG-4088", name: "Salary Negotiation", user: "Alex Dev", status: "Completed", score: "95", date: "2 days ago" },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-zinc-800/40 transition-colors group cursor-pointer">
                       <td className="px-4 py-3 text-zinc-200">
                          <div className="font-medium">{row.name}</div>
                          <div className="text-[10px] text-zinc-500 font-mono mt-0.5">{row.id}</div>
                       </td>
                       <td className="px-4 py-3 text-zinc-400 flex items-center gap-2">
                          <div className="w-5 h-5 rounded bg-zinc-800 flex items-center justify-center text-[10px] font-bold">{row.user[0]}</div>
                          {row.user}
                       </td>
                       <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium border ${
                             row.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                             row.status === 'Failed' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 
                             'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                          }`}>
                             <span className={`w-1.5 h-1.5 rounded-full ${
                                row.status === 'Completed' ? 'bg-emerald-400' : 
                                row.status === 'Failed' ? 'bg-rose-400' : 
                                'bg-indigo-400 animate-pulse'
                             }`} />
                             {row.status}
                          </span>
                       </td>
                       <td className="px-4 py-3 font-mono text-zinc-300">{row.score}</td>
                       <td className="px-4 py-3 text-zinc-500">{row.date}</td>
                       <td className="px-4 py-3 text-right">
                          <button className="p-1.5 text-zinc-500 hover:text-zinc-200 hover:bg-zinc-700 rounded transition-colors">
                             <MoreHorizontal size={16} />
                          </button>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
         
         <div className="p-3 border-t border-white/10 flex justify-center">
            <button className="text-xs font-medium text-zinc-400 hover:text-zinc-200 flex items-center gap-1 transition-colors">
              View All Logs <ArrowRight size={12} />
            </button>
         </div>
      </div>
      
    </div>
  );
}
"""
with open(os.path.join(pages_dir, 'Dashboard.tsx'), 'w', encoding='utf-8') as f:
    f.write(dashboard_tsx)

print("Rewrote Layout and Dashboard to strict Vercel/Linear style.")
