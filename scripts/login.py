import os

login_tsx = '''import { Link } from "react-router-dom";
import { Lock, Mail, ArrowRight } from "lucide-react";

export default function Login() {
  return (
    <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center p-4 relative overflow-hidden font-inter text-slate-200">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-tr from-[#7C3AED]/20 to-[#38BDF8]/10 blur-[100px] rounded-full pointer-events-none -z-10" />
      
      <div className="w-full max-w-md bg-[#151B2B]/80 backdrop-blur-xl p-8 rounded-2xl border border-[#263046] shadow-2xl relative z-10">
        <div className="text-center mb-8">
           <Link to="/" className="inline-block text-3xl font-bold text-white tracking-tight mb-2 hover:text-[#C084FC] transition-colors">
              Luminar
           </Link>
           <p className="text-slate-400 text-sm">Sign in to your Tact account</p>
        </div>
        
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-1">
             <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Address</label>
             <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={16} className="text-slate-500" />
                </div>
                <input type="email" placeholder="dev@company.com" className="w-full bg-[#0B0F19] border border-[#263046] rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#A855F7]/50 focus:ring-1 focus:ring-[#A855F7]/50 transition-all" />
             </div>
          </div>
          
          <div className="space-y-1">
             <div className="flex justify-between items-center">
               <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Password</label>
               <a href="#" className="text-xs text-[#A855F7] hover:text-[#C084FC]">Forgot?</a>
             </div>
             <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={16} className="text-slate-500" />
                </div>
                <input type="password" placeholder="••••••••" className="w-full bg-[#0B0F19] border border-[#263046] rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#A855F7]/50 focus:ring-1 focus:ring-[#A855F7]/50 transition-all" />
             </div>
          </div>
          
          <Link to="/app/dashboard" className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-[#7C3AED] to-[#A855F7] text-white font-bold rounded-lg hover:opacity-90 transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] mt-2">
             <span>Login to Console</span>
             <ArrowRight size={16} />
          </Link>
        </form>
        
        <div className="mt-6 pt-6 border-t border-[#263046] text-center text-sm text-slate-400">
           Don't have an account? <Link to="/app/pricing" className="text-[#38BDF8] hover:underline font-medium">View Plans</Link>
        </div>
      </div>
    </div>
  );
}
'''

with open(r'c:\Users\trand\Downloads\Lumina\resrouces\client\src\pages\Login.tsx', 'w', encoding='utf-8') as f:
    f.write(login_tsx)

# Update App.tsx
app_path = r'c:\Users\trand\Downloads\Lumina\resrouces\client\src\App.tsx'
with open(app_path, 'r', encoding='utf-8') as f:
    app_code = f.read()

# Add import Login
app_code = app_code.replace("import Pricing from './pages/Pricing';", "import Pricing from './pages/Pricing';\nimport Login from './pages/Login';")

# Add route
app_code = app_code.replace('<Route path="/" element={<LandingPage />} />', '<Route path="/" element={<LandingPage />} />\n        <Route path="/login" element={<Login />} />')

with open(app_path, 'w', encoding='utf-8') as f:
    f.write(app_code)

print("Created Login.tsx and updated App.tsx")
