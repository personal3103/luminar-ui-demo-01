import { Activity, Target, AlertCircle, Plus, Filter, Search, MoreHorizontal, ArrowRight, TrendingUp } from "lucide-react";

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
