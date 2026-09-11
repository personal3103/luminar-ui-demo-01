import os
import base64
import re

code_html_path = r'c:\Users\trand\Downloads\Lumina\Document\UI\landing\code.html'
with open(code_html_path, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Navbar scroll effect
html = html.replace('<header class="fixed top-0 left-0 right-0 z-50 bg-[#0e0e14]/80 \nbackdrop-blur-xl border-b border-purple-900/30 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">', '<header id="main-navbar" class="fixed top-0 left-0 right-0 z-50 border-transparent transition-all duration-500">')
html = html.replace('<header class="fixed top-0 left-0 right-0 z-50 bg-[#0e0e14]/80 backdrop-blur-xl border-b border-purple-900/30 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">', '<header id="main-navbar" class="fixed top-0 left-0 right-0 z-50 border-transparent transition-all duration-500">')

# 2. Section -> h-screen
html = html.replace('<section class="relative w-full max-w-container-max mx-auto px-gutter-desktop pt-16 pb-16 overflow-hidden">', 
                    '<section class="relative w-full h-screen mx-auto overflow-hidden">')

# 3. Outer text container -> absolute at the top so it floats OVER the 3D model
html = html.replace('<div class="relative z-10 max-w-5xl mx-auto flex flex-col items-center pointer-events-auto">', 
                    '<div class="absolute top-[15vh] left-0 w-full z-20 flex flex-col items-center pointer-events-auto">')

# 4. Swap H1 and Pill
pill_pattern = re.compile(r'<div class="inline-flex items-center gap-2 px-4 py-1\.5 rounded-full[^>]*>.*?LUMINAR TACT ENGINE V2\.4 / LIVE TELEMETRY\s*</span>\s*</div>', re.DOTALL)
h1_pattern = re.compile(r'<h1 class="font-display-hero[^>]*>.*?Deploy impact\.</span>\s*</h1>', re.DOTALL)

pill_match = pill_pattern.search(html)
h1_match = h1_pattern.search(html)

if pill_match and h1_match:
    pill_text = pill_match.group(0)
    h1_text = h1_match.group(0)
    
    html = html.replace(pill_text, "[[PILL]]")
    html = html.replace(h1_text, "[[H1]]")
    
    h1_new = h1_text.replace('mt-6 leading-tight', 'leading-tight mb-6')
    
    html = html.replace("[[PILL]]", h1_new)
    html = html.replace("[[H1]]", pill_text)

# 5. 3D Container -> absolute full screen!
# It will sit behind the text (z-0 vs text z-20) and cover all black space.
# We shift it down slightly (top-[10vh]) so the center sphere is lower down, avoiding the text completely.
tact_pattern = re.compile(r'<div class="w-full h-\[520px\] max-w-4xl mx-auto relative z-10 my-4 flex items-center justify-center overflow-visible(\s*)select-none" id="tact-kinetic-container">', re.DOTALL)
new_tact = '<div class="absolute top-[10vh] left-0 w-full h-[90vh] z-0 flex items-center justify-center overflow-hidden pointer-events-none" id="tact-kinetic-container">'
html = tact_pattern.sub(new_tact, html)


# Base64 encode
html_base64 = base64.b64encode(html.encode('utf-8')).decode('utf-8')

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

print("Fixed the sharp cut and overlapping 3D model! Used absolute positioning to perfectly layer them.")
