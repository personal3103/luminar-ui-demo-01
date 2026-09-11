import { motion } from "framer-motion";
import { Users, TrendingUp, AlertCircle } from "lucide-react";

export default function B2BManager() {
  const team = [
    { name: "Nguyen Van A", role: "Senior Frontend", sessions: 24, score: 82, bottleneck: "Over-apologizing", trend: "+4" },
    { name: "Tran Thi B", role: "Backend Engineer", sessions: 18, score: 65, bottleneck: "Defensive Tone", trend: "-2" },
    { name: "Le Van C", role: "DevOps Engineer", sessions: 32, score: 94, bottleneck: "None", trend: "+1" },
    { name: "Pham D", role: "Tech Lead", sessions: 12, score: 78, bottleneck: "Vague Delegation", trend: "+5" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20 pt-4">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight">Manager Hub</h1>
          <p className="text-text-secondary mt-2">Track communication bottlenecks across your engineering organization.</p>
        </div>
        <button className="bg-surface border border-border px-4 py-2 rounded-lg text-sm font-medium hover:bg-card-active transition-colors shadow-sm">
          Export Report
        </button>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
         {[
           { label: "Team Avg Score", value: "79.8", icon: TrendingUp, color: "text-status-success" },
           { label: "Active Engineers", value: "24", icon: Users, color: "text-secondary" },
           { label: "Critical Bottlenecks", value: "3", icon: AlertCircle, color: "text-status-danger" }
         ].map((stat, i) => (
           <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-surface p-6 rounded-2xl border border-border shadow-md flex items-center justify-between">
              <div>
                 <div className="text-sm text-text-secondary mb-1">{stat.label}</div>
                 <div className="text-3xl font-bold text-white">{stat.value}</div>
              </div>
              <div className={`p-4 rounded-full bg-background border border-border ${stat.color}`}>
                 <stat.icon size={24} />
              </div>
           </motion.div>
         ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-surface rounded-3xl border border-border overflow-hidden shadow-xl">
        <div className="p-6 border-b border-border bg-card-active">
          <h3 className="font-bold text-white text-lg">Engineering Roster</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
             <thead className="bg-background/50 text-text-secondary text-xs uppercase tracking-wider">
               <tr>
                 <th className="px-6 py-4 font-semibold">Engineer</th>
                 <th className="px-6 py-4 font-semibold">Total Sessions</th>
                 <th className="px-6 py-4 font-semibold">Avg Tact Score</th>
                 <th className="px-6 py-4 font-semibold">Primary Bottleneck</th>
                 <th className="px-6 py-4 font-semibold text-right">Trend</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-border text-text-primary">
               {team.map((member, i) => (
                 <motion.tr 
                   initial={{ opacity: 0, x: -20 }} 
                   animate={{ opacity: 1, x: 0 }} 
                   transition={{ delay: 0.5 + (i * 0.1) }}
                   key={member.name} 
                   className="hover:bg-card-active transition-colors group cursor-pointer"
                 >
                    <td className="px-6 py-5">
                       <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/40 to-secondary/40 border border-border overflow-hidden">
                           <img src={`https://i.pravatar.cc/150?u=${member.name}`} className="w-full h-full object-cover" />
                         </div>
                         <div>
                           <div className="font-bold text-white group-hover:text-primary transition-colors">{member.name}</div>
                           <div className="text-xs text-text-secondary">{member.role}</div>
                         </div>
                       </div>
                    </td>
                    <td className="px-6 py-5 font-mono text-text-secondary">{member.sessions}</td>
                    <td className="px-6 py-5">
                       <span className={`font-bold ${member.score >= 80 ? 'text-status-success' : member.score >= 70 ? 'text-status-warning' : 'text-status-danger'}`}>
                         {member.score}
                       </span>
                    </td>
                    <td className="px-6 py-5">
                       {member.bottleneck === 'None' ? (
                         <span className="text-text-secondary italic">None</span>
                       ) : (
                         <span className="px-3 py-1 bg-background text-text-secondary rounded-full border border-border text-xs inline-flex items-center gap-2">
                           <span className="w-1.5 h-1.5 rounded-full bg-status-warning"></span>
                           {member.bottleneck}
                         </span>
                       )}
                    </td>
                    <td className="px-6 py-5 text-right font-mono">
                       <span className={member.trend.startsWith('+') ? 'text-status-success' : 'text-status-danger'}>{member.trend}</span>
                    </td>
                 </motion.tr>
               ))}
             </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
