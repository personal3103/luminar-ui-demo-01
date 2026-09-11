import os
import base64
import re

code_html_path = r'c:\Users\trand\Downloads\Lumina\Document\UI\landing\code.html'
with open(code_html_path, 'r', encoding='utf-8') as f:
    html_content = f.read()

# 1. Navbar animation (transparent at top, blurred on scroll)
html_content = html_content.replace('<header class="fixed top-0 left-0 right-0 z-50 bg-[#0e0e14]/80 \nbackdrop-blur-xl border-b border-purple-900/30 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">', '<header id="main-navbar" class="fixed top-0 left-0 right-0 z-50 border-transparent transition-all duration-500">')
html_content = html_content.replace('<header class="fixed top-0 left-0 right-0 z-50 bg-[#0e0e14]/80 backdrop-blur-xl border-b border-purple-900/30 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">', '<header id="main-navbar" class="fixed top-0 left-0 right-0 z-50 border-transparent transition-all duration-500">')

# 2. Hero Section: make it min-h-screen and flex-col
html_content = html_content.replace('<section class="relative w-full max-w-container-max mx-auto px-gutter-desktop pt-16 pb-16 overflow-hidden">', '<section class="relative w-full min-h-screen mx-auto overflow-hidden flex flex-col items-center pt-24">')

# 3. Text container: add some spacing
html_content = html_content.replace('<div class="relative z-10 max-w-5xl mx-auto flex flex-col items-center pointer-events-auto">', '<div class="relative z-10 w-full flex flex-col items-center pointer-events-auto h-full flex-1">')
html_content = html_content.replace('<div class="max-w-3xl mx-auto flex flex-col items-center text-center pt-2">', '<div class="max-w-3xl mx-auto flex flex-col items-center text-center z-20 relative">')

# 4. 3D Container: Full width, fill remaining height, sit below text
# Original: class="w-full h-[520px] max-w-4xl mx-auto relative z-10 my-4 flex items-center justify-center overflow-visible select-none" id="tact-kinetic-container"
# We want it to be w-full, absolutely no max-w, taking up the rest of the flex container, or just an absolute element positioned at the bottom.
# Let's make it absolute bottom so it doesn't push text up, but wide enough to cover black sides.
# "Phần màu đen phải được bao phủ bởi mô hình 3d": make it absolute, w-full, but shifted down.
html_content = re.sub(
    r'<div class="[^"]*" id="tact-kinetic-container">',
    '<div class="absolute bottom-0 left-0 w-full h-[75vh] z-0 flex items-center justify-center overflow-visible select-none" id="tact-kinetic-container">',
    html_content
)

# 5. Convert back to string and encode to base64
html_base64 = base64.b64encode(html_content.encode('utf-8')).decode('utf-8')

# Now rewrite LandingPage.tsx
tsx_content = f"""import {{ useEffect, useRef }} from "react";

export default function LandingPage() {{
  const containerRef = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);

  const htmlBase64 = "{html_base64}";

  useEffect(() => {{
    if (containerRef.current && !mounted.current) {{
      containerRef.current.innerHTML = atob(htmlBase64);
      
      // Scroll animation for Navbar
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

      // Auth logic
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      const ctas = containerRef.current.querySelectorAll('button');
      ctas.forEach(btn => {{
         if (btn.innerText.includes('Launch Simulator') || btn.innerText.includes('Explore Scenarios') || btn.innerText.includes('Try 90s Incident')) {{
            btn.onclick = () => window.location.href = isLoggedIn ? '/app/dashboard' : '/login';
         }}
      }});

      // Scripts
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

print("Modified HTML to fix overlapping issues!")
