import os
import base64
import re

code_html_path = r'c:\Users\trand\Downloads\Lumina\Document\UI\landing\code.html'
with open(code_html_path, 'r', encoding='utf-8') as f:
    html_content = f.read()

# 1. Modify Navbar to be transparent initially, with a specific ID so we can script it
html_content = html_content.replace('<header class="fixed top-0 left-0 right-0 z-50 bg-[#0e0e14]/80 \nbackdrop-blur-xl border-b border-purple-900/30 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">', '<header id="main-navbar" class="fixed top-0 left-0 right-0 z-50 border-transparent transition-all duration-500">')
html_content = html_content.replace('<header class="fixed top-0 left-0 right-0 z-50 bg-[#0e0e14]/80 backdrop-blur-xl border-b border-purple-900/30 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">', '<header id="main-navbar" class="fixed top-0 left-0 right-0 z-50 border-transparent transition-all duration-500">')

# 2. Hero Section: make it h-screen
html_content = html_content.replace('<section class="relative w-full max-w-container-max mx-auto px-gutter-desktop pt-16 pb-16 overflow-hidden">', '<section class="relative w-full h-screen mx-auto px-gutter-desktop overflow-hidden flex flex-col justify-center items-center">')

# 3. Modify 3D Container to be full background
# The container looks like: <div class="w-full h-[520px] max-w-4xl mx-auto relative z-10 my-4 flex items-center justify-center overflow-visible \nselect-none" id="tact-kinetic-container">
# or something similar. Let's use regex to catch variations in whitespace/newlines.
html_content = re.sub(
    r'<div class="[^"]*" id="tact-kinetic-container">',
    '<div class="absolute inset-0 w-full h-full z-0 flex items-center justify-center overflow-hidden select-none pointer-events-none" id="tact-kinetic-container">',
    html_content
)

# Move tact-kinetic-container out of its parent so it's directly under the section?
# It's currently inside `<div class="relative z-10 max-w-5xl mx-auto flex flex-col items-center pointer-events-auto">`
# Actually, since it's `absolute inset-0`, it will just fill its nearest relative parent.
# If we change its parent to NOT be relative, or just change the container classes to `fixed inset-0`, it will cover the screen.
# Let's make it `absolute inset-0` but ensure the parent doesn't constrain it.
html_content = html_content.replace('<div class="relative z-10 max-w-5xl mx-auto flex flex-col items-center pointer-events-auto">', '<div class="relative z-10 w-full flex flex-col items-center pointer-events-auto">')

# 4. Convert back to string and encode to base64
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

      // Force 3D container to be fully absolutely positioned outside normal flow constraints
      const tactContainer = containerRef.current.querySelector('#tact-kinetic-container');
      if (tactContainer) {{
         tactContainer.style.position = 'absolute';
         tactContainer.style.top = '0';
         tactContainer.style.left = '0';
         tactContainer.style.width = '100vw';
         tactContainer.style.height = '100vh';
         tactContainer.style.zIndex = '0';
         tactContainer.style.pointerEvents = 'none'; // prevent blocking clicks on CTAs
      }}
      
      const heroContent = containerRef.current.querySelector('.max-w-3xl.mx-auto.flex.flex-col.items-center.text-center');
      if (heroContent) {{
         heroContent.style.position = 'relative';
         heroContent.style.zIndex = '10';
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
      const loginBtn = containerRef.current.querySelector("a[href='/login']") || containerRef.current.querySelector("a[href='#']"); 
      
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

print("Modified HTML using raw string replacements to expand 3D model and animated navbar!")
