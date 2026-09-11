import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Repeat, ShieldAlert, CheckCircle2, RotateCw, Lightbulb, Sparkles } from "lucide-react";
import { Link, useParams } from "react-router-dom";

interface FlashcardContent {
  id: string;
  title: string;
  tag: string;
  subtitle: string;
  situationTitle: string;
  situationDesc: string;
  tacticalResponse: string;
  whyItWorks: string;
  antiPatterns: { text: string; note: string }[];
  image: string;
}

const FLASHCARDS: Record<string, FlashcardContent> = {
  "1": {
    id: "1",
    title: "Pushback on Scope Creep",
    tag: "SCOPE MANAGEMENT",
    subtitle: 'Master the art of saying "no" to product managers without causing friction.',
    situationTitle: "The Sprint Pressure",
    situationDesc: 'Product Manager asks to add "just one small button and quick modal" 2 days before the sprint ends.',
    tacticalResponse: '"I love that feature idea. If we include this modal now, we will need to drop the payment retry flow to hit Friday\'s release, or extend the sprint by 3 days. Which trade-off aligns best with your quarterly targets?"',
    whyItWorks: "You aren't saying no. You are presenting the engineering reality as a business trade-off, shifting the decision-making ownership back to the PM.",
    antiPatterns: [
      { text: '"We can\'t do that, it\'s too late."', note: "Hostile, inflexible and creates product-engineering friction" },
      { text: '"I guess I can work the weekend to get it done."', note: "Hero syndrome that normalizes unpaid crunch and causes burnout" },
    ],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
  },
  "2": {
    id: "2",
    title: "Defending Tech Debt",
    tag: "ARCHITECTURE",
    subtitle: "Explaining refactoring and code health value to non-technical stakeholders in financial terms.",
    situationTitle: "The Feature vs Stability Dilemma",
    situationDesc: "Stakeholders want 4 new features shipped immediately, ignoring brittle database queries that cause weekly latency spikes.",
    tacticalResponse: '"If we don\'t optimize this database query bottleneck now, new feature releases will take 40% longer next quarter and we risk a 4-hour checkout outage. Investing 3 days this sprint saves us 3 weeks of fire drills."',
    whyItWorks: "Framing technical debt as financial interest and feature delivery tax helps executives understand ROI rather than seeing it as engineer perfectionism.",
    antiPatterns: [
      { text: '"The previous dev wrote terrible spaghetti code."', note: "Blaming others sounds unprofessional and doesn't explain business value" },
      { text: '"Just trust me, it needs a full rewrite."', note: "Vague demands erode executive trust and invite instant rejection" },
    ],
    image: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=800&auto=format&fit=crop",
  },
  "3": {
    id: "3",
    title: "Incident Apology",
    tag: "CRISIS COMM",
    subtitle: "Taking clear accountability during production outages without unnecessary self-flagellation.",
    situationTitle: "The Broken Release Outage",
    situationDesc: "Your deployment introduced an unhandled edge case causing a 15-minute outage on user login during peak traffic.",
    tacticalResponse: '"At 14:10 UTC, a config drift during deploy caused auth instability affecting 12% of sessions. We rolled back by 14:25 UTC. All services are healthy. We are adding automated canary tests and an immutable lock to prevent recurrence."',
    whyItWorks: "Transparent timelines, clear blast radius containment, and concrete preventative action inspire confidence and shift focus from blame to prevention.",
    antiPatterns: [
      { text: '"It was AWS/DNS fault, not our team\'s."', note: "Defensive excuse-making destroys leadership credibility" },
      { text: '"I\'m so sorry, I made a terrible mistake."', note: "Over-apologizing invites unnecessary panic and scapegoating" },
    ],
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
  },
  "4": {
    id: "4",
    title: "Architectural Shift",
    tag: "SYSTEM DESIGN",
    subtitle: "Proposing a major rewrite or cloud migration safely using incremental strangler patterns.",
    situationTitle: "The Monolith Bottleneck",
    situationDesc: "The core monolith service is scaling poorly, but leadership fears that rewriting will take 12 months with zero customer value.",
    tacticalResponse: '"Rather than a risky full rewrite, let\'s apply the strangler-fig pattern to the notification pipeline first. We will run dual-writes with canary metrics for 2 sprints before touching any core billing APIs."',
    whyItWorks: "Demonstrating an incremental, de-risked rollout plan overcomes fear of failure and provides measurable checkpoints for each milestone.",
    antiPatterns: [
      { text: '"We need to stop all feature work for 6 months to rebuild this properly."', note: "Almost guaranteed to be rejected by executive leadership" },
      { text: '"Modern microservices will solve all our problems magically."', note: "Lacks architectural rigor and ignores operational complexity" },
    ],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
  },
  "5": {
    id: "5",
    title: "Mentoring Juniors",
    tag: "LEADERSHIP",
    subtitle: "Delivering critical code review feedback and coaching without destroying junior morale.",
    situationTitle: "The Giant Unvetted PR",
    situationDesc: "A junior engineer submitted an 800-line pull request with missing test cases and several unhandled null pointers.",
    tacticalResponse: '"Great initiative getting this entire user flow working end-to-end! To keep our review velocity high, let\'s split this into two smaller PRs. Notice how line 42 handles null inputs? Let\'s pair for 15 minutes to write a test case for that together."',
    whyItWorks: "Validates effort first, coaches through targeted questions rather than direct corrections, and pairs on high-leverage learning moments.",
    antiPatterns: [
      { text: '"Why didn\'t you write any unit tests?"', note: "Confrontational tone triggers immediate defensiveness and shame" },
      { text: '"I rewrote your PR because it was incorrect."', note: "Robbing them of the learning experience crushes self-confidence" },
    ],
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop",
  },
  "6": {
    id: "6",
    title: "Cross-team Conflict",
    tag: "COLLABORATION",
    subtitle: "Resolving API breaking contract disputes and cross-service dependencies cleanly.",
    situationTitle: "The Breaking API Change",
    situationDesc: "Downstream mobile engineering complains the backend team shipped a breaking JSON schema change without advance warning.",
    tacticalResponse: '"Let\'s align on the v1 and v2 contract spec today in OpenAPI. We will restore backwards compatibility on v1 for 30 days while your team migrates to v2 using our mock test server."',
    whyItWorks: "Provides immediate unblocking, removes ambiguity with an OpenAPI contract spec, and agrees on a realistic deprecation window.",
    antiPatterns: [
      { text: '"We posted this in the public Slack channel last week, you should have checked."', note: "Dismissive attitude burns cross-team relationships" },
      { text: '"You have to update your app right now, we won\'t support old endpoints."', note: "Unrealistic demands trigger escalation to VPs" },
    ],
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
  },
};

