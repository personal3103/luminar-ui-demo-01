import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Layers } from "lucide-react";

export const TOOLKIT_CARDS = [
  {
    id: "1",
    title: "Pushback on Scope Creep",
    tag: "SCOPE MANAGEMENT",
    desc: "How to say no to new features without sounding defensive or confrontational.",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Defending Tech Debt",
    tag: "ARCHITECTURE",
    desc: "Explaining refactoring and code health value to non-technical stakeholders in financial terms.",
    img: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Incident Apology",
    tag: "CRISIS COMM",
    desc: "Taking clear accountability during production outages without unnecessary self-flagellation.",
    img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "Architectural Shift",
    tag: "SYSTEM DESIGN",
    desc: "Proposing a major rewrite or cloud migration safely using incremental strangler patterns.",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "5",
    title: "Mentoring Juniors",
    tag: "LEADERSHIP",
    desc: "Delivering critical code review feedback and coaching without destroying junior morale.",
    img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "6",
    title: "Cross-team Conflict",
    tag: "COLLABORATION",
    desc: "Resolving API breaking contract disputes and cross-service dependencies cleanly.",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop",
  },
];

export default function Toolkit() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>TACTICAL PLAYBOOKS // 6 FLASHCARDS</span>
        </div>
        <h1 className="text-4xl font-bold text-white tracking-tight mb-3">Survival Toolkit</h1>
        <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Tactical communication templates and interactive 3D flashcards to help you navigate the hardest conversations in software engineering.
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {TOOLKIT_CARDS.map((c, i) => (
          <Link
            key={c.id}
            to={`/app/toolkit/${c.id}`}
            className="block h-full focus:outline-none"
          >
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              whileHover={{ y: -6, scale: 1.015 }}
              className="h-full bg-zinc-900/60 hover:bg-zinc-900/80 rounded-2xl border border-white/10 hover:border-cyan-500/50 overflow-hidden cursor-pointer group flex flex-col shadow-lg hover:shadow-[0_10px_30px_rgba(6,182,212,0.15)] transition-all duration-300"
            >
              {/* Card Image Header with Cyber Gradient & Safe Fallback */}
              <div className="h-44 overflow-hidden relative bg-zinc-950">
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent z-10" />
                <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-mono text-cyan-300 font-semibold uppercase tracking-wider">
                  <Layers className="w-3 h-3 text-cyan-400" />
                  <span>{c.tag}</span>
                </div>
                <img 
                  src={c.img} 
                  alt={c.title}
                  onError={(e) => {
                    // Safe SVG fallback if internet blocks unsplash
                    e.currentTarget.style.display = 'none';
                    if (e.currentTarget.parentElement) {
                      e.currentTarget.parentElement.style.backgroundImage = 'radial-gradient(circle at center, #0e7490 0%, #030712 100%)';
                    }
                  }}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 opacity-80 group-hover:opacity-100" 
                />
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-white text-lg sm:text-xl mb-2 group-hover:text-cyan-300 transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {c.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono font-semibold text-cyan-400 group-hover:text-cyan-300">
                  <span className="tracking-wider">VIEW FLASHCARD</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
