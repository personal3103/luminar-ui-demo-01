import os
import base64
import re

code_html_path = r'c:\Users\trand\Downloads\Lumina\Document\UI\landing\code.html'
with open(code_html_path, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Navbar transparent on load, blurred on scroll
html = html.replace('<header class="fixed top-0 left-0 right-0 z-50 bg-[#0e0e14]/80 \nbackdrop-blur-xl border-b border-purple-900/30 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">', '<header id="main-navbar" class="fixed top-0 left-0 right-0 z-50 border-transparent transition-all duration-500">')
html = html.replace('<header class="fixed top-0 left-0 right-0 z-50 bg-[#0e0e14]/80 backdrop-blur-xl border-b border-purple-900/30 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">', '<header id="main-navbar" class="fixed top-0 left-0 right-0 z-50 border-transparent transition-all duration-500">')

# 2. Section container -> flex-col, h-screen
html = html.replace('<section class="relative w-full max-w-container-max mx-auto px-gutter-desktop pt-16 pb-16 overflow-hidden">', 
                    '<section class="relative w-full h-screen flex flex-col overflow-hidden pt-8">')

# 3. Outer text container -> shrink-0 to take only the space it needs at the top
html = html.replace('<div class="relative z-10 max-w-5xl mx-auto flex flex-col items-center pointer-events-auto">', 
                    '<div class="relative z-20 w-full flex flex-col items-center shrink-0">')

# 4. Inner text container -> add a gap
html = html.replace('<div class="max-w-3xl mx-auto flex flex-col items-center text-center pt-2">', 
                    '<div class="max-w-3xl mx-auto flex flex-col items-center text-center gap-4">')

# 5. Swap H1 and Pill
# The pill has class "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#161324]/90..."
# The H1 has class "font-display-hero text-display-hero md:text-5xl lg:text-6xl text-white..."
pill_pattern = re.compile(r'<div class="inline-flex items-center gap-2 px-4 py-1\.5 rounded-full[^>]*>.*?LUMINAR TACT ENGINE V2\.4 / LIVE TELEMETRY\s*</span>\s*</div>', re.DOTALL)
h1_pattern = re.compile(r'<h1 class="font-display-hero[^>]*>.*?Deploy impact\.</span>\s*</h1>', re.DOTALL)

pill_match = pill_pattern.search(html)
h1_match = h1_pattern.search(html)

if pill_match and h1_match:
    pill_text = pill_match.group(0)
    h1_text = h1_match.group(0)
    
    # We remove both from the html temporarily
    html = html.replace(pill_text, "[[PILL_PLACEHOLDER]]")
    html = html.replace(h1_text, "[[H1_PLACEHOLDER]]")
    
    # We want H1 first, then Pill
    # In original, it was Pill then H1.
    # So we replace [[PILL_PLACEHOLDER]] with H1, and [[H1_PLACEHOLDER]] with Pill
    html = html.replace("[[PILL_PLACEHOLDER]]", h1_text)
    html = html.replace("[[H1_PLACEHOLDER]]", pill_text)

# Fix h1 top margin since it's now first
html = html.replace('mt-6 leading-tight', 'leading-tight')

# 6. 3D Container -> flex-1 w-full to fill remaining space
tact_pattern = re.compile(r'<div class="w-full h-\[520px\] max-w-4xl mx-auto relative z-10 my-4 flex items-center justify-center overflow-visible \nselect-none" id="tact-kinetic-container">')
html = tact_pattern.sub('<div class="w-full flex-1 relative z-10 flex items-center justify-center overflow-hidden" id="tact-kinetic-container">', html)

# Fallback pattern for single-line version
tact_pattern2 = re.compile(r'<div class="w-full h-\[520px\] max-w-4xl mx-auto relative z-10 my-4 flex items-center justify-center overflow-visible select-none" id="tact-kinetic-container">')
html = tact_pattern2.sub('<div class="w-full flex-1 relative z-10 flex items-center justify-center overflow-hidden" id="tact-kinetic-container">', html)


# Convert to base64
html_base64 = base64.b64encode(html.encode('utf-8')).decode('utf-8')

# Rewrite LandingPage.tsx
tsx_content = f"""import {{ useEffect, useRef }} from "react";

export default function LandingPage() {{
  const containerRef = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);

  const htmlBase64 = "{html_base64}";

  useEffect(() => {{
    if (containerRef.current && !mounted.current) {{
      containerRef.current.innerHTML = atob(htmlBase64);
      
      const navbar = containerRef.current.querySelector('#main-navbar');
      if (navbar) {{
         window.addEventListener('scroll', () => {{
            if (window.scrollY > 50) {{
               navbar.classList.add('bg-[#0e0e14]/90', 'backdrop-blur-xl', 'border-b', 'border-purple-900/30', 'shadow-[0_4px_30px_rgba(0,0,0,0.5)]');
               navbar.classList.remove('border-transparent');
            }} else {{
               navbar.classList.remove('bg-[#0e0e14]/90', 'backdrop-blur-xl', 'border-b', 'border-purple-900/30', 'shadow-[0_4px_30px_rgba(0,0,0,0.5)]');
               navbar.classList.add('border-transparent');
            }}
         }});
      }}

      // Ensure 3D canvas scales properly
      const tactContainer = containerRef.current.querySelector('#tact-kinetic-container') as HTMLElement;
      if (tactContainer) {{
         // We let it behave as flex-1 to fill the remaining screen space naturally
         // No manual absolute positioning needed to avoid overlapping
      }}

      // Scroll animate classes
      const sections = containerRef.current.querySelectorAll("section:not(:first-of-type), h2, h3, p");
      sections.forEach((el, i) => {{
         if (!el.classList.contains("scroll-animate")) {{
            el.classList.add("scroll-animate");
            el.classList.add(`scroll-delay-${{(i % 3) + 1}}`);
         }}
      }});

      const observer = new IntersectionObserver((entries) => {{
        entries.forEach(entry => {{
          if (entry.isIntersecting) {{
            entry.target.classList.add('is-visible');
          }}
        }});
      }}, {{ threshold: 0.1 }});
      
      containerRef.current.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));

      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      const ctas = containerRef.current.querySelectorAll('button');
      ctas.forEach(btn => {{
         if (btn.innerText.includes('Launch Simulator') || btn.innerText.includes('Explore Scenarios') || btn.innerText.includes('Try 90s Incident')) {{
            btn.onclick = () => window.location.href = isLoggedIn ? '/app/dashboard' : '/login';
         }}
      }});

      const script = document.createElement("script");
      script.src = "/landing-scripts.js";
      script.async = true;
      document.body.appendChild(script);

      mounted.current = true;
    }}
  }}, []);

  return <div ref={{containerRef}} className="w-full min-h-screen" />;
}}
"""

dest_path = r'c:\Users\trand\Downloads\Lumina\resrouces\client\src\pages\LandingPage.tsx'
with open(dest_path, 'w', encoding='utf-8') as f:
    f.write(tsx_content)

print("Fixed layout! H1 is now at the top, no big black void, and 3D container fills the rest!")