export default function FlashcardDetail() {
  const { id } = useParams();
  const card = (id && FLASHCARDS[id]) || FLASHCARDS["1"];
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20 pt-2">
      {/* Top Breadcrumb & Tag */}
      <div className="flex items-center justify-between">
        <Link 
          to="/app/toolkit" 
          className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors px-3 py-1.5 rounded-lg bg-cyan-950/40 border border-cyan-500/20 hover:border-cyan-500/40"
        >
          <ArrowLeft size={14} /> Back to Survival Toolkit
        </Link>
        <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded bg-white/5 border border-white/10 text-zinc-300">
          {card.tag}
        </span>
      </div>
      
      {/* Title & Description */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{card.title}</h1>
        <p className="text-zinc-400 mt-2 text-sm sm:text-base leading-relaxed">{card.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
        {/* 3D Flip Card Container */}
        <div className="flex flex-col">
          <div 
            className="perspective-1000 w-full h-[460px] sm:h-[480px] cursor-pointer"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <motion.div 
              animate={{ rotateY: isFlipped ? 180 : 0 }} 
              transition={{ duration: 0.6, type: "spring", stiffness: 240, damping: 22 }}
              className="w-full h-full relative preserve-3d"
            >
              {/* Front Card: The Situation */}
              <div className="absolute inset-0 backface-hidden bg-zinc-950/90 rounded-3xl border border-cyan-500/30 shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(6,182,212,0.15)] overflow-hidden flex flex-col justify-between">
                {/* Visual Header Image */}
                <div className="h-44 overflow-hidden relative bg-zinc-900 shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent z-10" />
                  <img 
                    src={card.image} 
                    alt={card.title}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      if (e.currentTarget.parentElement) {
                        e.currentTarget.parentElement.style.backgroundImage = 'radial-gradient(circle at center, #0e7490 0%, #030712 100%)';
                      }
                    }}
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute top-4 left-4 z-20 px-2.5 py-0.5 rounded bg-black/70 border border-cyan-500/30 text-[10px] font-mono text-cyan-300 font-semibold">
                    THE SCENARIO
                  </div>
                </div>

                {/* Situation Description */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-center text-center space-y-3">
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{card.situationTitle}</h2>
                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-md mx-auto">
                    {card.situationDesc}
                  </p>
                </div>

                {/* Flip Prompt Footer */}
                <div className="p-4 bg-zinc-900/50 border-t border-white/10 flex items-center justify-center gap-2 text-xs font-mono text-cyan-400 font-semibold">
                  <RotateCw size={14} className="animate-spin" style={{ animationDuration: "6s" }} />
                  <span>CLICK CARD TO FLIP // REVEAL TACTIC</span>
                </div>
              </div>

              {/* Back Card: The Tactical Response */}
              <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-zinc-950 via-zinc-900 to-[#07131e] rounded-3xl border border-cyan-400/50 shadow-[0_0_35px_rgba(6,182,212,0.25)] p-6 sm:p-8 flex flex-col justify-between rotate-y-180">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-cyan-400 flex items-center gap-1.5 font-bold">
                      <CheckCircle2 size={16} className="text-cyan-400" /> 
                      THE TACTICAL PLAYBOOK
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500">BACK</span>
                  </div>

                  <blockquote className="text-base sm:text-lg text-white font-medium italic leading-relaxed pl-4 border-l-2 border-cyan-400 my-4">
                    {card.tacticalResponse}
                  </blockquote>
                </div>

                <div className="space-y-4">
                  <div className="bg-cyan-950/30 p-4 rounded-xl border border-cyan-500/20">
                    <div className="text-[11px] font-mono text-cyan-300 font-bold mb-1 flex items-center gap-1.5">
                      <Lightbulb size={13} />
                      <span>WHY IT WORKS</span>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      {card.whyItWorks}
                    </p>
                  </div>

                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsFlipped(false);
                    }}
                    className="w-full py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-mono flex items-center justify-center gap-2 transition-colors"
                  >
                    <RotateCw size={12} /> Flip Back to Scenario
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Info Column: Anti-patterns & Action */}
        <div className="space-y-6">
          <div className="bg-zinc-950/70 p-6 rounded-2xl border border-white/10 shadow-lg">
            <h3 className="text-xs font-mono text-rose-400 font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
              <ShieldAlert size={16} className="text-rose-400" /> Dangerous Anti-patterns
            </h3>
            <ul className="space-y-4">
              {card.antiPatterns.map((ap, idx) => (
                <li key={idx} className="flex gap-3 items-start">
                  <span className="text-rose-400 font-bold text-sm">✕</span>
                  <div className="text-sm">
                    <span className="text-zinc-200 font-medium block">{ap.text}</span>
                    <span className="text-xs text-rose-300/80 mt-0.5 block">{ap.note}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-cyan-950/40 via-zinc-900 to-zinc-950 p-6 rounded-2xl border border-cyan-500/30 shadow-lg flex flex-col justify-center items-center text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Repeat size={20} />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Ready to practice this scenario?</h3>
              <p className="text-xs text-zinc-400 mt-1 max-w-sm">
                Take this response into the AI Roleplay Simulator and test your negotiation skills under pressure.
              </p>
            </div>
            <Link 
              to="/app/roleplay" 
              className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-mono font-bold tracking-wider rounded-xl transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center justify-center gap-2"
            >
              <Sparkles size={14} /> START AI SIMULATION
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
