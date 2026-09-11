import { Outlet, Link, useLocation } from "react-router-dom";
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
          <Link to="/" className="flex items-center gap-2.5 px-2 group cursor-pointer" title="Return to Landing Page">
            <img src="./logo.png" alt="Luminar" className="w-7 h-7 object-contain filter drop-shadow-[0_0_8px_rgba(99,102,241,0.5)] group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-sm tracking-tight text-white group-hover:text-indigo-300 transition-colors">Luminar</span>
            <span className="ml-2 px-1.5 py-0.5 rounded-md bg-zinc-800 text-[10px] font-mono text-zinc-400">v2.0</span>
          </Link>
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
